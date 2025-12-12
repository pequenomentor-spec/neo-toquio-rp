// ============================================
// NEO TOQUIO RP - Firebase Database Service
// ============================================

const FirebaseDB = {
    // Collections
    COLLECTIONS: {
        USERS: 'users',
        SETTINGS: 'settings',
        FACTIONS: 'factions',
        JOBS: 'jobs',
        INVENTORY: 'inventory',
        REQUESTS: 'requests',
        NEWS: 'news',
        CONVERSATIONS: 'conversations',
        MESSAGES: 'messages',
        TRANSACTIONS: 'transactions',
        ACTIVITY_LOG: 'activityLog',
        MAPS: 'maps',
        SALE_OFFERS: 'saleOffers',
        POSTS: 'posts',
        GLOBAL_CHAT: 'globalChat'
    },

    // Estado de inicialização
    initialized: false,
    dataLoaded: false,

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    async init() {
        if (this.initialized) return;

        try {
            console.log('Initializing Firebase DB...');

            // Verificar se os dados iniciais existem
            await this.checkAndSeedData();

            // Carregar dados do Firestore para APP_DATA
            await this.loadAllData();

            // Verificar se há usuário logado
            await this.checkAuthState();

            this.initialized = true;
            this.dataLoaded = true;

            console.log('Firebase DB initialized successfully!');
        } catch (error) {
            console.error('Error initializing Firebase DB:', error);
            // Fallback para localStorage
            DataManager.load();
        }
    },

    // Verificar e criar dados iniciais
    async checkAndSeedData() {
        const settingsRef = db.collection(this.COLLECTIONS.SETTINGS).doc('main');
        const settingsDoc = await settingsRef.get();

        if (!settingsDoc.exists) {
            console.log('Seeding initial data...');
            await this.seedInitialData();
        }
    },

    // Criar dados iniciais no Firestore
    async seedInitialData() {
        const batch = db.batch();

        // Settings
        const settingsRef = db.collection(this.COLLECTIONS.SETTINGS).doc('main');
        batch.set(settingsRef, {
            registrationOpen: true,
            requireApproval: false,
            siteName: 'Neo Toquio RP',
            welcomeMessage: 'Bem-vindo a Neo Toquio! Você já pode fazer login e começar sua jornada.'
        });

        // Admin user
        const adminRef = db.collection(this.COLLECTIONS.USERS).doc('admin001');
        batch.set(adminRef, {
            id: 'admin001',
            avakinName: 'Admin NTQ',
            email: 'admin@neotoquio.com',
            instagram: '@neotoquiorp',
            friendCode: 'NTQ-0000-0000',
            characterHistory: 'Administrador supremo de Neo Toquio...',
            role: 'admin',
            password: 'admin123',
            status: 'approved',
            avatar: null,
            faction: null,
            job: null,
            balance: 999999,
            bank: {
                accountNumber: 'NTQ-0001',
                creditLimit: 50000,
                creditUsed: 0,
                pixKey: 'admin@ntq'
            },
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isOnline: false,
            lastActivity: null
        });

        // Factions
        const factions = [
            { id: 'tdp', name: 'TDP', fullName: 'Tropa da Pavel', type: 'Organização Criminal', category: 'criminal', icon: 'fa-skull-crossbones', color: '#ef4444', leader: null, description: 'A temida Tropa da Pavel.', requirements: 'Lealdade comprovada.', isRecruiting: true },
            { id: 'nvc', name: 'NVC', fullName: 'Nova Colômbia', type: 'Cartel', category: 'criminal', icon: 'fa-skull', color: '#8b5cf6', leader: null, description: 'Cartel poderoso.', requirements: 'Discrição e lealdade.', isRecruiting: true },
            { id: 'pm', name: 'PM', fullName: 'Polícia Militar', type: 'Força Policial', category: 'policia', icon: 'fa-shield-halved', color: '#3b82f6', leader: null, description: 'Polícia Militar de NeoTóquio.', requirements: 'Ficha limpa.', isRecruiting: true },
            { id: 'eb', name: 'EB', fullName: 'Exército Brasileiro', type: 'Força Militar', category: 'policia', icon: 'fa-star', color: '#10b981', leader: null, description: 'Exército Brasileiro.', requirements: 'Experiência militar.', isRecruiting: true }
        ];
        factions.forEach(faction => {
            const ref = db.collection(this.COLLECTIONS.FACTIONS).doc(faction.id);
            batch.set(ref, faction);
        });

        // Jobs
        const jobs = [
            { id: 'hospital', title: 'Funcionário(a) do Hospital', department: 'Hospital Central', icon: 'fa-hospital', salary: '¥ 5.000/semana', description: 'Trabalhe no hospital salvando vidas.', requirements: 'Disponibilidade.', isHiring: true },
            { id: 'delegacia', title: 'Funcionário(a) da Delegacia', department: 'Delegacia Central', icon: 'fa-building-shield', salary: '¥ 4.500/semana', description: 'Trabalhe na delegacia.', requirements: 'Comprometimento.', isHiring: true },
            { id: 'tribunal', title: 'Funcionário(a) do Tribunal', department: 'Tribunal de Justiça', icon: 'fa-gavel', salary: '¥ 6.000/semana', description: 'Trabalhe no tribunal.', requirements: 'Conhecimento de leis.', isHiring: true }
        ];
        jobs.forEach(job => {
            const ref = db.collection(this.COLLECTIONS.JOBS).doc(job.id);
            batch.set(ref, job);
        });

        // News
        const newsRef = db.collection(this.COLLECTIONS.NEWS).doc('news001');
        batch.set(newsRef, {
            id: 'news001',
            title: 'Bem-vindos a NeoTóquio!',
            content: 'O servidor está oficialmente aberto!',
            author: 'Admin NTQ',
            category: 'Anúncio',
            createdAt: new Date().toISOString()
        });

        await batch.commit();
        console.log('Initial data seeded successfully!');
    },

    // ============================================
    // CARREGAR DADOS
    // ============================================
    async loadAllData() {
        try {
            // Carregar settings
            const settingsDoc = await db.collection(this.COLLECTIONS.SETTINGS).doc('main').get();
            if (settingsDoc.exists) {
                APP_DATA.settings = settingsDoc.data();
            }

            // Carregar usuários
            const usersSnapshot = await db.collection(this.COLLECTIONS.USERS).get();
            APP_DATA.users = [];
            usersSnapshot.forEach(doc => APP_DATA.users.push(doc.data()));

            // Carregar facções
            const factionsSnapshot = await db.collection(this.COLLECTIONS.FACTIONS).get();
            APP_DATA.factions = [];
            factionsSnapshot.forEach(doc => APP_DATA.factions.push(doc.data()));

            // Carregar empregos
            const jobsSnapshot = await db.collection(this.COLLECTIONS.JOBS).get();
            APP_DATA.jobs = [];
            jobsSnapshot.forEach(doc => APP_DATA.jobs.push(doc.data()));

            // Carregar notícias
            const newsSnapshot = await db.collection(this.COLLECTIONS.NEWS).orderBy('createdAt', 'desc').limit(50).get();
            APP_DATA.news = [];
            newsSnapshot.forEach(doc => APP_DATA.news.push(doc.data()));

            // Carregar inventário
            const inventorySnapshot = await db.collection(this.COLLECTIONS.INVENTORY).get();
            APP_DATA.inventory = [];
            inventorySnapshot.forEach(doc => APP_DATA.inventory.push(doc.data()));

            // Carregar requests
            const requestsSnapshot = await db.collection(this.COLLECTIONS.REQUESTS).get();
            APP_DATA.requests = [];
            requestsSnapshot.forEach(doc => APP_DATA.requests.push(doc.data()));

            // Carregar activity log
            const logSnapshot = await db.collection(this.COLLECTIONS.ACTIVITY_LOG).orderBy('timestamp', 'desc').limit(200).get();
            APP_DATA.activityLog = [];
            logSnapshot.forEach(doc => APP_DATA.activityLog.push(doc.data()));

            // Carregar mapas
            const mapsSnapshot = await db.collection(this.COLLECTIONS.MAPS).get();
            APP_DATA.maps = [];
            mapsSnapshot.forEach(doc => APP_DATA.maps.push(doc.data()));

            // Carregar ofertas de venda
            const saleOffersSnapshot = await db.collection(this.COLLECTIONS.SALE_OFFERS).get();
            APP_DATA.saleOffers = [];
            saleOffersSnapshot.forEach(doc => APP_DATA.saleOffers.push(doc.data()));

            // Carregar transações
            const transactionsSnapshot = await db.collection(this.COLLECTIONS.TRANSACTIONS).orderBy('createdAt', 'desc').limit(100).get();
            APP_DATA.pixTransactions = [];
            transactionsSnapshot.forEach(doc => APP_DATA.pixTransactions.push(doc.data()));

            console.log('All data loaded from Firestore');
        } catch (error) {
            console.error('Error loading data:', error);
            throw error;
        }
    },

    // Verificar estado de autenticação
    async checkAuthState() {
        // Verificar localStorage para sessão local
        const savedUserId = localStorage.getItem('ntq_current_user');
        if (savedUserId) {
            const user = APP_DATA.users.find(u => u.id === savedUserId);
            if (user && user.status === 'approved') {
                APP_DATA.currentUser = user;
                user.isOnline = true;
                user.lastActivity = new Date().toISOString();
                await this.updateUser(user.id, { isOnline: true, lastActivity: user.lastActivity });
            }
        }
    },

    // ============================================
    // OPERAÇÕES DE USUÁRIO
    // ============================================
    async createUser(userData) {
        const userRef = db.collection(this.COLLECTIONS.USERS).doc(userData.id);
        await userRef.set(userData);
        APP_DATA.users.push(userData);
        return userData;
    },

    async updateUser(userId, updates) {
        const userRef = db.collection(this.COLLECTIONS.USERS).doc(userId);
        await userRef.update(updates);

        // Atualizar localmente
        const localUser = APP_DATA.users.find(u => u.id === userId);
        if (localUser) Object.assign(localUser, updates);

        // Atualizar current user se for o mesmo
        if (APP_DATA.currentUser?.id === userId) {
            Object.assign(APP_DATA.currentUser, updates);
        }
    },

    async deleteUser(userId) {
        await db.collection(this.COLLECTIONS.USERS).doc(userId).delete();
        APP_DATA.users = APP_DATA.users.filter(u => u.id !== userId);
    },

    // ============================================
    // OPERAÇÕES GERAIS
    // ============================================
    async addDocument(collection, data) {
        const docId = data.id || db.collection(collection).doc().id;
        data.id = docId;
        await db.collection(collection).doc(docId).set(data);
        return data;
    },

    async updateDocument(collection, docId, updates) {
        await db.collection(collection).doc(docId).update(updates);
    },

    async deleteDocument(collection, docId) {
        await db.collection(collection).doc(docId).delete();
    },

    // ============================================
    // LOG DE ATIVIDADES
    // ============================================
    async log(action, details) {
        const logEntry = {
            id: 'log' + Date.now(),
            action,
            details,
            userId: APP_DATA.currentUser?.id || null,
            userName: APP_DATA.currentUser?.avakinName || 'Sistema',
            timestamp: new Date().toISOString()
        };

        await db.collection(this.COLLECTIONS.ACTIVITY_LOG).doc(logEntry.id).set(logEntry);
        APP_DATA.activityLog.unshift(logEntry);

        // Limitar tamanho local
        if (APP_DATA.activityLog.length > 200) {
            APP_DATA.activityLog = APP_DATA.activityLog.slice(0, 200);
        }
    },

    // ============================================
    // AUTENTICAÇÃO
    // ============================================
    async login(email, password) {
        // Buscar usuário por email ou nome
        const user = APP_DATA.users.find(u =>
            (u.email?.toLowerCase() === email.toLowerCase() ||
                u.avakinName?.toLowerCase() === email.toLowerCase()) &&
            u.password === password
        );

        if (!user) {
            return { success: false, error: 'Credenciais inválidas' };
        }

        if (user.status === 'pending') {
            return { success: false, error: 'Cadastro em análise. Aguarde aprovação.' };
        }

        if (user.status === 'rejected') {
            return { success: false, error: 'Cadastro rejeitado.' };
        }

        // Atualizar status online
        const updates = {
            lastLogin: new Date().toISOString(),
            isOnline: true,
            lastActivity: new Date().toISOString()
        };

        await this.updateUser(user.id, updates);
        Object.assign(user, updates);

        APP_DATA.currentUser = user;
        localStorage.setItem('ntq_current_user', user.id);

        return { success: true, user };
    },

    async logout() {
        if (APP_DATA.currentUser) {
            await this.updateUser(APP_DATA.currentUser.id, {
                isOnline: false,
                lastActivity: new Date().toISOString()
            });
        }

        APP_DATA.currentUser = null;
        localStorage.removeItem('ntq_current_user');
    },

    async register(data) {
        // Verificar se nome já existe
        if (APP_DATA.users.some(u => u.avakinName.toLowerCase() === data.avakinName.toLowerCase())) {
            return { success: false, error: 'Este nome já está cadastrado' };
        }

        const newUser = {
            id: 'user' + Date.now(),
            avakinName: data.avakinName,
            email: data.email || '',
            password: data.password,
            instagram: data.instagram,
            friendCode: data.friendCode,
            characterHistory: data.characterHistory,
            role: 'member',
            status: APP_DATA.settings.requireApproval ? 'pending' : 'approved',
            avatar: null,
            faction: null,
            job: null,
            balance: 15000,
            bank: {
                accountNumber: 'NTQ-' + Math.floor(1000 + Math.random() * 9000),
                creditLimit: 1000,
                creditUsed: 0,
                pixKey: data.avakinName.toLowerCase().replace(/\s/g, '') + '@ntq'
            },
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isOnline: false,
            lastActivity: null
        };

        await this.createUser(newUser);
        await this.log('Novo cadastro', newUser.avakinName);

        return {
            success: true,
            message: APP_DATA.settings.requireApproval ?
                'Cadastro enviado! Aguarde aprovação.' :
                'Cadastro realizado! Faça login.'
        };
    },

    // ============================================
    // SALVAR DADOS (compatibilidade)
    // ============================================
    save() {
        // Esta função é chamada pelo código legado
        // Implementar sync específico se necessário
        console.log('FirebaseDB: save() called - data is auto-synced');
    },

    // ============================================
    // REAL-TIME LISTENERS
    // ============================================

    /**
     * Escutar atualizações em tempo real de uma coleção
     * @param {string} collectionName Nome da coleção
     * @param {function} callback Função a ser executada com os dados (array)
     * @param {object} filters Filtros opcionais { field, operator, value }
     * @returns {function} Função para parar de escutar (unsubscribe)
     */
    listenToCollection(collectionName, callback, filters = []) {
        if (!this.db) return () => { };

        let query = this.db.collection(collectionName);

        // Aplicar filtros se houver
        if (filters && filters.length > 0) {
            filters.forEach(f => {
                query = query.where(f.field, f.operator, f.value);
            });
        }

        // Ordenação e limites
        if (collectionName === this.COLLECTIONS.MESSAGES || collectionName === this.COLLECTIONS.GLOBAL_CHAT) {
            query = query.orderBy('createdAt', 'asc').limitToLast(50);
        } else if (collectionName === this.COLLECTIONS.TRANSACTIONS || collectionName === this.COLLECTIONS.NEWS || collectionName === this.COLLECTIONS.POSTS) {
            query = query.orderBy('createdAt', 'desc').limit(20);
        }

        return query.onSnapshot((snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push(doc.data());
            });
            callback(data, snapshot.docChanges());
        }, (error) => {
            console.error(`Erro ao escutar coleção ${collectionName}:`, error);
        });
    },

    listenToDocument(collectionName, docId, callback) {
        if (!this.db) return () => { };

        return this.db.collection(collectionName).doc(docId).onSnapshot((doc) => {
            if (doc.exists) {
                callback(doc.data());
            }
        }, (error) => {
            console.error(`Erro ao escutar documento ${collectionName}/${docId}:`, error);
        });
    }
};

// Exportar
window.FirebaseDB = FirebaseDB;
