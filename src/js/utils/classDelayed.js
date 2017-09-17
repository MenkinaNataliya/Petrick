(function ($) {
    
    jQuery.fn.extend({
        addClassDelayed: function (className, delay) {
            var $el = app.$(this);
            delay = delay || 30;
            setTimeout(function () {
                $el.addClass(className);
            }, delay);
        },
        removeClassDelayed: function (className, delay) {
            var $el = app.$(this);
            delay = delay || 30;
            setTimeout(function () {
                $el.removeClass(className);
            }, delay);
        }
    });

})(jQuery);