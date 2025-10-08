// scroll.js - управление стрелкой "Наверх"
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTop = document.getElementById('scrollToTop');
    
    if (!scrollToTop) {
        console.error('Стрелка "Наверх" не найдена!');
        return;
    }

    console.log('Стрелка "Наверх" инициализирована');

    // Показываем/скрываем стрелку при скролле
    function toggleScrollButton() {
        if (window.pageYOffset > 300) {
            scrollToTop.classList.add('active');
        } else {
            scrollToTop.classList.remove('active');
        }
    }

    window.addEventListener('scroll', toggleScrollButton);

    // Плавный скролл наверх
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Инициализация при загрузке
    toggleScrollButton();
});