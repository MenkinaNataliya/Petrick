(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
var app = app || {};

app.config = {};

app.state = {};

//Selectors
app.$document = $(document);
app.$window = $(window);
app.$html = $('html');
app.$body = $('body');
app.$ = $;

var app = app || {};
app.utils = app.utils || {};

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

app.utils.initBlockMobileScroll = function() {
    $(document).on('touchmove',function(e){
        if($('body').hasClass('is_block-scrolling')) {
            e.preventDefault();
        }
    });
    $('body').on('touchstart', '.mobile-scroll', function(e) {
        if (e.currentTarget.scrollTop === 0) {
            e.currentTarget.scrollTop = 1;
        } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
            e.currentTarget.scrollTop -= 1;
        }
    });
    $('body').on('touchmove', '.mobile-scroll', function(e) {
        if($(this)[0].scrollHeight > $(this).innerHeight()) {
            e.stopPropagation();
        }
    });
};
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
var app = app || {};
app.utils = app.utils || {};

app.utils.serverErrorText = 'Ошибка доступа к серверу, попробуйте позже';
app.utils.serverError = function () {
    alert(app.utils.serverErrorText);
};

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
var app = app || {};
app.utils = app.utils || {};

app.utils.getParameter = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
};

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

var app = app || {};
app.utils = app.utils || {};

app.utils.declineNumeral = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};

app.utils.leadingZeros = function (num, size) {
    size = typeof size !== 'undefined' ? size : 2;

    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
};

app.utils.linear = function (min, max, k) {
    return (max - min) * k + min;
};

app.utils.formatNumber = function (val, thSep, dcSep) {
    // Проверка указания разделителя разрядов
    if (!thSep)
        thSep = ' ';

    // Проверка указания десятичного разделителя
    if (!dcSep)
        dcSep = ',';

    var res = val.toString();
    var lZero = (val < 0); // Признак отрицательного числа

    // Определение длины форматируемой части
    var fLen = res.lastIndexOf('.'); // До десятичной точки
    fLen = (fLen > -1) ? fLen : res.length;

    // Выделение временного буфера
    var tmpRes = res.substring(fLen);
    var cnt = -1;
    for (var ind = fLen; ind > 0; ind--) {
        // Формируем временный буфер
        cnt++;
        if (((cnt % 3) === 0) && (ind !== fLen) && (!lZero || (ind > 1))) {
            tmpRes = thSep + tmpRes;
        }
        tmpRes = res.charAt(ind - 1) + tmpRes;
    }

    return tmpRes.replace('.', dcSep);
};

app.utils.bezier = function (x1, y1, x2, y2, epsilon) {

    var curveX = function (t) {
        var v = 1 - t;
        return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
    };

    var curveY = function (t) {
        var v = 1 - t;
        return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
    };

    var derivativeCurveX = function (t) {
        var v = 1 - t;
        return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
    };

    return function (t) {

        var x = t, t0, t1, t2, x2, d2, i;

        // First try a few iterations of Newton's method -- normally very fast.
        for (t2 = x, i = 0; i < 8; i++) {
            x2 = curveX(t2) - x;
            if (Math.abs(x2) < epsilon) return curveY(t2);
            d2 = derivativeCurveX(t2);
            if (Math.abs(d2) < 1e-6) break;
            t2 = t2 - x2 / d2;
        }

        t0 = 0, t1 = 1, t2 = x;

        if (t2 < t0) return curveY(t0);
        if (t2 > t1) return curveY(t1);

        // Fallback to the bisection method for reliability.
        while (t0 < t1) {
            x2 = curveX(t2);
            if (Math.abs(x2 - x) < epsilon) return curveY(t2);
            if (x > x2) t0 = t2;
            else t1 = t2;
            t2 = (t1 - t0) * .5 + t0;
        }

        // Failure
        return curveY(t2);

    };

};
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
app.utils.isMobile = function () {
    return app.$window.width() <= 960;
};
var app = app || {};
app.utils = app.utils || {};

app.utils.getScrollbarWidth = function () {
    var scrollDiv = document.createElement("div");
    scrollDiv.className = "scrollbar-measure";
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
};
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
var app = app || {};
app.utils = app.utils || {};

app.utils.isValidEmail = function(email) {
  var re = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){0,}@[a-zA-Z0-9-]+\.([a-zA-Z]{1,6}\.)?[a-zA-Z]{2,6}$/g;
  return re.test(email);
};

app.utils.isValidName = function(name) {
    var re = /^[а-яёА-ЯЁ]*$/g;
    return re.test(name);
};

app.utils.isValidPhone = function(phone){
    var re = /^\+[7]\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}/g;
    return re.test(phone);
};
var app = app || {};

app.PopUp = function() {
    this.initialize();
};

app.PopUp.prototype = {
    initialize: function() {
        this.$items = $('.stories__announce');
        this.$popup = $('.popup')
        this.$close = $('.popup__close');


        this.$items.click(_.bind(this.storyClick, this))
        this.$close.click(_.bind(this.closeClick, this))
    },


    storyClick: function(){
        this.$popup.addClass("popup_isActive");
    },

    closeClick: function(){
        this.$popup.removeClass("popup_isActive");
    }
};
var app = app || {};

app.SlotAvtomat = function() {
    this.initialize();
};

