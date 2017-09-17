(function() {
  'use strict';

    var $switchButton = $('.header__switch-button');
    var $info=$('.info');
    var $header = $('.header');
    $switchButton.click(function(){
        $(this).html("info");
        if( $info.hasClass('info_show'))$(this).html("info");
        else $(this).html("story");
        $info.toggleClass('info_show');
        $header.toggleClass('header_color');
    });

    var $announce=$('.stories__announce');
    $announce.click(function(){
        window.location="project.html"
    })


})();
