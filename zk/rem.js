
//根据屏幕宽度 设置rem基础值

//获取屏幕宽度
var width=$(window).width();
$("html").css("font-size",width/10+'px');
$(window).bind('resize',function(){
    var width=$(window).width();
    $("html").css("font-size",width/10+'px');
});
