var app = app || {};

app.SlotsController = function() {
    this.initialize();
};

app.SlotsController.prototype = {
    initialize: function() {
        this.slotArray=[];
        this.$slots = $(".avtomat__slot");
        this.images = ["apple", "bell", "seven"];
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
                run: false
            };

            slotItem.$active.addClass("active");
            slotItem.$last.addClass("last");
            slotItem.$next.addClass("next");

            this.slotArray.push(slotItem);

        }, this)
    },

    runSlots: function(){
        this.isRun=true;
       // this.playSlots()
        var that =this;
        _.each(that.slotArray, function(slot){
            slot.run= true;
            that.playSlots(slot);//запускааем 1 барабан на заданное время
            setTimeout(function(){
                slot.run= false;
            }, that.randomtime(true))
        });
    },

    playSlots: function(slot){

        if(slot.run){
            var that = this;
            setTimeout(function(){
                that.slotSlick(slot)
            },that.randomtime());

            setTimeout(function(){
                that.playSlots(slot)
            },500)
        }

    },

   /* playSlots: function(slot, time){

        if(this.isRun){
            var that = this;
            _.each(that.slotArray, function(slot){
                setTimeout(function(){
                    that.slotSlick(slot)
                },that.randomtime() )
            });

            setTimeout(function(){
                that.playSlots()
            },500)
        }else{
            _.each(this.slotArray, function(slot){
                this.checkClass(slot)
            }, this);
        }
    },*/


/*    slotSlick: function(elem){
        elem.$active.addClass("transform");
        elem.$active.removeClassDelayed('active', 200);
        elem.$active.removeClassDelayed('transform', 200);

        elem.$next.removeClassDelayed('next', 50);

        //elem.$last.removeClassDelayed('last', 200);

        var last =  elem.$last.clone();
        $(last).removeClass('last');
        elem.$slot.prepend(last);
        elem.$slot.find(':last-child').remove();

        var that = this;

    },*/

    slotSlick: function(elem){
        elem.$active.addClass("transform");
        elem.$next.removeClass("next");

        var last =  elem.$last.clone();
        $(last).removeClass('last');
        $(last).addClass('next');
        elem.$slot.prepend(last);
        elem.$slot.find(':last-child').remove();

        var that = this;
        setTimeout(function(){
            that.overridingSlotElements(elem);
        }, 200)



    },

    stopSlots: function(){
        this.isRun = false;
        _.each(this.slotArray, function(slot){
            this.checkClass(slot)
        }, this);
    },

    randomtime: function(flag) {
        var min = 100, max = 1000;
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

        elem.$active.addClass("active");
        elem.$last.addClass("last");
        elem.$next.addClass("next");

        elem.type =  elem.$active.data('type');

        //this.checkClass(elem);
    },

    checkClass: function(slot){
        slot.$last.removeClass('transform');
        slot.$last.removeClass('active');
        slot.$last.removeClass('prev');

        slot.$next.removeClass('transform');
        slot.$next.removeClass('active');
        slot.$next.removeClass('last');

        slot.$active.removeClass('transform');
        slot.$active.removeClass('next');
        slot.$active.removeClass('last');
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