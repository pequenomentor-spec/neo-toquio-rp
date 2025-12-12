// ============================================
// NEO TOQUIO RP - Pages
// ============================================

const Pages = {
    // ==========================================
    // PUBLIC PAGES
    // ==========================================

    // Home / Landing Page
    home() {
        const approvedUsers = APP_DATA.users.filter(u => u.status === 'approved').length;
        return `
            <div class="landing-hero">
                <div class="hero-content">
                    <img src="img/logo.png" alt="Neo Toquio RP" class="hero-logo">
                    <h1 class="hero-title">Neo Toquio RP</h1>
                    <p class="hero-subtitle">O maior roleplay de GTA no Avakin Life. Viva sua história em uma cidade cheia de possibilidades.</p>
                    <div class="hero-buttons">
                        <button class="btn btn-primary btn-lg" data-route="register">
                            <i class="fas fa-user-plus"></i> Quero Participar
                        </button>
                        <button class="btn btn-secondary btn-lg" data-route="about">
                            <i class="fas fa-info-circle"></i> Saiba Mais
                        </button>
                    </div>
                </div>
                <div class="hero-stats">
                    <div class="hero-stat">
                        <span class="hero-stat-value">${approvedUsers}</span>
                        <span class="hero-stat-label">Cidadãos</span>
                    </div>
                    <div class="hero-stat">
                        <span class="hero-stat-value">${APP_DATA.factions.length}</span>
                        <span class="hero-stat-label">Facções/Polícias</span>
                    </div>
                    <div class="hero-stat">
                        <span class="hero-stat-value">${APP_DATA.jobs.length}</span>
                        <span class="hero-stat-label">Empregos</span>
                    </div>
                </div>
            </div>

            <section class="landing-section">
                <h2 class="landing-section-title"><i class="fas fa-star"></i> Por que escolher Neo Toquio?</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon"><i class="fas fa-users"></i></div>
                        <h3>Comunidade Ativa</h3>
                        <p>Uma comunidade engajada e eventos frequentes para todos os gostos.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"><i class="fas fa-shield-halved"></i></div>
                        <h3>Facções & Polícias</h3>
                        <p>TDP, NVC, PM ou EB. Escolha seu caminho!</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"><i class="fas fa-briefcase"></i></div>
                        <h3>Empregos</h3>
                        <p>Mecânica, Hospital, Delegacia e muito mais!</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"><i class="fas fa-box-open"></i></div>
                        <h3>Inventário</h3>
                        <p>Sistema de itens e comércio exclusivo!</p>
                    </div>
                </div>
            </section>

            <section class="landing-section">
                <h2 class="landing-section-title"><i class="fas fa-shield-halved"></i> Conheça as Facções</h2>
                <div class="factions-preview-grid">
                    ${APP_DATA.factions.map(f => `
                        <div class="faction-preview" style="border-color:${f.color}">
                            <i class="fas ${f.icon}" style="color:${f.color}"></i>
                            <h4 style="color:${f.color}">${f.name}</h4>
                            <p>${f.fullName}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-secondary" data-route="factions-info">Ver Mais Detalhes</button>
                </div>
            </section>

            <section class="landing-cta">
                <h2>Pronto para começar sua história?</h2>
                <p>Cadastre-se agora e comece a jogar imediatamente!</p>
                <button class="btn btn-primary btn-lg" data-route="register">
                    <i class="fas fa-rocket"></i> Cadastrar Agora
                </button>
            </section>
        `;
    },

    // About Page
    about() {
        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-info-circle"></i> Sobre o RP</h1>
                <p class="page-subtitle">Conheça Neo Toquio</p>
            </div>

            <div class="about-content">
                <div class="card p-6 mb-6">
                    <h3><i class="fas fa-city text-primary"></i> O que é Neo Toquio RP?</h3>
                    <p class="mt-3">
                        Neo Toquio é um servidor de roleplay inspirado no universo Cyberpunk, adaptado para o Avakin Life. 
                        Aqui você pode criar seu personagem, escolher uma profissão, entrar para uma facção e viver 
                        histórias incríveis com outros jogadores.
                    </p>
                </div>

                <div class="card p-6 mb-6">
                    <h3><i class="fas fa-gamepad text-primary"></i> Como funciona?</h3>
                    <div class="steps-list mt-4">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h4>Cadastre-se</h4>
                                <p>Preencha o formulário com seus dados e a história do seu personagem.</p>
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h4>Faça Login</h4>
                                <p>Após se cadastrar, acesse o sistema imediatamente.</p>
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h4>Escolha seu Caminho</h4>
                                <p>Facção ilegal (TDP ou NVC), polícia (PM ou EB), ou um emprego!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card p-6">
                    <h3><i class="fas fa-heart text-primary"></i> Nossas Regras</h3>
                    <p class="mt-3">
                        Temos regras simples mas importantes para manter a qualidade do RP.
                    </p>
                    <button class="btn btn-primary mt-4" data-route="rules">
                        <i class="fas fa-scale-balanced"></i> Ver Regras
                    </button>
                </div>
            </div>
        `;
    },

    // Factions Info (public)
    'factions-info'() {
        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-shield-halved"></i> Facções & Polícias</h1>
                <p class="page-subtitle">Conheça as organizações de Neo Toquio</p>
            </div>

            <div class="factions-grid">
                ${Components.renderFactionInfoCards()}
            </div>

            <div class="card text-center p-6 mt-6">
                <h3>Quer entrar?</h3>
                <p class="text-muted">Cadastre-se primeiro e, após aprovação, você poderá solicitar entrada.</p>
                <button class="btn btn-primary mt-4" data-route="register">
                    <i class="fas fa-user-plus"></i> Cadastrar
                </button>
            </div>
        `;
    },

    // Login Page
    login() {
        return `
            <div class="auth-container">
                <div class="auth-card">
                    <div class="auth-header">
                        <img src="img/logo.png" alt="Neo Toquio" class="auth-logo">
                        <h2>Entrar</h2>
                        <p class="text-muted">Acesse sua conta</p>
                    </div>

                    <form id="login-form" class="auth-form">
                        <div class="input-group">
                            <label class="input-label">Nome do Avakin</label>
                            <div class="input-icon">
                                <i class="fas fa-user"></i>
                                <input type="text" class="input" id="login-name" placeholder="Seu nome no Avakin" required>
                            </div>
                        </div>

                        <div class="input-group">
                            <label class="input-label">Senha</label>
                            <div class="input-icon">
                                <i class="fas fa-lock"></i>
                                <input type="password" class="input" id="login-password" placeholder="Sua senha" required>
                            </div>
                        </div>

                        <div id="login-error" class="auth-error" style="display:none"></div>

                        <button type="submit" class="btn btn-primary btn-block">
                            <i class="fas fa-sign-in-alt"></i> Entrar
                        </button>
                    </form>

                    <div class="auth-footer">
                        <p>Não tem conta? <a href="#" data-route="register">Cadastre-se</a></p>
                    </div>
                </div>
            </div>
        `;
    },

    // Register Page
    register() {
        return `
            <div class="auth-container">
                <div class="auth-card auth-card-lg">
                    <div class="auth-header">
                        <img src="img/logo.png" alt="Neo Toquio" class="auth-logo">
                        <h2>Cadastrar</h2>
                        <p class="text-muted">Junte-se a Neo Toquio</p>
                    </div>

                    <form id="register-form" class="auth-form">
                        <div class="form-row">
                            <div class="input-group">
                                <label class="input-label">Nome do Avakin *</label>
                                <div class="input-icon">
                                    <i class="fas fa-user"></i>
                                    <input type="text" class="input" id="reg-avakin-name" placeholder="Seu nome no jogo" required>
                                </div>
                            </div>

                            <div class="input-group">
                                <label class="input-label">@ do Instagram</label>
                                <div class="input-icon">
                                    <i class="fab fa-instagram"></i>
                                    <input type="text" class="input" id="reg-instagram" placeholder="@seuinstagram">
                                </div>
                            </div>
                        </div>

                        <div class="input-group">
                            <label class="input-label">Código de Amigo (Avakin) *</label>
                            <div class="input-icon">
                                <i class="fas fa-user-plus"></i>
                                <input type="text" class="input" id="reg-friend-code" placeholder="Ex: ABC-1234-5678" required>
                            </div>
                            <small class="text-muted">Encontre em: Perfil → Compartilhar → Código de Amigo</small>
                        </div>

                        <div class="input-group">
                            <label class="input-label">História do Personagem *</label>
                            <textarea class="input" id="reg-history" rows="4" placeholder="Conte a história do seu personagem... De onde ele veio? O que ele busca em Neo Toquio? Seja criativo!" required></textarea>
                            <small class="text-muted">Mínimo de 50 caracteres</small>
                        </div>

                        <div class="form-row">
                            <div class="input-group">
                                <label class="input-label">Senha *</label>
                                <div class="input-icon">
                                    <i class="fas fa-lock"></i>
                                    <input type="password" class="input" id="reg-password" placeholder="Crie uma senha" required minlength="4">
                                </div>
                            </div>

                            <div class="input-group">
                                <label class="input-label">Confirmar Senha *</label>
                                <div class="input-icon">
                                    <i class="fas fa-lock"></i>
                                    <input type="password" class="input" id="reg-password-confirm" placeholder="Repita a senha" required>
                                </div>
                            </div>
                        </div>

                        <div id="register-error" class="auth-error" style="display:none"></div>

                        <button type="submit" class="btn btn-primary btn-block">
                            <i class="fas fa-paper-plane"></i> Enviar Cadastro
                        </button>
                    </form>

                    <div class="auth-footer">
                        <p>Já tem conta? <a href="#" data-route="login">Fazer login</a></p>
                    </div>
                </div>
            </div>
        `;
    },

    // Rules Page
    rules() {
        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-scale-balanced"></i> Regras de NeoTóquio</h1>
                <p class="page-subtitle">Leia atentamente antes de participar</p>
            </div>
            
            <div class="rules-container">
                <nav class="rules-nav">
                    <div class="rules-nav-item active" data-section="conduta">
                        <i class="fas fa-shirt"></i> Conduta
                    </div>
                    <div class="rules-nav-item" data-section="zona_safe">
                        <i class="fas fa-shield-halved"></i> Zona Safe
                    </div>
                    <div class="rules-nav-item" data-section="convivencia">
                        <i class="fas fa-heart"></i> Convivência
                    </div>
                    <div class="rules-nav-item" data-section="acao">
                        <i class="fas fa-gamepad"></i> Ação
                    </div>
                    <div class="rules-nav-item" data-section="combate">
                        <i class="fas fa-gun"></i> Combate
                    </div>
                    <div class="rules-nav-item" data-section="moeda">
                        <i class="fas fa-yen-sign"></i> Moeda
                    </div>
                    <div class="rules-nav-item" data-section="vandalismo">
                        <i class="fas fa-fire"></i> Vandalismo
                    </div>
                </nav>
                
                <div class="rules-content">
                    ${Components.renderRules(APP_DATA.rules)}
                </div>
            </div>
        `;
    },

    // ==========================================
    // MEMBER PAGES
    // ==========================================

    // Dashboard (logged in)
    dashboard() {
        const user = Auth.getCurrentUser();
        const myItems = DataManager.getUserItems(user.id);
        const unreadMessages = DataManager.getUnreadCount();

        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-home"></i> Dashboard</h1>
                <p class="page-subtitle">Bem-vindo de volta, ${user.avakinName}!</p>
            </div>

            <div class="dashboard-grid">
                <div class="stat-card">
                    <div class="stat-icon ${user.faction ? 'purple' : 'blue'}">
                        <i class="fas fa-shield-halved"></i>
                    </div>
                    <div class="stat-info">
                        <h4>${user.faction?.name || 'Nenhuma'}</h4>
                        <p>Facção</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon ${user.job ? 'green' : 'blue'}">
                        <i class="fas fa-briefcase"></i>
                    </div>
                    <div class="stat-info">
                        <h4>${user.job?.title || 'Desempregado'}</h4>
                        <p>Emprego</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon green">
                        <i class="fas fa-coins"></i>
                    </div>
                    <div class="stat-info">
                        <h4>¥ ${user.balance.toLocaleString()}</h4>
                        <p>Saldo</p>
                    </div>
                </div>
                <div class="stat-card clickable" data-route="chat">
                    <div class="stat-icon orange">
                        <i class="fas fa-comments"></i>
                    </div>
                    <div class="stat-info">
                        <h4>${unreadMessages}</h4>
                        <p>Mensagens</p>
                    </div>
                </div>
            </div>

            <div class="dashboard-main">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-newspaper"></i> Notícias da Cidade</h3>
                    </div>
                    <div class="news-list">
                        ${APP_DATA.news.length === 0 ?
                '<p class="text-center text-muted p-4">Nenhuma notícia</p>' :
                APP_DATA.news.slice(0, 5).map(n => `
                                <div class="news-item">
                                    <div class="news-header">
                                        <span class="news-category badge badge-blue">${n.category}</span>
                                        <small class="text-muted">${Utils.timeAgo(n.createdAt)}</small>
                                    </div>
                                    ${n.image ? `<img src="${n.image}" class="news-image mb-2 rounded w-full object-cover h-32" alt="${n.title}">` : ''}
                                    <h4 class="news-title">${n.title}</h4>
                                    <p class="news-content text-muted">${n.content}</p>
                                    <small class="text-muted">Por: ${n.author}</small>
                                </div>
                            `).join('')
            }
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-bolt"></i> Ações Rápidas</h3>
                    </div>
                    <div class="quick-actions">
                        <button class="quick-action-btn" data-route="chat">
                            <i class="fas fa-comments"></i>
                            <span>Mensagens</span>
                        </button>
                        ${!user.faction ? `
                            <button class="quick-action-btn" data-route="factions">
                                <i class="fas fa-shield-halved"></i>
                                <span>Facções</span>
                            </button>
                        ` : ''}
                        ${!user.job ? `
                            <button class="quick-action-btn" data-route="jobs">
                                <i class="fas fa-briefcase"></i>
                                <span>Empregos</span>
                            </button>
                        ` : ''}
                        <button class="quick-action-btn" data-route="inventory">
                            <i class="fas fa-box-open"></i>
                            <span>Inventário</span>
                        </button>
                        <button class="quick-action-btn" data-route="citizens">
                            <i class="fas fa-users"></i>
                            <span>Cidadãos</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // Profile Page
    profile() {
        const user = Auth.getCurrentUser();
        const avatarHtml = user.avatar ?
            `<div class="profile-avatar-container">
                <img src="${user.avatar}" alt="${user.avakinName}" class="profile-avatar">
                <button class="btn btn-sm profile-avatar-edit" onclick="Pages.changeProfilePicture()">
                    <i class="fas fa-camera"></i>
                </button>
            </div>` :
            `<div class="profile-avatar-container">
                <div class="profile-avatar-placeholder"><i class="fas fa-user"></i></div>
                <button class="btn btn-sm profile-avatar-edit" onclick="Pages.changeProfilePicture()">
                    <i class="fas fa-camera"></i>
                </button>
            </div>`;

        let factionBadge = '';
        if (user.faction) {
            factionBadge = `<span class="badge badge-lg" style="background:${user.faction.color}20;color:${user.faction.color}">
                <i class="fas fa-shield"></i> ${user.faction.name}
            </span>`;
        } else {
            factionBadge = '<span class="badge badge-secondary badge-lg">Sem Facção</span>';
        }

        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-user"></i> Meu Perfil</h1>
            </div>

            <div class="profile-card">
                <div class="profile-header">
                    ${avatarHtml}
                    <div class="profile-info">
                        <h2 class="profile-name">${user.avakinName}</h2>
                        <p class="text-muted"><i class="fab fa-instagram"></i> ${user.instagram || 'Não informado'}</p>
                        <p class="text-muted"><i class="fas fa-user-plus"></i> ${user.friendCode}</p>
                        <div class="profile-badges">
                            ${factionBadge}
                            ${user.job ? `
                                <span class="badge badge-lg badge-blue">
                                    <i class="fas fa-briefcase"></i> ${user.job.title}
                                </span>
                            ` : '<span class="badge badge-secondary badge-lg">Sem Emprego</span>'}
                        </div>
                    </div>
                </div>
                
                <div class="profile-section">
                    <h3><i class="fas fa-scroll"></i> História do Personagem</h3>
                    <p class="profile-history">${user.characterHistory || 'Nenhuma história cadastrada.'}</p>
                </div>

                <div class="profile-section">
                    <h3><i class="fas fa-info-circle"></i> Informações</h3>
                    <div class="profile-details">
                        <div class="profile-detail">
                            <span class="detail-label">Saldo</span>
                            <span class="detail-value">¥ ${user.balance.toLocaleString()}</span>
                        </div>
                        <div class="profile-detail">
                            <span class="detail-label">Membro desde</span>
                            <span class="detail-value">${Utils.formatDate(user.createdAt)}</span>
                        </div>
                    </div>
                </div>

                <div class="profile-actions">
                    ${user.faction ? `
                        <button class="btn btn-danger" onclick="Pages.leaveFaction()">
                            <i class="fas fa-door-open"></i> Sair da Facção
                        </button>
                    ` : ''}
                    ${user.job ? `
                        <button class="btn btn-warning" onclick="Pages.quitJob()">
                            <i class="fas fa-sign-out-alt"></i> Pedir Demissão
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    },

    // Factions Page (member - can apply)
    factions() {
        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-shield-halved"></i> Facções & Polícias</h1>
                <p class="page-subtitle">Escolha seu lado em Neo Toquio</p>
            </div>

            <div class="factions-grid">
                ${Components.renderFactionCards()}
            </div>
        `;
    },

    // Jobs Page
    jobs() {
        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-briefcase"></i> Empregos</h1>
                <p class="page-subtitle">Encontre trabalho em Neo Toquio</p>
            </div>

            <div class="jobs-list">
                ${Components.renderJobCards(APP_DATA.jobs)}
            </div>
        `;
    },

    // Inventory Page
    inventory() {
        const user = Auth.getCurrentUser();
        const myItems = DataManager.getUserItems(user.id);
        const itemsForSale = DataManager.getItemsForSale();
        const pendingSaleOffers = DataManager.getPendingSaleOffersForMe();
        const mySaleOffers = DataManager.getMySaleOffers().filter(o => o.status === 'pending');

        // Apenas facções CRIMINAIS podem criar itens ilegais
        const userFaction = user.faction ? APP_DATA.factions.find(f => f.id === user.faction.id) : null;
        const canCreateIllegal = userFaction?.category === 'criminal';

        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-box-open"></i> Inventário</h1>
                <p class="page-subtitle">Seus itens e o mercado</p>
            </div>

            ${pendingSaleOffers.length > 0 ? `
                <div class="card mb-4 p-4 sale-offers-card">
                    <h4 class="mb-3"><i class="fas fa-bell text-warning"></i> Ofertas de Compra para Você (${pendingSaleOffers.length})</h4>
                    <div class="sale-offers-list">
                        ${pendingSaleOffers.map(offer => `
                            <div class="sale-offer-item">
                                <div class="sale-offer-info">
                                    <div class="sale-offer-icon ${offer.isIllegal ? 'illegal' : ''}">
                                        <i class="fas ${offer.itemIcon}"></i>
                                    </div>
                                    <div class="sale-offer-details">
                                        <strong>${offer.itemName}</strong>
                                        <small>De: ${offer.sellerName} ${offer.sellerInstagram ? `(${offer.sellerInstagram})` : ''}</small>
                                        <span class="sale-offer-price">¥ ${offer.price.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div class="sale-offer-actions">
                                    <button class="btn btn-success btn-sm" onclick="Pages.acceptSaleOffer('${offer.id}')">
                                        <i class="fas fa-check"></i> Comprar
                                    </button>
                                    <button class="btn btn-danger btn-sm" onclick="Pages.rejectSaleOffer('${offer.id}')">
                                        <i class="fas fa-times"></i> Recusar
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="card mb-4 p-4">
                <div class="flex items-center gap-4">
                    <i class="fas fa-info-circle text-primary" style="font-size:24px"></i>
                    <div>
                        <p class="mb-1"><strong>Regra de Itens Ilegais:</strong></p>
                        ${canCreateIllegal ?
                `<p class="text-success mb-0"><i class="fas fa-check"></i> Você está em uma facção ILEGAL (${userFaction?.name}) e pode criar itens ilegais!</p>` :
                `<p class="text-warning mb-0"><i class="fas fa-lock"></i> APENAS membros de facções ILEGAIS (TDP ou NVC) podem criar itens ilegais.</p>`
            }
                    </div>
                </div>
            </div>

            <div class="tabs mb-4">
                <button class="tab active" data-tab="my-items">Meus Itens (${myItems.length})</button>
                <button class="tab" data-tab="sell">Vender Item</button>
                <button class="tab" data-tab="create">Criar Item</button>
                <button class="tab" data-tab="market">Mercado (${itemsForSale.length})</button>
                ${mySaleOffers.length > 0 ? `<button class="tab" data-tab="my-offers">Minhas Ofertas (${mySaleOffers.length})</button>` : ''}
            </div>

            <div id="tab-content">
                <div id="tab-my-items" class="tab-panel">
                    <div class="inventory-grid">
                        ${myItems.length === 0 ?
                '<p class="text-center text-muted p-4">Você não tem itens</p>' :
                myItems.map(item => `
                                <div class="item-card ${item.isIllegal ? 'illegal' : ''}">
                                    <div class="item-icon">
                                        <i class="fas ${item.icon}"></i>
                                    </div>
                                    <h4 class="item-name">${item.name}</h4>
                                    <p class="item-category">${item.category}</p>
                                    ${item.isIllegal ? '<span class="badge badge-danger">ILEGAL</span>' : ''}
                                    ${item.forSale ?
                        `<span class="badge badge-warning mt-2">À venda: ¥ ${item.salePrice}</span>` :
                        `<button class="btn btn-sm btn-primary mt-2" onclick="Pages.openDirectSell('${item.id}')">
                                            <i class="fas fa-paper-plane"></i> Vender para Player
                                        </button>`
                    }
                                </div>
                            `).join('')
            }
                    </div>
                </div>

                <div id="tab-sell" class="tab-panel" style="display:none">
                    <div class="card p-4">
                        <h4><i class="fas fa-paper-plane text-primary"></i> Vender Item para Player</h4>
                        <p class="text-muted mb-4">Selecione um item, escolha o comprador pelo @ do Instagram e defina o preço.</p>
                        
                        <div class="input-group">
                            <label class="input-label">Selecionar Item</label>
                            <select class="input" id="sell-item-select" onchange="Pages.updateSellItemPreview()">
                                <option value="">-- Escolha um item --</option>
                                ${myItems.filter(i => !i.forSale).map(item => `
                                    <option value="${item.id}" data-icon="${item.icon}" data-name="${item.name}">
                                        ${item.name} ${item.isIllegal ? '(ILEGAL)' : ''}
                                    </option>
                                `).join('')}
                            </select>
                        </div>

                        <div class="input-group">
                            <label class="input-label">Comprador (@instagram ou nome)</label>
                            <div class="autocomplete-container">
                                <input type="text" class="input" id="sell-buyer-search" 
                                       placeholder="Digite @ do Instagram ou nome..." 
                                       oninput="Pages.searchSellBuyer(this.value)"
                                       autocomplete="off">
                                <div id="sell-buyer-autocomplete" class="autocomplete-dropdown"></div>
                            </div>
                            <input type="hidden" id="sell-buyer-id">
                            <div id="sell-buyer-selected" class="selected-user-badge" style="display:none"></div>
                        </div>

                        <div class="input-group">
                            <label class="input-label">Preço (¥)</label>
                            <input type="number" class="input" id="sell-price" min="1" placeholder="Ex: 1000">
                        </div>

                        <button class="btn btn-primary btn-block mt-4" onclick="Pages.submitDirectSell()">
                            <i class="fas fa-paper-plane"></i> Enviar Oferta de Venda
                        </button>
                    </div>
                </div>

                <div id="tab-create" class="tab-panel" style="display:none">
                    <div class="card p-4 ${canCreateIllegal ? '' : 'opacity-50'}">
                        <h4><i class="fas fa-skull text-danger"></i> Fabricar Item Ilegal</h4>
                        ${!canCreateIllegal ? '<p class="text-warning mt-2"><i class="fas fa-lock"></i> Apenas membros de facções CRIMINAIS podem fabricar itens ilegais!</p>' : '<p class="text-success mt-2"><i class="fas fa-check"></i> Você está em uma facção criminal e pode fabricar itens!</p>'}
                        <div class="items-create-grid mt-4">
                            ${APP_DATA.itemTemplates.illegal.map(t => `
                                <button class="item-create-btn illegal ${canCreateIllegal ? '' : 'disabled'}" 
                                    onclick="${canCreateIllegal ? `Pages.createItem('${t.id}', true)` : 'return false'}"
                                    ${canCreateIllegal ? '' : 'disabled'}>
                                    <i class="fas ${t.icon}"></i>
                                    <span>${t.name}</span>
                                    <small>¥ ${t.price}</small>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div id="tab-market" class="tab-panel" style="display:none">
                    <div class="inventory-grid">
                        ${itemsForSale.length === 0 ?
                '<p class="text-center text-muted p-4">Nenhum item à venda</p>' :
                Components.renderInventoryItems(itemsForSale, true)
            }
                    </div>
                </div>

                ${mySaleOffers.length > 0 ? `
                    <div id="tab-my-offers" class="tab-panel" style="display:none">
                        <div class="card p-4">
                            <h4 class="mb-3"><i class="fas fa-list text-primary"></i> Minhas Ofertas de Venda Pendentes</h4>
                            <div class="sale-offers-list">
                                ${mySaleOffers.map(offer => `
                                    <div class="sale-offer-item">
                                        <div class="sale-offer-info">
                                            <div class="sale-offer-icon ${offer.isIllegal ? 'illegal' : ''}">
                                                <i class="fas ${offer.itemIcon}"></i>
                                            </div>
                                            <div class="sale-offer-details">
                                                <strong>${offer.itemName}</strong>
                                                <small>Para: ${offer.buyerName} ${offer.buyerInstagram ? `(${offer.buyerInstagram})` : ''}</small>
                                                <span class="sale-offer-price">¥ ${offer.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div class="sale-offer-actions">
                                            <span class="badge badge-warning">Aguardando</span>
                                            <button class="btn btn-ghost btn-sm text-danger" onclick="Pages.cancelSaleOffer('${offer.id}')">
                                                <i class="fas fa-times"></i> Cancelar
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    },

    // Bank Page
    bank() {
        const user = Auth.getCurrentUser();
        if (!user.bank) DataManager.initBankAccount(user.id);

        const bank = user.bank;
        const creditAvailable = bank.creditLimit - bank.creditUsed;
        const transactions = DataManager.getMyTransactions().slice(0, 10);

        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-building-columns"></i> Banco NTQ</h1>
                <p class="page-subtitle">Gerencie suas finanças</p>
            </div>

            <div class="bank-grid">
                <div class="card bank-card">
                    <div class="bank-card-header">
                        <i class="fas fa-wallet"></i>
                        <span>Conta Corrente</span>
                    </div>
                    <div class="bank-balance">¥ ${user.balance.toLocaleString()}</div>
                    <div class="bank-info">
                        <small>Conta: ${bank.accountNumber}</small>
                        <small>Chave PIX: ${bank.pixKey}</small>
                    </div>
                </div>

                <div class="card bank-card credit">
                    <div class="bank-card-header">
                        <i class="fas fa-credit-card"></i>
                        <span>Cartão de Crédito</span>
                    </div>
                    <div class="credit-info">
                        <div class="credit-row">
                            <span>Limite Total:</span>
                            <strong>¥ ${bank.creditLimit.toLocaleString()}</strong>
                        </div>
                        <div class="credit-row">
                            <span>Usado:</span>
                            <span class="text-warning">¥ ${bank.creditUsed.toLocaleString()}</span>
                        </div>
                        <div class="credit-row">
                            <span>Disponível:</span>
                            <span class="text-success">¥ ${creditAvailable.toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="credit-actions mt-4">
                        <button class="btn btn-success btn-sm" onclick="Pages.tryLuck()">
                            <i class="fas fa-dice"></i> Tentar Sorte (Aumentar Limite)
                        </button>
                    </div>
                </div>
            </div>

            <div class="bank-actions-grid mt-6">
                <div class="card p-4">
                    <h4><i class="fas fa-paper-plane text-primary"></i> Enviar PIX</h4>
                    <div class="input-group mt-3">
                        <label class="input-label">Destinatário (@instagram ou nome)</label>
                        <div class="autocomplete-container">
                            <input type="text" class="input" id="pix-recipient" placeholder="Digite @ do Instagram, nome ou chave PIX..." 
                                   oninput="Pages.searchPixRecipient(this.value)"
                                   autocomplete="off">
                            <div id="pix-autocomplete" class="autocomplete-dropdown"></div>
                        </div>
                        <input type="hidden" id="pix-key">
                        <div id="pix-selected-user" class="selected-user-badge" style="display:none"></div>
                    </div>
                    <div class="input-group">
                        <label class="input-label">Valor (¥)</label>
                        <input type="number" class="input" id="pix-amount" min="1" placeholder="0">
                    </div>
                    <div class="input-group">
                        <label class="input-label">Descrição (opcional)</label>
                        <input type="text" class="input" id="pix-desc" placeholder="Ex: Pagamento">
                    </div>
                    <button class="btn btn-primary btn-block mt-2" onclick="Pages.sendPix()">
                        <i class="fas fa-paper-plane"></i> Enviar PIX
                    </button>
                </div>

                <div class="card p-4">
                    <h4><i class="fas fa-credit-card text-success"></i> Cartão de Crédito</h4>
                    <div class="input-group mt-3">
                        <label class="input-label">Usar crédito (adiciona ao saldo)</label>
                        <input type="number" class="input" id="credit-use-amount" min="1" max="${creditAvailable}" placeholder="0">
                    </div>
                    <button class="btn btn-success btn-block" onclick="Pages.useCreditCard()">
                        <i class="fas fa-plus"></i> Usar Crédito
                    </button>

                    <hr class="my-4">

                    <div class="input-group">
                        <label class="input-label">Pagar fatura (debita do saldo)</label>
                        <input type="number" class="input" id="credit-pay-amount" min="1" max="${user.balance}" placeholder="0">
                    </div>
                    <button class="btn btn-warning btn-block" onclick="Pages.payCreditCard()">
                        <i class="fas fa-money-bill"></i> Pagar Fatura
                    </button>
                </div>
            </div>

            <div class="card mt-6">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-receipt"></i> Extrato (Últimas 10)</h3>
                </div>
                <div class="transactions-list">
                    ${transactions.length === 0 ?
                '<p class="text-center text-muted p-4">Nenhuma transação ainda</p>' :
                transactions.map(t => `
                            <div class="transaction-item ${t.fromId === user.id ? 'sent' : 'received'}">
                                <div class="transaction-icon">
                                    <i class="fas ${t.fromId === user.id ? 'fa-arrow-up' : 'fa-arrow-down'}"></i>
                                </div>
                                <div class="transaction-info">
                                    <strong>${t.fromId === user.id ? 'Enviado para ' + t.toName : 'Recebido de ' + t.fromName}</strong>
                                    ${t.description ? `<small class="text-muted">${t.description}</small>` : ''}
                                </div>
                                <div class="transaction-amount ${t.fromId === user.id ? 'text-danger' : 'text-success'}">
                                    ${t.fromId === user.id ? '-' : '+'}¥ ${t.amount.toLocaleString()}
                                </div>
                                <small class="text-muted">${Utils.timeAgo(t.createdAt)}</small>
                            </div>
                        `).join('')
            }
                </div>
            </div>
        `;
    },

    // Citizens Page
    citizens() {
        const approvedUsers = APP_DATA.users.filter(u => u.status === 'approved' && u.id !== Auth.getCurrentUser()?.id);
        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-users"></i> Cidadãos</h1>
                <p class="page-subtitle">Membros de Neo Toquio</p>
            </div>

            <div class="citizens-grid">
                ${Components.renderCitizenCards(APP_DATA.users)}
            </div>
        `;
    },

    // Maps Page
    maps() {
        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-map"></i> Mapas da Cidade</h1>
                <p class="page-subtitle">Conheça os locais de Neo Toquio</p>
            </div>

            <div class="maps-grid">
                ${APP_DATA.maps.length === 0 ?
                '<p class="text-center text-muted col-span-full">Nenhum mapa cadastrado ainda.</p>' :
                APP_DATA.maps.map(map => `
                        <div class="card map-card">
                            ${map.image ? `<img src="${map.image}" class="map-card-image" alt="${map.name}">` : ''}
                            <div class="card-body">
                                <h3>${map.name}</h3>
                                <p class="text-muted mb-4">${map.description}</p>
                                <a href="${map.avakinLink}" target="_blank" class="btn btn-primary btn-block">
                                    <i class="fas fa-location-dot"></i> Ir para o Avakin
                                </a>
                            </div>
                        </div>
                    `).join('')
            }
            </div>
        `;
    },

    // Chat Page (Instagram Style DMs)
    chat() {
        const conversations = DataManager.getMyConversations();
        const approvedUsers = APP_DATA.users.filter(u => u.status === 'approved' && u.id !== Auth.getCurrentUser()?.id);
        const myId = Auth.getCurrentUser()?.id;

        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-comments"></i> Mensagens</h1>
                <p class="page-subtitle">Converse com outros cidadãos</p>
            </div>

            <div class="chat-container">
                <div class="chat-sidebar">
                    <div class="chat-sidebar-header">
                        <h4>Conversas</h4>
                        <button class="btn btn-sm btn-primary" onclick="Pages.showNewChatModal()">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="chat-list">
                        ${conversations.length === 0 ?
                '<p class="text-center text-muted p-4">Nenhuma conversa ainda</p>' :
                conversations.map(c => {
                    const otherId = c.user1Id === myId ? c.user2Id : c.user1Id;
                    const otherName = c.user1Id === myId ? c.user2Name : c.user1Name;
                    const otherUser = DataManager.getUser(otherId);
                    return `
                                    <div class="chat-item ${c.unreadCount > 0 ? 'unread' : ''}" onclick="Pages.openConversation('${c.id}')">
                                        <div class="chat-item-avatar">
                                            ${otherUser?.avatar ?
                            `<img src="${otherUser.avatar}" alt="${otherName}">` :
                            `<div class="avatar-placeholder"><i class="fas fa-user"></i></div>`
                        }
                                        </div>
                                        <div class="chat-item-info">
                                            <strong>${otherName}</strong>
                                            <p class="text-muted">${c.lastMessage ? Utils.truncate(c.lastMessage, 30) : 'Sem mensagens'}</p>
                                        </div>
                                        ${c.unreadCount > 0 ? `<span class="chat-unread-badge">${c.unreadCount}</span>` : ''}
                                    </div>
                                `;
                }).join('')
            }
                    </div>
                </div>
                <div class="chat-main" id="chat-main">
                    <div class="chat-empty">
                        <i class="fas fa-comments"></i>
                        <p>Selecione uma conversa ou inicie uma nova</p>
                    </div>
                </div>
            </div>
        `;
    },

    // ==========================================
    // ADMIN PAGES
    // ==========================================

    admin() {
        const totalUsers = APP_DATA.users.filter(u => u.status === 'approved').length;
        const pendingUsers = APP_DATA.users.filter(u => u.status === 'pending').length;
        const pendingRequests = APP_DATA.requests.filter(r => r.status === 'pending').length;

        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-gear"></i> Painel Admin</h1>
                <p class="page-subtitle">Controle do sistema</p>
            </div>

            <div class="dashboard-grid">
                <div class="stat-card clickable" data-route="members">
                    <div class="stat-icon blue"><i class="fas fa-users"></i></div>
                    <div class="stat-info">
                        <h4>${totalUsers}</h4>
                        <p>Membros</p>
                    </div>
                </div>
                <div class="stat-card clickable" data-route="requests">
                    <div class="stat-icon orange"><i class="fas fa-user-clock"></i></div>
                    <div class="stat-info">
                        <h4>${pendingUsers}</h4>
                        <p>Cadastros Pendentes</p>
                    </div>
                </div>
                <div class="stat-card clickable" data-route="requests">
                    <div class="stat-icon purple"><i class="fas fa-inbox"></i></div>
                    <div class="stat-info">
                        <h4>${pendingRequests}</h4>
                        <p>Solicitações</p>
                    </div>
                </div>
            </div>

            <div class="admin-grid">
                <div class="admin-card" data-route="requests">
                    <div class="admin-icon"><i class="fas fa-inbox"></i></div>
                    <div class="admin-info">
                        <h4>Solicitações</h4>
                        <p>Aprovar cadastros, facções e empregos</p>
                    </div>
                </div>
                <div class="admin-card" data-route="members">
                    <div class="admin-icon"><i class="fas fa-users-gear"></i></div>
                    <div class="admin-info">
                        <h4>Membros</h4>
                        <p>Gerenciar membros aprovados</p>
                    </div>
                </div>
            </div>

            <div class="card mt-6">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-history"></i> Log de Atividades</h3>
                </div>
                <div class="activity-log">
                    ${APP_DATA.activityLog.slice(0, 15).map(log => `
                        <div class="log-item">
                            <i class="fas fa-circle text-primary" style="font-size:8px"></i>
                            <div class="log-info">
                                <strong>${log.action}</strong>
                                <span>${log.details}</span>
                            </div>
                            <small class="text-muted">${Utils.timeAgo(log.timestamp)}</small>
                        </div>
                    `).join('')}
                    ${APP_DATA.activityLog.length === 0 ? '<p class="text-center text-muted p-4">Nenhuma atividade</p>' : ''}
                </div>
            </div>
        `;
    },

    requests() {
        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-inbox"></i> Solicitações</h1>
                <p class="page-subtitle">Gerencie cadastros e solicitações</p>
            </div>

            <div class="tabs">
                <button class="tab active" data-tab="users">
                    Cadastros 
                    <span class="tab-badge">${DataManager.getPendingUsersCount()}</span>
                </button>
                <button class="tab" data-tab="requests">
                    Facções/Empregos 
                    <span class="tab-badge">${DataManager.getPendingRequestsCount()}</span>
                </button>
            </div>

            <div id="tab-content">
                <div id="tab-users" class="tab-panel active">
                    ${Components.renderPendingUsers()}
                </div>
                <div id="tab-requests" class="tab-panel" style="display:none">
                    ${Components.renderPendingRequests()}
                </div>
            </div>
        `;
    },

    members() {
        const approvedUsers = APP_DATA.users.filter(u => u.status === 'approved');
        const onlineCount = approvedUsers.filter(u => Auth.isUserOnline(u.id)).length;
        const isMainAdmin = Auth.isAdmin();

        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-users-gear"></i> Membros</h1>
                <p class="page-subtitle">Todos os membros aprovados</p>
            </div>

            <div class="stats-row mb-4">
                <div class="mini-stat">
                    <span class="online-indicator online"></span>
                    <span><strong>${onlineCount}</strong> online agora</span>
                </div>
                <div class="mini-stat">
                    <i class="fas fa-users text-primary"></i>
                    <span><strong>${approvedUsers.length}</strong> membros total</span>
                </div>
            </div>

            <div class="members-table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Membro</th>
                            <th>Instagram</th>
                            <th>Facção</th>
                            <th>Emprego</th>
                            ${isMainAdmin ? '<th>Saldo</th>' : ''}
                            <th>Cargo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${approvedUsers.map(user => {
            const isOnline = Auth.isUserOnline(user.id);
            const avatarHtml = user.avatar ?
                `<img src="${user.avatar}" class="avatar-sm">` :
                `<div class="avatar-sm-placeholder"><i class="fas fa-user"></i></div>`;

            let factionDisplay = '-';
            if (user.faction) {
                factionDisplay = `<span class="badge" style="background:${user.faction.color}20;color:${user.faction.color}">${user.faction.name}</span>`;
            }

            const lastActivityText = user.lastLogin
                ? Utils.timeAgo(user.lastLogin)
                : 'Nunca';

            const userBalance = user.balance || 0;

            return `
                                <tr class="${isOnline ? 'user-online' : 'user-offline'}">
                                    <td>
                                        <div class="status-cell" title="${isOnline ? 'Online' : 'Última vez: ' + lastActivityText}">
                                            <span class="online-indicator ${isOnline ? 'online' : 'offline'}"></span>
                                            <small class="text-muted">${isOnline ? 'Online' : lastActivityText}</small>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="member-cell">
                                            ${avatarHtml}
                                            <span>${user.avakinName}</span>
                                        </div>
                                    </td>
                                    <td>${user.instagram || '-'}</td>
                                    <td>${factionDisplay}</td>
                                    <td>${user.job?.title || '-'}</td>
                                    ${isMainAdmin ? `
                                    <td>
                                        <div class="balance-cell">
                                            <span class="balance-amount">¥ ${userBalance.toLocaleString()}</span>
                                            <button class="btn btn-ghost btn-sm text-success" onclick="Pages.editUserBalance('${user.id}', ${userBalance})" title="Editar saldo">
                                                <i class="fas fa-coins"></i>
                                            </button>
                                        </div>
                                    </td>
                                    ` : ''}
                                    <td>
                                        <select class="input input-sm" onchange="Pages.changeRole('${user.id}', this.value)" ${user.role === 'admin' ? 'disabled' : ''}>
                                            <option value="member" ${user.role === 'member' ? 'selected' : ''}>Membro</option>
                                            <option value="subadmin" ${user.role === 'subadmin' ? 'selected' : ''}>Sub-Admin</option>
                                            ${Auth.isAdmin() ? `<option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>` : ''}
                                        </select>
                                    </td>
                                    <td>
                                        <div class="table-actions">
                                            ${user.faction ? `
                                                <button class="btn btn-ghost btn-sm text-warning" onclick="Pages.removeMemberFaction('${user.id}')" title="Remover da facção">
                                                    <i class="fas fa-user-minus"></i>
                                                </button>
                                            ` : ''}
                                            ${user.job ? `
                                                <button class="btn btn-ghost btn-sm text-warning" onclick="Pages.removeMemberJob('${user.id}')" title="Remover do emprego">
                                                    <i class="fas fa-briefcase"></i>
                                                </button>
                                            ` : ''}
                                            ${isMainAdmin && user.role !== 'admin' ? `
                                                <button class="btn btn-ghost btn-sm text-danger" onclick="Pages.deleteUser('${user.id}')" title="Excluir usuário">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            ` : ''}
                                        </div>
                                    </td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },


    notFound() {
        return `
            <div class="not-found">
                <i class="fas fa-city"></i>
                <h1>Página não encontrada</h1>
                <p>Esta área não existe em Neo Toquio</p>
                <button class="btn btn-primary" data-route="${Auth.isLoggedIn() ? 'dashboard' : 'home'}">
                    <i class="fas fa-home"></i> Voltar
                </button>
            </div>
        `;
    },

    // Admin Edit Mode (Admin Principal Only)
    'admin-edit'() {
        if (!Auth.isAdmin()) {
            return '<div class="card p-6 text-center"><p class="text-danger">Acesso restrito ao Admin Principal</p></div>';
        }

        const canPostNews = DataManager.hasPermission('post_news') || Auth.isAdmin();

        return `
            <div class="page-header">
                <h1 class="page-title"><i class="fas fa-sliders"></i> Modo Edição</h1>
                <p class="page-subtitle">Gerenciamento avançado do sistema</p>
            </div>

            <div class="tabs mb-4">
                <button class="tab active" data-tab="roles">Cargos</button>
                <button class="tab" data-tab="factions">Facções</button>
                <button class="tab" data-tab="jobs">Empregos</button>
                <button class="tab" data-tab="items">Itens</button>
                <button class="tab" data-tab="maps">Mapas</button>
                <button class="tab" data-tab="users">Usuários</button>
                <button class="tab" data-tab="news">Notícias</button>
                <button class="tab" data-tab="rules">Regras</button>
            </div>

            <div id="tab-content">
                <!-- Cargos Tab -->
                <div id="tab-roles" class="tab-panel">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-plus"></i> Criar Novo Cargo</h3>
                        </div>
                        <div class="card-body p-4">
                            <div class="form-row">
                                <div class="input-group">
                                    <label class="input-label">Nome do Cargo</label>
                                    <input type="text" class="input" id="new-role-name" placeholder="Ex: Moderador">
                                </div>
                                <div class="input-group">
                                    <label class="input-label">Cor</label>
                                    <input type="color" class="input" id="new-role-color" value="#10b981">
                                </div>
                            </div>
                            <div class="input-group">
                                <label class="input-label">Permissões</label>
                                <div class="checkbox-group">
                                    <label><input type="checkbox" id="perm-approve_requests"> Aprovar Solicitações</label>
                                    <label><input type="checkbox" id="perm-post_news"> Postar Notícias</label>
                                    <label><input type="checkbox" id="perm-manage_members"> Gerenciar Membros</label>
                                </div>
                            </div>
                            <button class="btn btn-success" onclick="Pages.createRole()">
                                <i class="fas fa-plus"></i> Criar Cargo
                            </button>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-list"></i> Cargos Existentes</h3>
                        </div>
                        <div class="roles-list">
                            ${APP_DATA.roles.map(role => `
                                <div class="role-item">
                                    <div class="role-color" style="background:${role.color}"></div>
                                    <div class="role-info">
                                        <strong>${role.name}</strong>
                                        <small class="text-muted">${role.permissions.join(', ') || 'Sem permissões especiais'}</small>
                                    </div>
                                    ${!['admin', 'subadmin', 'member'].includes(role.id) ? `
                                        <button class="btn btn-danger btn-sm" onclick="Pages.deleteRole('${role.id}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    ` : '<span class="badge badge-secondary">Padrão</span>'}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Factions Tab -->
                <div id="tab-factions" class="tab-panel" style="display:none">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-plus"></i> Criar Nova Facção</h3>
                        </div>
                        <div class="card-body p-4">
                            <div class="form-row">
                                <div class="input-group">
                                    <label class="input-label">Sigla</label>
                                    <input type="text" class="input" id="new-faction-name" placeholder="Ex: M.A.F">
                                </div>
                                <div class="input-group">
                                    <label class="input-label">Nome Completo</label>
                                    <input type="text" class="input" id="new-faction-fullname" placeholder="Ex: Máfia Americana">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="input-group">
                                    <label class="input-label">Tipo</label>
                                    <input type="text" class="input" id="new-faction-type" placeholder="Ex: Máfia, Gangue, Cartel...">
                                </div>
                                <div class="input-group">
                                    <label class="input-label">Categoria</label>
                                    <select class="input" id="new-faction-category">
                                        <option value="criminal">Criminal</option>
                                        <option value="policia">Polícia</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="input-group">
                                    <label class="input-label">Ícone (FontAwesome)</label>
                                    <input type="text" class="input" id="new-faction-icon" placeholder="Ex: fa-skull">
                                </div>
                                <div class="input-group">
                                    <label class="input-label">Cor</label>
                                    <input type="color" class="input" id="new-faction-color" value="#ef4444">
                                </div>
                            </div>
                            <div class="input-group">
                                <label class="input-label">Requisitos</label>
                                <input type="text" class="input" id="new-faction-requirements" placeholder="Ex: Nível 5, 10h de jogo">
                            </div>
                            <div class="input-group">
                                <label class="input-label">Descrição</label>
                                <textarea class="input" id="new-faction-desc" rows="2" placeholder="Descrição da facção..."></textarea>
                            </div>
                            <div class="input-group">
                                <label><input type="checkbox" id="new-faction-recruiting" checked> Recrutando</label>
                            </div>
                            <button class="btn btn-success" onclick="Pages.createFaction()">
                                <i class="fas fa-plus"></i> Criar Facção
                            </button>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-shield-halved"></i> Facções Existentes</h3>
                        </div>
                        <div class="factions-admin-list">
                            ${APP_DATA.factions.map(faction => `
                                <div class="faction-admin-row">
                                    <div class="faction-color" style="background:${faction.color}"></div>
                                    <div class="faction-admin-info">
                                        <strong style="color:${faction.color}">${faction.name}</strong>
                                        <span>${faction.fullName}</span>
                                        <span class="badge ${faction.category === 'criminal' ? 'badge-danger' : 'badge-blue'}">${faction.category}</span>
                                    </div>
                                    <div class="faction-admin-actions">
                                        <button class="btn btn-primary btn-sm" onclick="Pages.editFaction('${faction.id}')">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-danger btn-sm" onclick="Pages.deleteFaction('${faction.id}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Jobs Tab -->
                <div id="tab-jobs" class="tab-panel" style="display:none">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-plus"></i> Criar Novo Emprego</h3>
                        </div>
                        <div class="card-body p-4">
                            <div class="form-row">
                                <div class="input-group">
                                    <label class="input-label">Título</label>
                                    <input type="text" class="input" id="new-job-title" placeholder="Ex: Bombeiro">
                                </div>
                                <div class="input-group">
                                    <label class="input-label">Local</label>
                                    <input type="text" class="input" id="new-job-location" placeholder="Ex: Quartel Central">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="input-group">
                                    <label class="input-label">Ícone (FontAwesome)</label>
                                    <input type="text" class="input" id="new-job-icon" placeholder="Ex: fa-fire-extinguisher">
                                </div>
                                <div class="input-group">
                                    <label class="input-label">Cor</label>
                                    <input type="color" class="input" id="new-job-color" value="#f59e0b">
                                </div>
                            </div>
                            <div class="input-group">
                                <label class="input-label">Salário (M$)</label>
                                <input type="number" class="input" id="new-job-salary" value="500">
                            </div>
                            <div class="input-group">
                                <label class="input-label">Requisitos</label>
                                <input type="text" class="input" id="new-job-requirements" placeholder="Ex: Ser responsável">
                            </div>
                            <div class="input-group">
                                <label class="input-label">Descrição</label>
                                <textarea class="input" id="new-job-desc" rows="2" placeholder="Descrição do emprego..."></textarea>
                            </div>
                            <div class="input-group">
                                <label><input type="checkbox" id="new-job-hiring" checked> Contratando</label>
                            </div>
                            <button class="btn btn-success" onclick="Pages.createJob()">
                                <i class="fas fa-plus"></i> Criar Emprego
                            </button>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-briefcase"></i> Empregos Existentes</h3>
                        </div>
                        <div class="jobs-admin-list">
                            ${APP_DATA.jobs.map(job => `
                                <div class="job-admin-row">
                                    <div class="job-color" style="background:${job.color}"></div>
                                    <div class="job-admin-info">
                                        <strong style="color:${job.color}">${job.title}</strong>
                                        <span>${job.location}</span>
                                        <span class="text-muted">M$ ${job.salary}/dia</span>
                                    </div>
                                    <div class="job-admin-actions">
                                        <button class="btn btn-primary btn-sm" onclick="Pages.editJob('${job.id}')">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-danger btn-sm" onclick="Pages.deleteJob('${job.id}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Items Tab -->
                <div id="tab-items" class="tab-panel" style="display:none">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-plus"></i> Criar Template de Item</h3>
                        </div>
                        <div class="card-body p-4">
                            <div class="form-row">
                                <div class="input-group">
                                    <label class="input-label">Nome do Item</label>
                                    <input type="text" class="input" id="new-item-name" placeholder="Ex: Espada">
                                </div>
                                <div class="input-group">
                                    <label class="input-label">Ícone (FontAwesome)</label>
                                    <input type="text" class="input" id="new-item-icon" placeholder="Ex: fa-sword">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="input-group">
                                    <label class="input-label">Categoria</label>
                                    <input type="text" class="input" id="new-item-category" placeholder="Ex: Arma">
                                </div>
                                <div class="input-group">
                                    <label class="input-label">Preço (M$)</label>
                                    <input type="number" class="input" id="new-item-price" placeholder="1000">
                                </div>
                            </div>
                            <div class="input-group">
                                <label><input type="checkbox" id="new-item-illegal"> Item Ilegal</label>
                            </div>
                            <button class="btn btn-success" onclick="Pages.createItemTemplate()">
                                <i class="fas fa-plus"></i> Criar Template
                            </button>
                        </div>
                    </div>

                    <div class="card mb-4">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-gift"></i> Dar Item a Usuário</h3>
                        </div>
                        <div class="card-body p-4">
                            <div class="form-row">
                                <div class="input-group">
                                    <label class="input-label">Usuário</label>
                                    <select class="input" id="give-item-user">
                                        ${APP_DATA.users.filter(u => u.status === 'approved').map(u =>
            `<option value="${u.id}">${u.avakinName}</option>`
        ).join('')}
                                    </select>
                                </div>
                                <div class="input-group">
                                    <label class="input-label">Item</label>
                                    <select class="input" id="give-item-template">
                                        <optgroup label="Legais">
                                            ${APP_DATA.itemTemplates.legal.map(t =>
            `<option value="${t.id}|legal">${t.name}</option>`
        ).join('')}
                                        </optgroup>
                                        <optgroup label="Ilegais">
                                            ${APP_DATA.itemTemplates.illegal.map(t =>
            `<option value="${t.id}|illegal">${t.name}</option>`
        ).join('')}
                                        </optgroup>
                                    </select>
                                </div>
                            </div>
                            <button class="btn btn-primary" onclick="Pages.giveItemToUser()">
                                <i class="fas fa-gift"></i> Dar Item
                            </button>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-box"></i> Itens no Sistema</h3>
                        </div>
                        <div class="items-admin-list">
                            ${APP_DATA.inventory.length === 0 ?
                '<p class="text-center text-muted p-4">Nenhum item no sistema</p>' :
                APP_DATA.inventory.map(item => `
                                    <div class="item-admin-row">
                                        <i class="fas ${item.icon}"></i>
                                        <span>${item.name}</span>
                                        <span class="text-muted">→ ${item.ownerName}</span>
                                        ${item.isIllegal ? '<span class="badge badge-danger">Ilegal</span>' : ''}
                                        <button class="btn btn-danger btn-sm" onclick="Pages.removeItem('${item.id}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                `).join('')
            }
                        </div>
                    </div>
                </div>

                <!-- Maps Tab -->
                <div id="tab-maps" class="tab-panel" style="display:none">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-map"></i> Adicionar Mapa</h3>
                        </div>
                        <div class="card-body p-4">
                            <div class="form-row">
                                <div class="input-group">
                                    <label class="input-label">Nome do Mapa</label>
                                    <input type="text" class="input" id="new-map-name" placeholder="Ex: Centro da Cidade">
                                </div>
                                <div class="input-group">
                                    <label class="input-label">Link do Avakin</label>
                                    <input type="text" class="input" id="new-map-link" placeholder="https://avakin.com/...">
                                </div>
                            </div>
                            <div class="input-group">
                                <label class="input-label">URL da Imagem</label>
                                <input type="text" class="input" id="new-map-image" placeholder="https://exemplo.com/imagem.png">
                            </div>
                            <div class="input-group">
                                <label class="input-label">Descrição</label>
                                <textarea class="input" id="new-map-desc" rows="2" placeholder="Descrição do local..."></textarea>
                            </div>
                            <button class="btn btn-success" onclick="Pages.createMap()">
                                <i class="fas fa-plus"></i> Adicionar Mapa
                            </button>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-list"></i> Mapas Disponíveis</h3>
                        </div>
                        <div class="maps-admin-list">
                            ${APP_DATA.maps.length === 0 ?
                '<p class="text-center text-muted p-4">Nenhum mapa cadastrado</p>' :
                APP_DATA.maps.map(map => `
                                <div class="map-admin-row">
                                    ${map.image ? `<img src="${map.image}" class="map-admin-thumb" alt="${map.name}">` : '<div class="map-admin-thumb-placeholder"><i class="fas fa-map"></i></div>'}
                                    <div class="map-admin-info">
                                        <strong>${map.name}</strong>
                                        <small class="text-muted">${map.description}</small>
                                        <a href="${map.avakinLink}" target="_blank" class="text-xs text-primary">Link Avakin</a>
                                    </div>
                                    <div class="map-admin-actions">
                                        <button class="btn btn-danger btn-sm" onclick="Pages.deleteMap('${map.id}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Users Tab -->
                <div id="tab-users" class="tab-panel" style="display:none">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-users"></i> Gerenciar Usuários</h3>
                        </div>
                        <div class="users-admin-list">
                            ${APP_DATA.users.filter(u => u.role !== 'admin').map(user => `
                                <div class="user-admin-row">
                                    <div class="user-admin-info">
                                        <strong>${user.avakinName}</strong>
                                        <span class="badge" style="background:${APP_DATA.roles.find(r => r.id === user.role)?.color || '#3b82f6'}20;color:${APP_DATA.roles.find(r => r.id === user.role)?.color || '#3b82f6'}">
                                            ${APP_DATA.roles.find(r => r.id === user.role)?.name || 'Membro'}
                                        </span>
                                        <span class="text-muted">¥ ${user.balance.toLocaleString()}</span>
                                    </div>
                                    <div class="user-admin-actions">
                                        <button class="btn btn-warning btn-sm" onclick="Pages.editUserBalance('${user.id}', ${user.balance})">
                                            <i class="fas fa-coins"></i>
                                        </button>
                                        <button class="btn btn-danger btn-sm" onclick="Pages.deleteUser('${user.id}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- News Tab -->
                <div id="tab-news" class="tab-panel" style="display:none">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-newspaper"></i> Publicar Notícia</h3>
                        </div>
                        <div class="card-body p-4">
                            <div class="input-group">
                                <label class="input-label">Título</label>
                                <input type="text" class="input" id="news-title" placeholder="Título da notícia">
                            </div>
                            <div class="input-group">
                                <label class="input-label">URL da Imagem (Opcional)</label>
                                <input type="text" class="input" id="news-image" placeholder="https://...">
                            </div>
                            <div class="input-group">
                                <label class="input-label">Conteúdo</label>
                                <textarea class="input" id="news-content" rows="4" placeholder="Escreva a notícia..."></textarea>
                            </div>
                            <div class="input-group">
                                <label class="input-label">Categoria</label>
                                <select class="input" id="news-category">
                                    <option value="Anúncio">Anúncio</option>
                                    <option value="Evento">Evento</option>
                                    <option value="Crime">Crime</option>
                                    <option value="Política">Política</option>
                                    <option value="Economia">Economia</option>
                                </select>
                            </div>
                            <button class="btn btn-success" onclick="Pages.postNews()">
                                <i class="fas fa-paper-plane"></i> Publicar
                            </button>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-list"></i> Notícias Publicadas</h3>
                        </div>
                        <div class="news-admin-list">
                            ${APP_DATA.news.map(n => `
                                <div class="news-admin-row">
                                    ${n.image ? `<img src="${n.image}" class="news-admin-thumb" alt="News">` : ''}
                                    <div class="news-admin-info">
                                        <strong>${n.title}</strong>
                                        <span class="badge badge-blue">${n.category}</span>
                                        <small class="text-muted">Por ${n.author} - ${Utils.timeAgo(n.createdAt)}</small>
                                    </div>
                                    <button class="btn btn-danger btn-sm" onclick="Pages.deleteNews('${n.id}')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Rules Tab -->
                <div id="tab-rules" class="tab-panel" style="display:none">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-plus"></i> Adicionar Nova Regra</h3>
                        </div>
                        <div class="card-body p-4">
                            <div class="form-row">
                                <div class="input-group">
                                    <label class="input-label">Categoria</label>
                                    <select class="input" id="new-rule-category">
                                        <option value="conduta">Conduta</option>
                                        <option value="zona_safe">Zona Safe</option>
                                        <option value="convivencia">Convivência</option>
                                        <option value="acao">Ação</option>
                                        <option value="combate">Combate</option>
                                        <option value="moeda">Moeda</option>
                                        <option value="vandalismo">Vandalismo</option>
                                    </select>
                                </div>
                            </div>
                            <div class="input-group">
                                <label class="input-label">Texto da Regra</label>
                                <textarea class="input" id="new-rule-text" rows="3" placeholder="Digite o texto da regra..."></textarea>
                            </div>
                            <button class="btn btn-success" onclick="Pages.addRule()">
                                <i class="fas fa-plus"></i> Adicionar Regra
                            </button>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-list"></i> Regras Existentes</h3>
                        </div>
                        <div class="rules-admin-list p-4">
                            ${Object.entries(APP_DATA.rules).map(([category, rules]) => {
                    const categoryNames = {
                        conduta: 'Conduta',
                        zona_safe: 'Zona Safe',
                        convivencia: 'Convivência',
                        acao: 'Ação',
                        combate: 'Combate',
                        moeda: 'Moeda',
                        vandalismo: 'Vandalismo'
                    };
                    return `
                                    <div class="rules-category-section mb-4">
                                        <h4 class="text-primary mb-2"><i class="fas fa-folder"></i> ${categoryNames[category] || category}</h4>
                                        ${rules.map((rule, index) => `
                                            <div class="rule-admin-row">
                                                <div class="rule-admin-text">
                                                    <span class="text-muted">#${index + 1}</span>
                                                    <p>${rule.substring(0, 150)}${rule.length > 150 ? '...' : ''}</p>
                                                </div>
                                                <button class="btn btn-danger btn-sm" onclick="Pages.deleteRule('${category}', ${index})">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        `).join('')}
                                        ${rules.length === 0 ? '<p class="text-muted">Nenhuma regra nesta categoria</p>' : ''}
                                    </div>
                                `;
                }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // ==========================================
    // ACTION FUNCTIONS
    // ==========================================

    applyToFaction(factionId) {
        const faction = DataManager.getFaction(factionId);
        Components.showModal({
            title: `Solicitar - ${faction.name}`,
            content: `
                <p class="mb-4">Você está solicitando entrada na <strong style="color:${faction.color}">${faction.fullName}</strong>.</p>
                <div class="input-group">
                    <label class="input-label">Por que você quer entrar?</label>
                    <textarea class="input" id="apply-message" rows="4" placeholder="Explique sua motivação..."></textarea>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" onclick="Components.closeAllModals()">Cancelar</button>
                <button class="btn btn-primary" onclick="Pages.submitFactionRequest('${factionId}')">
                    <i class="fas fa-paper-plane"></i> Enviar
                </button>
            `
        });
    },

    submitFactionRequest(factionId) {
        const message = document.getElementById('apply-message').value;
        const result = DataManager.submitRequest('faction', factionId, message);

        if (result.success) {
            Utils.showToast(result.message, 'success');
            Components.closeAllModals();
            Router.navigate('factions');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    applyToJob(jobId) {
        const job = DataManager.getJob(jobId);
        Components.showModal({
            title: `Candidatar - ${job.title}`,
            content: `
                <p class="mb-4">Você está se candidatando para <strong>${job.title}</strong> em <strong>${job.department}</strong>.</p>
                <div class="input-group">
                    <label class="input-label">Por que você quer este emprego?</label>
                    <textarea class="input" id="apply-message" rows="4" placeholder="Explique sua motivação..."></textarea>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" onclick="Components.closeAllModals()">Cancelar</button>
                <button class="btn btn-primary" onclick="Pages.submitJobRequest('${jobId}')">
                    <i class="fas fa-paper-plane"></i> Enviar
                </button>
            `
        });
    },

    submitJobRequest(jobId) {
        const message = document.getElementById('apply-message').value;
        const result = DataManager.submitRequest('job', jobId, message);

        if (result.success) {
            Utils.showToast(result.message, 'success');
            Components.closeAllModals();
            Router.navigate('jobs');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    // Profile Picture Function
    changeProfilePicture() {
        Components.showModal({
            title: 'Alterar Foto de Perfil',
            content: `
                <p class="text-muted mb-4">Escolha uma foto da sua galeria ou cole uma URL de imagem.</p>
                
                <div class="profile-upload-tabs">
                    <button class="profile-tab active" onclick="Pages.switchProfileTab('upload')">
                        <i class="fas fa-upload"></i> Enviar Foto
                    </button>
                    <button class="profile-tab" onclick="Pages.switchProfileTab('url')">
                        <i class="fas fa-link"></i> Usar URL
                    </button>
                </div>

                <div id="profile-upload-panel" class="profile-panel">
                    <div class="upload-area" onclick="document.getElementById('profile-file-input').click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Clique para escolher uma foto</p>
                        <small class="text-muted">JPG, PNG ou GIF (máx. 2MB)</small>
                    </div>
                    <input type="file" id="profile-file-input" accept="image/*" style="display:none" onchange="Pages.handleProfileFileSelect(event)">
                </div>

                <div id="profile-url-panel" class="profile-panel" style="display:none">
                    <div class="input-group">
                        <label class="input-label">URL da Imagem</label>
                        <input type="text" class="input" id="profile-picture-url" placeholder="https://exemplo.com/sua-foto.jpg" oninput="Pages.previewProfileUrl()">
                    </div>
                </div>

                <div id="profile-preview" class="mt-4 text-center" style="display:none">
                    <p class="text-muted mb-2">Prévia:</p>
                    <img id="profile-preview-img" src="" alt="Prévia" style="width:120px;height:120px;border-radius:var(--radius-xl);object-fit:cover;border:3px solid var(--primary-500)">
                </div>
                
                <input type="hidden" id="profile-image-data">
            `,
            footer: `
                <button class="btn btn-secondary" onclick="Components.closeAllModals()">Cancelar</button>
                <button class="btn btn-primary" onclick="Pages.saveProfilePicture()">
                    <i class="fas fa-save"></i> Salvar
                </button>
            `
        });
    },

    switchProfileTab(tab) {
        const uploadPanel = document.getElementById('profile-upload-panel');
        const urlPanel = document.getElementById('profile-url-panel');
        const tabs = document.querySelectorAll('.profile-tab');

        tabs.forEach(t => t.classList.remove('active'));

        if (tab === 'upload') {
            uploadPanel.style.display = 'block';
            urlPanel.style.display = 'none';
            tabs[0].classList.add('active');
        } else {
            uploadPanel.style.display = 'none';
            urlPanel.style.display = 'block';
            tabs[1].classList.add('active');
        }

        // Limpar prévia ao trocar de aba
        document.getElementById('profile-preview').style.display = 'none';
        document.getElementById('profile-image-data').value = '';
    },

    handleProfileFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Verificar tipo de arquivo
        if (!file.type.startsWith('image/')) {
            Utils.showToast('Por favor, selecione uma imagem válida', 'error');
            return;
        }

        // Verificar tamanho (máx 2MB)
        if (file.size > 2 * 1024 * 1024) {
            Utils.showToast('A imagem deve ter no máximo 2MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;

            // Mostrar prévia
            const preview = document.getElementById('profile-preview');
            const previewImg = document.getElementById('profile-preview-img');
            previewImg.src = imageData;
            preview.style.display = 'block';

            // Salvar dados da imagem
            document.getElementById('profile-image-data').value = imageData;
        };

        reader.onerror = () => {
            Utils.showToast('Erro ao ler a imagem', 'error');
        };

        reader.readAsDataURL(file);
    },

    previewProfileUrl() {
        const url = document.getElementById('profile-picture-url').value.trim();
        const preview = document.getElementById('profile-preview');
        const previewImg = document.getElementById('profile-preview-img');

        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            previewImg.src = url;
            preview.style.display = 'block';
            document.getElementById('profile-image-data').value = url;
        } else {
            preview.style.display = 'none';
            document.getElementById('profile-image-data').value = '';
        }
    },

    saveProfilePicture() {
        const imageData = document.getElementById('profile-image-data').value;

        if (!imageData) {
            Utils.showToast('Selecione uma foto ou insira uma URL válida', 'error');
            return;
        }

        const user = APP_DATA.users.find(u => u.id === APP_DATA.currentUser.id);
        if (user) {
            user.avatar = imageData;
            APP_DATA.currentUser.avatar = imageData;
            DataManager.save();
            Utils.showToast('Foto de perfil atualizada!', 'success');
            Components.closeAllModals();
            Components.renderUserMiniProfile();
            Components.renderTopbarUser();
            Router.navigate('profile');
        }
    },

    // Inventory Functions
    createItem(templateId, isIllegal) {
        const result = DataManager.createItem(templateId, isIllegal);
        if (result.success) {
            Utils.showToast(`Item "${result.item.name}" criado!`, 'success');
            Router.navigate('inventory');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    sellItem(itemId) {
        Components.showModal({
            title: 'Vender Item',
            content: `
                <div class="input-group">
                    <label class="input-label">Preço de venda (M$)</label>
                    <input type="number" class="input" id="sell-price" min="1" placeholder="Ex: 1000">
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" onclick="Components.closeAllModals()">Cancelar</button>
                <button class="btn btn-success" onclick="Pages.confirmSellItem('${itemId}')">
                    <i class="fas fa-tag"></i> Colocar à Venda
                </button>
            `
        });
    },

    confirmSellItem(itemId) {
        const price = parseInt(document.getElementById('sell-price').value);
        if (!price || price < 1) {
            Utils.showToast('Digite um preço válido', 'error');
            return;
        }

        const result = DataManager.putForSale(itemId, price);
        if (result.success) {
            Utils.showToast('Item colocado à venda!', 'success');
            Components.closeAllModals();
            Router.navigate('inventory');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    buyItem(itemId) {
        Components.confirm('Confirma a compra deste item?', () => {
            const result = DataManager.buyItem(itemId);
            if (result.success) {
                Utils.showToast('Item comprado!', 'success');
                Router.navigate('inventory');
            } else {
                Utils.showToast(result.error, 'error');
            }
        });
    },

    // === VENDA DIRETA PARA PLAYER ===

    // Abrir o modal de venda direta para um item específico
    openDirectSell(itemId) {
        // Ir para a aba de venda e pré-selecionar o item
        const tabBtns = document.querySelectorAll('[data-tab]');
        const panels = document.querySelectorAll('.tab-panel');

        tabBtns.forEach(btn => btn.classList.remove('active'));
        panels.forEach(p => p.style.display = 'none');

        const sellTab = document.querySelector('[data-tab="sell"]');
        if (sellTab) sellTab.classList.add('active');

        const sellPanel = document.getElementById('tab-sell');
        if (sellPanel) sellPanel.style.display = 'block';

        // Pré-selecionar o item
        setTimeout(() => {
            const select = document.getElementById('sell-item-select');
            if (select) select.value = itemId;
        }, 100);
    },

    // Buscar compradores para o autocomplete
    searchSellBuyer(query) {
        const dropdown = document.getElementById('sell-buyer-autocomplete');
        if (!dropdown) return;

        if (!query || query.length < 1) {
            dropdown.style.display = 'none';
            return;
        }

        const users = DataManager.searchUsersForPix(query);

        if (users.length === 0) {
            dropdown.innerHTML = '<div class="autocomplete-item no-results">Nenhum usuário encontrado</div>';
            dropdown.style.display = 'block';
            return;
        }

        dropdown.innerHTML = users.map(u => {
            const isOnline = Auth.isUserOnline(u.id);
            const avatarHtml = u.avatar
                ? `<img src="${u.avatar}" class="autocomplete-avatar">`
                : `<div class="autocomplete-avatar-placeholder"><i class="fas fa-user"></i></div>`;

            return `
                <div class="autocomplete-item" onclick="Pages.selectSellBuyer('${u.id}')">
                    <div class="autocomplete-user-info">
                        ${avatarHtml}
                        <div class="autocomplete-user-details">
                            <span class="autocomplete-name">${u.avakinName}</span>
                            <span class="autocomplete-instagram">${u.instagram || ''}</span>
                        </div>
                    </div>
                    <div class="autocomplete-status">
                        <span class="online-indicator ${isOnline ? 'online' : 'offline'}"></span>
                    </div>
                </div>
            `;
        }).join('');

        dropdown.style.display = 'block';
    },

    // Selecionar comprador
    selectSellBuyer(userId) {
        const user = DataManager.getUser(userId);
        if (!user) return;

        document.getElementById('sell-buyer-id').value = userId;
        document.getElementById('sell-buyer-search').value = '';
        document.getElementById('sell-buyer-autocomplete').style.display = 'none';

        const selectedDiv = document.getElementById('sell-buyer-selected');
        const isOnline = Auth.isUserOnline(userId);
        const avatarHtml = user.avatar
            ? `<img src="${user.avatar}" class="selected-user-avatar">`
            : `<div class="selected-user-avatar-placeholder"><i class="fas fa-user"></i></div>`;

        selectedDiv.innerHTML = `
            ${avatarHtml}
            <div class="selected-user-info">
                <strong>${user.avakinName}</strong>
                <small>${user.instagram || ''}</small>
            </div>
            <span class="online-indicator ${isOnline ? 'online' : 'offline'}"></span>
            <button class="btn btn-ghost btn-sm" onclick="Pages.clearSellBuyer()">
                <i class="fas fa-times"></i>
            </button>
        `;
        selectedDiv.style.display = 'flex';
    },

    clearSellBuyer() {
        document.getElementById('sell-buyer-id').value = '';
        document.getElementById('sell-buyer-search').value = '';
        document.getElementById('sell-buyer-selected').style.display = 'none';
    },

    // Enviar oferta de venda direta
    submitDirectSell() {
        const itemId = document.getElementById('sell-item-select').value;
        const buyerId = document.getElementById('sell-buyer-id').value;
        const price = document.getElementById('sell-price').value;

        if (!itemId) {
            Utils.showToast('Selecione um item', 'error');
            return;
        }
        if (!buyerId) {
            Utils.showToast('Selecione um comprador', 'error');
            return;
        }
        if (!price || parseFloat(price) <= 0) {
            Utils.showToast('Digite um preço válido', 'error');
            return;
        }

        const result = DataManager.createSaleOffer(itemId, buyerId, price);
        if (result.success) {
            Utils.showToast(result.message, 'success');
            Router.navigate('inventory');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    // Aceitar oferta de compra
    acceptSaleOffer(offerId) {
        Components.confirm('Confirma a compra deste item?', () => {
            const result = DataManager.acceptSaleOffer(offerId);
            if (result.success) {
                Utils.showToast(result.message, 'success');
                Router.navigate('inventory');
            } else {
                Utils.showToast(result.error, 'error');
            }
        });
    },

    // Rejeitar oferta de compra
    rejectSaleOffer(offerId) {
        Components.confirm('Recusar esta oferta?', () => {
            const result = DataManager.rejectSaleOffer(offerId);
            if (result.success) {
                Utils.showToast('Oferta recusada', 'info');
                Router.navigate('inventory');
            } else {
                Utils.showToast(result.error, 'error');
            }
        });
    },

    // Cancelar minha oferta de venda
    cancelSaleOffer(offerId) {
        Components.confirm('Cancelar esta oferta?', () => {
            const result = DataManager.cancelSaleOffer(offerId);
            if (result.success) {
                Utils.showToast('Oferta cancelada', 'info');
                Router.navigate('inventory');
            } else {
                Utils.showToast(result.error, 'error');
            }
        });
    },

    // Chat Functions
    showNewChatModal() {
        const users = APP_DATA.users.filter(u => u.status === 'approved' && u.id !== Auth.getCurrentUser()?.id);
        Components.showModal({
            title: 'Nova Conversa',
            content: `
                <div class="input-group">
                    <label class="input-label">Escolha um cidadão</label>
                    <select class="input" id="new-chat-user">
                        <option value="">Selecione...</option>
                        ${users.map(u => `<option value="${u.id}">${u.avakinName}</option>`).join('')}
                    </select>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" onclick="Components.closeAllModals()">Cancelar</button>
                <button class="btn btn-primary" onclick="Pages.startNewChat()">
                    <i class="fas fa-comments"></i> Iniciar Conversa
                </button>
            `
        });
    },

    startNewChat() {
        const userId = document.getElementById('new-chat-user').value;
        if (!userId) {
            Utils.showToast('Selecione um cidadão', 'error');
            return;
        }
        const conv = DataManager.getOrCreateConversation(userId);
        Components.closeAllModals();
        this.openConversation(conv.id);
    },

    openConversation(convId) {
        const conv = APP_DATA.conversations.find(c => c.id === convId);
        if (!conv) return;

        DataManager.markConversationAsRead(convId);
        const messages = DataManager.getConversationMessages(convId);
        const myId = Auth.getCurrentUser()?.id;
        const otherId = conv.user1Id === myId ? conv.user2Id : conv.user1Id;
        const otherName = conv.user1Id === myId ? conv.user2Name : conv.user1Name;
        const otherUser = DataManager.getUser(otherId);

        const chatMain = document.getElementById('chat-main');
        chatMain.innerHTML = `
            <div class="chat-header">
                <div class="chat-header-user">
                    ${otherUser?.avatar ?
                `<img src="${otherUser.avatar}" class="avatar">` :
                `<div class="avatar-placeholder"><i class="fas fa-user"></i></div>`
            }
                    <strong>${otherName}</strong>
                </div>
            </div>
            <div class="chat-messages" id="chat-messages">
                ${messages.length === 0 ?
                '<p class="text-center text-muted p-4">Nenhuma mensagem ainda. Diga olá!</p>' :
                messages.map(m => {
                    let content = `<p>${m.text}</p>`;
                    const imgMatch = m.text.match(/!\[Imagem\]\((.*?)\)/);
                    if (imgMatch) {
                        content = `<img src="${imgMatch[1]}" class="chat-message-image" alt="Imagem Enviada">`;
                    }
                    return `
                        <div class="chat-message ${m.senderId === myId ? 'sent' : 'received'}">
                            ${content}
                            <small>${Utils.timeAgo(m.createdAt)}</small>
                        </div>
                    `;
                }).join('')
            }
            </div>
            <div class="chat-input-area">
                <button class="btn btn-secondary mr-2" onclick="Pages.showChatImageModal('${convId}')">
                    <i class="fas fa-image"></i>
                </button>
                <input type="text" class="input" id="chat-input" placeholder="Digite uma mensagem..." onkeypress="if(event.key==='Enter')Pages.sendMessage('${convId}')">
                <button class="btn btn-primary" onclick="Pages.sendMessage('${convId}')">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;

        const messagesDiv = document.getElementById('chat-messages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    },

    sendMessage(convId) {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;

        DataManager.sendMessage(convId, text);
        input.value = '';
        this.openConversation(convId);
    },

    // Bank Functions
    sendPix() {
        const pixKey = document.getElementById('pix-key').value.trim();
        const amount = document.getElementById('pix-amount').value;
        const desc = document.getElementById('pix-desc').value.trim();

        if (!pixKey || !amount) {
            Utils.showToast('Selecione um destinatário e digite o valor', 'error');
            return;
        }

        const result = DataManager.sendPix(pixKey, amount, desc);
        if (result.success) {
            Utils.showToast(result.message, 'success');
            Router.navigate('bank');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    // Autocomplete para buscar destinatário do PIX
    searchPixRecipient(query) {
        const dropdown = document.getElementById('pix-autocomplete');
        if (!dropdown) return;

        if (!query || query.length < 1) {
            dropdown.style.display = 'none';
            return;
        }

        const users = DataManager.searchUsersForPix(query);

        if (users.length === 0) {
            dropdown.innerHTML = '<div class="autocomplete-item no-results">Nenhum usuário encontrado</div>';
            dropdown.style.display = 'block';
            return;
        }

        dropdown.innerHTML = users.map(u => {
            const isOnline = Auth.isUserOnline(u.id);
            const avatarHtml = u.avatar
                ? `<img src="${u.avatar}" class="autocomplete-avatar">`
                : `<div class="autocomplete-avatar-placeholder"><i class="fas fa-user"></i></div>`;

            return `
                <div class="autocomplete-item" onclick="Pages.selectPixRecipient('${u.id}')">
                    <div class="autocomplete-user-info">
                        ${avatarHtml}
                        <div class="autocomplete-user-details">
                            <span class="autocomplete-name">${u.avakinName}</span>
                            <span class="autocomplete-instagram">${u.instagram || ''}</span>
                        </div>
                    </div>
                    <div class="autocomplete-status">
                        <span class="online-indicator ${isOnline ? 'online' : 'offline'}"></span>
                        <small class="text-muted">${u.bank?.pixKey || ''}</small>
                    </div>
                </div>
            `;
        }).join('');

        dropdown.style.display = 'block';
    },

    selectPixRecipient(userId) {
        const user = DataManager.getUser(userId);
        if (!user || !user.bank?.pixKey) {
            Utils.showToast('Usuário sem conta bancária', 'error');
            return;
        }

        // Preencher o campo hidden com a chave PIX
        document.getElementById('pix-key').value = user.bank.pixKey;
        document.getElementById('pix-recipient').value = '';
        document.getElementById('pix-autocomplete').style.display = 'none';

        // Mostrar o usuário selecionado
        const selectedDiv = document.getElementById('pix-selected-user');
        const isOnline = Auth.isUserOnline(userId);
        const avatarHtml = user.avatar
            ? `<img src="${user.avatar}" class="selected-user-avatar">`
            : `<div class="selected-user-avatar-placeholder"><i class="fas fa-user"></i></div>`;

        selectedDiv.innerHTML = `
            ${avatarHtml}
            <div class="selected-user-info">
                <strong>${user.avakinName}</strong>
                <small>${user.instagram || user.bank.pixKey}</small>
            </div>
            <span class="online-indicator ${isOnline ? 'online' : 'offline'}"></span>
            <button class="btn btn-ghost btn-sm" onclick="Pages.clearPixRecipient()">
                <i class="fas fa-times"></i>
            </button>
        `;
        selectedDiv.style.display = 'flex';
    },

    clearPixRecipient() {
        document.getElementById('pix-key').value = '';
        document.getElementById('pix-recipient').value = '';
        document.getElementById('pix-selected-user').style.display = 'none';
    },

    tryLuck() {
        const result = DataManager.tryIncreaseCreditLimit();
        if (result.success) {
            Utils.showToast(result.message, 'success');
            Router.navigate('bank');
        } else {
            Utils.showToast(result.error, 'warning');
        }
    },

    useCreditCard() {
        const amount = document.getElementById('credit-use-amount').value;
        if (!amount) {
            Utils.showToast('Digite um valor', 'error');
            return;
        }

        const result = DataManager.useCreditCard(amount);
        if (result.success) {
            Utils.showToast(result.message, 'success');
            Router.navigate('bank');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    payCreditCard() {
        const amount = document.getElementById('credit-pay-amount').value;
        if (!amount) {
            Utils.showToast('Digite um valor', 'error');
            return;
        }

        const result = DataManager.payCreditCard(amount);
        if (result.success) {
            Utils.showToast(result.message, 'success');
            Router.navigate('bank');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    // Admin Functions
    approveRequest(requestId) {
        const result = DataManager.approveRequest(requestId);
        if (result.success) {
            Utils.showToast('Aprovado!', 'success');
            Router.navigate('requests');
        }
    },

    rejectRequest(requestId) {
        Components.showModal({
            title: 'Rejeitar',
            content: `
                <div class="input-group">
                    <label class="input-label">Motivo (opcional)</label>
                    <textarea class="input" id="reject-note" rows="3"></textarea>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" onclick="Components.closeAllModals()">Cancelar</button>
                <button class="btn btn-danger" onclick="Pages.confirmRejectRequest('${requestId}')">
                    <i class="fas fa-times"></i> Rejeitar
                </button>
            `
        });
    },

    confirmRejectRequest(requestId) {
        const note = document.getElementById('reject-note').value;
        DataManager.rejectRequest(requestId, note);
        Utils.showToast('Rejeitado', 'success');
        Components.closeAllModals();
        Router.navigate('requests');
    },

    approveUser(userId) {
        DataManager.approveUser(userId);
        Utils.showToast('Cadastro aprovado!', 'success');
        Components.renderNavigation();
        Router.navigate('requests');
    },

    rejectUser(userId) {
        Components.showModal({
            title: 'Rejeitar Cadastro',
            content: `
                <div class="input-group">
                    <label class="input-label">Motivo</label>
                    <textarea class="input" id="reject-reason" rows="3"></textarea>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" onclick="Components.closeAllModals()">Cancelar</button>
                <button class="btn btn-danger" onclick="Pages.confirmRejectUser('${userId}')">
                    <i class="fas fa-times"></i> Rejeitar
                </button>
            `
        });
    },

    confirmRejectUser(userId) {
        const reason = document.getElementById('reject-reason').value;
        DataManager.rejectUser(userId, reason);
        Utils.showToast('Cadastro rejeitado', 'success');
        Components.closeAllModals();
        Router.navigate('requests');
    },

    changeRole(userId, newRole) {
        DataManager.updateUserRole(userId, newRole);
        Utils.showToast('Cargo atualizado!', 'success');
    },

    // Editar saldo de usuário (Admin Principal)
    editUserBalance(userId, currentBalance) {
        const user = DataManager.getUser(userId);
        if (!user) {
            Utils.showToast('Usuário não encontrado', 'error');
            return;
        }

        Components.showModal({
            title: `💰 Editar Saldo - ${user.avakinName}`,
            content: `
                <div class="input-group">
                    <label class="input-label">Saldo Atual</label>
                    <div class="current-balance-display">
                        <span class="balance-current">¥ ${currentBalance.toLocaleString()}</span>
                    </div>
                </div>
                <div class="input-group">
                    <label class="input-label">Novo Saldo (¥)</label>
                    <input type="number" class="input" id="new-balance" value="${currentBalance}" min="0" step="100">
                </div>
                <div class="quick-balance-buttons mt-4">
                    <small class="text-muted d-block mb-2">Adicionar rapidamente:</small>
                    <div class="quick-buttons-row">
                        <button class="btn btn-sm btn-secondary" onclick="document.getElementById('new-balance').value = Number(document.getElementById('new-balance').value) + 1000">+¥1.000</button>
                        <button class="btn btn-sm btn-secondary" onclick="document.getElementById('new-balance').value = Number(document.getElementById('new-balance').value) + 5000">+¥5.000</button>
                        <button class="btn btn-sm btn-secondary" onclick="document.getElementById('new-balance').value = Number(document.getElementById('new-balance').value) + 10000">+¥10.000</button>
                        <button class="btn btn-sm btn-secondary" onclick="document.getElementById('new-balance').value = Number(document.getElementById('new-balance').value) + 50000">+¥50.000</button>
                    </div>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" onclick="Components.closeAllModals()">Cancelar</button>
                <button class="btn btn-success" onclick="Pages.confirmEditBalance('${userId}')">
                    <i class="fas fa-save"></i> Salvar Saldo
                </button>
            `
        });
    },

    confirmEditBalance(userId) {
        const newBalance = document.getElementById('new-balance').value;

        if (!newBalance || isNaN(newBalance) || parseFloat(newBalance) < 0) {
            Utils.showToast('Digite um valor válido', 'error');
            return;
        }

        const result = DataManager.setUserBalance(userId, newBalance);

        if (result.success) {
            Utils.showToast('Saldo atualizado com sucesso!', 'success');
            Components.closeAllModals();
            Router.navigate('members');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    removeMemberFaction(userId) {
        Components.confirm('Remover da facção?', () => {
            DataManager.removeFromFaction(userId);
            Utils.showToast('Removido', 'success');
            Router.navigate('members');
        });
    },

    removeMemberJob(userId) {
        Components.confirm('Remover do emprego?', () => {
            DataManager.removeFromJob(userId);
            Utils.showToast('Removido', 'success');
            Router.navigate('members');
        });
    },

    leaveFaction() {
        Components.confirm('Sair da facção?', () => {
            DataManager.removeFromFaction(Auth.getCurrentUser().id);
            Utils.showToast('Você saiu', 'success');
            Router.navigate('profile');
        });
    },

    quitJob() {
        Components.confirm('Pedir demissão?', () => {
            DataManager.removeFromJob(Auth.getCurrentUser().id);
            Utils.showToast('Demissão aceita', 'success');
            Router.navigate('profile');
        });
    },

    // Admin Edit Mode Functions
    createRole() {
        const name = document.getElementById('new-role-name').value.trim();
        const color = document.getElementById('new-role-color').value;

        if (!name) {
            Utils.showToast('Digite o nome do cargo', 'error');
            return;
        }

        const permissions = [];
        if (document.getElementById('perm-approve_requests').checked) permissions.push('approve_requests');
        if (document.getElementById('perm-post_news').checked) permissions.push('post_news');
        if (document.getElementById('perm-manage_members').checked) permissions.push('manage_members');

        const result = DataManager.addRole(name, color, permissions);
        if (result.success) {
            Utils.showToast('Cargo criado!', 'success');
            Router.navigate('admin-edit');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    deleteRole(roleId) {
        Components.confirm('Deletar este cargo?', () => {
            const result = DataManager.deleteRole(roleId);
            if (result.success) {
                Utils.showToast('Cargo deletado', 'success');
                Router.navigate('admin-edit');
            } else {
                Utils.showToast(result.error, 'error');
            }
        });
    },

    createItemTemplate() {
        const name = document.getElementById('new-item-name').value.trim();
        const icon = document.getElementById('new-item-icon').value.trim();
        const category = document.getElementById('new-item-category').value.trim();
        const price = parseInt(document.getElementById('new-item-price').value);
        const isIllegal = document.getElementById('new-item-illegal').checked;

        if (!name || !icon || !category || !price) {
            Utils.showToast('Preencha todos os campos', 'error');
            return;
        }

        const template = { name, icon, category, price };
        const result = DataManager.addItemTemplate(template, isIllegal);

        if (result.success) {
            Utils.showToast('Template criado!', 'success');
            Router.navigate('admin-edit');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    giveItemToUser() {
        const userId = document.getElementById('give-item-user').value;
        const itemValue = document.getElementById('give-item-template').value;
        const [templateId, type] = itemValue.split('|');
        const isIllegal = type === 'illegal';

        const result = DataManager.giveItemToUser(userId, templateId, isIllegal);
        if (result.success) {
            Utils.showToast('Item dado com sucesso!', 'success');
            Router.navigate('admin-edit');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    removeItem(itemId) {
        Components.confirm('Remover este item?', () => {
            const result = DataManager.removeItem(itemId);
            if (result.success) {
                Utils.showToast('Item removido', 'success');
                Router.navigate('admin-edit');
            } else {
                Utils.showToast(result.error, 'error');
            }
        });
    },

    editUserBalance(userId, currentBalance) {
        Components.showModal({
            title: 'Editar Saldo',
            content: `
                <div class="input-group">
                    <label class="input-label">Novo Saldo (M$)</label>
                    <input type="number" class="input" id="new-balance" value="${currentBalance}">
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" onclick="Components.closeAllModals()">Cancelar</button>
                <button class="btn btn-primary" onclick="Pages.confirmEditBalance('${userId}')">
                    <i class="fas fa-save"></i> Salvar
                </button>
            `
        });
    },

    confirmEditBalance(userId) {
        const newBalance = document.getElementById('new-balance').value;
        const result = DataManager.setUserBalance(userId, newBalance);

        if (result.success) {
            Utils.showToast('Saldo atualizado!', 'success');
            Components.closeAllModals();
            Router.navigate('admin-edit');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    deleteUser(userId) {
        Components.confirm('ATENÇÃO: Isso removerá o usuário permanentemente!', () => {
            const result = DataManager.deleteUser(userId);
            if (result.success) {
                Utils.showToast('Usuário removido', 'success');
                Router.navigate('admin-edit');
            } else {
                Utils.showToast(result.error, 'error');
            }
        });
    },

    postNews() {
        const title = document.getElementById('news-title').value.trim();
        const content = document.getElementById('news-content').value.trim();
        const category = document.getElementById('news-category').value;
        const image = document.getElementById('news-image').value.trim();

        if (!title || !content) {
            Utils.showToast('Preencha título e conteúdo', 'error');
            return;
        }

        const news = {
            id: 'news' + Date.now(),
            title,
            content,
            category,
            image: image || null,
            author: Auth.getCurrentUser().avakinName,
            createdAt: new Date().toISOString()
        };

        APP_DATA.news.unshift(news);
        DataManager.save();
        DataManager.log('Notícia publicada', title);

        Utils.showToast('Notícia publicada!', 'success');
        Router.navigate('admin-edit');
    },

    deleteNews(newsId) {
        Components.confirm('Remover esta notícia?', () => {
            APP_DATA.news = APP_DATA.news.filter(n => n.id !== newsId);
            DataManager.save();
            Utils.showToast('Notícia removida', 'success');
            Router.navigate('admin-edit');
        });
    },

    // Faction Management
    createFaction() {
        const factionData = {
            name: document.getElementById('new-faction-name').value.trim(),
            fullName: document.getElementById('new-faction-fullname').value.trim(),
            type: document.getElementById('new-faction-type').value.trim(),
            category: document.getElementById('new-faction-category').value,
            icon: document.getElementById('new-faction-icon').value.trim(),
            color: document.getElementById('new-faction-color').value,
            maxMembers: document.getElementById('new-faction-max').value,
            requirements: document.getElementById('new-faction-requirements').value.trim(),
            description: document.getElementById('new-faction-desc').value.trim(),
            isRecruiting: document.getElementById('new-faction-recruiting').checked
        };

        if (!factionData.name || !factionData.fullName) {
            Utils.showToast('Preencha sigla e nome completo', 'error');
            return;
        }

        const result = DataManager.addFaction(factionData);
        if (result.success) {
            Utils.showToast('Facção criada!', 'success');
            Router.navigate('admin-edit');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    editFaction(factionId) {
        const faction = APP_DATA.factions.find(f => f.id === factionId);
        if (!faction) return;

        Components.showModal({
            title: `Editar ${faction.name}`,
            content: `
                <div class="form-row">
                    <div class="input-group">
                        <label class="input-label">Sigla</label>
                        <input type="text" class="input" id="edit-faction-name" value="${faction.name}">
                    </div>
                    <div class="input-group">
                        <label class="input-label">Nome Completo</label>
                        <input type="text" class="input" id="edit-faction-fullname" value="${faction.fullName}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-group">
                        <label class="input-label">Tipo</label>
                        <input type="text" class="input" id="edit-faction-type" value="${faction.type}">
                    </div>
                    <div class="input-group">
                        <label class="input-label">Categoria</label>
                        <select class="input" id="edit-faction-category">
                            <option value="criminal" ${faction.category === 'criminal' ? 'selected' : ''}>Criminal</option>
                            <option value="policia" ${faction.category === 'policia' ? 'selected' : ''}>Polícia</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-group">
                        <label class="input-label">Ícone</label>
                        <input type="text" class="input" id="edit-faction-icon" value="${faction.icon}">
                    </div>
                    <div class="input-group">
                        <label class="input-label">Cor</label>
                        <input type="color" class="input" id="edit-faction-color" value="${faction.color}">
                    </div>
                </div>
                <div class="input-group">
                    <label class="input-label">Requisitos</label>
                    <input type="text" class="input" id="edit-faction-requirements" value="${faction.requirements}">
                </div>
                <div class="input-group">
                    <label class="input-label">Descrição</label>
                    <textarea class="input" id="edit-faction-desc" rows="2">${faction.description}</textarea>
                </div>
                <div class="input-group">
                    <label><input type="checkbox" id="edit-faction-recruiting" ${faction.isRecruiting ? 'checked' : ''}> Recrutando</label>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" onclick="Components.closeAllModals()">Cancelar</button>
                <button class="btn btn-primary" onclick="Pages.confirmEditFaction('${factionId}')">
                    <i class="fas fa-save"></i> Salvar
                </button>
            `
        });
    },

    confirmEditFaction(factionId) {
        const updates = {
            name: document.getElementById('edit-faction-name').value.trim(),
            fullName: document.getElementById('edit-faction-fullname').value.trim(),
            type: document.getElementById('edit-faction-type').value.trim(),
            category: document.getElementById('edit-faction-category').value,
            icon: document.getElementById('edit-faction-icon').value.trim(),
            color: document.getElementById('edit-faction-color').value,
            maxMembers: parseInt(document.getElementById('edit-faction-max').value),
            requirements: document.getElementById('edit-faction-requirements').value.trim(),
            description: document.getElementById('edit-faction-desc').value.trim(),
            isRecruiting: document.getElementById('edit-faction-recruiting').checked
        };

        const result = DataManager.updateFaction(factionId, updates);
        if (result.success) {
            Utils.showToast('Facção atualizada!', 'success');
            Components.closeAllModals();
            Router.navigate('admin-edit');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    deleteFaction(factionId) {
        const faction = APP_DATA.factions.find(f => f.id === factionId);
        Components.confirm(`Deletar a facção "${faction?.name}"? Membros serão removidos.`, () => {
            const result = DataManager.deleteFaction(factionId);
            if (result.success) {
                Utils.showToast('Facção deletada', 'success');
                Router.navigate('admin-edit');
            } else {
                Utils.showToast(result.error, 'error');
            }
        });
    },

    // Job Management
    createJob() {
        const jobData = {
            title: document.getElementById('new-job-title').value.trim(),
            location: document.getElementById('new-job-location').value.trim(),
            icon: document.getElementById('new-job-icon').value.trim(),
            color: document.getElementById('new-job-color').value,
            salary: document.getElementById('new-job-salary').value,
            maxPositions: document.getElementById('new-job-max').value,
            requirements: document.getElementById('new-job-requirements').value.trim(),
            description: document.getElementById('new-job-desc').value.trim(),
            isHiring: document.getElementById('new-job-hiring').checked
        };

        if (!jobData.title || !jobData.location) {
            Utils.showToast('Preencha título e local', 'error');
            return;
        }

        const result = DataManager.addJob(jobData);
        if (result.success) {
            Utils.showToast('Emprego criado!', 'success');
            Router.navigate('admin-edit');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    editJob(jobId) {
        const job = APP_DATA.jobs.find(j => j.id === jobId);
        if (!job) return;

        Components.showModal({
            title: `Editar ${job.title}`,
            content: `
                <div class="form-row">
                    <div class="input-group">
                        <label class="input-label">Título</label>
                        <input type="text" class="input" id="edit-job-title" value="${job.title}">
                    </div>
                    <div class="input-group">
                        <label class="input-label">Local</label>
                        <input type="text" class="input" id="edit-job-location" value="${job.location}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-group">
                        <label class="input-label">Ícone</label>
                        <input type="text" class="input" id="edit-job-icon" value="${job.icon}">
                    </div>
                    <div class="input-group">
                        <label class="input-label">Cor</label>
                        <input type="color" class="input" id="edit-job-color" value="${job.color}">
                    </div>
                </div>
                <div class="input-group">
                    <label class="input-label">Salário (M$)</label>
                    <input type="number" class="input" id="edit-job-salary" value="${job.salary}">
                </div>
                <div class="input-group">
                    <label class="input-label">Requisitos</label>
                    <input type="text" class="input" id="edit-job-requirements" value="${job.requirements}">
                </div>
                <div class="input-group">
                    <label class="input-label">Descrição</label>
                    <textarea class="input" id="edit-job-desc" rows="2">${job.description}</textarea>
                </div>
                <div class="input-group">
                    <label><input type="checkbox" id="edit-job-hiring" ${job.isHiring ? 'checked' : ''}> Contratando</label>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" onclick="Components.closeAllModals()">Cancelar</button>
                <button class="btn btn-primary" onclick="Pages.confirmEditJob('${jobId}')">
                    <i class="fas fa-save"></i> Salvar
                </button>
            `
        });
    },

    confirmEditJob(jobId) {
        const updates = {
            title: document.getElementById('edit-job-title').value.trim(),
            location: document.getElementById('edit-job-location').value.trim(),
            icon: document.getElementById('edit-job-icon').value.trim(),
            color: document.getElementById('edit-job-color').value,
            salary: parseInt(document.getElementById('edit-job-salary').value),
            maxPositions: parseInt(document.getElementById('edit-job-max').value),
            requirements: document.getElementById('edit-job-requirements').value.trim(),
            description: document.getElementById('edit-job-desc').value.trim(),
            isHiring: document.getElementById('edit-job-hiring').checked
        };

        const result = DataManager.updateJob(jobId, updates);
        if (result.success) {
            Utils.showToast('Emprego atualizado!', 'success');
            Components.closeAllModals();
            Router.navigate('admin-edit');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    deleteJob(jobId) {
        const job = APP_DATA.jobs.find(j => j.id === jobId);
        Components.confirm(`Deletar o emprego "${job?.title}"? Funcionários serão demitidos.`, () => {
            const result = DataManager.deleteJob(jobId);
            if (result.success) {
                Utils.showToast('Emprego deletado', 'success');
                Router.navigate('admin-edit');
            } else {
                Utils.showToast(result.error, 'error');
            }
        });
    },

    // Map Management
    createMap() {
        const mapData = {
            name: document.getElementById('new-map-name').value.trim(),
            avakinLink: document.getElementById('new-map-link').value.trim(),
            image: document.getElementById('new-map-image').value.trim(),
            description: document.getElementById('new-map-desc').value.trim()
        };

        if (!mapData.name || !mapData.avakinLink) {
            Utils.showToast('Preencha nome e link do Avakin', 'error');
            return;
        }

        const result = DataManager.addMap(mapData);
        if (result.success) {
            Utils.showToast('Mapa adicionado!', 'success');
            Router.navigate('admin-edit');
        } else {
            Utils.showToast(result.error, 'error');
        }
    },

    deleteMap(mapId) {
        Components.confirm('Remover este mapa?', () => {
            const result = DataManager.deleteMap(mapId);
            if (result.success) {
                Utils.showToast('Mapa removido', 'success');
                Router.navigate('admin-edit');
            } else {
                Utils.showToast(result.error, 'error');
            }
        });
    },

    // Rules Management
    addRule() {
        const category = document.getElementById('new-rule-category').value;
        const text = document.getElementById('new-rule-text').value.trim();

        if (!text) {
            Utils.showToast('Digite o texto da regra', 'error');
            return;
        }

        if (!APP_DATA.rules[category]) {
            APP_DATA.rules[category] = [];
        }

        APP_DATA.rules[category].push(text);
        DataManager.save();
        Utils.showToast('Regra adicionada!', 'success');
        Router.navigate('admin-edit');
    },

    deleteRule(category, index) {
        Components.confirm('Remover esta regra?', () => {
            if (APP_DATA.rules[category] && APP_DATA.rules[category][index] !== undefined) {
                APP_DATA.rules[category].splice(index, 1);
                DataManager.save();
                Utils.showToast('Regra removida', 'success');
                Router.navigate('admin-edit');
            } else {
                Utils.showToast('Regra não encontrada', 'error');
            }
        });
    },

    // Chat Image Functions
    showChatImageModal(convId) {
        Components.showModal({
            title: 'Enviar Imagem',
            content: `
                <div class="input-group">
                    <label class="input-label">URL da Imagem</label>
                    <input type="text" class="input" id="chat-image-url" placeholder="https://...">
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" onclick="Components.closeAllModals()">Cancelar</button>
                <button class="btn btn-primary" onclick="Pages.sendChatImage('${convId}')">
                    <i class="fas fa-paper-plane"></i> Enviar
                </button>
            `
        });
    },

    sendChatImage(convId) {
        const imageUrl = document.getElementById('chat-image-url').value.trim();
        if (!imageUrl) {
            Utils.showToast('Insira a URL da imagem', 'error');
            return;
        }

        // Using markdown syntax for image
        DataManager.sendMessage(convId, `![Imagem](${imageUrl})`);
        Components.closeAllModals();
        Pages.openConversation(convId);
    },

    // Page Initializers
    init: {
        login() {
            document.getElementById('login-form')?.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('login-name').value;
                const password = document.getElementById('login-password').value;

                const result = Auth.login(name, password);

                if (result.success) {
                    Utils.showToast('Login realizado!', 'success');
                    Components.renderNavigation();
                    Components.renderUserMiniProfile();
                    Components.renderTopbarUser();
                    Router.navigate('dashboard');
                } else {
                    document.getElementById('login-error').textContent = result.error;
                    document.getElementById('login-error').style.display = 'block';
                }
            });
        },

        register() {
            document.getElementById('register-form')?.addEventListener('submit', (e) => {
                e.preventDefault();

                const data = {
                    avakinName: document.getElementById('reg-avakin-name').value,
                    instagram: document.getElementById('reg-instagram').value,
                    friendCode: document.getElementById('reg-friend-code').value,
                    characterHistory: document.getElementById('reg-history').value,
                    password: document.getElementById('reg-password').value
                };
                const passwordConfirm = document.getElementById('reg-password-confirm').value;

                if (data.password !== passwordConfirm) {
                    document.getElementById('register-error').textContent = 'As senhas não coincidem';
                    document.getElementById('register-error').style.display = 'block';
                    return;
                }

                if (data.characterHistory.length < 50) {
                    document.getElementById('register-error').textContent = 'A história deve ter pelo menos 50 caracteres';
                    document.getElementById('register-error').style.display = 'block';
                    return;
                }

                const result = Auth.register(data);

                if (result.success) {
                    Utils.showToast(result.message, 'success');
                    Router.navigate('login');
                } else {
                    document.getElementById('register-error').textContent = result.error;
                    document.getElementById('register-error').style.display = 'block';
                }
            });
        },

        requests() {
            document.querySelectorAll('.tabs .tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    const tabName = tab.dataset.tab;
                    document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
                    document.getElementById(`tab-${tabName}`).style.display = 'block';
                });
            });
        },

        inventory() {
            document.querySelectorAll('.tabs .tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    const tabName = tab.dataset.tab;
                    document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
                    document.getElementById(`tab-${tabName}`).style.display = 'block';
                });
            });
        },

        rules() {
            const navItems = document.querySelectorAll('.rules-nav-item');
            if (navItems.length === 0) return;

            navItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Atualizar estado ativo
                    navItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');

                    // Scroll para a seção
                    const section = item.dataset.section;
                    const targetElement = document.getElementById(`rules-${section}`);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Highlight temporário
                        targetElement.style.backgroundColor = 'rgba(207, 255, 4, 0.1)';
                        setTimeout(() => {
                            targetElement.style.backgroundColor = '';
                        }, 1000);
                    }
                });
            });
        },

        'admin-edit'() {
            document.querySelectorAll('.tabs .tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    const tabName = tab.dataset.tab;
                    document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
                    document.getElementById(`tab-${tabName}`).style.display = 'block';
                });
            });
        }
    }
};

window.Pages = Pages;
