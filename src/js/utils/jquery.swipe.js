(function ($) {
    jQuery.fn.extend({
        swipe: function (leftHandler, rightHandler) {
            var xDown, yDown, swiped;

            this
                .on('touchstart', function (e) {
                    xDown = e.originalEvent.touches[0].clientX;
                    yDown = e.originalEvent.touches[0].clientY;
                    swiped = false;
                })
                .on('touchmove', function (e) {
                    if (!xDown || !yDown) return;

                    var xUp = e.originalEvent.changedTouches[0].clientX;
                    var yUp = e.originalEvent.changedTouches[0].clientY;

                    var xDiff = xDown - xUp;
                    var yDiff = yDown - yUp;
                    var horizontal = Math.abs(xDiff) > 10 && Math.abs(xDiff) > Math.abs(yDiff);

                    if (horizontal && !swiped) {
                        var newfunc;
                        if (xDiff > 0) {
                            newfunc = app.$.proxy(rightHandler, this);
                        } else {
                            newfunc = app.$.proxy(leftHandler, this);
                        }

                        newfunc(e);
                        swiped = true;
                    }

                    if (swiped) {
                        e.preventDefault();
                    }
                })
                .on('touchend touchcancel', function (e) {
                    xDown = null;
                    yDown = null;
                });
        }
    });
})(jQuery);
