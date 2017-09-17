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