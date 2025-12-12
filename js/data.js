// ============================================
// NEO TOQUIO RP - Data Store & Auth System
// ============================================

const APP_DATA = {
    // System Settings
    settings: {
        registrationOpen: true,
        requireApproval: false,
        siteName: 'Neo Toquio RP',
        welcomeMessage: 'Bem-vindo a Neo Toquio! Você já pode fazer login e começar sua jornada.'
    },

    // Current logged in user (null if not logged in)
    currentUser: null,

    // Navigation Items (will be filtered by role)
    navigation: {
        public: [
            { id: 'home', icon: 'fa-home', label: 'Início', route: 'home' },
            { id: 'about', icon: 'fa-info-circle', label: 'Sobre', route: 'about' },
            { id: 'factions-info', icon: 'fa-shield-halved', label: 'Facções', route: 'factions-info' },
            { id: 'rules', icon: 'fa-scale-balanced', label: 'Regras', route: 'rules' }
        ],
        member: [
            { id: 'dashboard', icon: 'fa-home', label: 'Dashboard', route: 'dashboard' },
            { id: 'feed', icon: 'fa-hashtag', label: 'Status', route: 'feed' },
            { id: 'profile', icon: 'fa-user', label: 'Meu Perfil', route: 'profile' },
            { id: 'bank', icon: 'fa-building-columns', label: 'Banco', route: 'bank' },
            { id: 'chat', icon: 'fa-comments', label: 'Mensagens', route: 'chat' },
            { id: 'factions', icon: 'fa-shield-halved', label: 'Facções', route: 'factions' },
            { id: 'jobs', icon: 'fa-briefcase', label: 'Empregos', route: 'jobs' },
            { id: 'inventory', icon: 'fa-box-open', label: 'Inventário', route: 'inventory' },
            { id: 'citizens', icon: 'fa-users', label: 'Cidadãos', route: 'citizens' },
            { id: 'maps', icon: 'fa-map', label: 'Mapas', route: 'maps' },
            { id: 'rules', icon: 'fa-scale-balanced', label: 'Regras', route: 'rules' }
        ],
        admin: [
            { id: 'admin', icon: 'fa-gear', label: 'Admin', route: 'admin' },
            { id: 'requests', icon: 'fa-inbox', label: 'Solicitações', route: 'requests', badge: 0 },
            { id: 'members', icon: 'fa-users-gear', label: 'Membros', route: 'members' },
            { id: 'admin-edit', icon: 'fa-sliders', label: 'Modo Edição', route: 'admin-edit', adminOnly: true }
        ]
    },

    // Roles/Cargos customizáveis
    roles: [
        { id: 'admin', name: 'Admin Principal', color: '#ef4444', permissions: ['all'] },
        { id: 'subadmin', name: 'Sub-Admin', color: '#f59e0b', permissions: ['approve_requests', 'post_news', 'manage_members'] },
        { id: 'member', name: 'Membro', color: '#3b82f6', permissions: [] }
    ],

    // Users database
    users: [
        {
            id: 'admin001',
            avakinName: 'NeoToquioAdmin',
            email: 'admin@neotoquio.com',
            instagram: '@neotoquiorp',
            friendCode: 'NTQ-0000-0000',
            characterHistory: 'Administrador supremo de Neo Toquio. Responsável pela gestão do servidor e manutenção da ordem.',
            role: 'admin',
            status: 'approved',
            avatar: null,
            password: 'NTQ@2024Adm!',
            faction: null,
            job: null,
            balance: 999999,
            // Dados bancários
            bank: {
                accountNumber: 'NTQ-0001',
                creditLimit: 50000,
                creditUsed: 0,
                pixKey: 'admin@ntq'
            },
            createdAt: '2024-01-01',
            lastLogin: null,
            isOnline: false,
            lastActivity: null
        }
    ],

    // Transações PIX
    pixTransactions: [],

    // Facções (2 ilegais + 2 policiais)
    factions: [
        {
            id: 'tdp',
            name: 'TDP',
            fullName: 'Tropa da Pavel',
            type: 'Organização Criminal',
            category: 'criminal',
            icon: 'fa-skull-crossbones',
            color: '#ef4444',
            leader: null,
            description: 'A temida Tropa da Pavel. Uma organização criminosa que domina o submundo de NeoTóquio.',
            requirements: 'Lealdade comprovada e comprometimento total.',
            isRecruiting: true
        },
        {
            id: 'nvc',
            name: 'NVC',
            fullName: 'Nova Colômbia',
            type: 'Cartel',
            category: 'criminal',
            icon: 'fa-skull',
            color: '#8b5cf6',
            leader: null,
            description: 'Nova Colômbia - Cartel poderoso que controla o tráfico e os negócios ilícitos da cidade.',
            requirements: 'Discrição e lealdade comprovadas.',
            isRecruiting: true
        },
        {
            id: 'pm',
            name: 'PM',
            fullName: 'Polícia Militar',
            type: 'Força Policial',
            category: 'policia',
            icon: 'fa-shield-halved',
            color: '#3b82f6',
            leader: null,
            description: 'A Polícia Militar de NeoTóquio. Responsável pela segurança pública e manutenção da ordem.',
            requirements: 'Ficha limpa e comprometimento com a lei.',
            isRecruiting: true
        },
        {
            id: 'eb',
            name: 'EB',
            fullName: 'Exército Brasileiro',
            type: 'Força Militar',
            category: 'policia',
            icon: 'fa-star',
            color: '#10b981',
            leader: null,
            description: 'Exército Brasileiro - Força militar de elite para operações especiais e proteção da cidade.',
            requirements: 'Experiência militar e disciplina exemplar.',
            isRecruiting: true
        }
    ],

    // Empregos
    jobs: [
        {
            id: 'hospital',
            title: 'Funcionário(a) do Hospital',
            department: 'Hospital Central',
            icon: 'fa-hospital',
            salary: '¥ 5.000/semana',
            description: 'Trabalhe no hospital salvando vidas e cuidando da saúde dos cidadãos de NeoTóquio.',
            requirements: 'Disponibilidade para atendimentos.',
            isHiring: true
        },
        {
            id: 'delegacia',
            title: 'Funcionário(a) da Delegacia',
            department: 'Delegacia Central',
            icon: 'fa-building-shield',
            salary: '¥ 4.500/semana',
            description: 'Trabalhe na delegacia ajudando a manter a ordem e registrar ocorrências.',
            requirements: 'Comprometimento com as leis.',
            isHiring: true
        },
        {
            id: 'tribunal',
            title: 'Funcionário(a) do Tribunal',
            department: 'Tribunal de Justiça',
            icon: 'fa-gavel',
            salary: '¥ 6.000/semana',
            description: 'Trabalhe no tribunal de justiça auxiliando nos processos judiciais.',
            requirements: 'Conhecimento básico de leis.',
            isHiring: true
        },
        {
            id: 'agencia_modelos',
            title: 'Modelo / Agente',
            department: 'Agência de Modelos',
            icon: 'fa-camera',
            salary: '¥ 4.000/semana',
            description: 'Trabalhe na agência de modelos como modelo ou agente de talentos.',
            requirements: 'Boa apresentação e carisma.',
            isHiring: true
        },
        {
            id: 'universidade',
            title: 'Funcionário(a) da Universidade',
            department: 'Universidade NeoTóquio',
            icon: 'fa-graduation-cap',
            salary: '¥ 5.500/semana',
            description: 'Trabalhe na universidade como professor, monitor ou funcionário administrativo.',
            requirements: 'Conhecimento acadêmico.',
            isHiring: true
        },
        {
            id: 'salao_beleza',
            title: 'Cabeleireiro(a) / Maquiador(a)',
            department: 'Salão de Beleza',
            icon: 'fa-scissors',
            salary: '¥ 3.500/semana',
            description: 'Trabalhe no salão de beleza oferecendo serviços de cabelo, maquiagem e estética.',
            requirements: 'Habilidade com beleza e estética.',
            isHiring: true
        },
        {
            id: 'studio_tattoo',
            title: 'Tatuador(a)',
            department: 'Studio de Tattoo',
            icon: 'fa-pen-nib',
            salary: '¥ 4.000/semana',
            description: 'Trabalhe no studio de tattoo criando artes corporais únicas.',
            requirements: 'Habilidade artística.',
            isHiring: true
        },
        {
            id: 'sushi',
            title: 'Sushiman / Atendente',
            department: 'Sushi NeoTóquio',
            icon: 'fa-fish',
            salary: '¥ 3.000/semana',
            description: 'Trabalhe no restaurante de sushi preparando pratos tradicionais japoneses.',
            requirements: 'Conhecimento culinário.',
            isHiring: true
        }
    ],

    // Inventário global
    inventory: [],

    // Ofertas de venda direta (player para player)
    saleOffers: [],

    // Ofertas de troca
    tradeOffers: [],

    // Templates de itens (para criar itens)
    itemTemplates: {
        legal: [
            { id: 'celular', name: 'Celular', icon: 'fa-mobile-screen', category: 'Eletrônico', price: 500 },
            { id: 'radio', name: 'Rádio', icon: 'fa-walkie-talkie', category: 'Comunicação', price: 300 },
            { id: 'comida', name: 'Comida', icon: 'fa-burger', category: 'Consumível', price: 50 },
            { id: 'bebida', name: 'Bebida', icon: 'fa-bottle-water', category: 'Consumível', price: 30 },
            { id: 'roupa', name: 'Roupa', icon: 'fa-shirt', category: 'Vestuário', price: 200 },
            { id: 'ferramentas', name: 'Ferramentas', icon: 'fa-toolbox', category: 'Utilidade', price: 250 }
        ],
        illegal: [
            { id: 'arma', name: 'Arma de Fogo', icon: 'fa-gun', category: 'Arma', price: 5000 },
            { id: 'droga', name: 'Substância Ilícita', icon: 'fa-pills', category: 'Droga', price: 1000 },
            { id: 'faca', name: 'Faca', icon: 'fa-kitchen-set', category: 'Arma Branca', price: 500 },
            { id: 'colete', name: 'Colete Ilegal', icon: 'fa-vest', category: 'Proteção', price: 2000 },
            { id: 'documento_falso', name: 'Documento Falso', icon: 'fa-id-card', category: 'Falsificação', price: 3000 },
            { id: 'explosivo', name: 'Explosivo', icon: 'fa-bomb', category: 'Arma', price: 8000 }
        ]
    },

    // Requests (faction applications)
    requests: [],

    // Notícias da cidade
    news: [
        {
            id: 'news001',
            title: 'Bem-vindos a NeoTóquio!',
            content: 'O servidor está oficialmente aberto! Cadastre-se e faça parte dessa história.',
            author: 'Admin NTQ',
            category: 'Anúncio',
            createdAt: new Date().toISOString()
        }
    ],

    // Chat/Mensagens (estilo Instagram DM)
    conversations: [],
    messages: [],
    posts: [],

    // Rules - Novas regras de NeoTóquio
    rules: {
        conduta: [
            '1. Vestimenta Tradicional Obrigatória - Durante o primeiro dia na cidade, todos os personagens devem utilizar roupas tradicionais japonesas. Essa exigência representa o respeito à cultura local.',
            '2. Códigos de Conduta Cultural - Os cumprimentos devem ser feitos com reverência, evitando toques físicos excessivos. Espera-se respeito absoluto aos templos, tradições e costumes japoneses.',
            '3. Desbloqueio de Traje Moderno - Após 1 dia vivenciando a cultura japonesa, o personagem poderá adotar roupas urbanas modernas.'
        ],
        zona_safe: [
            '4. Zonas Safe (Áreas Seguras) - Hospitais, Áreas de Trabalho e Templos são zonas seguras. É proibido qualquer tipo de combate ou agressão nesses locais.',
            '5. Personagens e Interpretação - Crie um personagem com história clara e coerente com o universo de Tokyo. É proibido o uso de coletes invisíveis, poderes irreais ou falas fora da realidade. Metagaming e Fail RP são proibidos.'
        ],
        convivencia: [
            '6. Convivência e Respeito - Não será tolerada nenhuma forma de discriminação, xenofobia, homofobia, machismo, racismo ou assédio. Respeite todos os jogadores e a equipe de administração.',
            '7. Advertências e Banimentos - 1ª infração: Aviso verbal. 2ª infração: Ban de 24h a 72h. 3ª infração: Ban permanente.',
            '8. Marcação Obrigatória - É obrigatório marcar a cidade em qualquer foto ou vídeo relacionado ao RP de Tokyo.'
        ],
        acao: [
            '9. Comandos no Chat - São consideradas comandos todas as ações feitas por digitação entre parênteses (*). Exemplos: *Algemando*, *Tirando os pertences*, *Cortando comunicação*, *Soltando*.',
            '10. Tempo de Carregamento - Ao entrar em uma sala, o jogador deve ter 1 minuto para carregar. Não é permitido carregar, entrar e já sair.',
            '11. Respeito aos Civis - Não é permitido atirar ou sequestrar civis sem motivo. As ações devem ser direcionadas apenas contra Policiais e criminosos.'
        ],
        combate: [
            '12. Forma de Atirar - Todo disparo simulado deve ser iniciado com contagem verbal: "1, 2, 3". O ato de atirar só é válido com a ação "Pistola de dedinho". Registros de ação devem ter provas de vídeo.',
            '13. Fotos de Fabricação - Toda organização criminosa que fabricar itens deve registrar com fotos (pelo menos 2 fotos: início e finalização). Ausência de documentação pode gerar advertência.'
        ],
        moeda: [
            '14. NEOPAY - A moeda Neo¥en (¥) foi criada exclusivamente para uso fictício dentro do RP. Não possui valor real e não pode ser trocada por dinheiro verdadeiro.',
            'Uso permitido: Compra/venda fictícia de itens, eventos internos, recompensas simbólicas.',
            'Proibições: Aceitar/solicitar pagamento em dinheiro real, usar fora do RP.'
        ],
        vandalismo: [
            '15. Vandalismo - Quando colocar fogo em um quarto inimigo, o proprietário deve colocar "Máquina de Chamas" no local. Só pode retirar após bombeiro apagar as chamas.'
        ]
    },

    // Mapas do Avakin Life
    maps: [
        {
            id: 'map1',
            name: 'Centro da Cidade',
            avakinLink: 'https://avakin.com/map/centro',
            image: null,
            description: 'Centro comercial de NeoTóquio',
            createdAt: '2024-01-01'
        }
    ],

    // System notifications
    notifications: [],

    // Activity log
    activityLog: []
};

