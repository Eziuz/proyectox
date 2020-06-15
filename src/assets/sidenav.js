$(document).ready(function(){
    $('.menu li:has(ul)').click(function(e){
        e.preventDefault();

        if($(this).hasClass('active')){

        }else{
            $('.menu li ul').slideUp();
            $('.menu li').removeClass('active');
            $(this).addClass('active');
            $(this).children('ul').slideDown();
        }
        
    });
});