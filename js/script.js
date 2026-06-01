// ===== DOM Elements =====
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const footerLinks = document.querySelectorAll('.footer-column a[data-section]');
const heroButtons = document.querySelectorAll('.hero-buttons a[data-section]');
const sections = document.querySelectorAll('.section');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

// ===== Navigation Functions =====

/**
 * Switches to the specified section
 * @param {string} sectionId - The ID of the section to show
 */
function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Trigger animation
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        });
    }

    // Update active state in navigation
    updateActiveNav(sectionId);

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Close mobile menu if open
    closeMobileMenu();
}

/**
 * Updates the active state in all navigation elements
 * @param {string} sectionId - The ID of the active section
 */
function updateActiveNav(sectionId) {
    // Update desktop nav
    navLinks.forEach(link => {
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update mobile nav
    mobileNavLinks.forEach(link => {
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Toggles the mobile menu
 */
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

/**
 * Closes the mobile menu
 */
function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Event Listeners =====

// Desktop navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        showSection(sectionId);
    });
});

// Mobile navigation clicks
mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        showSection(sectionId);
    });
});

// Footer link clicks
footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        showSection(sectionId);
    });
});

// Hero button clicks
heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = button.dataset.section;
        showSection(sectionId);
    });
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu on window resize (if switching to desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// ===== Initial Setup =====

// Show initial section (inicio)
document.addEventListener('DOMContentLoaded', () => {
    showSection('inicio');
    
    // Add smooth entrance animation
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
});

// ===== Intersection Observer for Animations =====

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for scroll animations
document.querySelectorAll('.feature-card, .service-card, .value-card, .stat-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(card);
});

// ===== Header Scroll Effect =====

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
});

// ===== Utility: Debounce Function =====

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
