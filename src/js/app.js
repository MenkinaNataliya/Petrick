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

    new app.PopUp();



})();
