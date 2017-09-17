var app = app || {};
app.utils = app.utils || {};

app.utils.animateBody = function(top) {
    app.$('html,body').animate({scrollTop: top}, 300);
};

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
