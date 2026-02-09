// ============================================
// CARROSSEL DE AVALIAÇÕES
// ============================================

let currentSlide = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const totalSlides = testimonialCards.length;

// Função para mostrar slide específico
function showSlide(index) {
    // Remove classe active de todos os cards e dots
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Adiciona classe active ao slide atual
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlide = index;
}

// Próximo slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Slide anterior
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Event listeners para botões
if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Event listeners para dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-play do carrossel (opcional - descomente se quiser)
// setInterval(nextSlide, 5000);

// ============================================
// ANIMAÇÕES AO SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Adiciona classe fade-in aos elementos que devem animar
const animateElements = document.querySelectorAll(`
    .about-content,
    .service-card,
    .comparison-item,
    .benefit-item,
    .testimonial-card,
    .booking-content
`);

animateElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// ============================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// EFEITO DE PARALAX SUAVE NO HERO
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// ============================================
// NAVEGAÇÃO SUAVE AO CARREGAR PÁGINA
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// EFEITO HOVER MELHORADO NOS CARDS DE SERVIÇOS
// ============================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// CONTADOR DE ESTRELAS (Efeito visual)
// ============================================

const starElements = document.querySelectorAll('.testimonial-stars i');

starElements.forEach(star => {
    star.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(15deg)';
        this.style.transition = 'all 0.3s ease';
    });
    
    star.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ============================================
// VALIDAÇÃO E FEEDBACK PARA BOTÕES DE AGENDAMENTO
// ============================================

const bookingButtons = document.querySelectorAll('.btn-primary');

bookingButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Adiciona efeito de clique
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Se não for um link externo, previne comportamento padrão
        if (!this.href || this.href === '#') {
            e.preventDefault();
            alert('Por favor, configure o link do WhatsApp no atributo href do botão.');
        }
    });
});

// ============================================
// LAZY LOADING PARA IMAGENS (Performance)
// ============================================

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

// ============================================
// MENU MOBILE (Caso adicione no futuro)
// ============================================

// Preparado para expansão futura

// ============================================
// TRACKING DE INTERAÇÕES (Opcional - Analytics)
// ============================================

// Função para rastrear cliques em botões importantes
function trackInteraction(element, action) {
    // Aqui você pode adicionar código de analytics
    console.log(`Interaction: ${action} on ${element}`);
}

// Aplica tracking aos botões principais
bookingButtons.forEach(button => {
    button.addEventListener('click', () => {
        trackInteraction(button, 'booking_click');
    });
});

// ============================================
// PREVENÇÃO DE SPAM NO WHATSAPP
// ============================================

// Adiciona timestamp aos links do WhatsApp para evitar cache
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        const url = new URL(this.href);
        url.searchParams.set('t', Date.now());
        this.href = url.toString();
    });
});

// ============================================
// ANIMAÇÃO DE DIGITAÇÃO (Opcional - para hero)
// ============================================

// Descomente se quiser efeito de digitação no título
/*
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Usar assim:
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     typeWriter(heroTitle, heroTitle.textContent);
// }
*/

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Landing Page carregada com sucesso!');
    
    // Garante que o primeiro slide está visível
    if (testimonialCards.length > 0) {
        showSlide(0);
    }
    
    // Adiciona classe loaded ao body para animações CSS
    document.body.classList.add('loaded');
});
