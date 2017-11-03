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