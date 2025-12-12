// ============================================
// NEO TOQUIO RP - Router (with Auth)
// ============================================

const Router = {
    currentRoute: null,

    // Routes configuration
    publicRoutes: ['home', 'about', 'factions-info', 'rules', 'login', 'register'],
    memberRoutes: ['dashboard', 'profile', 'bank', 'chat', 'factions', 'jobs', 'inventory', 'citizens', 'maps', 'rules', 'feed'],
    adminRoutes: ['admin', 'requests', 'members', 'admin-edit'],

    // Initialize router
    init() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const navItem = e.target.closest('[data-route]');
            if (navItem) {
                e.preventDefault();
                this.navigate(navItem.dataset.route);
            }
        });

        // Initial render based on auth state
        if (Auth.isLoggedIn()) {
            this.navigate('dashboard');
        } else {
            this.navigate('home');
        }
    },

    // Navigate to route
    navigate(route) {
        // Check authentication for protected routes
        // Rotas públicas podem ser acessadas sem login
        const isPublicRoute = this.publicRoutes.includes(route);

        if (!isPublicRoute && this.memberRoutes.includes(route) && !Auth.isLoggedIn()) {
            this.navigate('login');
            return;
        }

        if (this.adminRoutes.includes(route) && !Auth.canManageRequests()) {
            Utils.showToast('Acesso negado', 'error');
            return;
        }

        this.currentRoute = route;
        this.render(route);
        this.updateNavigation(route);
    },

    // Render page content
    render(route) {
        const mainContent = document.getElementById('main-content');

        // Get page content
        let content = '';

        if (typeof Pages[route] === 'function') {
            content = Pages[route]();
        } else {
            content = Pages.notFound();
        }

        mainContent.innerHTML = content;

        // Run page-specific initialization
        if (Pages.init && typeof Pages.init[route] === 'function') {
            setTimeout(() => Pages.init[route](), 200);
        }

        // Scroll to top
        mainContent.scrollTop = 0;

        // Update page title
        document.title = `${route.charAt(0).toUpperCase() + route.slice(1).replace('-', ' ')} | Neo Toquio RP`;
    },

    // Update navigation active state
    updateNavigation(route) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.route === route);
        });

        // Update request badge
        const requestsBadge = document.querySelector('[data-route="requests"] .nav-badge');
        if (requestsBadge) {
            const count = DataManager.getPendingRequestsCount() + DataManager.getPendingUsersCount();
            requestsBadge.textContent = count;
            requestsBadge.style.display = count > 0 ? 'flex' : 'none';
        }
    }
};

// Export Router
window.Router = Router;
