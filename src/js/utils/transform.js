var app = app || {};
app.utils = app.utils || {};

app.utils.setCoords = function (target, x, y) {
    app.utils.setTransform(target, 'translate(' + x + 'px, ' + y + 'px)');
};

app.utils.setScale = function (target, scale) {
    app.utils.setTransform(target, 'scale(' + scale + ')');
};

app.utils.setTransform = function (target, transform) {
    target.css('-webkit-transform', transform);
    target.css('-ms-transform', transform);
    target.css('transform', transform);
};

(function ($) {
    jQuery.fn.extend({
        transform: function (transform) {
            app.utils.setTransform($(this), transform);
        }
    });

    jQuery.fn.extend({
        setScale: function (scale) {
            app.$(this).css('font-size', scale + 'em');
        },

        removeScale: function () {
            app.$(this).css('font-size', '');
        }
    });

})(jQuery);