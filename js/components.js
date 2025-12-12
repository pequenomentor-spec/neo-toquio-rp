// ============================================
// NEO TOQUIO RP - Components
// ============================================

const Components = {
    // Render Navigation based on auth state
    renderNavigation() {
        const nav = document.getElementById('main-nav');
        const isLoggedIn = Auth.isLoggedIn();
        const isAdmin = Auth.isAdmin();
        const isSubAdmin = Auth.isSubAdmin();

        let html = '';

        if (isLoggedIn) {
            html += '<div class="nav-section"><div class="nav-section-title">Menu</div>';
            APP_DATA.navigation.member.forEach(item => {
                html += this.createNavItem(item);
            });
            html += '</div>';

            if (isAdmin || isSubAdmin) {
                const pendingCount = DataManager.getPendingRequestsCount() + DataManager.getPendingUsersCount();
                html += '<div class="nav-section"><div class="nav-section-title">Administração</div>';
                APP_DATA.navigation.admin.forEach(item => {
                    const badge = item.id === 'requests' && pendingCount > 0 ? pendingCount : null;
                    html += this.createNavItem({ ...item, badge });
                });
                html += '</div>';
            }
        } else {
            html += '<div class="nav-section"><div class="nav-section-title">Menu</div>';
            APP_DATA.navigation.public.forEach(item => {
                html += this.createNavItem(item);
            });
            html += '</div>';

            html += `
                <div class="nav-section">
                    <div class="nav-section-title">Entrar</div>
                    <div class="nav-item" data-route="login">
                        <i class="fas fa-sign-in-alt"></i>
                        <span>Login</span>
                    </div>
                    <div class="nav-item highlight" data-route="register">
                        <i class="fas fa-user-plus"></i>
                        <span>Cadastrar</span>
                    </div>
                </div>
            `;
        }

        nav.innerHTML = html;
    },

    createNavItem(item) {
        return `
            <div class="nav-item" data-route="${item.route}" id="nav-${item.id}">
                <i class="fas ${item.icon}"></i>
                <span>${item.label}</span>
                ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
            </div>
        `;
    },

    // Render User Mini Profile
    renderUserMiniProfile() {
        const container = document.getElementById('user-mini-profile');
        const user = Auth.getCurrentUser();

        if (user) {
            const roleLabels = { admin: '⭐ Admin', subadmin: '🛡️ Sub-Admin', member: '👤 Membro' };
            const avatarHtml = user.avatar ?
                `<img src="${user.avatar}" alt="${user.avakinName}" class="avatar">` :
                `<div class="avatar-placeholder"><i class="fas fa-user"></i></div>`;

            container.innerHTML = `
                <div class="avatar-status">
                    ${avatarHtml}
                </div>
                <div class="user-mini-info">
                    <div class="user-mini-name">${user.avakinName}</div>
                    <div class="user-mini-role">${roleLabels[user.role] || 'Membro'}</div>
                </div>
                <button class="btn btn-ghost btn-sm" onclick="Auth.logout()" title="Sair">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            `;
        } else {
            container.innerHTML = `
                <div class="guest-message">
                    <i class="fas fa-user-circle" style="font-size:32px;color:var(--dark-500)"></i>
                    <span style="font-size:var(--text-sm);color:var(--dark-400)">Visitante</span>
                </div>
            `;
        }
    },

    // Render Topbar User
    renderTopbarUser() {
        const container = document.getElementById('user-profile');
        const user = Auth.getCurrentUser();

        if (user) {
            const avatarHtml = user.avatar ?
                `<img src="${user.avatar}" alt="${user.avakinName}" class="avatar">` :
                `<div class="avatar-placeholder"><i class="fas fa-user"></i></div>`;

            container.innerHTML = `
                <div class="user-profile-info">
                    <div class="user-profile-name">${user.avakinName}</div>
                    <div class="user-profile-balance">${user.faction?.name || 'Cidadão'}</div>
                </div>
                ${avatarHtml}
            `;
        } else {
            container.innerHTML = `
                <button class="btn btn-primary btn-sm" data-route="login">
                    <i class="fas fa-sign-in-alt"></i> Entrar
                </button>
            `;
        }
    },

    // Render Stats Cards
    renderStats(stats) {
        return stats.map((stat, index) => `
            <div class="stat-card stagger-item" style="animation-delay: ${index * 0.1}s">
                <div class="stat-icon ${stat.color}">
                    <i class="fas ${stat.icon}"></i>
                </div>
                <div class="stat-info">
                    <h4>${stat.value}</h4>
                    <p>${stat.label}</p>
                </div>
            </div>
        `).join('');
    },

    // Render Faction Cards (for public/info view)
    renderFactionInfoCards() {
        // Renderiza todas as facções do sistema
        return APP_DATA.factions.map(faction => {
            const members = DataManager.getFactionMembers(faction.id);
            return `
                <div class="faction-card stagger-item" style="border-left: 4px solid ${faction.color}">
                    <div class="faction-header-icon" style="background:${faction.color}20;color:${faction.color}">
                        <i class="fas ${faction.icon}"></i>
                    </div>
                    <div class="faction-content">
                        <h3 class="faction-name" style="color:${faction.color}">${faction.name}</h3>
                        <p class="faction-fullname">${faction.fullName}</p>
                        <p class="faction-type">${faction.type}</p>
                        <p class="text-muted faction-desc">${faction.description}</p>
                        <div class="faction-stats">
                            <span class="faction-stat">
                                <i class="fas fa-users"></i> ${members.length} membros
                            </span>
                            <span class="faction-stat badge ${faction.isRecruiting ? 'badge-success' : 'badge-secondary'}">
                                ${faction.isRecruiting ? 'Recrutando' : 'Fechado'}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Render Faction Cards (for member view with apply)
    renderFactionCards() {
        const user = Auth.getCurrentUser();
        const userRequests = APP_DATA.requests.filter(r => r.userId === user?.id);
        const hasAnyFaction = user?.faction !== null && user?.faction !== undefined;

        return APP_DATA.factions.map(faction => {
            const members = DataManager.getFactionMembers(faction.id);
            const isMember = user?.faction?.id === faction.id;
            const hasPending = userRequests.some(r => r.targetId === faction.id && r.status === 'pending');
            const isFull = false; // Sem limite de membros

            let actionButton = '';
            if (isMember) {
                actionButton = '<span class="badge badge-success"><i class="fas fa-check"></i> Você é membro</span>';
            } else if (hasPending) {
                actionButton = '<span class="badge badge-warning"><i class="fas fa-clock"></i> Aguardando</span>';
            } else if (hasAnyFaction) {
                actionButton = '<span class="badge badge-secondary">Já tem facção</span>';
            } else if (isFull) {
                // Comentado: vagas não são mais usadas
            } else {
                actionButton = `<button class="btn btn-primary btn-sm" onclick="Pages.applyToFaction('${faction.id}')">
                    <i class="fas fa-paper-plane"></i> Solicitar
                </button>`;
            }

            return `
                <div class="faction-card stagger-item" style="border-left: 4px solid ${faction.color}">
                    <div class="faction-header-icon" style="background:${faction.color}20;color:${faction.color}">
                        <i class="fas ${faction.icon}"></i>
                    </div>
                    <div class="faction-content">
                        <h3 class="faction-name" style="color:${faction.color}">${faction.name}</h3>
                        <p class="faction-fullname">${faction.fullName}</p>
                        <p class="faction-type">${faction.type}</p>
                        <p class="text-muted faction-desc">${faction.description}</p>
                        <div class="faction-requirements">
                            <small class="text-muted"><i class="fas fa-clipboard-list"></i> ${faction.requirements}</small>
                        </div>
                        <div class="faction-stats mt-3">
                            <span class="faction-stat">
                                <i class="fas fa-users"></i> ${members.length} membros
                            </span>
                            ${actionButton}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Render Job Cards
    renderJobCards(jobs) {
        const user = Auth.getCurrentUser();
        const userRequests = APP_DATA.requests.filter(r => r.userId === user?.id && r.type === 'job');

        return jobs.map(job => {
            const holders = DataManager.getJobHolders(job.id);
            const hasJob = user?.job?.id === job.id;
            const hasPending = userRequests.some(r => r.targetId === job.id && r.status === 'pending');
            const isFull = false; // Sem limite de vagas
            const holdersCount = holders.length;

            let actionButton = '';
            if (hasJob) {
                actionButton = '<span class="badge badge-success"><i class="fas fa-check"></i> Seu emprego</span>';
            } else if (hasPending) {
                actionButton = '<span class="badge badge-warning"><i class="fas fa-clock"></i> Aguardando</span>';
            } else if (user?.job) {
                actionButton = '<span class="badge badge-secondary">Já empregado</span>';
            } else if (isFull) {
                // Comentado: vagas não são mais usadas
            } else {
                actionButton = `<button class="btn btn-primary btn-sm" onclick="Pages.applyToJob('${job.id}')">
                    <i class="fas fa-paper-plane"></i> Candidatar
                </button>`;
            }

            return `
                <div class="job-card stagger-item" data-id="${job.id}">
                    <div class="job-icon">
                        <i class="fas ${job.icon}"></i>
                    </div>
                    <div class="job-content">
                        <h4 class="job-title">${job.title}</h4>
                        <p class="job-company">${job.department}</p>
                        <p class="text-muted job-desc">${job.description}</p>
                        <div class="job-details">
                            <span><i class="fas fa-money-bill"></i> ${job.salary}</span>
                            <span><i class="fas fa-user-check"></i> ${holdersCount} funcionários</span>
                        </div>
                    </div>
                    <div class="job-actions">
                        ${actionButton}
                    </div>
                </div>
            `;
        }).join('');
    },

    // Render Citizens Cards
    renderCitizenCards(users) {
        const approvedUsers = users.filter(u => u.status === 'approved' && u.role !== 'admin');

        if (approvedUsers.length === 0) {
            return '<p class="text-center text-muted p-4">Nenhum cidadão cadastrado ainda.</p>';
        }

        return approvedUsers.map(user => {
            const avatarHtml = user.avatar ?
                `<img src="${user.avatar}" alt="${user.avakinName}" class="citizen-avatar">` :
                `<div class="citizen-avatar-placeholder"><i class="fas fa-user"></i></div>`;

            let factionBadge = '';
            if (user.faction) {
                factionBadge = `<span class="citizen-faction badge" style="background:${user.faction.color}20;color:${user.faction.color}">
                    <i class="fas fa-shield"></i> ${user.faction.name}
                </span>`;
            } else {
                factionBadge = '<span class="badge badge-secondary">Cidadão</span>';
            }

            return `
                <div class="citizen-card stagger-item">
                    ${avatarHtml}
                    <div class="citizen-info">
                        <h4 class="citizen-name">${user.avakinName}</h4>
                        <p class="citizen-job">${user.job?.title || 'Sem emprego'}</p>
                        ${factionBadge}
                    </div>
                </div>
            `;
        }).join('');
    },

    // Render Inventory Items
    renderInventoryItems(items, showOwner = false) {
        if (items.length === 0) {
            return '<p class="text-center text-muted p-4">Nenhum item</p>';
        }

        return items.map(item => `
            <div class="item-card ${item.isIllegal ? 'illegal' : ''} stagger-item">
                <div class="item-icon">
                    <i class="fas ${item.icon}"></i>
                </div>
                <h4 class="item-name">${item.name}</h4>
                <p class="item-category">${item.category}</p>
                ${item.isIllegal ? '<span class="badge badge-danger item-badge">ILEGAL</span>' : ''}
                ${showOwner ? `<p class="item-owner text-muted">Dono: ${item.ownerName}</p>` : ''}
                ${item.forSale ? `
                    <p class="item-price">M$ ${item.salePrice}</p>
                    ${item.ownerId !== Auth.getCurrentUser()?.id ? `
                        <button class="btn btn-success btn-sm mt-2" onclick="Pages.buyItem('${item.id}')">
                            <i class="fas fa-cart-plus"></i> Comprar
                        </button>
                    ` : '<span class="badge badge-warning">À venda</span>'}
                ` : ''}
            </div>
        `).join('');
    },

    // Render Rules
    renderRules(rules) {
        const icons = {
            conduta: 'fa-shirt',
            zona_safe: 'fa-shield-halved',
            convivencia: 'fa-heart',
            acao: 'fa-gamepad',
            combate: 'fa-gun',
            moeda: 'fa-yen-sign',
            vandalismo: 'fa-fire'
        };

        const titles = {
            conduta: 'Regras de Conduta',
            zona_safe: 'Regras de Zona Safe e Personagens',
            convivencia: 'Regras de Convivência e Advertências',
            acao: 'Regras de Ação',
            combate: 'Diretrizes de Combate e Organização',
            moeda: 'Regra Oficial Moeda NeoYen (¥)',
            vandalismo: 'Regra Oficial - Ação: Fogo'
        };

        return Object.entries(rules).map(([key, ruleList]) => `
            <div class="rule-section" id="rules-${key}">
                <h3><i class="fas ${icons[key] || 'fa-book'}"></i> ${titles[key] || key}</h3>
                ${ruleList.map(rule => `
                    <div class="rule-item">
                        <p class="rule-text">${rule}</p>
                    </div>
                `).join('')}
            </div>
        `).join('');
    },

    // Render Pending Requests
    renderPendingRequests() {
        const pendingRequests = APP_DATA.requests.filter(r => r.status === 'pending');

        if (pendingRequests.length === 0) {
            return '<p class="text-center text-muted p-4">Nenhuma solicitação pendente</p>';
        }

        return pendingRequests.map(request => {
            const user = DataManager.getUser(request.userId);
            let target, targetColor;

            if (request.type === 'faction') {
                target = DataManager.getFaction(request.targetId);
                targetColor = target?.color;
            } else {
                target = DataManager.getJob(request.targetId);
                targetColor = 'var(--primary-400)';
            }

            const avatarHtml = user?.avatar ?
                `<img src="${user.avatar}" class="avatar">` :
                `<div class="avatar-placeholder"><i class="fas fa-user"></i></div>`;

            const typeLabel = {
                faction: 'Facção',
                job: 'Emprego'
            };

            return `
                <div class="request-card">
                    <div class="request-header">
                        ${avatarHtml}
                        <div class="request-info">
                            <strong>${user?.avakinName}</strong>
                            <span class="badge ${request.type === 'job' ? 'badge-blue' : 'badge-purple'}">
                                ${typeLabel[request.type]}
                            </span>
                        </div>
                    </div>
                    <div class="request-target">
                        <i class="fas ${target?.icon}" style="color:${targetColor}"></i>
                        <span>${target?.name || target?.title}</span>
                    </div>
                    <div class="request-message">
                        <p>"${request.message || 'Sem mensagem'}"</p>
                    </div>
                    <div class="request-time">
                        <small class="text-muted">${Utils.timeAgo(request.createdAt)}</small>
                    </div>
                    <div class="request-actions">
                        <button class="btn btn-success btn-sm" onclick="Pages.approveRequest('${request.id}')">
                            <i class="fas fa-check"></i> Aprovar
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="Pages.rejectRequest('${request.id}')">
                            <i class="fas fa-times"></i> Rejeitar
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Render Pending Users
    renderPendingUsers() {
        const pendingUsers = APP_DATA.users.filter(u => u.status === 'pending');

        if (pendingUsers.length === 0) {
            return '<p class="text-center text-muted p-4">Nenhum cadastro pendente</p>';
        }

        return pendingUsers.map(user => {
            const avatarHtml = user.avatar ?
                `<img src="${user.avatar}" class="avatar-lg">` :
                `<div class="avatar-lg-placeholder"><i class="fas fa-user"></i></div>`;

            return `
                <div class="user-request-card">
                    <div class="user-request-header">
                        ${avatarHtml}
                        <div class="user-request-info">
                            <h4>${user.avakinName}</h4>
                            <p class="text-muted">
                                <i class="fab fa-instagram"></i> ${user.instagram || 'Não informado'}
                            </p>
                            <p class="text-muted">
                                <i class="fas fa-user-plus"></i> ${user.friendCode}
                            </p>
                        </div>
                    </div>
                    <div class="user-request-history">
                        <strong>História do Personagem:</strong>
                        <p>${user.characterHistory || 'Não informada'}</p>
                    </div>
                    <div class="user-request-meta">
                        <small class="text-muted">Cadastrado: ${Utils.formatDate(user.createdAt)}</small>
                    </div>
                    <div class="user-request-actions">
                        <button class="btn btn-success" onclick="Pages.approveUser('${user.id}')">
                            <i class="fas fa-check"></i> Aprovar Cadastro
                        </button>
                        <button class="btn btn-danger" onclick="Pages.rejectUser('${user.id}')">
                            <i class="fas fa-times"></i> Rejeitar
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Modal
    showModal(options) {
        const { title, content, footer, size = 'md', id = 'modal-' + Date.now() } = options;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = id;
        modal.innerHTML = `
            <div class="modal" style="${size === 'lg' ? 'max-width:800px' : size === 'xl' ? 'max-width:1000px' : ''}">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">${content}</div>
                ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
            </div>
        `;

        document.getElementById('modals-container').appendChild(modal);

        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

        return modal;
    },

    closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.remove());
    },

    confirm(message, onConfirm) {
        const modal = this.showModal({
            title: 'Confirmar',
            content: `<p>${message}</p>`,
            footer: `
                <button class="btn btn-secondary" data-action="cancel">Cancelar</button>
                <button class="btn btn-primary" data-action="confirm">Confirmar</button>
            `
        });

        modal.querySelector('[data-action="cancel"]').onclick = () => modal.remove();
        modal.querySelector('[data-action="confirm"]').onclick = () => {
            onConfirm();
            modal.remove();
        };
    }
};

window.Components = Components;
