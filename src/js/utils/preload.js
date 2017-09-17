var app = app || {};
app.utils = app.utils || {};


app.utils.preload = function (arrayOfImages, callback) {
    var images = [];
    var i = 0;
    _.each(arrayOfImages, function (url) {
        var image = new Image;
        images.push(image);
        image.onload = function () {
            i++;
            if (callback) {
                callback(i / arrayOfImages.length);
            }
        };
        image.src = url;
    });
    return images;
};