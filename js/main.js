/* ================================================
   PT Montana Wana Teknologi - Main JavaScript
   Interactive Features & Animations
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNeuralCanvas();
    initScrollProgress();
    initTypingEffect();
    initCounters();
    initScrollReveal();
    initESGProgress();
    initSolutionFilter();
    initAIChat();
    initContactForm();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
});

/* ================================================
   PARTICLE CANVAS ANIMATION
   ================================================ */
function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 80;
    const connectionDistance = 150;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? '#10B981' : '#06B6D4'
            });
        }
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - distance / connectionDistance)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw particles
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
        
        requestAnimationFrame(drawParticles);
    }
    
    resizeCanvas();
    createParticles();
    drawParticles();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

/* ================================================
   NEURAL NETWORK CANVAS - Smart Forestry Theme
   ================================================ */
function initNeuralCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    let nodes = [];
    const nodeCount = 60;
    const connectionDistance = 180;
    const colors = {
        primary: '#10B981',
        secondary: '#06B6D4',
        tertiary: '#34D399',
        accent: '#22D3EE'
    };
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createNodes() {
        nodes = [];
        // Create main hub nodes (representing central systems)
        const hubCount = 3;
        for (let i = 0; i < hubCount; i++) {
            nodes.push({
                x: canvas.width * (0.25 + i * 0.25),
                y: canvas.height * 0.3 + (Math.random() - 0.5) * canvas.height * 0.2,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 3 + 4,
                color: colors.primary,
                isHub: true,
                pulse: Math.random() * Math.PI * 2
            });
        }
        
        // Create peripheral nodes (representing distributed systems)
        for (let i = 0; i < nodeCount - hubCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 2 + 1.5,
                color: Math.random() > 0.5 ? colors.secondary : colors.tertiary,
                isHub: false,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }
    
    function drawNodes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections first (behind nodes)
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = 0.12 * (1 - distance / connectionDistance);
                    
                    // Create gradient for connection
                    const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                    gradient.addColorStop(0, hexToRgba(nodes[i].color, opacity));
                    gradient.addColorStop(1, hexToRgba(nodes[j].color, opacity));
                    
                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = nodes[i].isHub || nodes[j].isHub ? 1.5 : 0.8;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw nodes
        nodes.forEach(node => {
            // Update pulse for hub nodes
            if (node.isHub) {
                node.pulse += 0.02;
            }
            
            const pulseSize = node.isHub ? Math.sin(node.pulse) * 2 : 0;
            
            // Draw glow
            const glowGradient = ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.size * 3 + pulseSize
            );
            glowGradient.addColorStop(0, hexToRgba(node.color, 0.3));
            glowGradient.addColorStop(1, hexToRgba(node.color, 0));
            
            ctx.beginPath();
            ctx.fillStyle = glowGradient;
            ctx.arc(node.x, node.y, node.size * 3 + pulseSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw main node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size + pulseSize * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();
            
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Boundary check with soft bounce
            const margin = 50;
            if (node.x < margin || node.x > canvas.width - margin) node.vx *= -1;
            if (node.y < margin || node.y > canvas.height - margin) node.vy *= -1;
            
            // Keep nodes within bounds
            node.x = Math.max(margin, Math.min(canvas.width - margin, node.x));
            node.y = Math.max(margin, Math.min(canvas.height - margin, node.y));
        });
        
        requestAnimationFrame(drawNodes);
    }
    
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    resizeCanvas();
    createNodes();
    drawNodes();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createNodes();
    });
}

/* ================================================
   SCROLL PROGRESS
   ================================================ */
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = progress + '%';
    });
}

/* ================================================
   TYPING EFFECT
   ================================================ */
function initTypingEffect() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const phrases = ['Forestry Innovation', 'Smart Technology', 'Sustainable Future', 'AI Solutions'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    
    typeEffect();
}

/* ================================================
   COUNTER ANIMATION
   ================================================ */
