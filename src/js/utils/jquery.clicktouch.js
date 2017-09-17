(function ($) {

    function onTouchStartHandler() {
        app.config.isTap = true;
        app.$document.off('touchstart', onTouchStartHandler);
        app.$document.off('MSPointerDown', onTouchStartHandler);
    }

    app.$document.on('touchstart', onTouchStartHandler);
    app.$document.on('MSPointerDown', onTouchStartHandler);

    jQuery.fn.extend({
        clicktouch: function (func) {

            $(this).css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');

            $(this).on("touchstart MSPointerDown", function (e) {

                var newfunc = $.proxy(func, this);
                newfunc(e);

                e.preventDefault();
                e.stopPropagation();
            });

            $(this).on("touchmove MSPointerMove", function (e) {
                e.preventDefault();
                e.stopPropagation();
            });

            $(this).on("click", function (e) {
                if (app.config.isTap) {
                    e.preventDefault();
                    return false;
                }
                var newfunc = $.proxy(func, this);
                newfunc(e);
            });
        }
    });
})(jQuery);