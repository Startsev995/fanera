// ============================================
// ОБЩИЕ СКРИПТЫ
// ============================================

$(document).ready(function() {

    // ========== ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА ==========
    if ($('.about-swiper').length > 0) {
        var aboutSwiper = new Swiper('.about-swiper', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.about-pagination',
                clickable: true,
            },
            speed: 800,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
        });
    }

    // ========== СЛАЙДЕР В НОВОСТИ ==========
    if ($('.news-swiper').length > 0) {
        var newsSwiper = new Swiper('.news-swiper', {
            navigation: {
                nextEl: '.news-next',
                prevEl: '.news-prev',
            },
            speed: 800,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
        });
    }

    // ========== СЛАЙДЕР В СТАТЬИ ==========
    if ($('.article-swiper').length > 0) {
        var newsSwiper = new Swiper('.article-swiper', {
            navigation: {
                nextEl: '.article-next',
                prevEl: '.article-prev',
            },
            speed: 800,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
        });
    }

    // Инициализация Swiper для каждой галереи
    if ($('.gallery-slider').length > 0) {
        $('.gallery-slider').each(function(index) {
            var swiper = new Swiper(this, {
                slidesPerView: 2,
                spaceBetween: 50,
                loop: false,
                autoplay: false,
                speed: 600,
                breakpoints: {
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                }
            });

            var wrapper = $(this).closest('.gallery-wrapper');
            var prevBtn = wrapper.find('.nav-btn.prev');
            var nextBtn = wrapper.find('.nav-btn.next');
            var counter = wrapper.find('.counter .current');
            var total = wrapper.find('.counter .total');

            var totalSlides = swiper.slides.length;
            var slidesPerView = 2;
            
            // Определяем количество слайдов на экране
            function getSlidesPerView() {
                return window.innerWidth < 768 ? 1 : 2;
            }

            total.text('/ ' + totalSlides);

            function updateCounter() {
                var spv = getSlidesPerView();
                var currentIndex = swiper.activeIndex;
                var lastVisible = currentIndex + spv;
                
                if (lastVisible > totalSlides) {
                    lastVisible = totalSlides;
                }
                if (currentIndex === 0) {
                    lastVisible = spv;
                }
                
                counter.text(lastVisible);
            }

            // Обработчики кнопок
            prevBtn.on('click', function() {
                var spv = getSlidesPerView();
                var newIndex = swiper.activeIndex - spv;
                if (newIndex < 0) newIndex = 0;
                swiper.slideTo(newIndex);
                setTimeout(updateCounter, 100);
            });

            nextBtn.on('click', function() {
                var spv = getSlidesPerView();
                var newIndex = swiper.activeIndex + spv;
                if (newIndex >= totalSlides) newIndex = totalSlides - spv;
                if (newIndex < 0) newIndex = 0;
                swiper.slideTo(newIndex);
                setTimeout(updateCounter, 100);
            });

            swiper.on('slideChange', function() {
                updateCounter();
            });

            $(window).on('resize', function() {
                setTimeout(updateCounter, 200);
            });

            setTimeout(updateCounter, 200);
        });
    }

    // Кнопка "Написать нам"
    $('.write-btn').on('click', function() {
        alert('Форма связи с отделом продаж (демонстрация)');
    });

    // Навигация в сайдбаре
    $('.nav-link-item').on('click', function(e) {
        $('.nav-link-item').removeClass('active');
        $(this).addClass('active');
    });

    // ========== ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ ==========
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // ========== ОБРАБОТКА ФОРМЫ ==========
    $('form').on('submit', function(e) {
        e.preventDefault();
        var form = $(this);

        // Валидация полей
        var isValid = true;
        form.find('[required]').each(function() {
            if (!$(this).val().trim()) {
                isValid = false;
                $(this).css('outline', '2px solid #dc3545');
            } else {
                $(this).css('outline', '');
            }
        });

        // Проверка чекбокса
        var checkbox = form.find('.custom-checkbox input[type="checkbox"]');
        if (!checkbox.is(':checked')) {
            isValid = false;
            checkbox.closest('.custom-checkbox').find('.checkmark').css('outline', '2px solid #dc3545');
        } else {
            checkbox.closest('.custom-checkbox').find('.checkmark').css('outline', '');
        }

        if (!isValid) {
            alert('Пожалуйста, заполните все обязательные поля и дайте согласие на обработку данных!');
            return;
        }

        // Имитация отправки
        var btn = form.find('.btn-submit');
        var originalText = btn.text();
        btn.text('Отправка...').prop('disabled', true);

        setTimeout(function() {
            alert('✅ Заявка успешно отправлена!');
            btn.text(originalText).prop('disabled', false);
            form[0].reset();
            form.find('.custom-checkbox input[type="checkbox"]').prop('checked', true);
        }, 1500);
    });

    // ========== КНОПКА "НАВЕРХ" ==========
    var scrollBtn = $('<button>', {
        id: 'scroll-top-btn',
        html: '↑',
        css: {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#327D37',
            color: '#fff',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: '1000',
            display: 'none',
            boxShadow: '0 4px 15px rgba(50,125,55,0.3)',
            transition: 'all 0.3s ease'
        }
    });

    $('body').append(scrollBtn);

    scrollBtn.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    scrollBtn.hover(
        function() { $(this).css('transform', 'scale(1.1)'); },
        function() { $(this).css('transform', 'scale(1)'); }
    );

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 400) {
            scrollBtn.fadeIn();
        } else {
            scrollBtn.fadeOut();
        }
    });

    // Переключение разделов документов (аккордеон)
    $('.doc-section-header').on('click', function() {
        var section = $(this).closest('.doc-section');
        var isActive = section.hasClass('active');

        // Закрываем все
        $('.doc-section').removeClass('active');

        // Если не был активен - открываем
        if (!isActive) {
            section.addClass('active');
        }
    });

    // По умолчанию открыт первый раздел
    $('.doc-section:first').addClass('active');

    // Кнопка "Написать нам"
    $('.write-btn').on('click', function() {
        alert('Форма связи с отделом продаж (демонстрация)');
    });

    // Скачать документ
    $('.doc-download').on('click', function(e) {
        e.preventDefault();
        alert('Скачивание документа (демонстрация)');
    });

    // Переключение отделов (аккордеон)
            $('.department-item .department-header').on('click', function() {
                var item = $(this).closest('.department-item');
                var isActive = item.hasClass('active');

                if (!isActive) {
                    $('.department-item').removeClass('active');
                    item.addClass('active');
                } else {
                    item.removeClass('active');
                }
            });

            // Кнопка "Написать нам"
            $('.write-btn').on('click', function() {
                alert('Форма связи с отделом продаж (демонстрация)');
            });

            // По умолчанию открыт первый отдел
            $('.department-item:first').addClass('active');

});