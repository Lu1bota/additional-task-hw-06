document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.reviews-list');
    const reviews = document.querySelectorAll('.reviews-list-item');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Перевіряємо ширину екрану перед ініціалізацією слайдера
    if (window.innerWidth < 1168) {
        // Клонуємо перші два елементи і додаємо їх в кінець списку для безкінечного циклу
        const firstItem = reviews[0].cloneNode(true);
        const secondItem = reviews[1].cloneNode(true);
        slider.appendChild(firstItem);
        slider.appendChild(secondItem);

        function updateSlider() {
            const slidesPerView = window.innerWidth >= 736 ? 2 : 1;
            const offset = currentIndex * (100 / slidesPerView);
            slider.style.transform = `translateX(-${offset}%)`;
        }

        function nextSlide() {
            currentIndex++;
            if (currentIndex >= reviews.length) {
                // Плавний перехід до початку
                setTimeout(() => {
                    slider.style.transition = 'none';
                    currentIndex = 0;
                    updateSlider();
                    setTimeout(() => {
                        slider.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }, 500);
            }
            updateSlider();
        }

        function prevSlide() {
            currentIndex--;
            if (currentIndex < 0) {
                // Плавний перехід до кінця
                setTimeout(() => {
                    slider.style.transition = 'none';
                    currentIndex = reviews.length - 1;
                    updateSlider();
                    setTimeout(() => {
                        slider.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }, 500);
            }
            updateSlider();
        }

        // Сенсорне керування
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            if (swipeDistance > 50) {
                prevSlide();
            } else if (swipeDistance < -50) {
                nextSlide();
            }
        }

        // Ініціалізація слайдера
        updateSlider();
    }
});