// ============================================
// Authentication Manager
// ============================================
const Auth = {
    isLoggedIn() {
        return APP_DATA.currentUser !== null;
    },

    getCurrentUser() {
        return APP_DATA.currentUser;
    },

    isAdmin() {
        return APP_DATA.currentUser?.role === 'admin';
    },

    isSubAdmin() {
        return APP_DATA.currentUser?.role === 'subadmin';
    },

    isMember() {
        return APP_DATA.currentUser?.role === 'member';
    },

    canManageRequests() {
        return this.isAdmin() || this.isSubAdmin();
    },

    // Verificar se está em facção CRIMINAL (para criar itens ilegais)
    canCreateIllegal() {
        const faction = APP_DATA.currentUser?.faction;
        if (!faction) return false;
        const factionData = APP_DATA.factions.find(f => f.id === faction.id);
        return factionData?.category === 'criminal';
    },

    // Verificar se está em qualquer facção
    isInFaction() {
        return APP_DATA.currentUser?.faction !== null;
    },

    async login(emailOrName, password) {
        // Buscar usuário por email OU nome do Avakin
        const user = APP_DATA.users.find(u =>
            (u.email?.toLowerCase() === emailOrName.toLowerCase() ||
                u.avakinName?.toLowerCase() === emailOrName.toLowerCase()) &&
            u.password === password
        );

        if (!user) {
            return { success: false, error: 'Email/Nome ou senha incorretos' };
        }

        if (user.status === 'pending') {
            return { success: false, error: 'Seu cadastro ainda está em análise. Aguarde aprovação.' };
        }

        if (user.status === 'rejected') {
            return { success: false, error: 'Seu cadastro foi rejeitado. Entre em contato com a administração.' };
        }

        user.lastLogin = new Date().toISOString();
        user.isOnline = true;
        user.lastActivity = new Date().toISOString();
        APP_DATA.currentUser = user;

        // Salvar sessão localmente
        localStorage.setItem('ntq_current_user', user.id);

        // Atualizar no Firebase
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            try {
                await FirebaseDB.updateUser(user.id, {
                    lastLogin: user.lastLogin,
                    isOnline: true,
                    lastActivity: user.lastActivity
                });
            } catch (e) {
                console.error('Error updating user login in Firebase:', e);
            }
        }

        DataManager.save();

        // Iniciar heartbeat para manter status online
        this.startOnlineHeartbeat();

        // Iniciar sync em tempo real
        DataManager.initRealtimeListeners();

        return { success: true, user };
    },

    async logout() {
        // Parar sync
        DataManager.stopRealtimeListeners();

        if (APP_DATA.currentUser) {
            const user = APP_DATA.users.find(u => u.id === APP_DATA.currentUser.id);
            if (user) {
                user.isOnline = false;
                user.lastActivity = new Date().toISOString();

                // Atualizar no Firebase
                if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
                    try {
                        await FirebaseDB.updateUser(user.id, {
                            isOnline: false,
                            lastActivity: user.lastActivity
                        });
                    } catch (e) {
                        console.error('Error updating user logout in Firebase:', e);
                    }
                }
            }
        }
        this.stopOnlineHeartbeat();
        APP_DATA.currentUser = null;
        localStorage.removeItem('ntq_current_user');
        DataManager.save();
        Router.navigate('home');
    },

    // Heartbeat para manter status online
    _heartbeatInterval: null,

    startOnlineHeartbeat() {
        this.stopOnlineHeartbeat();
        this._heartbeatInterval = setInterval(() => {
            if (APP_DATA.currentUser) {
                const user = APP_DATA.users.find(u => u.id === APP_DATA.currentUser.id);
                if (user) {
                    user.lastActivity = new Date().toISOString();
                    user.isOnline = true;
                    DataManager.save();
                }
            }
        }, 60000); // Atualiza a cada minuto
    },

    stopOnlineHeartbeat() {
        if (this._heartbeatInterval) {
            clearInterval(this._heartbeatInterval);
            this._heartbeatInterval = null;
        }
    },

    // Verificar se usuário está online (considerando 5 minutos de inatividade)
    isUserOnline(userId) {
        const user = APP_DATA.users.find(u => u.id === userId);
        if (!user) return false;
        if (!user.isOnline) return false;

        // Verificar última atividade (5 minutos = 300000ms)
        if (user.lastActivity) {
            const diff = Date.now() - new Date(user.lastActivity).getTime();
            return diff < 300000;
        }
        return false;
    },

    async register(data) {
        // Validar email obrigatório
        if (!data.email || !data.email.includes('@')) {
            return { success: false, error: 'Email é obrigatório e deve ser válido' };
        }

        // Verificar se email já está cadastrado
        if (APP_DATA.users.some(u => u.email?.toLowerCase() === data.email.toLowerCase())) {
            return { success: false, error: 'Este email já está cadastrado' };
        }

        if (APP_DATA.users.some(u => u.avakinName.toLowerCase() === data.avakinName.toLowerCase())) {
            return { success: false, error: 'Este nome do Avakin já está cadastrado' };
        }

        const newUser = {
            id: 'user' + Date.now(),
            avakinName: data.avakinName,
            email: data.email.toLowerCase(),
            instagram: data.instagram,
            friendCode: data.friendCode,
            characterHistory: data.characterHistory,
            password: data.password,
            role: 'member',
            status: 'approved', // Aprovação automática
            avatar: null,
            faction: null,
            job: null,
            balance: 15000,
            bank: {
                accountNumber: 'NTQ-' + Math.floor(1000 + Math.random() * 9000),
                creditLimit: 1000,
                creditUsed: 0,
                pixKey: data.email.split('@')[0] + '@ntq'
            },
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isOnline: false,
            lastActivity: null
        };

        APP_DATA.users.push(newUser);

        // Salvar no Firebase se disponível
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            try {
                await FirebaseDB.createUser(newUser);
            } catch (e) {
                console.error('Error creating user in Firebase:', e);
            }
        }

        DataManager.save();
        DataManager.log('Novo cadastro', newUser.avakinName + ' (' + newUser.email + ')');

        return {
            success: true,
            message: 'Cadastro realizado! Você já pode fazer login com seu email.'
        };
    }
};

