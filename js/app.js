// ============================================
// NEO TOQUIO RP - Main Application
// ============================================

class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    async start() {
        // Show loader
        this.showLoader();
        this.updateLoaderText('Conectando ao servidor...');

        try {
            // Initialize Firebase and load data
            if (typeof FirebaseDB !== 'undefined') {
                this.updateLoaderText('Carregando dados...');
                await FirebaseDB.init();
                console.log('Firebase DB loaded successfully');
            } else {
                // Fallback to localStorage
                this.updateLoaderText('Modo offline...');
                DataManager.load();
            }

            this.updateLoaderText('Preparando interface...');

            // Small delay for smooth UX
            await new Promise(resolve => setTimeout(resolve, 500));

            // Start Realtime Listeners if logged in
            if (APP_DATA.currentUser) {
                DataManager.initRealtimeListeners();
                Auth.startOnlineHeartbeat();
            }

            // Initialize Router
            Router.init();

            this.hideLoader();
            this.setupApp();
        } catch (error) {
            console.error('Error starting app:', error);
            this.updateLoaderText('Erro de conexão. Usando modo offline...');

            // Fallback to localStorage
            DataManager.load();

            await new Promise(resolve => setTimeout(resolve, 1000));
            this.hideLoader();
            this.setupApp();
        }
    }

    updateLoaderText(text) {
        const loaderText = document.querySelector('.loader-text');
        if (loaderText) {
            loaderText.textContent = text;
        }
    }

    showLoader() {
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.style.display = 'flex';
        }
    }

    hideLoader() {
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    }

    setupApp() {
        // Render navigation based on auth state
        Components.renderNavigation();

        // Render user profile sections
        Components.renderUserMiniProfile();
        Components.renderTopbarUser();

        // Initialize router
        Router.init();

        // Setup global event listeners
        this.setupEventListeners();

        // Start online heartbeat if logged in
        if (APP_DATA.currentUser) {
            Auth.startOnlineHeartbeat();
        }

        console.log('Neo Toquio RP initialized!');
    }

    setupEventListeners() {
        // Mobile sidebar toggle
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const sidebar = document.querySelector('.sidebar');

        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }

        // Close sidebar on route change (mobile)
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-route]') && sidebar) {
                sidebar.classList.remove('open');
            }
        });

        // Close sidebar when clicking outside (mobile)
        document.addEventListener('click', (e) => {
            if (sidebar && sidebar.classList.contains('open')) {
                if (!e.target.closest('.sidebar') && !e.target.closest('.sidebar-toggle')) {
                    sidebar.classList.remove('open');
                }
            }
        });

        // Notification bell click
        const notifBtn = document.querySelector('.topbar-icon-btn:has(.fa-bell)');
        if (notifBtn) {
            notifBtn.addEventListener('click', () => {
                Utils.showToast('Nenhuma notificação nova', 'info');
            });
        }

        // Real-time Updates Listeners
        window.addEventListener('users-updated', () => {
            const current = Router.currentPage;
            // Recarregar páginas que dependem de lista de usuários
            if (current === 'members' || current === 'requests' || current === 'admin') {
                Router.navigate(current);
            }
        });

        window.addEventListener('transactions-updated', () => {
            const current = Router.currentPage;
            // Atualizar saldo no topo
            if (window.Components && window.Components.renderTopbarUser) {
                window.Components.renderTopbarUser();
            }
            // Recarregar página do banco
            if (current === 'bank') {
                Router.navigate(current);
            }
        });

        window.addEventListener('messages-updated', () => {
            if (Router.currentPage === 'chat') {
                if (window.Pages && window.Pages.refreshChat) {
                    window.Pages.refreshChat();
                } else {
                    Router.navigate('chat');
                }
            }
        });

        window.addEventListener('posts-updated', () => {
            if (Router.currentPage === 'feed') {
                const feedList = document.getElementById('feed-list');
                if (feedList && window.Pages && window.Pages.renderFeedList) {
                    const posts = APP_DATA.posts || [];
                    posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                    feedList.innerHTML = window.Pages.renderFeedList(posts);
                } else {
                    Router.navigate('feed');
                }
            }
        });


        // Handle page visibility for online status
        document.addEventListener('visibilitychange', async () => {
            if (APP_DATA.currentUser && typeof FirebaseDB !== 'undefined') {
                if (document.visibilityState === 'hidden') {
                    // User is leaving
                    await FirebaseDB.updateUser(APP_DATA.currentUser.id, {
                        lastActivity: new Date().toISOString()
                    });
                } else {
                    // User is back
                    await FirebaseDB.updateUser(APP_DATA.currentUser.id, {
                        isOnline: true,
                        lastActivity: new Date().toISOString()
                    });
                }
            }
        });

        // Handle before unload
        window.addEventListener('beforeunload', () => {
            if (APP_DATA.currentUser && typeof FirebaseDB !== 'undefined') {
                // Mark as offline (using sendBeacon for reliability)
                const data = JSON.stringify({ isOnline: false, lastActivity: new Date().toISOString() });
                navigator.sendBeacon && navigator.sendBeacon('/api/offline', data);
            }
        });
    }
}

// Start the application
const app = new App();

// Expose for debugging
window.app = app;
