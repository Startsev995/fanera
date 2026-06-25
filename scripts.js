// ============================================
// ОБЩИЕ СКРИПТЫ
// ============================================

$(document).ready(function() {

    // ========== SWIPER ==========
    if ($('.swiper-container').length > 0) {
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function(index, className) {
                    return '<span class="' + className + '"></span>';
                }
            },
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
        });
    }

    // ========== ПЛАВНАЯ ПРОКРУТКА ==========
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // ========== ОБРАБОТКА ФОРМ ==========
    $('form').on('submit', function(e) {
        e.preventDefault();
        var form = $(this);
        var formData = form.serialize();

        // Валидация
        var isValid = true;
        form.find('[required]').each(function() {
            if (!$(this).val().trim()) {
                isValid = false;
                $(this).css('outline', '2px solid #dc3545');
            } else {
                $(this).css('outline', '');
            }
        });

        if (!isValid) {
            alert('Пожалуйста, заполните все обязательные поля!');
            return;
        }

        // Имитация отправки
        var btn = form.find('button[type="submit"], .btn-green');
        var originalText = btn.text();
        btn.text('Отправка...').prop('disabled', true);

        setTimeout(function() {
            alert('✅ Заявка успешно отправлена!');
            btn.text(originalText).prop('disabled', false);
            form[0].reset();
        }, 1500);
    });

    // ========== ЧЕКБОКС ==========
    $('.checkbox-box').on('click', function() {
        $(this).toggleClass('active');
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

});
