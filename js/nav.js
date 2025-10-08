// nav.js - управление бургер-меню с проверками
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const nav = document.getElementById('nav');
    const body = document.body;

    // Проверяем, что элементы существуют
    if (!burgerMenu || !nav) {
        console.error('Элементы навигации не найдены!');
        return;
    }

    console.log('Навигация инициализирована');

    // Создаем overlay для затемнения фона
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Функция открытия/закрытия меню
    function toggleMenu() {
        console.log('Toggle menu called');
        burgerMenu.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    // Клик по бургеру
    burgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Клик по overlay (закрытие меню)
    overlay.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Клик по ссылкам в меню (закрытие меню)
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Закрываем меню только на мобильных
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    // Закрытие меню при нажатии Escape
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Закрытие меню при ресайзе (если перешли на десктоп)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Закрытие меню при клике вне области навигации
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !burgerMenu.contains(e.target)) {
            toggleMenu();
        }
    });
});