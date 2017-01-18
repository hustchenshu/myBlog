$(function (argument) {
	/* body... */
	$(window).scroll(function () {
        if ($(this).scrollTop() > 200) {   //scrollTop() 方法返回或设置匹配元素的滚动条的垂直位置。
            $('#toTop').fadeIn();  
        } else {
            $('#toTop').fadeOut();
        }
    });
    $("#toTop").click(function(){
        $("html,body").animate({scrollTop:0},"slow");
        return false;
    }); 
});