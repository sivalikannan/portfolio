/* =============================================
   SIVALI KANNAN — Portfolio JavaScript
   =============================================*/

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. NAVBAR — Scroll & Active Link
    // ==========================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    function handleNavScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    window.addEventListener('scroll', handleNavScroll);

    // Mobile Nav Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // ==========================================
    // 2. TYPING EFFECT
    // ==========================================
    const typingElement = document.getElementById('typingText');
    const titles = [
        'Software Engineer',
        'Full-Stack Developer',
        'Java Developer',
        'React Developer',
        'Problem Solver'
    ];
    let titleIndex = 0, charIndex = 0, isDeleting = false, typingDelay = 100;

    function typeEffect() {
        const currentTitle = titles[titleIndex];
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingDelay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingDelay = 400;
        }

        setTimeout(typeEffect, typingDelay);
    }

    typeEffect();

    // ==========================================
    // 3. SCROLL REVEAL ANIMATIONS
    // ==========================================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));

    // ==========================================
    // 4. SKILL BARS ANIMATION
    // ==========================================
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-fill').forEach(bar => skillObserver.observe(bar));

    // ==========================================
    // 5. COUNTER ANIMATION
    // ==========================================
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                let current = 0;
                const increment = target / (2000 / 16);
                const update = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target;
                    }
                };
                update();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

    // ==========================================
    // 6. SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 7. CONTACT FORM
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #A8E6CF, #88D8B0)';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });

    // ==========================================
    // 8. PAGE LOAD ANIMATION
    // ==========================================
    window.addEventListener('load', () => {
        document.querySelectorAll('.hero .animate-on-scroll').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 200);
        });
    });

    // ==========================================
    // 9. TOAST NOTIFICATION
    // ==========================================
    function showToast(message, type = 'success') {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const icon = type === 'success'
            ? '<i class="fas fa-check-circle"></i>'
            : '<i class="fas fa-trash-alt"></i>';
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `${icon} ${message}`;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add('show'));
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // ==========================================
    // 10. PROJECT CRUD — localStorage
    // ==========================================
    const STORAGE_KEY = 'sivali_projects';
    const iconPool = [
        'fas fa-code', 'fas fa-globe', 'fas fa-mobile-alt', 'fas fa-database',
        'fas fa-robot', 'fas fa-chart-line', 'fas fa-shopping-cart', 'fas fa-lock',
        'fas fa-cloud', 'fas fa-graduation-cap', 'fas fa-music', 'fas fa-game-board'
    ];
    const accentPool = [
        'var(--primary)', 'var(--secondary)', 'var(--accent)', 'var(--rose)', 'var(--lavender)'
    ];

    // Load projects from localStorage
    function getProjects() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveProjects(projects) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }

    // Render all project cards
    function renderProjects() {
        const grid = document.getElementById('projectsGrid');
        const empty = document.getElementById('emptyProjects');
        const projects = getProjects();

        grid.innerHTML = '';

        if (projects.length === 0) {
            empty.style.display = 'block';
        } else {
            empty.style.display = 'none';
            projects.forEach((project) => {
                const card = createProjectCard(project);
                grid.appendChild(card);
            });

            // Apply tilt & scroll reveal to new cards
            applyTiltEffect();
            grid.querySelectorAll('.project-card').forEach(el => {
                el.classList.add('animate-on-scroll');
                scrollObserver.observe(el);
                // Quickly trigger them visible
                setTimeout(() => el.classList.add('visible'), 50);
            });
        }
    }

    function createProjectCard(project) {
        const techs = project.tech.split(',').map(t => t.trim()).filter(Boolean);
        const icon = project.icon || 'fas fa-code';
        const accent = project.accent || 'var(--primary)';

        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.id = project.id;

        card.innerHTML = `
            <div class="project-image">
                <div class="project-placeholder" style="--accent: ${accent}">
                    <i class="${icon}"></i>
                </div>
                <div class="project-overlay">
                    ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener" class="project-link" aria-label="Live Demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener" class="project-link" aria-label="GitHub"><i class="fab fa-github"></i></a>` : ''}
                    ${(!project.live && !project.github) ? '<span style="color:var(--text-muted);font-size:0.8rem;">No links added</span>' : ''}
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${escapeHtml(project.name)}</h3>
                <p class="project-description">${escapeHtml(project.description)}</p>
                <div class="project-tags">
                    ${techs.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
                </div>
            </div>
            <div class="project-actions">
                <button class="btn-card-action btn-edit" data-id="${project.id}">
                    <i class="fas fa-pencil-alt"></i> Edit
                </button>
                <button class="btn-card-action btn-delete" data-id="${project.id}">
                    <i class="fas fa-trash-alt"></i> Delete
                </button>
            </div>
        `;

        // Edit button
        card.querySelector('.btn-edit').addEventListener('click', () => openModal(project.id));

        // Delete button
        card.querySelector('.btn-delete').addEventListener('click', () => {
            if (confirm(`Delete "${project.name}"?`)) {
                let projects = getProjects();
                projects = projects.filter(p => p.id !== project.id);
                saveProjects(projects);
                renderProjects();
                showToast(`"${project.name}" deleted.`, 'delete');
            }
        });

        return card;
    }

    // Escape HTML to prevent XSS
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // ==========================================
    // 11. MODAL — Open / Close
    // ==========================================
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const projectForm = document.getElementById('projectForm');
    const projectIdInput = document.getElementById('projectId');

    function openModal(editId = null) {
        projectForm.reset();
        projectIdInput.value = '';

        if (editId) {
            const projects = getProjects();
            const project = projects.find(p => p.id === editId);
            if (project) {
                modalTitle.textContent = 'Edit Project';
                projectIdInput.value = project.id;
                document.getElementById('projectName').value = project.name;
                document.getElementById('projectDesc').value = project.description;
                document.getElementById('projectTech').value = project.tech;
                document.getElementById('projectLive').value = project.live || '';
                document.getElementById('projectGithub').value = project.github || '';
            }
        } else {
            modalTitle.textContent = 'Add New Project';
        }

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        document.getElementById('projectName').focus();
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    document.getElementById('addProjectBtn').addEventListener('click', () => openModal());
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalCancel').addEventListener('click', closeModal);

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    // ==========================================
    // 12. FORM SUBMIT — Create / Update
    // ==========================================
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = projectIdInput.value;
        const name = document.getElementById('projectName').value.trim();
        const description = document.getElementById('projectDesc').value.trim();
        const tech = document.getElementById('projectTech').value.trim();
        const live = document.getElementById('projectLive').value.trim();
        const github = document.getElementById('projectGithub').value.trim();

        if (!name || !description || !tech) return;

        let projects = getProjects();

        if (id) {
            // UPDATE existing
            projects = projects.map(p => p.id === id ? {
                ...p, name, description, tech, live, github
            } : p);
            showToast(`"${name}" updated successfully!`, 'success');
        } else {
            // CREATE new
            const newProject = {
                id: Date.now().toString(),
                name, description, tech, live, github,
                icon: iconPool[Math.floor(Math.random() * iconPool.length)],
                accent: accentPool[Math.floor(Math.random() * accentPool.length)],
                createdAt: new Date().toISOString()
            };
            projects.push(newProject);
            showToast(`"${name}" added to your portfolio!`, 'success');
        }

        saveProjects(projects);
        closeModal();
        renderProjects();
    });

    // ==========================================
    // 13. 3D TILT EFFECT on Project Cards
    // ==========================================
    function applyTiltEffect() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = ((y - rect.height / 2) / rect.height) * -5;
                const rotateY = ((x - rect.width / 2) / rect.width) * 5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ==========================================
    // INIT — Render projects on load
    // ==========================================
    renderProjects();
});
