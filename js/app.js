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

    start() {
        // Show loader
        this.showLoader();

        // Initialize after short delay (simulate loading)
        setTimeout(() => {
            this.hideLoader();
            this.setupApp();
        }, 1200);
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
    }
}

// Start the application
const app = new App();

// Expose for debugging
window.app = app;
