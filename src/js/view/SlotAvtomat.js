var app = app || {};

app.SlotAvtomat = function() {
    this.initialize();
};

app.SlotAvtomat.prototype = {

    initialize: function() {

        this.$grip = $("div.avtomat__grip");
        this.$bulbs = $("div.bulb");
        this.$message = $("div.message");
        this.$slots = $(".avtomat__slot");
        this.isBlinking = false;

        this.images = ["apple", "bell", "seven"];

        this.$grip.click(_.bind(this.clickGrip, this));
      //  this.$slots.click(_.bind(this.slotClick, this));

    },

    clickGrip: function(){

        //анимация ручки
        this.isBlinking = true;
        this.$message.html("Вам точно повезет!")
        this.blinkingLights();
        this.runSlots();

        var that =this;
        setTimeout(function(){
            that.isBlinking = false;
            that.checkResult();

        }, 15000)

    },

    randomtime: function() {
        var min = 100, max = 1000;
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    },

    runSlots: function(){
        if(this.isBlinking){
            var that = this;
            _.each(that.$slots, function(slot){

                setTimeout(function(){
                    that.slotClick($(slot))
                },that.randomtime() )
            });

            setTimeout(function(){
                that.runSlots()
            },500)
        }
    },

    slotClick: function($elem){
        //var $elem = $(event.currentTarget);
        $elem.addClass("slot_transform");
        var $image = $($elem.find(".slot__image"));
        var randClass = Math.floor(Math.random() * this.images.length);

        _.each(this.images, function(image){
            $image.removeClass("slot__image_"+image)
        }, this);

        $image.addClassDelayed("slot__image_"+this.images[randClass],50);
        $elem.data("type", this.images[randClass]);

        $elem.removeClassDelayed("slot_transform",400)
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
        var typeImage = this.$slots.eq(0).data("type");
        var isWin=true;

        _.each(this.$slots, function(slot){
            if ($(slot).data('type') !== typeImage)
                isWin = false;
        }, this)

        if(isWin){
            this.$message.html("");
            this.$message.append('<img src="assets/images/avtomat/win.png">' )
        }
    }

};