let countersInitialized = false;

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;
    
    function animateCounters() {
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (!isVisible || counter.dataset.animated) return;
            
            counter.dataset.animated = 'true';
            const target = parseFloat(counter.dataset.target);
            const duration = 2000;
            const start = performance.now();
            const isDecimal = target % 1 !== 0;
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = target * easeOut;
                
                counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }
    
    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters();
}

/* ================================================
   SCROLL REVEAL
   ================================================ */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;
    
    function revealOnScroll() {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll();
}

/* ================================================
   ESG CIRCULAR PROGRESS
   ================================================ */
let esgInitialized = false;

function initESGProgress() {
    const progressCircles = document.querySelectorAll('.circular-progress .progress');
    if (progressCircles.length === 0) return;
    
    function animateESGProgress() {
        progressCircles.forEach(circle => {
            if (circle.dataset.animated) return;
            
            const rect = circle.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (!isVisible) return;
            
            circle.dataset.animated = 'true';
            const progress = circle.dataset.progress;
            const circumference = 314;
            const offset = circumference - (progress / 100) * circumference;
            
            setTimeout(() => {
                circle.style.strokeDashoffset = offset;
            }, 300);
        });
    }
    
    window.addEventListener('scroll', animateESGProgress, { passive: true });
    animateESGProgress();
}

/* ================================================
   SOLUTION FILTER
   ================================================ */
function initSolutionFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const solutionCards = document.querySelectorAll('.solution-card[data-category]');
    
    if (filterBtns.length === 0 || solutionCards.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            solutionCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ================================================
   AI CHAT MODAL
   ================================================ */
function initAIChat() {
    const aiChatBtn = document.getElementById('aiChatBtn');
    const aiChatModal = document.getElementById('aiChatModal');
    const chatClose = document.getElementById('chatClose');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    
    if (!aiChatBtn || !aiChatModal) return;
    
    aiChatBtn.addEventListener('click', () => {
        aiChatModal.classList.toggle('active');
    });
    
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            aiChatModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (!aiChatModal.contains(e.target) && e.target !== aiChatBtn) {
            aiChatModal.classList.remove('active');
        }
    });
    
    function sendMessage() {
        if (!chatInput || !chatMessages) return;
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = message;
        chatMessages.appendChild(userMsg);
        
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate bot response
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot';
            
            const responses = [
                'Terima kasih atas pertanyaan Anda! Tim kami akan menghubungi Anda segera.',
                'Anda dapat melihat layanan Smart Forestry kami di bagian Solutions.',
                'Untuk informasi lebih lanjut, silakan hubungi agunglaksono@montanawana.org',
                'Kami sangat antusias dengan proyek Anda! Mari diskusikan lebih lanjut.'
            ];
            
            botMsg.textContent = responses[Math.floor(Math.random() * responses.length)];
            chatMessages.appendChild(botMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
    
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
}

/* ================================================
   CONTACT FORM
   ================================================ */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const service = formData.get('service');
        
        // Simple validation
        if (!name || !email) {
            alert('Mohon lengkapi semua kolom yang wajib diisi.');
            return;
        }
        
        // Show success message
        alert(`Terima kasih, ${name}! Pesan Anda telah terkirim. Kami akan menghubungi Anda di ${email} segera.`);
        contactForm.reset();
    });
}

/* ================================================
   THEME TOGGLE
   ================================================ */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    let isDark = true;
    
    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        if (isDark) {
            document.body.style.filter = 'none';
        } else {
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        }
    });
}

/* ================================================
   MOBILE MENU
   ================================================ */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

/* ================================================
   SMOOTH SCROLL
   ================================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ================================================
   NAVBAR SCROLL EFFECT
   ================================================ */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.style.top = '10px';
        navbar.style.padding = '8px 20px';
    } else {
        navbar.style.top = '20px';
        navbar.style.padding = '12px 24px';
    }
}, { passive: true });

/* ================================================
   PARALLAX EFFECT (OPTIONAL)
   ================================================ */
document.addEventListener('mousemove', (e) => {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;
    
    heroTitle.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

/* ================================================
   LAZY LOAD IMAGES (IF ANY)
   ================================================ */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
