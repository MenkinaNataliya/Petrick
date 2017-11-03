var app = app || {};

app.SlotAvtomat = function() {
    this.initialize();
};

app.SlotAvtomat.prototype = {

    initialize: function() {

        this.$grip = $("div.avtomat__grip");
        this.$bulbs = $("div.bulb");
        this.$message = $("div.message");
        //this.$slots = $(".avtomat__slot");
        this.isBlinking = false;

        //this.images = ["apple", "bell", "seven"];

        this.solotsController = new app.SlotsController();

        this.$grip.click(_.bind(this.clickGrip, this));

    },

    clickGrip: function(){

        //анимация ручки
        this.isBlinking = true;
        this.$message.html("Вам точно повезет!");
        this.blinkingLights();
        this.solotsController.runSlots();

        var that =this;
        setTimeout(function(){
            that.isBlinking = false;
            that.solotsController.stopSlots();
            that.checkResult();
        }, 15000)

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
            setInterval(function () {
                isWin =  that.solotsController.isWin();
            });
        }

        if(isWin){
            this.$message.html("");
            this.$message.append('<img src="assets/images/avtomat/win.png">' )
        }
    }

};