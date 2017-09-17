var app = app || {};
app.utils = app.utils || {};

app.utils.event = function (category, action, label, value) {
    if (typeof ga == 'function') {
        if (typeof action == 'undefined') {
            action = 'event';
        }
        else {
            action = action.toString();
        }

        ga('send', 'event', category, action, label, value);
    }
};

(function ($) {
    jQuery.fn.extend({
        clickEvent: function (category, action, label, value) {
            app.$(this).click(function () {
                app.utils.event(category, action, label, value);
            });
        }
    });
})(jQuery);