var app = app || {};
app.utils = app.utils || {};

app.utils.detectMobile = {
    Windows: function () {
        return /IEMobile/i.test(navigator.userAgent);
    },
    Android: function () {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function () {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function () {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    any: function () {
        return (app.utils.detectMobile.Android() || app.utils.detectMobile.BlackBerry() || app.utils.detectMobile.iOS() || app.utils.detectMobile.Windows());
    }
};

(function(){
    if(app.utils.detectMobile.Android()) {
        app.$html.addClass('is_android');
    }
    if(app.utils.detectMobile.iOS()) {
        app.$html.addClass('is_ios');
    }
    if(app.utils.detectMobile.any()) {
        app.$html.addClass('is_mobile');
    }
})();