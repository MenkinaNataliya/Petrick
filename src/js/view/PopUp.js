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