// ============================================
// Data Manager
// ============================================
const DataManager = {
    // Flag para usar Firebase
    useFirebase: false,

    save() {
        try {
            // Salva localmente como backup
            const dataToSave = {
                users: APP_DATA.users,
                factions: APP_DATA.factions,
                jobs: APP_DATA.jobs,
                inventory: APP_DATA.inventory,
                tradeOffers: APP_DATA.tradeOffers,
                requests: APP_DATA.requests,
                news: APP_DATA.news,
                conversations: APP_DATA.conversations,
                messages: APP_DATA.messages,
                notifications: APP_DATA.notifications,
                activityLog: APP_DATA.activityLog,
                settings: APP_DATA.settings,
                currentUserId: APP_DATA.currentUser?.id || null,
                roles: APP_DATA.roles,
                pixTransactions: APP_DATA.pixTransactions,
                maps: APP_DATA.maps,
                itemTemplates: APP_DATA.itemTemplates,
                saleOffers: APP_DATA.saleOffers,
                rules: APP_DATA.rules
            };
            localStorage.setItem('mtp_rp_data', JSON.stringify(dataToSave));
        } catch (e) {
            console.error('Error saving data locally:', e);
        }
    },

    // Salvar usuário específico no Firebase
    async saveUser(user) {
        this.save(); // Backup local
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            try {
                await FirebaseDB.updateUser(user.id, user);
            } catch (e) {
                console.error('Error saving user to Firebase:', e);
            }
        }
    },

    // Salvar documento no Firebase
    async saveDocument(collection, doc) {
        this.save(); // Backup local
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            try {
                await FirebaseDB.addDocument(collection, doc);
            } catch (e) {
                console.error('Error saving document to Firebase:', e);
            }
        }
    },

    load() {
        try {
            const saved = localStorage.getItem('mtp_rp_data');
            if (saved) {
                const data = JSON.parse(saved);
                APP_DATA.users = data.users || APP_DATA.users;
                APP_DATA.jobs = data.jobs || APP_DATA.jobs;
                APP_DATA.inventory = data.inventory || APP_DATA.inventory;
                APP_DATA.tradeOffers = data.tradeOffers || APP_DATA.tradeOffers;
                APP_DATA.requests = data.requests || APP_DATA.requests;
                APP_DATA.news = data.news || APP_DATA.news;
                APP_DATA.conversations = data.conversations || APP_DATA.conversations;
                APP_DATA.messages = data.messages || APP_DATA.messages;
                APP_DATA.notifications = data.notifications || APP_DATA.notifications;
                APP_DATA.activityLog = data.activityLog || APP_DATA.activityLog;
                APP_DATA.settings = data.settings || APP_DATA.settings;
                APP_DATA.roles = data.roles || APP_DATA.roles;
                APP_DATA.pixTransactions = data.pixTransactions || APP_DATA.pixTransactions;
                APP_DATA.maps = data.maps || APP_DATA.maps;
                APP_DATA.itemTemplates = data.itemTemplates || APP_DATA.itemTemplates;
                APP_DATA.saleOffers = data.saleOffers || APP_DATA.saleOffers;
                APP_DATA.rules = data.rules || APP_DATA.rules;

                if (data.currentUserId) {
                    APP_DATA.currentUser = APP_DATA.users.find(u => u.id === data.currentUserId) || null;
                }

                // Migração: Remover facções antigas
                const oldFactionIds = ['cdm', 'zevelli', 'coe'];
                const validFactionIds = APP_DATA.factions.map(f => f.id);
                APP_DATA.users.forEach(user => {
                    if (user.faction && (oldFactionIds.includes(user.faction.id) || !validFactionIds.includes(user.faction.id))) {
                        user.faction = null;
                    }
                });
            }

            // GARANTIR QUE O ADMIN PADRÃO SEMPRE EXISTA COM CREDENCIAIS CORRETAS
            const defaultAdmin = {
                id: 'admin001',
                avakinName: 'NeoToquioAdmin',
                email: 'admin@neotoquio.com',
                instagram: '@neotoquiorp',
                friendCode: 'NTQ-0000-0000',
                characterHistory: 'Administrador supremo de Neo Toquio. Responsável pela gestão do servidor e manutenção da ordem.',
                role: 'admin',
                status: 'approved',
                avatar: null,
                password: 'NTQ@2024Adm!',
                faction: null,
                job: null,
                balance: 999999,
                bank: {
                    accountNumber: 'NTQ-0001',
                    creditLimit: 50000,
                    creditUsed: 0,
                    pixKey: 'admin@ntq'
                },
                createdAt: '2024-01-01',
                lastLogin: null,
                isOnline: false,
                lastActivity: null
            };

            // MIGRAÇÃO FORÇADA: Remover admin antigo e criar novo
            // Verificar se existe admin com ID admin001 ou nome antigo 'Admin NTQ'
            const oldAdminIndex = APP_DATA.users.findIndex(u =>
                u.id === 'admin001' ||
                u.avakinName?.toLowerCase() === 'admin ntq' ||
                u.avakinName?.toLowerCase() === 'neotoquioadmin'
            );

            if (oldAdminIndex >= 0) {
                // FORÇAR atualizações das credenciais do admin
                APP_DATA.users[oldAdminIndex].id = 'admin001';
                APP_DATA.users[oldAdminIndex].avakinName = 'NeoToquioAdmin';
                APP_DATA.users[oldAdminIndex].email = 'admin@neotoquio.com';
                APP_DATA.users[oldAdminIndex].password = 'NTQ@2024Adm!';
                APP_DATA.users[oldAdminIndex].role = 'admin';
                APP_DATA.users[oldAdminIndex].status = 'approved';
                APP_DATA.users[oldAdminIndex].instagram = '@neotoquiorp';
                APP_DATA.users[oldAdminIndex].characterHistory = defaultAdmin.characterHistory;
                if (!APP_DATA.users[oldAdminIndex].bank) {
                    APP_DATA.users[oldAdminIndex].bank = defaultAdmin.bank;
                }
                console.log('Admin atualizado com novas credenciais');
            } else {
                // Admin não existe, criar
                APP_DATA.users.unshift(defaultAdmin);
                console.log('Admin criado com novas credenciais');
            }
        } catch (e) {
            console.error('Error loading data:', e);
        }
    },

    // ====== REAL-TIME SYNC ======
    activeListeners: [],

    initRealtimeListeners() {
        if (typeof FirebaseDB === 'undefined' || !FirebaseDB.initialized) return;

        // Limpar anteriores
        this.stopRealtimeListeners();
        console.log('Iniciando listeners em tempo real...');

        // 1. Escutar Usuários (Admin + Online Status)
        const unsubUsers = FirebaseDB.listenToCollection(FirebaseDB.COLLECTIONS.USERS, (users, changes) => {
            users.forEach(remoteUser => {
                const localIdx = APP_DATA.users.findIndex(u => u.id === remoteUser.id);
                if (localIdx >= 0) {
                    // Atualizar existente
                    Object.assign(APP_DATA.users[localIdx], remoteUser);

                    // Se for eu, atualizar currentUser e UI
                    if (APP_DATA.currentUser && APP_DATA.currentUser.id === remoteUser.id) {
                        Object.assign(APP_DATA.currentUser, remoteUser);
                        if (window.Components && window.Components.renderTopbarUser) {
                            window.Components.renderTopbarUser();
                        }
                    }
                } else {
                    // Novo user
                    APP_DATA.users.push(remoteUser);
                    // Notificar Admin
                    if (Auth.isAdmin() && window.Utils) {
                        window.Utils.showToast(`Novo jogador registrado: ${remoteUser.avakinName}`, 'info');
                    }
                }
            });

            // Disparar evento de atualização
            window.dispatchEvent(new CustomEvent('users-updated'));
        });
        this.activeListeners.push(unsubUsers);

        // 2. Escutar Transações (PIX e Saldo)
        const unsubTrans = FirebaseDB.listenToCollection(FirebaseDB.COLLECTIONS.TRANSACTIONS, (transactions, changes) => {
            APP_DATA.pixTransactions = transactions;

            // Notificar recebimento de PIX
            if (changes && APP_DATA.currentUser) {
                changes.forEach(change => {
                    if (change.type === 'added') {
                        const trans = change.doc.data();
                        if (trans.toId === APP_DATA.currentUser.id && trans.fromId !== APP_DATA.currentUser.id) {
                            if (window.Utils) window.Utils.showToast(`Recebeu PIX de ${trans.fromName}: M$ ${trans.amount}`, 'success');
                        }
                    }
                });
            }
            window.dispatchEvent(new CustomEvent('transactions-updated'));
        });
        this.activeListeners.push(unsubTrans);

        // 3. Escutar Mensagens (Chat)
        if (APP_DATA.currentUser) {
            const unsubMsg = FirebaseDB.listenToCollection(FirebaseDB.COLLECTIONS.MESSAGES, (msgs) => {
                // Mesclar mensagens mantendo histórico local se for maior que o recebido
                // Para simplificar: substituir e confiar no servidor para as últimas
                APP_DATA.messages = msgs;
                window.dispatchEvent(new CustomEvent('messages-updated'));
            });
            this.activeListeners.push(unsubMsg);
        }

        // 4. Escutar Feed (Posts)
        const unsubPosts = FirebaseDB.listenToCollection('posts', (posts) => {
            APP_DATA.posts = posts; // Assumindo que criaremos APP_DATA.posts
            window.dispatchEvent(new CustomEvent('posts-updated'));
        });
        this.activeListeners.push(unsubPosts);
    },

    stopRealtimeListeners() {
        this.activeListeners.forEach(unsub => unsub());
        this.activeListeners = [];
    },

    reset() {
        this.stopRealtimeListeners();
        localStorage.removeItem('mtp_rp_data');
        localStorage.removeItem('ntq_current_user');
        location.reload();
    },

    async log(action, details) {
        const logEntry = {
            id: 'log' + Date.now(),
            action,
            details,
            userId: APP_DATA.currentUser?.id,
            userName: APP_DATA.currentUser?.avakinName || 'Sistema',
            timestamp: new Date().toISOString()
        };

        APP_DATA.activityLog.unshift(logEntry);

        if (APP_DATA.activityLog.length > 200) {
            APP_DATA.activityLog = APP_DATA.activityLog.slice(0, 200);
        }

        this.save(); // Backup local

        // Salvar no Firebase
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            try {
                await FirebaseDB.log(action, details);
            } catch (e) {
                console.error('Error logging to Firebase:', e);
            }
        }
    },

    // ====== FEED SOCIAL SYSTEM ======

    async createPost(content) {
        if (!APP_DATA.currentUser) return { success: false, error: 'Você precisa estar logado' };
        if (!content || content.trim().length === 0) return { success: false, error: 'O conteúdo não pode ser vazio' };

        const post = {
            authorId: APP_DATA.currentUser.id,
            authorName: APP_DATA.currentUser.avakinName,
            authorRole: APP_DATA.currentUser.role || 'member',
            authorAvatar: APP_DATA.currentUser.avatar || 'img/default_avatar.png',
            content: content.trim(),
            likes: [],
            comments: [],
            timestamp: new Date().toISOString()
        };

        try {
            await FirebaseDB.addDocument(FirebaseDB.COLLECTIONS.POSTS, post);
            this.log('post_created', `Post criado por ${APP_DATA.currentUser.avakinName}`);
            return { success: true };
        } catch (error) {
            console.error('Error creating post:', error);
            return { success: false, error: 'Erro ao criar post' };
        }
    },

    async toggleLike(postId) {
        if (!APP_DATA.currentUser) return { success: false };
        const userId = APP_DATA.currentUser.id;

        const post = APP_DATA.posts.find(p => p.id === postId);
        if (!post) return { success: false, error: 'Post não encontrado' };

        const isLiked = post.likes && post.likes.includes(userId);

        try {
            // Usando firebase.firestore.FieldValue que está disponível globalmente via compat script
            const update = {};
            if (isLiked) {
                update.likes = firebase.firestore.FieldValue.arrayRemove(userId);
            } else {
                update.likes = firebase.firestore.FieldValue.arrayUnion(userId);
            }

            await FirebaseDB.updateDocument(FirebaseDB.COLLECTIONS.POSTS, postId, update);
            return { success: true };
        } catch (error) {
            console.error('Error toggling like:', error);
            return { success: false };
        }
    },

    async deletePost(postId) {
        if (!APP_DATA.currentUser) return { success: false };

        // Verificar se é autor ou admin
        const post = APP_DATA.posts.find(p => p.id === postId);
        if (!post) return { success: false, error: 'Post não encontrado' };

        if (post.authorId !== APP_DATA.currentUser.id && APP_DATA.currentUser.role !== 'admin' && APP_DATA.currentUser.role !== 'subadmin') {
            return { success: false, error: 'Sem permissão' };
        }

        try {
            await FirebaseDB.deleteDocument(FirebaseDB.COLLECTIONS.POSTS, postId);
            this.log('post_deleted', `Post deletado: ${postId}`);
            return { success: true };
        } catch (error) {
            console.error('Error deleting post:', error);
            return { success: false, error: 'Erro ao deletar post' };
        }
    },

    getPendingRequestsCount() {
        return APP_DATA.requests.filter(r => r.status === 'pending').length;
    },

    getPendingUsersCount() {
        return APP_DATA.users.filter(u => u.status === 'pending').length;
    },

    getFaction(id) {
        return APP_DATA.factions.find(f => f.id === id);
    },

    getJob(id) {
        return APP_DATA.jobs.find(j => j.id === id);
    },

    getUser(id) {
        return APP_DATA.users.find(u => u.id === id);
    },

    // Buscar usuário por chave PIX ou @ do Instagram
    getUserByPixKey(pixKey) {
        return APP_DATA.users.find(u => u.bank?.pixKey === pixKey);
    },

    getUserByInstagram(instagram) {
        const normalizedSearch = instagram.toLowerCase().replace('@', '');
        return APP_DATA.users.find(u =>
            u.instagram && u.instagram.toLowerCase().replace('@', '') === normalizedSearch
        );
    },

    // Buscar usuários aprovados para autocomplete (por @ ou nome)
    searchUsersForPix(query) {
        if (!query || query.length < 1) return [];
        const normalizedQuery = query.toLowerCase().replace('@', '');
        const currentUserId = APP_DATA.currentUser?.id;

        return APP_DATA.users
            .filter(u =>
                u.status === 'approved' &&
                u.id !== currentUserId &&
                u.bank?.pixKey && (
                    (u.instagram && u.instagram.toLowerCase().replace('@', '').includes(normalizedQuery)) ||
                    u.avakinName.toLowerCase().includes(normalizedQuery) ||
                    u.bank.pixKey.toLowerCase().includes(normalizedQuery)
                )
            )
            .slice(0, 10); // Limitar a 10 resultados
    },

    // Obter todos os usuários aprovados com status online
    getApprovedUsersWithStatus() {
        return APP_DATA.users
            .filter(u => u.status === 'approved')
            .map(u => ({
                ...u,
                onlineStatus: Auth.isUserOnline(u.id)
            }));
    },

    getFactionMembers(factionId) {
        return APP_DATA.users.filter(u => u.faction?.id === factionId && u.status === 'approved');
    },

    getJobHolders(jobId) {
        return APP_DATA.users.filter(u => u.job?.id === jobId && u.status === 'approved');
    },

    // Submeter solicitação (facção ou emprego)
    async submitRequest(type, targetId, message) {
        const user = APP_DATA.currentUser;
        if (!user) return { success: false, error: 'Você precisa estar logado' };

        const existingRequest = APP_DATA.requests.find(r =>
            r.userId === user.id &&
            r.targetId === targetId &&
            r.status === 'pending'
        );

        if (existingRequest) {
            return { success: false, error: 'Você já tem uma solicitação pendente' };
        }

        if (type === 'faction' && user.faction) {
            return { success: false, error: 'Você já está em uma facção. Saia primeiro.' };
        }

        if (type === 'job' && user.job) {
            return { success: false, error: 'Você já tem um emprego. Peça demissão primeiro.' };
        }

        const request = {
            id: 'req' + Date.now(),
            type,
            targetId,
            userId: user.id,
            message,
            status: 'pending',
            createdAt: new Date().toISOString(),
            reviewedBy: null,
            reviewedAt: null,
            reviewNote: null
        };

        APP_DATA.requests.push(request);
        this.save();

        // Firebase sync
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            await FirebaseDB.addDocument(FirebaseDB.COLLECTIONS.REQUESTS, request);
        }

        let targetName = '';
        if (type === 'faction') targetName = this.getFaction(targetId)?.name;
        else targetName = this.getJob(targetId)?.title;

        this.log(`Solicitação de ${type}`, targetName);

        return { success: true, message: 'Solicitação enviada! Aguarde análise.' };
    },

    approveRequest(requestId) {
        const request = APP_DATA.requests.find(r => r.id === requestId);
        if (!request) return { success: false, error: 'Solicitação não encontrada' };

        const user = this.getUser(request.userId);
        if (!user) return { success: false, error: 'Usuário não encontrado' };

        request.status = 'approved';
        request.reviewedBy = APP_DATA.currentUser?.id;
        request.reviewedAt = new Date().toISOString();

        if (request.type === 'faction') {
            const faction = this.getFaction(request.targetId);
            user.faction = { id: faction.id, name: faction.name, color: faction.color };
        } else if (request.type === 'job') {
            const job = this.getJob(request.targetId);
            user.job = { id: job.id, title: job.title, department: job.department };
            job.occupied = (job.occupied || 0) + 1;
        }

        this.save();
        this.log('Solicitação aprovada', `${user.avakinName} - ${request.type}`);
        return { success: true };
    },

    rejectRequest(requestId, note = '') {
        const request = APP_DATA.requests.find(r => r.id === requestId);
        if (!request) return { success: false, error: 'Solicitação não encontrada' };

        request.status = 'rejected';
        request.reviewedBy = APP_DATA.currentUser?.id;
        request.reviewedAt = new Date().toISOString();
        request.reviewNote = note;

        const user = this.getUser(request.userId);
        this.save();
        this.log('Solicitação rejeitada', `${user?.avakinName} - ${request.type}`);
        return { success: true };
    },

    async approveUser(userId) {
        const user = this.getUser(userId);
        if (!user) return { success: false, error: 'Usuário não encontrado' };

        user.status = 'approved';
        this.save();

        // Firebase sync
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            await FirebaseDB.updateUser(userId, { status: 'approved' });
        }

        this.log('Cadastro aprovado', user.avakinName);
        return { success: true };
    },

    async rejectUser(userId, reason = '') {
        const user = this.getUser(userId);
        if (!user) return { success: false, error: 'Usuário não encontrado' };

        user.status = 'rejected';
        user.rejectionReason = reason;
        this.save();

        // Firebase sync
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            await FirebaseDB.updateUser(userId, { status: 'rejected', rejectionReason: reason });
        }

        this.log('Cadastro rejeitado', user.avakinName);
        return { success: true };
    },

    removeFromFaction(userId) {
        const user = this.getUser(userId);
        if (user) {
            user.faction = null;
            this.save();
            this.log('Removido da facção', user.avakinName);
        }
    },

    removeFromJob(userId) {
        const user = this.getUser(userId);
        if (user && user.job) {
            const job = this.getJob(user.job.id);
            if (job) job.occupied = Math.max(0, (job.occupied || 0) - 1);
            user.job = null;
            this.save();
            this.log('Removido do emprego', user.avakinName);
        }
    },

    updateUserRole(userId, newRole) {
        const user = this.getUser(userId);
        if (user) {
            user.role = newRole;
            this.save();
            this.log('Cargo alterado', `${user.avakinName} → ${newRole}`);
        }
    },

    // ====== NOTÍCIAS ======
    async addNews(title, content, category = 'Geral') {
        const news = {
            id: 'news' + Date.now(),
            title,
            content,
            author: APP_DATA.currentUser?.avakinName || 'Sistema',
            category,
            createdAt: new Date().toISOString()
        };
        APP_DATA.news.unshift(news);
        this.save();

        // Firebase sync
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            await FirebaseDB.addDocument(FirebaseDB.COLLECTIONS.NEWS, news);
        }

        this.log('Notícia publicada', title);
        return news;
    },

    async deleteNews(newsId) {
        APP_DATA.news = APP_DATA.news.filter(n => n.id !== newsId);
        this.save();

        // Firebase sync
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            await FirebaseDB.deleteDocument(FirebaseDB.COLLECTIONS.NEWS, newsId);
        }
    },

    // ====== SISTEMA DE INVENTÁRIO ======

    async createItem(templateId, isIllegal = false) {
        const user = APP_DATA.currentUser;
        if (!user) return { success: false, error: 'Você precisa estar logado' };

        if (isIllegal && !Auth.canCreateIllegal()) {
            return { success: false, error: 'APENAS membros de facções criminosas podem criar itens ilegais!' };
        }

        const templates = isIllegal ? APP_DATA.itemTemplates.illegal : APP_DATA.itemTemplates.legal;
        const template = templates.find(t => t.id === templateId);

        if (!template) return { success: false, error: 'Item não encontrado' };

        const newItem = {
            id: 'item' + Date.now(),
            templateId: template.id,
            name: template.name,
            icon: template.icon,
            category: template.category,
            price: template.price,
            isIllegal,
            ownerId: user.id,
            ownerName: user.avakinName,
            createdAt: new Date().toISOString(),
            forSale: false,
            salePrice: null
        };

        APP_DATA.inventory.push(newItem);
        this.save();

        // Firebase sync
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            await FirebaseDB.addDocument(FirebaseDB.COLLECTIONS.INVENTORY, newItem);
        }

        this.log('Item criado', `${template.name} (${isIllegal ? 'Ilegal' : 'Legal'})`);

        return { success: true, item: newItem };
    },

    async putForSale(itemId, price) {
        const item = APP_DATA.inventory.find(i => i.id === itemId);
        if (!item) return { success: false, error: 'Item não encontrado' };

        if (item.ownerId !== APP_DATA.currentUser?.id) {
            return { success: false, error: 'Este item não é seu' };
        }

        item.forSale = true;
        item.salePrice = price;
        this.save();

        // Firebase sync
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            await FirebaseDB.updateDocument(FirebaseDB.COLLECTIONS.INVENTORY, itemId, {
                forSale: true,
                salePrice: price
            });
        }

        this.log('Item à venda', `${item.name} por M$ ${price}`);

        return { success: true };
    },

    async cancelSale(itemId) {
        const item = APP_DATA.inventory.find(i => i.id === itemId);
        if (!item) return { success: false, error: 'Item não encontrado' };

        if (item.ownerId !== APP_DATA.currentUser?.id) {
            return { success: false, error: 'Este item não é seu' };
        }

        item.forSale = false;
        item.salePrice = null;
        this.save();

        // Firebase sync
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            await FirebaseDB.updateDocument(FirebaseDB.COLLECTIONS.INVENTORY, itemId, {
                forSale: false,
                salePrice: null
            });
        }

        return { success: true };
    },

    async buyItem(itemId) {
        const buyer = APP_DATA.currentUser;
        if (!buyer) return { success: false, error: 'Você precisa estar logado' };

        const item = APP_DATA.inventory.find(i => i.id === itemId);
        if (!item) return { success: false, error: 'Item não encontrado' };

        if (!item.forSale) return { success: false, error: 'Este item não está à venda' };

        if (item.ownerId === buyer.id) return { success: false, error: 'Item é seu' };

        if (buyer.balance < item.salePrice) {
            return { success: false, error: 'Saldo insuficiente' };
        }

        const seller = this.getUser(item.ownerId);
        buyer.balance -= item.salePrice;
        if (seller) seller.balance += item.salePrice;

        const oldOwner = item.ownerName;
        item.ownerId = buyer.id;
        item.ownerName = buyer.avakinName;
        item.forSale = false;
        item.salePrice = null;

        this.save();

        // Firebase sync
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            // Atualizar item
            await FirebaseDB.updateDocument(FirebaseDB.COLLECTIONS.INVENTORY, itemId, {
                ownerId: buyer.id,
                ownerName: buyer.avakinName,
                forSale: false,
                salePrice: null
            });

            // Atualizar saldos
            await FirebaseDB.updateUser(buyer.id, { balance: buyer.balance });
            if (seller) await FirebaseDB.updateUser(seller.id, { balance: seller.balance });
        }

        this.log('Item vendido', `${item.name}: ${oldOwner} → ${buyer.avakinName}`);

        return { success: true };
    },

    // Propor troca de item
    proposeTradeForItem(itemId, offeredItemId) {
        const user = APP_DATA.currentUser;
        const targetItem = APP_DATA.inventory.find(i => i.id === itemId);
        const offeredItem = APP_DATA.inventory.find(i => i.id === offeredItemId);

        if (!targetItem || !offeredItem) return { success: false, error: 'Item não encontrado' };
        if (offeredItem.ownerId !== user.id) return { success: false, error: 'Você não possui o item oferecido' };
        if (targetItem.ownerId === user.id) return { success: false, error: 'Você não pode trocar consigo mesmo' };

        const trade = {
            id: 'trade' + Date.now(),
            fromUserId: user.id,
            fromUserName: user.avakinName,
            toUserId: targetItem.ownerId,
            toUserName: targetItem.ownerName,
            offeredItemId: offeredItem.id,
            offeredItemName: offeredItem.name,
            requestedItemId: targetItem.id,
            requestedItemName: targetItem.name,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        APP_DATA.tradeOffers.push(trade);
        this.save();
        this.log('Proposta de troca', `${offeredItem.name} ↔ ${targetItem.name}`);

        return { success: true, message: 'Proposta enviada!' };
    },

    acceptTrade(tradeId) {
        const trade = APP_DATA.tradeOffers.find(t => t.id === tradeId);
        if (!trade) return { success: false, error: 'Troca não encontrada' };
        if (trade.toUserId !== APP_DATA.currentUser?.id) return { success: false, error: 'Troca não é para você' };

        const offeredItem = APP_DATA.inventory.find(i => i.id === trade.offeredItemId);
        const requestedItem = APP_DATA.inventory.find(i => i.id === trade.requestedItemId);

        if (!offeredItem || !requestedItem) {
            trade.status = 'cancelled';
            this.save();
            return { success: false, error: 'Um dos itens não existe mais' };
        }

        // Trocar donos
        offeredItem.ownerId = trade.toUserId;
        offeredItem.ownerName = trade.toUserName;
        requestedItem.ownerId = trade.fromUserId;
        requestedItem.ownerName = trade.fromUserName;

        trade.status = 'accepted';
        this.save();
        this.log('Troca realizada', `${trade.offeredItemName} ↔ ${trade.requestedItemName}`);

        return { success: true };
    },

    rejectTrade(tradeId) {
        const trade = APP_DATA.tradeOffers.find(t => t.id === tradeId);
        if (!trade) return { success: false, error: 'Troca não encontrada' };

        trade.status = 'rejected';
        this.save();
        return { success: true };
    },

    getUserItems(userId) {
        return APP_DATA.inventory.filter(i => i.ownerId === userId);
    },

    getItemsForSale() {
        return APP_DATA.inventory.filter(i => i.forSale && i.ownerId !== APP_DATA.currentUser?.id);
    },

    getPendingTradesForUser(userId) {
        return APP_DATA.tradeOffers.filter(t => t.toUserId === userId && t.status === 'pending');
    },

    // ====== SISTEMA DE VENDA DIRETA (Player para Player) ======

    // Criar oferta de venda direta para um player específico
    async createSaleOffer(itemId, buyerId, price) {
        const seller = APP_DATA.currentUser;
        if (!seller) return { success: false, error: 'Você precisa estar logado' };

        const item = APP_DATA.inventory.find(i => i.id === itemId);
        if (!item) return { success: false, error: 'Item não encontrado' };
        if (item.ownerId !== seller.id) return { success: false, error: 'Este item não é seu' };

        const buyer = this.getUser(buyerId);
        if (!buyer) return { success: false, error: 'Comprador não encontrado' };
        if (buyer.id === seller.id) return { success: false, error: 'Você não pode vender para si mesmo' };

        price = parseFloat(price);
        if (isNaN(price) || price <= 0) return { success: false, error: 'Preço inválido' };

        // Verificar se já existe oferta pendente para este item
        const existingOffer = APP_DATA.saleOffers.find(o =>
            o.itemId === itemId && o.status === 'pending'
        );
        if (existingOffer) return { success: false, error: 'Este item já tem uma oferta pendente' };

        const offer = {
            id: 'sale' + Date.now(),
            itemId: item.id,
            itemName: item.name,
            itemIcon: item.icon,
            itemCategory: item.category,
            isIllegal: item.isIllegal,
            sellerId: seller.id,
            sellerName: seller.avakinName,
            sellerInstagram: seller.instagram,
            buyerId: buyer.id,
            buyerName: buyer.avakinName,
            buyerInstagram: buyer.instagram,
            price: price,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        APP_DATA.saleOffers.push(offer);
        this.save();

        // Firebase sync
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            await FirebaseDB.addDocument(FirebaseDB.COLLECTIONS.SALE_OFFERS, offer);
        }

        this.log('Oferta de venda', `${item.name} para ${buyer.avakinName} por ¥${price}`);

        return { success: true, message: `Oferta enviada para ${buyer.avakinName}!` };
    },

    // Aceitar oferta de venda
    async acceptSaleOffer(offerId) {
        const buyer = APP_DATA.currentUser;
        if (!buyer) return { success: false, error: 'Você precisa estar logado' };

        const offer = APP_DATA.saleOffers.find(o => o.id === offerId);
        if (!offer) return { success: false, error: 'Oferta não encontrada' };
        if (offer.buyerId !== buyer.id) return { success: false, error: 'Esta oferta não é para você' };
        if (offer.status !== 'pending') return { success: false, error: 'Esta oferta não está mais disponível' };

        // Verificar saldo do comprador
        if (buyer.balance < offer.price) {
            return { success: false, error: 'Saldo insuficiente' };
        }

        // Verificar se o item ainda existe e pertence ao vendedor
        const item = APP_DATA.inventory.find(i => i.id === offer.itemId);
        if (!item) {
            offer.status = 'cancelled';
            this.save();
            return { success: false, error: 'Item não existe mais' };
        }
        if (item.ownerId !== offer.sellerId) {
            offer.status = 'cancelled';
            this.save();
            return { success: false, error: 'O vendedor não possui mais este item' };
        }

        const seller = this.getUser(offer.sellerId);

        // Transferir dinheiro
        buyer.balance -= offer.price;
        if (seller) seller.balance += offer.price;

        // Transferir item
        item.ownerId = buyer.id;
        item.ownerName = buyer.avakinName;
        item.forSale = false;
        item.salePrice = null;

        // Atualizar oferta
        offer.status = 'accepted';
        offer.completedAt = new Date().toISOString();

        this.save();

        // Firebase sync
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            // Atualizar oferta
            await FirebaseDB.updateDocument(FirebaseDB.COLLECTIONS.SALE_OFFERS, offerId, {
                status: 'accepted',
                completedAt: offer.completedAt
            });

            // Atualizar item
            await FirebaseDB.updateDocument(FirebaseDB.COLLECTIONS.INVENTORY, item.id, {
                ownerId: buyer.id,
                ownerName: buyer.avakinName,
                forSale: false,
                salePrice: null
            });

            // Atualizar saldos
            await FirebaseDB.updateUser(buyer.id, { balance: buyer.balance });
            if (seller) await FirebaseDB.updateUser(seller.id, { balance: seller.balance });
        }

        this.log('Compra realizada', `${buyer.avakinName} comprou ${item.name} por ¥${offer.price}`);

        return { success: true, message: `Você comprou ${item.name} por ¥${offer.price}!` };
    },

    // Rejeitar oferta de venda
    rejectSaleOffer(offerId) {
        const buyer = APP_DATA.currentUser;
        if (!buyer) return { success: false, error: 'Você precisa estar logado' };

        const offer = APP_DATA.saleOffers.find(o => o.id === offerId);
        if (!offer) return { success: false, error: 'Oferta não encontrada' };
        if (offer.buyerId !== buyer.id) return { success: false, error: 'Esta oferta não é para você' };

        offer.status = 'rejected';
        offer.completedAt = new Date().toISOString();
        this.save();

        return { success: true, message: 'Oferta recusada' };
    },

    // Cancelar oferta (pelo vendedor)
    cancelSaleOffer(offerId) {
        const seller = APP_DATA.currentUser;
        if (!seller) return { success: false, error: 'Você precisa estar logado' };

        const offer = APP_DATA.saleOffers.find(o => o.id === offerId);
        if (!offer) return { success: false, error: 'Oferta não encontrada' };
        if (offer.sellerId !== seller.id) return { success: false, error: 'Esta oferta não é sua' };
        if (offer.status !== 'pending') return { success: false, error: 'Esta oferta não pode ser cancelada' };

        offer.status = 'cancelled';
        offer.completedAt = new Date().toISOString();
        this.save();

        return { success: true, message: 'Oferta cancelada' };
    },

    // Obter ofertas de venda pendentes para o usuário atual (como comprador)
    getPendingSaleOffersForMe() {
        const userId = APP_DATA.currentUser?.id;
        if (!userId) return [];
        return APP_DATA.saleOffers.filter(o => o.buyerId === userId && o.status === 'pending');
    },

    // Obter ofertas de venda que eu criei (como vendedor)
    getMySaleOffers() {
        const userId = APP_DATA.currentUser?.id;
        if (!userId) return [];
        return APP_DATA.saleOffers.filter(o => o.sellerId === userId);
    },

    // ====== CHAT/MENSAGENS ======

    getOrCreateConversation(otherUserId) {
        const myId = APP_DATA.currentUser?.id;
        if (!myId) return null;

        let conv = APP_DATA.conversations.find(c =>
            (c.user1Id === myId && c.user2Id === otherUserId) ||
            (c.user1Id === otherUserId && c.user2Id === myId)
        );

        if (!conv) {
            const otherUser = this.getUser(otherUserId);
            conv = {
                id: 'conv' + Date.now(),
                user1Id: myId,
                user1Name: APP_DATA.currentUser.avakinName,
                user2Id: otherUserId,
                user2Name: otherUser?.avakinName || 'Desconhecido',
                lastMessage: null,
                lastMessageAt: null,
                unreadCount: 0
            };
            APP_DATA.conversations.push(conv);
            this.save();
        }

        return conv;
    },

    sendMessage(conversationId, text) {
        const conv = APP_DATA.conversations.find(c => c.id === conversationId);
        if (!conv) return { success: false, error: 'Conversa não encontrada' };

        const message = {
            id: 'msg' + Date.now(),
            conversationId,
            senderId: APP_DATA.currentUser.id,
            senderName: APP_DATA.currentUser.avakinName,
            text,
            createdAt: new Date().toISOString(),
            read: false
        };

        APP_DATA.messages.push(message);
        conv.lastMessage = text;
        conv.lastMessageAt = message.createdAt;

        // Incrementar unread para o outro usuário
        const otherUserId = conv.user1Id === APP_DATA.currentUser.id ? conv.user2Id : conv.user1Id;
        conv.unreadCount = (conv.unreadCount || 0) + 1;

        this.save();
        return { success: true, message };
    },

    getConversationMessages(conversationId) {
        return APP_DATA.messages.filter(m => m.conversationId === conversationId);
    },

    markConversationAsRead(conversationId) {
        const conv = APP_DATA.conversations.find(c => c.id === conversationId);
        if (conv) {
            conv.unreadCount = 0;
            APP_DATA.messages.forEach(m => {
                if (m.conversationId === conversationId && m.senderId !== APP_DATA.currentUser?.id) {
                    m.read = true;
                }
            });
            this.save();
        }
    },

    getMyConversations() {
        const myId = APP_DATA.currentUser?.id;
        if (!myId) return [];
        return APP_DATA.conversations.filter(c => c.user1Id === myId || c.user2Id === myId);
    },

    getUnreadCount() {
        const myId = APP_DATA.currentUser?.id;
        if (!myId) return 0;
        return APP_DATA.messages.filter(m =>
            m.senderId !== myId && !m.read &&
            APP_DATA.conversations.some(c =>
                c.id === m.conversationId && (c.user1Id === myId || c.user2Id === myId)
            )
        ).length;
    },

    // ====== SISTEMA BANCÁRIO ======

    // Inicializar conta bancária para usuário
    initBankAccount(userId) {
        const user = this.getUser(userId);
        if (!user) return;
        if (!user.bank) {
            user.bank = {
                accountNumber: 'NTQ-' + Math.floor(1000 + Math.random() * 9000),
                creditLimit: 1000,
                creditUsed: 0,
                pixKey: user.avakinName.toLowerCase().replace(/\s/g, '') + '@ntq'
            };
            this.save();
        }
    },

    // Transferência PIX
    async sendPix(toPixKey, amount, description = '') {
        const sender = APP_DATA.currentUser;
        if (!sender) return { success: false, error: 'Você precisa estar logado' };

        amount = parseFloat(amount);
        if (isNaN(amount) || amount <= 0) return { success: false, error: 'Valor inválido' };
        if (sender.balance < amount) return { success: false, error: 'Saldo insuficiente' };

        // Encontrar destinatário pela chave PIX
        const receiver = APP_DATA.users.find(u => u.bank?.pixKey === toPixKey);
        if (!receiver) return { success: false, error: 'Chave PIX não encontrada' };
        if (receiver.id === sender.id) return { success: false, error: 'Não pode enviar para si mesmo' };

        // Efetuar transferência localmente
        sender.balance -= amount;
        receiver.balance += amount;

        // Registrar transação localmente
        const transaction = {
            id: 'pix' + Date.now(),
            type: 'pix',
            fromId: sender.id,
            fromName: sender.avakinName,
            toId: receiver.id,
            toName: receiver.avakinName,
            amount,
            description,
            createdAt: new Date().toISOString()
        };
        APP_DATA.pixTransactions.push(transaction);

        // Salvar localmente
        this.save();

        // Salvar no Firebase
        if (typeof FirebaseDB !== 'undefined' && FirebaseDB.initialized) {
            try {
                // Atualizar saldos
                await FirebaseDB.updateUser(sender.id, { balance: sender.balance });
                await FirebaseDB.updateUser(receiver.id, { balance: receiver.balance });

                // Salvar transação
                await FirebaseDB.addDocument(FirebaseDB.COLLECTIONS.TRANSACTIONS, transaction);
            } catch (e) {
                console.error('Error syncing PIX to Firebase:', e);
            }
        }

        this.log('PIX enviado', `${sender.avakinName} → ${receiver.avakinName}: M$ ${amount}`);

        return { success: true, message: `PIX de M$ ${amount} enviado para ${receiver.avakinName}!` };
    },

    // Obter transações do usuário
    getMyTransactions() {
        const myId = APP_DATA.currentUser?.id;
        if (!myId) return [];
        return APP_DATA.pixTransactions
            .filter(t => t.fromId === myId || t.toId === myId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    // Tentar aumentar limite do cartão (baseado em sorte)
    tryIncreaseCreditLimit() {
        const user = APP_DATA.currentUser;
        if (!user || !user.bank) return { success: false, error: 'Conta bancária não encontrada' };

        const luck = Math.random();
        let increase = 0;
        let message = '';

        if (luck > 0.9) {
            // Super sorte! +5000
            increase = 5000;
            message = '🎉 SUPER SORTE! Seu limite aumentou em M$ 5.000!';
        } else if (luck > 0.7) {
            // Boa sorte! +2000
            increase = 2000;
            message = '✨ Boa sorte! Seu limite aumentou em M$ 2.000!';
        } else if (luck > 0.5) {
            // Sorte média +1000
            increase = 1000;
            message = '👍 Seu limite aumentou em M$ 1.000!';
        } else if (luck > 0.3) {
            // Pouca sorte +500
            increase = 500;
            message = '📈 Seu limite aumentou em M$ 500.';
        } else {
            // Sem sorte
            return { success: false, error: '😔 Sem sorte desta vez! Tente novamente mais tarde.' };
        }

        user.bank.creditLimit += increase;
        this.save();
        this.log('Limite aumentado', `+M$ ${increase} (Novo: M$ ${user.bank.creditLimit})`);

        return { success: true, message, newLimit: user.bank.creditLimit };
    },

    // Usar cartão de crédito
    useCreditCard(amount) {
        const user = APP_DATA.currentUser;
        if (!user || !user.bank) return { success: false, error: 'Conta bancária não encontrada' };

        amount = parseFloat(amount);
        const available = user.bank.creditLimit - user.bank.creditUsed;

        if (amount > available) {
            return { success: false, error: `Limite insuficiente. Disponível: M$ ${available}` };
        }

        user.bank.creditUsed += amount;
        user.balance += amount;
        this.save();

        return { success: true, message: `M$ ${amount} adicionado ao saldo via cartão!` };
    },

    // Pagar fatura do cartão
    payCreditCard(amount) {
        const user = APP_DATA.currentUser;
        if (!user || !user.bank) return { success: false, error: 'Conta bancária não encontrada' };

        amount = parseFloat(amount);
        if (amount > user.balance) return { success: false, error: 'Saldo insuficiente' };
        if (amount > user.bank.creditUsed) amount = user.bank.creditUsed;

        user.balance -= amount;
        user.bank.creditUsed -= amount;
        this.save();

        return { success: true, message: `Fatura paga: M$ ${amount}` };
    },

    // ====== ADMIN - GERENCIAMENTO DE CARGOS ======

    addRole(name, color, permissions = []) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const id = name.toLowerCase().replace(/\s/g, '_') + '_' + Date.now();
        const newRole = { id, name, color, permissions };
        APP_DATA.roles.push(newRole);
        this.save();
        this.log('Cargo criado', name);
        return { success: true, role: newRole };
    },

    updateRole(roleId, updates) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const role = APP_DATA.roles.find(r => r.id === roleId);
        if (!role) return { success: false, error: 'Cargo não encontrado' };
        if (roleId === 'admin') return { success: false, error: 'Não pode editar Admin Principal' };

        Object.assign(role, updates);
        this.save();
        this.log('Cargo editado', role.name);
        return { success: true };
    },

    deleteRole(roleId) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };
        if (['admin', 'subadmin', 'member'].includes(roleId)) {
            return { success: false, error: 'Não pode deletar cargos padrão' };
        }

        // Mover usuários deste cargo para 'member'
        APP_DATA.users.forEach(u => {
            if (u.role === roleId) u.role = 'member';
        });

        APP_DATA.roles = APP_DATA.roles.filter(r => r.id !== roleId);
        this.save();
        this.log('Cargo deletado', roleId);
        return { success: true };
    },

    // ====== ADMIN - GERENCIAMENTO DE FACÇÕES ======

    addFaction(factionData) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const id = factionData.name.toLowerCase().replace(/\s|\./g, '') + '_' + Date.now();
        const newFaction = {
            id,
            name: factionData.name,
            fullName: factionData.fullName,
            type: factionData.type,
            category: factionData.category,
            icon: factionData.icon,
            color: factionData.color,
            description: factionData.description,
            requirements: factionData.requirements,
            maxMembers: parseInt(factionData.maxMembers) || 10,
            isRecruiting: factionData.isRecruiting
        };

        APP_DATA.factions.push(newFaction);
        this.save();
        this.log('Facção criada', newFaction.name);
        return { success: true, faction: newFaction };
    },

    updateFaction(factionId, updates) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const faction = APP_DATA.factions.find(f => f.id === factionId);
        if (!faction) return { success: false, error: 'Facção não encontrada' };

        Object.assign(faction, updates);
        this.save();
        this.log('Facção editada', faction.name);
        return { success: true };
    },

    deleteFaction(factionId) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const faction = APP_DATA.factions.find(f => f.id === factionId);
        if (!faction) return { success: false, error: 'Facção não encontrada' };

        // Remover usuários desta facção
        APP_DATA.users.forEach(u => {
            if (u.faction?.id === factionId) u.faction = null;
        });

        // Remover solicitações pendentes
        APP_DATA.requests = APP_DATA.requests.filter(r =>
            !(r.type === 'faction' && r.targetId === factionId)
        );

        APP_DATA.factions = APP_DATA.factions.filter(f => f.id !== factionId);
        this.save();
        this.log('Facção deletada', faction.name);
        return { success: true };
    },

    // ====== ADMIN - GERENCIAMENTO DE EMPREGOS ======

    addJob(jobData) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const id = jobData.title.toLowerCase().replace(/\s/g, '_') + '_' + Date.now();
        const newJob = {
            id,
            title: jobData.title,
            location: jobData.location,
            icon: jobData.icon,
            color: jobData.color,
            description: jobData.description,
            requirements: jobData.requirements,
            salary: parseInt(jobData.salary) || 500,
            maxPositions: parseInt(jobData.maxPositions) || 5,
            isHiring: jobData.isHiring
        };

        APP_DATA.jobs.push(newJob);
        this.save();
        this.log('Emprego criado', newJob.title);
        return { success: true, job: newJob };
    },

    updateJob(jobId, updates) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const job = APP_DATA.jobs.find(j => j.id === jobId);
        if (!job) return { success: false, error: 'Emprego não encontrado' };

        Object.assign(job, updates);
        this.save();
        this.log('Emprego editado', job.title);
        return { success: true };
    },

    deleteJob(jobId) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const job = APP_DATA.jobs.find(j => j.id === jobId);
        if (!job) return { success: false, error: 'Emprego não encontrado' };

        // Remover usuários deste emprego
        APP_DATA.users.forEach(u => {
            if (u.job?.id === jobId) u.job = null;
        });

        // Remover solicitações pendentes
        APP_DATA.requests = APP_DATA.requests.filter(r =>
            !(r.type === 'job' && r.targetId === jobId)
        );

        APP_DATA.jobs = APP_DATA.jobs.filter(j => j.id !== jobId);
        this.save();
        this.log('Emprego deletado', job.title);
        return { success: true };
    },

    // ====== ADMIN - GERENCIAMENTO DE MAPAS ======

    addMap(mapData) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const id = 'map_' + Date.now();
        const newMap = {
            id,
            name: mapData.name,
            avakinLink: mapData.avakinLink,
            image: mapData.image || null,
            description: mapData.description,
            createdAt: new Date().toISOString()
        };

        APP_DATA.maps.push(newMap);
        this.save();
        this.log('Mapa adicionado', newMap.name);
        return { success: true, map: newMap };
    },

    updateMap(mapId, updates) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const map = APP_DATA.maps.find(m => m.id === mapId);
        if (!map) return { success: false, error: 'Mapa não encontrado' };

        Object.assign(map, updates);
        this.save();
        this.log('Mapa editado', map.name);
        return { success: true };
    },

    deleteMap(mapId) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const map = APP_DATA.maps.find(m => m.id === mapId);
        if (!map) return { success: false, error: 'Mapa não encontrado' };

        APP_DATA.maps = APP_DATA.maps.filter(m => m.id !== mapId);
        this.save();
        this.log('Mapa deletado', map.name);
        return { success: true };
    },

    // ====== ADMIN - GERENCIAMENTO DE USUÁRIOS ======

    deleteUser(userId) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };
        if (userId === APP_DATA.currentUser?.id) return { success: false, error: 'Não pode deletar a si mesmo' };

        const user = this.getUser(userId);
        if (!user) return { success: false, error: 'Usuário não encontrado' };
        if (user.role === 'admin') return { success: false, error: 'Não pode deletar Admin Principal' };

        // Remover itens do usuário
        APP_DATA.inventory = APP_DATA.inventory.filter(i => i.ownerId !== userId);

        // Remover usuário
        APP_DATA.users = APP_DATA.users.filter(u => u.id !== userId);
        this.save();
        this.log('Usuário removido', user.avakinName);
        return { success: true };
    },

    setUserBalance(userId, amount) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const user = this.getUser(userId);
        if (!user) return { success: false, error: 'Usuário não encontrado' };

        user.balance = parseFloat(amount);
        this.save();
        this.log('Saldo alterado', `${user.avakinName}: M$ ${amount}`);
        return { success: true };
    },

    // ====== ADMIN - GERENCIAMENTO DE ITENS ======

    giveItemToUser(userId, templateId, isIllegal) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const user = this.getUser(userId);
        if (!user) return { success: false, error: 'Usuário não encontrado' };

        const templates = isIllegal ? APP_DATA.itemTemplates.illegal : APP_DATA.itemTemplates.legal;
        const template = templates.find(t => t.id === templateId);
        if (!template) return { success: false, error: 'Template não encontrado' };

        const newItem = {
            id: 'item' + Date.now(),
            templateId: template.id,
            name: template.name,
            icon: template.icon,
            category: template.category,
            price: template.price,
            isIllegal,
            ownerId: user.id,
            ownerName: user.avakinName,
            createdAt: new Date().toISOString(),
            forSale: false,
            salePrice: null
        };

        APP_DATA.inventory.push(newItem);
        this.save();
        this.log('Item dado', `${template.name} → ${user.avakinName}`);
        return { success: true, item: newItem };
    },

    removeItem(itemId) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        const item = APP_DATA.inventory.find(i => i.id === itemId);
        if (!item) return { success: false, error: 'Item não encontrado' };

        APP_DATA.inventory = APP_DATA.inventory.filter(i => i.id !== itemId);
        this.save();
        this.log('Item removido', item.name);
        return { success: true };
    },

    // Adicionar template de item
    addItemTemplate(template, isIllegal) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        template.id = template.name.toLowerCase().replace(/\s/g, '_') + '_' + Date.now();

        if (isIllegal) {
            APP_DATA.itemTemplates.illegal.push(template);
        } else {
            APP_DATA.itemTemplates.legal.push(template);
        }

        this.save();
        this.log('Template de item criado', template.name);
        return { success: true, template };
    },

    removeItemTemplate(templateId, isIllegal) {
        if (!Auth.isAdmin()) return { success: false, error: 'Sem permissão' };

        if (isIllegal) {
            APP_DATA.itemTemplates.illegal = APP_DATA.itemTemplates.illegal.filter(t => t.id !== templateId);
        } else {
            APP_DATA.itemTemplates.legal = APP_DATA.itemTemplates.legal.filter(t => t.id !== templateId);
        }

        this.save();
        return { success: true };
    },

    // ====== VERIFICAÇÃO DE PERMISSÕES ======

    hasPermission(permission) {
        const user = APP_DATA.currentUser;
        if (!user) return false;

        const role = APP_DATA.roles.find(r => r.id === user.role);
        if (!role) return false;

        return role.permissions.includes('all') || role.permissions.includes(permission);
    }
};

// Load data on startup
DataManager.load();

// Inicializar conta bancária para usuários existentes
APP_DATA.users.forEach(u => {
    if (!u.bank) {
        DataManager.initBankAccount(u.id);
    }
});

// Se o usuário já está logado, iniciar heartbeat e marcar como online
if (APP_DATA.currentUser) {
    APP_DATA.currentUser.isOnline = true;
    APP_DATA.currentUser.lastActivity = new Date().toISOString();
    const userInArray = APP_DATA.users.find(u => u.id === APP_DATA.currentUser.id);
    if (userInArray) {
        userInArray.isOnline = true;
        userInArray.lastActivity = new Date().toISOString();
    }
    DataManager.save();
    Auth.startOnlineHeartbeat();
}

// Marcar como offline ao fechar a página
window.addEventListener('beforeunload', () => {
    if (APP_DATA.currentUser) {
        const user = APP_DATA.users.find(u => u.id === APP_DATA.currentUser.id);
        if (user) {
            user.isOnline = false;
            user.lastActivity = new Date().toISOString();
            DataManager.save();
        }
    }
});

// Export
window.APP_DATA = APP_DATA;
window.Auth = Auth;
window.DataManager = DataManager;
