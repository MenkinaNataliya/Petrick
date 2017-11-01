var app = app || {};

app.SlotAvtomat = function() {
    this.initialize();
};

app.SlotAvtomat.prototype = {

    initialize: function() {

        this.$grip = $("div.avtomat__grip");
        this.$bulbs = $("div.bulb");
        this.$message = $("div.avtomat__message");
        this.$slots = $(".avtomat_slot");
        this.isBlinking = false;

        this.$grip.click(_.bind(this.clickGrip, this));

    },

    clickGrip: function(){
        console.log(11)
        //анимация ручки
        this.isBlinking = true;
        this.blinkingLights();

        setTimeout(function(){
            this.blinkingLightsStop()
        }, 60000)
    },

    blinkingLights:function () {
        if(this.isBlinking){
            _.each(this.$bulbs,function(bulb, i){

                setTimeout(function(){
                    $(bulb).removeClass("bulb_on");
                },i*200);

                $(bulb).addClass("bulb_on");
                setTimeout(function(){
                    $(bulb).removeClass("bulb_on");
                },i*300+200)

            }, this);

            var that = this;

            setTimeout(function(){
                that.blinkingLights()
            },1000)

        }
    },

    blinkingLightsStop: function(){
        this.isBlinking = false;
    }

};