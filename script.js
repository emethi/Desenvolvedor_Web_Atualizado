// Inicialização do AOS
AOS.init({
    duration: 1500,
    once: true,
});

// Função para ajustar dinamicamente a margem do carrossel com base no cabeçalho
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const carrossel = document.querySelector('.carrossel');
  
    function adjustCarouselMargin() {
        const headerHeight = header.offsetHeight;
        carrossel.style.marginTop = `${headerHeight}px`;
    }
  
    adjustCarouselMargin();
    window.addEventListener('resize', adjustCarouselMargin);
});

// Lógica do Carrossel
document.addEventListener('DOMContentLoaded', function () {
    const carrosselContainer = document.querySelector('.carrossel-container');
    const slides = document.querySelectorAll('.carrossel-slide');
    const prevButton = document.querySelector('.carrossel-prev');
    const nextButton = document.querySelector('.carrossel-next');
    const pagination = document.querySelector('.carrossel-pagination');
    let currentIndex = 0;

    // Criação das bolinhas de paginação
    slides.forEach((slide, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(dot);
    });

    // Atualização da paginação
    function updatePagination() {
        const dots = document.querySelectorAll('.carrossel-pagination span');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Navegação para um slide específico
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;
        carrosselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        updatePagination();
    }

    // Listeners dos botões de navegação
    nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
    prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));

    // Correção do botão "Faça um Orçamento"
    document.querySelectorAll('.slide-button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Impede a propagação do evento para o carrossel
            // Adicione aqui a lógica desejada para o botão, se necessário
            console.log('Botão "Faça um Orçamento" clicado');
        });
    });

    // Inicialização da paginação
    updatePagination();
});

// Lógica do FAQ
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
});

// Botão de voltar ao topo
document.addEventListener('DOMContentLoaded', function () {
    const backToTopButton = document.getElementById('back-to-top');
    let scrollTimeout;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 100) {
            backToTopButton.style.display = 'block';
            clearTimeout(scrollTimeout);
            if (!backToTopButton.matches(':hover')) {
                scrollTimeout = setTimeout(() => {
                    backToTopButton.style.display = 'none';
                }, 1000);
            }
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('mouseenter', () => clearTimeout(scrollTimeout));
    backToTopButton.addEventListener('mouseleave', () => {
        if (window.pageYOffset > 100) {
            scrollTimeout = setTimeout(() => {
                backToTopButton.style.display = 'none';
            }, 1000);
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Alternância de tema
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeIcon.textContent = savedTheme === 'dark-theme' ? '🌙' : '☀️';
    } else {
        body.classList.add('light-theme');
        themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', function () {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'dark-theme');
        }
    });
});

// Links dos projetos
document.addEventListener('DOMContentLoaded', function () {
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function () {
            const projectUrl = this.getAttribute('data-href');
            if (projectUrl) {
                window.location.href = projectUrl;
            } else {
                console.log('URL do projeto não encontrada');
            }
        });
    });
});