app.SlotAvtomat.prototype = {

    initialize: function() {

        this.$grip = $("div.avtomat__grip");
        this.$bulbs = $("div.bulb");
        this.$message = $("div.message");
        this.isBlinking = false;

        this.solotsController = new app.SlotsController();

        this.$grip.click(_.bind(this.clickGrip, this));

    },

    clickGrip: function(){

        //анимация ручки
        this.isBlinking = true;
        this.$message.html("Вам точно повезет!");
        this.blinkingLights();
        this.solotsController.runSlots();

       /* var that =this;
        setTimeout(function(){
            that.isBlinking = false;
            //that.solotsController.stopSlots();
           // that.checkResult();
        }, 15000)*/

    },

    blinkingLights:function () {
        if(this.isBlinking){
            _.each(this.$bulbs,function(bulb, i){
                $(bulb).addClassDelayed("bulb_on",i*200);
                $(bulb).removeClassDelayed("bulb_on",i*200+500);
            }, this);

            var that = this;
            setTimeout(function(){
                that.blinkingLights()
            },1000)
        }
    },

    checkResult: function(){
        var isWin = this.solotsController.isWin();

        while(isWin===-1){
            var that = this;
            setTimeout(function () {
                isWin =  that.solotsController.isWin();
            },200);
        }

        if(isWin){
            this.$message.html("");
            this.$message.append('<img src="assets/images/avtomat/win.png">' )
        }
    },

    result: function(isWin){
        this.isBlinking = false;
        if(isWin){
            this.$message.html("");
            this.$message.append('<img src="assets/images/avtomat/win.png">' )
        }
    }

};
var app = app || {};

app.SlotsController = function() {
    this.initialize();
};

app.SlotsController.prototype = {
    initialize: function() {
        this.slotArray=[];
        this.$slots = $(".avtomat__slot");
        this.images = ["apple", "bell", "seven", "bell","apple"];
        this.isRun = false;

        this.initSlots();
    },

    initSlots: function(){

        var template = $('#image-slot-template').html();

        if(typeof template === 'undefined'){
            console.log('template not found');
            return;
        }

        this.template = _.template(template);

        _.each(this.$slots, function(slot){

            this.addElementInSlot($(slot));

            var slotItem= {
                $slot: $(slot),
                $next:  $(slot).find(':first-child'),
                $active: $(slot).find(":nth-child(2)"),
                $last: $(slot).find(':last-child'),
                type: '',
                run: false,
                arrayTimeout: 0
            };

            slotItem.$active.addClass("active");
            //slotItem.$last.addClass("last");
            slotItem.$next.addClass("next");

            this.slotArray.push(slotItem);

        }, this)
    },

    runSlots: function(){
        //this.isRun=true;
       // this.playSlots()
        var that =this;
        _.each(that.slotArray, function(slot){
            slot.run= true;
            that.playSlots(slot);//запускааем 1 барабан на заданное время
            setTimeout(function(){
                slot.run= false;
            }, that.randomtime(true))
        });
        this.checkStop();


    },

    playSlots: function(slot){

        if(slot.run){
            var that = this;

            setTimeout(function(){
                that.slotSlick(slot)
            },that.randomtime());

            slot.arrayTimeout++;

            setTimeout(function(){
                that.playSlots(slot)
            },500)
        }

    },


    slotSlick: function(elem){
        elem.$active.addClass("transform");
        elem.$active.removeClassDelayed("transform",100);
        elem.$active.removeClassDelayed("active",100);

        elem.$next.removeClass("next");
        elem.$next.addClass("active");

        elem.$last.prependTo(elem.$slot);

        setTimeout(function(){
            elem.$next = elem.$slot.find(':first-child');
            elem.$active = elem.$slot.find(":nth-child(2)");
            elem.$last = elem.$slot.find(':last-child');
            elem.$next.addClass("next")
        }, 250 )

        elem.arrayTimeout--;

    },

    checkStop: function(){
        console.log(this.slotArray[0].type === this.slotArray[1].type === this.slotArray[2].type)
        if(this.slotArray[0].arrayTimeout === 0 && this.slotArray[1].arrayTimeout === 0 &&this.slotArray[2].arrayTimeout === 0){
            app.slotAvtomat.result(this.slotArray[0].type === this.slotArray[1].type === this.slotArray[2].type);
        }else{
            var that = this;
            setTimeout(function(){
                that.checkStop()
            }, 500)
        }
    },

    randomtime: function(flag) {
        var min = 100, max = 500;
        if (flag === true)  min = 1000; max = 15000;

        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    },

    overridingSlotElements: function(elem){

        this.checkClass(elem);

        elem.$next =  elem.$slot.find(':first-child');
        elem.$active =  elem.$slot.find(":nth-child(2)");
        elem.$last =  elem.$slot.find(':last-child');
        elem.$last.removeClass("active");

        elem.$active.addClass("active");

        elem.$next.addClass("next");

        elem.type =  elem.$active.data('type');

    },

    addElementInSlot: function ($slot) {
        _.each(this.images, function(image){
            var item = {
                imageName: image
            };
            $slot.append(this.template(item));
        }, this);
    },

    isWin: function(){

        if(_.filter(this.slotArray, {run: false}).length===3){
            var typeImage = this.slotArray[0].type;
            var isWin=1;

            _.each(this.slotArray, function(slot){
                if (slot.type !== typeImage)
                    isWin = 0;
            }, this);

            return isWin;
        }else{
            return -1
        }

    }

};
var app = app || {};

app.SwitchButton = function() {
    this.initialize();
};

app.SwitchButton.prototype = {
    initialize: function() {


    }
};
(function() {
  'use strict';

    var $switchButton = $('.header__switch-button');
    var $info=$('.info');
    var $headerLogo=$('.header__logo');
    var $headerBtn=$('.header__switch-button');

    $switchButton.click(function(){
        $(this).html("info");
        if( $info.hasClass('info_show')){
            $(this).html("info");

        }
        else{


            $(this).html("story");
        }

        $info.toggleClass('info_show');
    });

    var $announce=$('.stories__announce');

    app.slotAvtomat = new app.SlotAvtomat();

})();

//# sourceMappingURL=app.concat.js.map