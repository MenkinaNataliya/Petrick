var app = app || {};
app.utils = app.utils || {};

app.utils.share = function (service, url, title) {
    var link = "http://share.yandex.ru/go.xml?" +
        "service=" + service +
        "&url=" + encodeURIComponent(url) +
        "&title=" + encodeURIComponent(title);
    app.utils.openPopup(link);
};

app.utils.openPopup = function (url) {
    var width = 800, height = 500;
    var left = (window.screen.width - width) / 2;
    var top = (window.screen.height - height) / 2;
    var win = window.open(url, "vote", "height=" + height + ",width=" + width + ",top=" + top + ",left=" + left);
    win.focus();
};