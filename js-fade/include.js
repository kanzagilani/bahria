(jQuery)(function($) {

    /* ================ MAIN NAVIGATION ================ */

    (function() {
        $(" #nav ul ").css({
            display: "none"
        }); // Opera Fix
        $(" #nav li").hover(function() {
            $(this).find('ul:first').css({
                visibility: "visible",
                display: "none"
            }).fadeIn(300);
        }, function() {
            $(this).find('ul:first').css({
                display: "none"
            });
        });
    })();

   $(function() {
        $('#dl-menu').dlmenu({
            animationClasses: {
                classin: 'dl-animate-in-2', 
                classout: 'dl-animate-out-2'
            }
        });
    });

    /* ========== MAIN SEARCH ======== */
    $('#header').on('click', '#search', function(e) {
        e.preventDefault();

        $(this).find('#m_search').fadeIn().focus();
    });

    $('#m_search').focusout(function(e) {
        $(e.target).fadeOut();
    });


    /* ================ CONTENT TABS ================ */
    (function() {
        $('.tabs').each(function() {
            var $tabLis = $(this).find('li');
            var $tabContent = $(this).next('.tab-content-wrap').find('.tab-content');

            $tabContent.hide();
            $tabLis.first().addClass('active').show();
            $tabContent.first().show();
        });

        $('.tabs').on('click', 'li', function(e) {
            var $this = $(this);
            var parentUL = $this.parent();
            var tabContent = parentUL.next('.tab-content-wrap');

            parentUL.children().removeClass('active');
            $this.addClass('active');

            tabContent.find('.tab-content').hide();
            var showById = $($this.find('a').attr('href'));
            tabContent.find(showById).fadeIn();

            e.preventDefault();
        });
    })();

    /* ================ ACCORDION ================ */

    (function() {
        'use strict';
        $('.accordion').on('click', '.title', function(event) {
            event.preventDefault();
            $(this).siblings('.accordion .active').next().slideUp('normal');
            $(this).siblings('.accordion .title').removeClass("active");

            if ($(this).next().is(':hidden') === true) {
                $(this).next().slideDown('normal');
                $(this).addClass("active");
            }
        });
        $('.accordion .content').hide();
        $('.accordion .active').next().slideDown('normal');
    })();

    (function() {

        /* ================ INFORMATION BOXES ================ */
        $('.information-boxes .close').on('click', function() {
            $(this).parent().slideUp(300);
        });

        /* ================ PLACEHOLDER PLUGIN ================ */
        $('input[placeholder], textarea[placeholder]').placeholder();
    })();

    /* ================ SCROLL TO TOP ================ */

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });

        $('.scroll-up').click(function() {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });


    /* ================ TWEETSCROLL PLUGIN ================ */
    $('.tweets-list-container').tweetscroll({
        username: 'pixel_industry',
        limit: 20,
        replies: true,
        position: 'append',
        animation: 'slide_up',
        visible_tweets: 2
    }); // TWEETSCROLL END




    // NEWSLETTER FORM AJAX SUBMIT
    $('.newsletter .submit').on('click', function(event) {
        event.preventDefault();
        var email = $(this).siblings('.email').val();
        var form_data = new Array({'Email': email});
        $.ajax({
            type: 'POST',
            url: "contact.php",
            data: ({'action': 'newsletter', 'form_data': form_data})
        }).done(function(data) {
            alert(data);
        });
    }); 


    // function to check is user is on touch device
    if (!is_touch_device()) {
        // ANIMATION FOR CONTENT
        $.stellar();

        /* ================ ANIMATED CONTENT ================ */
        if ($(".animated")[0]) {
            jQuery('.animated').css('opacity', '0');
        }

        $('.triggerAnimation').waypoint(function() {
            var animation = $(this).attr('data-animate');
            $(this).css('opacity', '');
            $(this).addClass("animated " + animation);

        },
                {
                    offset: '80%',
                    triggerOnce: true
                }
        );

    }

    // function to check is user is on touch device
    function is_touch_device() {
        return 'ontouchstart' in window // works on most browsers 
                || 'onmsgesturechange' in window; // works on ie10
    }

});
