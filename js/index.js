/**
 * Created by Administrator on 2017/1/12.
 */
;(function (){
    "use strict";

    /*判断设备*/
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i) ? true:false;
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i) ? true:false;
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true:false;
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i) ? true:false;
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) ? true:false;
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };


    /*当不为移动端时，控制轮播图高度*/
    var fullHeight = function() {
        if ( !isMobile.any() ) {
            $('.js-fullheight').css('height', $(window).height());
            $(window).resize(function(){
                $('.js-fullheight').css('height', $(window).height());
            });
        }

    };


    /*轮播图，jq的flexslide插件*/
    var sliderMain = function() {
        $('#advert .flexslider').flexslider({
            animation: "fade",
            slideshowSpeed: 5000,
            animationDuration: 500,
            touch: true,
            start: function(){
                setTimeout(function(){
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            },
            before: function(){
                setTimeout(function(){
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            }

        });

        $('#advert .flexslider .slides > li').css('height', $(window).height());
        $(window).resize(function(){
            $('#advert .flexslider .slides > li').css('height', $(window).height());
        });

    };


    /*section-with-image,div上外边距控制*/
    var centerBlock = function() {
        $('#section-with-image .self-introduction').css('margin-top', -($('#section-with-image .self-introduction').outerHeight()/2));
        $(window).resize(function(){
            $('#section-with-image .self-introduction').css('margin-top', -($('#section-with-image .self-introduction').outerHeight()/2));
        });
    };

    /*/!*插件产品自适应高度*!/
    var responseHeight = function() {
        setTimeout(function(){
            $('.js-responsive > .v-align').css('height', $('.js-responsive > img').height());
        }, 1);

        $(window).resize(function(){
            setTimeout(function(){
                $('.js-responsive > .v-align').css('height', $('.js-responsive > img').height());
                console.log($('.js-responsive > img').get(0));
            }, 1);
        })
    };*/


    /*响应式菜单*/
    var offcanvasMenu = function () {
        $("body").prepend('<div id="offcanvas"></div>');
        $('#offcanvas').prepend('<ul id="side-links">');
        $('body').prepend('<a href="#" class="js-nav-toggle nav-toggle"><i></i></a>');
        $('#offcanvas').append($('#header nav').clone());
    };

    /*点击外侧隐藏菜单*/
    var mobileMenuOutsideClick = function() {

        $(document).click(function (e) {
            var container = $("#offcanvas, .js-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {

                if ( $('body').hasClass('offcanvas-visible') ) {

                    $('body').removeClass('offcanvas-visible');
                    $('.js-nav-toggle').removeClass('active');

                }


            }
        });

    };
    /*点击切换响应式菜单显示隐藏*/
    var burgerMenu = function() {

        $('body').on('click', '.js-nav-toggle', function(event){
            var $this = $(this);


            $('body').toggleClass('offcanvas-visible');
            $this.toggleClass('active');
            event.preventDefault();

        });

        $(window).resize(function() {
            if ( $('body').hasClass('offcanvas-visible') ) {
                $('body').removeClass('offcanvas-visible');
                $('.js-nav-toggle').removeClass('active');
            }
        });

        $(window).scroll(function(){
            if ( $('body').hasClass('offcanvas-visible') ) {
                $('body').removeClass('offcanvas-visible');
                $('.js-nav-toggle').removeClass('active');
            }
        });

    };


    /*控制滚动时，缩小页面的菜单按钮颜色*/
    var toggleBtnColor = function() {
        if ( $('#advert').length > 0 ) {
            $('#advert').waypoint( function( direction ) {
                if( direction === 'down' ) {
                    $('.nav-toggle').addClass('dark');
                }
            } , { offset: - $('#advert').height() } );

            $('#advert').waypoint( function( direction ) {
                if( direction === 'up' ) {
                    $('.nav-toggle').removeClass('dark');
                }
            } , {
                offset:  function() { return -$(this.element).height() + 0; }
            } );
        }
    };


    /*滚动加载*/
    /*距离顶部85%触发，可以是具体的数字、百分比还可以是函数，但函数需要返回一个数字*/
    var contentWayPoint = function() {
        $('.animate-box').waypoint( function( direction ) {
            if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                $(this.element).addClass('item-animate');
                setTimeout(function(){
                    $('body .animate-box.item-animate').each(function(k){
                        var el = $(this);//每次只有一个
                        setTimeout( function () {
                            var effect = el.data('animate-effect');
                            if ( effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            } else if ( effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            } else if ( effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            } else {
                                el.addClass('fadeInUp animated');
                            }
                            el.removeClass('item-animate');
                        },  k * 200);
                    });
                }, 100);
            }
        } , { offset: '85%' } );
    };
    $(function(){
        fullHeight();
        sliderMain();
        centerBlock();
        offcanvasMenu();
        mobileMenuOutsideClick();
        burgerMenu();
        toggleBtnColor();
        contentWayPoint();
    });
}());