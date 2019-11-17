// 倒计时函数
console.log(1)
var timerYear = null
var maxtime = 2 * 60; //
function CountDown() {
    if (maxtime >= 0) {
        minutes = Math.floor(maxtime / 60);
        seconds = Math.floor(maxtime % 60);
        msg = "订单有效时间还有" + minutes + "分" + seconds + "秒";
        // $('#timer .date').html(minutes)
        // $('#timer .timer').html(seconds)
        document.all["timer"].innerHTML = msg;
        --maxtime;
    } else{
        clearInterval(timerYear);
        // alert("时间到，结束!");
    }
}
timer = setInterval("CountDown()", 1000);


var urlText = $('#qrcode').attr('data-img')



$('#cardBtn').click(function () {
    window.location.href = decodeURIComponent(urlText)
})

$('#cardBtns').click(function () {
    console.log('ceshi')
    window.location.href = "alipayqr://platformapi/startapp?saId=10000007"
})

$('#qrcode').qrcode({
    render: "canvas", //也可以替换为table
    width: 210,
    height: 200,
    text:urlText
});


function ready(callback) {
    // 如果jsbridge已经注入则直接调用
    if (window.AlipayJSBridge) {
        callback && callback();
    } else {
        // 如果没有注入则监听注入的事件
        document.addEventListener('AlipayJSBridgeReady', callback, false);
    }
}

ready(function(){
    document.querySelector('a').addEventListener('click', function() {
        // 打开淘宝首页，自动读取title，并且去除右边菜单
        AlipayJSBridge.call('pushWindow', {
            url: urlText,
            param: {
                readTitle: true,
                showOptionMenu: false
            }
        });
    });
});