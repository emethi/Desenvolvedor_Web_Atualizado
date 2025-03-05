// Inicialize o AOS
AOS.init({
    duration: 1500,
    once: true,
});

//CARROSSEL

document.addEventListener('DOMContentLoaded', function () {
    const carrosselContainer = document.querySelector('.carrossel-container');
    const slides = document.querySelectorAll('.carrossel-slide');
    const prevButton = document.querySelector('.carrossel-prev');
    const nextButton = document.querySelector('.carrossel-next');
    const pagination = document.querySelector('.carrossel-pagination');
    let currentIndex = 0;
    let autoPlayInterval; // Variável para armazenar o intervalo automático

    // Função para iniciar o carrossel automático
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            goToSlide(currentIndex + 1); // Avança para o próximo slide
        }, 5000); // Intervalo de 5 segundos (ajuste conforme necessário)
    }

    // Função para parar o carrossel automático
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Cria as bolinhas de paginação
    slides.forEach((slide, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(dot);
    });

    // Atualiza a paginação
    function updatePagination() {
        const dots = document.querySelectorAll('.carrossel-pagination span');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Navega para um slide específico
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;
        carrosselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        updatePagination();
        stopAutoPlay(); // Para a navegação automática ao interagir
        startAutoPlay(); // Reinicia a navegação automática
    }

    // Botão "Próximo"
    nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Botão "Anterior"
    prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));

    // Inicializa a paginação
    updatePagination();

    // Suporte para touch (mobile)
    let startX = 0;
    let endX = 0;
    carrosselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoPlay(); // Para a navegação automática ao tocar
    });

    carrosselContainer.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    carrosselContainer.addEventListener('touchend', () => {
        if (startX - endX > 50) {
            goToSlide(currentIndex + 1); // Deslize para a esquerda (próximo)
        } else if (endX - startX > 50) {
            goToSlide(currentIndex - 1); // Deslize para a direita (anterior)
        }
        startAutoPlay(); // Reinicia a navegação automática após o toque
    });

    // Inicia a navegação automática
    startAutoPlay();
});
// FAQ

document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Fecha todas as outras FAQs abertas
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Alterna a classe 'active' no item clicado
            item.classList.toggle('active');
        });
    });
});

// Botão de rolagem para o topo
let scrollTimeout;
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', function () {
    // Mostra o botão se a página for rolada mais de 100px
    if (window.pageYOffset > 100) {
        backToTopButton.style.display = 'block';
        clearTimeout(scrollTimeout); // Limpa o temporizador anterior

        // Oculta o botão após 1 segundo de inatividade, exceto se o mouse estiver sobre ele
        if (!backToTopButton.matches(':hover')) {
            scrollTimeout = setTimeout(() => {
                backToTopButton.style.display = 'none';
            }, 1000); // 1000ms = 1 segundo
        }
    } else {
        backToTopButton.style.display = 'none'; // Oculta o botão se a página estiver no topo
    }
});

// Garante que o botão não suma quando o mouse estiver sobre ele
backToTopButton.addEventListener('mouseenter', () => {
    clearTimeout(scrollTimeout); // Cancela o temporizador se o mouse estiver sobre o botão
});

backToTopButton.addEventListener('mouseleave', () => {
    // Se o mouse sair do botão e a página estiver rolada, inicia o temporizador novamente
    if (window.pageYOffset > 100) {
        scrollTimeout = setTimeout(() => {
            backToTopButton.style.display = 'none';
        }, 1000);
    }
});

// Rolagem suave ao clicar no botão
backToTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Alternar tema
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
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
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

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const carrossel = document.querySelector('.carrossel');
    const headerHeight = header.offsetHeight;
    carrossel.style.marginTop = `${headerHeight}px`;
});     


      

