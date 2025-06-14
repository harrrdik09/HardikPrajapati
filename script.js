// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const projectGrid = document.querySelector('.project-grid');
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');
const offlineToast = document.getElementById('offline-toast');

// Sample project data
const projects = [
    {
        id: 1,
        title: 'Employee Management System',
        description: 'Developed a simple Employee Management System using Java featuring secure login authentication. Enabled efficient employee data handling with intuitive options to add, remove, or display employee records through a streamlined user interface.',
        image: 'images/empmanagesys.png',
        technologies: ['Java', 'Swing (assumed UI)', 'SQL (assumed database)'],
        liveLink: '#',
        githubLink: 'https://github.com/harrrdik09/EMP-MANAGE-SYS.git'
    },
    {
        id: 2,
        title: 'HpTask – Daily Task Manager',
        description: 'Built a cross-platform task management app in Flutter for smart scheduling and productivity insights. Features include intuitive UX.',
        image: 'images/icon1.webp',
        technologies: ['Flutter', 'Dart'],
        liveLink: '#',
        githubLink: 'https://github.com/harrrdik09/1stApp',
        apkLink: 'HpTask.apk'
    }
];

// Sample skills data
const skills = [
    { name: 'HTML', icon: 'fab fa-html5' },
    { name: 'CSS', icon: 'fab fa-css3-alt' },
    { name: 'C', icon: 'fas fa-file-code' },
    { name: 'C++', icon: 'fas fa-file-code' },
    { name: 'MySQL', icon: 'fas fa-database' },
    { name: 'DB Management', icon: 'fas fa-server' },
    { name: 'Java', icon: 'fab fa-java' },
    { name: 'JDBC', icon: 'fas fa-database' },
    { name: 'Spring Boot (Learning)', icon: 'fas fa-leaf' }
];

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Mobile Menu
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
}

// Project Modal
function initProjectModal() {
    projectGrid.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        if (projectCard) {
            const projectId = projectCard.dataset.id;
            const project = projects.find(p => p.id === parseInt(projectId));
            if (project) {
                showProjectModal(project);
            }
        }
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function showProjectModal(project) {
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <p>${project.description}</p>
        <div class="technologies">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
            ${project.apkLink ? `<a href="${project.apkLink}" download class="cta-button"><i class="fas fa-download"></i> Download App</a>` : ''}
            ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="cta-button secondary"><i class="fab fa-github"></i> Source Code</a>` : ''}
        </div>
    `;
    modal.classList.add('active');
}

// Render Projects
function renderProjects() {
    projectGrid.innerHTML = projects.map(project => `
        <div class="project-card" data-id="${project.id}">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Render Skills
function renderSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-item">
            <i class="${skill.icon}"></i>
            <span>${skill.name}</span>
        </div>
    `).join('');
}

// Offline Support
function initOfflineSupport() {
    window.addEventListener('online', () => {
        offlineToast.classList.remove('active');
    });

    window.addEventListener('offline', () => {
        offlineToast.classList.add('active');
    });
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSmoothScroll();
    updateActiveNavLink();
    initProjectModal();
    renderProjects();
    renderSkills();
    initOfflineSupport();

    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
});
