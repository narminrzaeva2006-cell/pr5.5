// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ГАМБУРГЕР-МЕНЮ =====
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    // Проверяем, существуют ли элементы
    if (!menuToggle || !mainNav) {
        console.error('Элементы меню не найдены!');
        return;
    }
    
    // Создаем оверлей для меню, если его нет
    let navOverlay = document.querySelector('.nav-overlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
    }
    
    // Функция открытия/закрытия меню
    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        // Переключаем состояния
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // Блокируем скролл при открытом меню
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        console.log('Меню переключено:', mainNav.classList.contains('active') ? 'открыто' : 'закрыто');
    }
    
    // Обработчики событий
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    navOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        if (mainNav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Проверяем, открыто ли меню (только на мобильных)
            if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        // Если экран стал больше 768px и меню открыто - закрываем его
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // ===== КНОПКА "НАВЕРХ" =====
    const scrollTopButton = document.getElementById('scrollTop');
    
    if (scrollTopButton) {
        // Показываем кнопку после скролла
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopButton.classList.add('visible');
            } else {
                scrollTopButton.classList.remove('visible');
            }
        });
        
        // Прокрутка к началу страницы
        scrollTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    console.log('Скрипт меню загружен');
});