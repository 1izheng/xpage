var setInterv = null;

if (!payStr) {
    alert('111');
    setInterv = setInterval(function () {
        $.ajax({
            url: '/p/o/c',
            type: 'GET',
            dataType: 'json',
            data: {
                m: orderId
            },
            success: function (data) {
                if (data.code == 1 && data.data) {
                    payStr = data.data;
                    $('#payButton button').html('立即支付');
                    pay();
                    setInterv && clearInterval(setInterv);
                } else if (data.code == -1) {
                    setInterv && clearInterval(setInterv);
                    alert(data.msg);
                    $('body').html(data.msg);
                    AlipayJSBridge.call("exitApp");
                }
            }
        })
    }, 1000);

    pay();
} else {
    $('#payButton button').html('立即支付');
    setTimeout(pay(), 200);
}

function pay3() {
    if (!payStr) {
        alert('正在支付授权,请稍候');
        return;
    }
    pay(true);
}

//qrScan = "true";
var henshu = window.orientation;
if (henshu == 90 || henshu == -90) {
    $("#qr_topDiv").hide();
}

var isClose = false;
var currentUrl = window.location.href;
if (currentUrl.indexOf("unionpay") > 0) {

    $(".qr_log").attr("src", "/public/imgs/unionPay.png");
    $("#qrCodeIco").hide();//.attr("src","/img/payImg/icon.png");
    //$(".normal2").eq(0).show().find("x").text("首次支付请按提示完成");
    var ua = navigator.userAgent;
    $("#tipsP").text("请打开云闪付或相关银行APP扫一扫");
    if (isMobile()) {
        ua = ua.toLowerCase()
        $("#tipsP").text("请先截屏,打开云闪付或银行APP扫一扫");
        $("#tipsA").text("从相册选取截屏扫描二维码完成支付");
    }

    $("#pcShow").show();
    $("#payButton").hide();
} else if (currentUrl.indexOf("wechat") > 0) {

    $(".qr_log").attr("src", "/public/imgs/qr.png");
    $("#qrCodeIco").attr("src", "/public/imgs/icon.png");
    $(".normal4").eq(0).show().find("x").text("稳定！大额！一键支付！");
    $(".normal4").eq(1).show().find("x").text("首次支付请按照步骤完成！").css({"color": "red"});
    var ua = navigator.userAgent;
    $("#tipsP").text("请打开手机微信扫一扫");
    if (isMobile()) {
        ua = ua.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            $("#tipsP").text("请长按识别二维码进行支付");
            $("#tipsA").text("");
            //location.href = payUrl;
        } else {
            $("#tipsP").text("请先截屏,然后打开手机微信扫一扫");
            $("#tipsA").text("从相册选取截屏扫描二维码完成支付");
        }
    }

    $("#pcShow").show();
    $("#payButton").hide();
} else {
    $(".normal4").eq(0).show().find("x").text("请勿修改金额和备注，否则充值不到账!").css({
        "font-size": "16px"
    });

    $("#qrCodeIco").hide();
    $("#payButton").hide();
    $("#qrno").show();

    var ua = navigator.userAgent;
    /* PC */
    if (!isMobile()) {
        $("#payButton").hide();
        $("#pcShow").show();
        $("#qrno").show();
        $("#cQrCode").show();
        $("#imagQrDiv").show();
    } else {
        /* isMobile */
        var ua = ua.toLowerCase();
        /* Webchat or QQ */
        if (ua.indexOf("qq/") > -1
            || ua.match(/MicroMessenger/i) == 'micromessenger') {
            $("#tipsImg").show();
            $("#qr_topDiv").hide();
            $("#qr_content").hide();
        } else if ((ua.indexOf('alipay') > -1 && ua.indexOf('aliapp') > -1)) {
            $("#clipTag").hide();
            // $("#payButton1").show();
            $("#payButton").hide();
            isClose = true;
            window.location = payUrl;
        } else {
            if (hideQrcode != "true") {
                $("#pcShow").show();
                $("#tipsP").text("请截屏到相册,打开支付宝");
                $("#tipsA").text("扫描相册二维码进行支付");
                $("#clipTag").show();
                $("#cQrCode").show();
                $("#imagQrDiv").show();
            }

            if (tipText != null) {
                $(".normal4").eq(0).show().find("x").text(tipText).css({
                    "font-size": "18px"
                });
                $("#tipsP").text(tipText);
                $("#tipsA").text("");
            }

            /* 不扫码，那么直接跳转 */
            if (qrScan == "false") {
                //setTimeout(pay(), 2000);
            }

            if (showBtn == "true") {
                $("#payButton").show();
            }
        }
    }
}

function isIOS() {
    var isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isIOS;
}

function isUCBrowser() {
    if (navigator.userAgent.indexOf('UCBrowser') > -1) //如果是UC浏览器
    {
        return true;
    }

    return false;
}

function isAndroid() {
    var ua = navigator.userAgent;
    ua = ua.toLowerCase();
    var isAndroid = /android|adr/.test(ua);
    return isAndroid;
}

function isMobile() {
    var ua = navigator.userAgent;
    var isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    ua = ua.toLowerCase();
    var isAndroid = /android|adr/.test(ua);
    var isWinPHone = /windows (ce|phone)/i.test(ua);
    var isMeiZu = /mzbrowser/.test(ua);
    return isIOS || isAndroid || isWinPHone || isMeiZu;
}

function pay() {
    /* 默认H5方式 */
    var aliOpenUrl = "alipays://platformapi/startapp?appId=60000154&&url=" + encodeURIComponent(payUrl);

    aliOpenUrl = "alipays://platformapi/startapp?appId=60000029&showLoading=YES&url=" + encodeURIComponent(payUrl);

    if (h5Mode == "qr") {
        aliOpenUrl = "alipaylite://platformapi/startapp?appId=20000067&url=" + encodeURIComponent(payUrl);
        aliOpenUrl = "alipays://platformapi/startapp?appId=60000029&showLoading=YES&url=" + encodeURIComponent(payUrl);
    } else if (h5Mode == "direct") {
        /* 原生通道 */
        aliOpenUrl = payUrl;
    }
    window.location = aliOpenUrl;
}

function ucpay() {
    var UCWebUrl = "ucweb://" + (window.location.href).replace("http://", "");
    var downUrl = "http://wap.ucweb.com/packinfo/chinese_999/ucbrowser/pf/145?uc_param_str=vepffrbiupladsdnnipr&r=main&from=wap-atb-mobile&plang=";

    window.setTimeout(function () {
        if (confirm("您未安装UC浏览器，请安装UC浏览器后重试！")) {
            window.location = downUrl;
        }
    }, 4000);

    window.location = UCWebUrl;
}

function downUC() {
    var downUrl = "http://wap.ucweb.com/packinfo/chinese_999/ucbrowser/pf/145?uc_param_str=vepffrbiupladsdnnipr&r=main&from=wap-atb-mobile&plang=";
    window.location = downUrl;
}

$(function () {
    if (!isClose) {
        if (currentUrl.indexOf("unionpay") > 0) {

        } else {
            var top = $("#imagQrDiv").offset().top + (240 / 2) - 15;
            var left = $("#imagQrDiv").offset().left + (240 / 2) + 15;
//			$('#qrCodeIco').css({
//				'left' : left,
//				'top' : top
//			}).show();
        }
//		var mycanvas1 = document.getElementsByTagName('canvas')[0];
//		var img = convertCanvasToImage(mycanvas1);
//		$('#imagQrDiv').append(img);// imagQrDiv表示你要插入的容器id
//		
        /* 移动端并且开启了隐藏二维码 */
        if (isMobile() && hideQrcode == "true") {
            $("#clipTag").empty();
        } else {
            $("#cQrCode").qrcode({
                render: "canvas", // table方式
                width: 240, // 宽度
                height: 240, // 高度
                text: decodeURIComponent(payUrl)
                // 任意内容
            });

            $('#cQrCode').css({
                'width': 240,
                'height': 240
            }).show();

            $("#clipTag").show();
            $("#imagQrDiv").show();
            $("#cQrCode").show();
        }
    }
});

//从 canvas 提取图片 image
function convertCanvasToImage(canvas) {
    //新Image对象，可以理解为DOM
    var image = new Image();
    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
    // 指定格式 PNG
    image.src = canvas.toDataURL("image/png", 0.5);
    return image;
}

var myApp = angular.module("myApp", [])
    .controller("myqrController", function ($scope, $interval) {


        $scope.timeOut = parseInt(t);//
        var timer = $interval(function () {
            $scope.timeOut -= 1;
            var pringTime = "";
            var mm = parseInt($scope.timeOut / 60);
            var mmStr = mm < 10 ? "0" + mm : mm + ""
            if ($scope.timeOut % 60 < 10) {
                printTime = "00:" + mmStr + ":0" + $scope.timeOut % 60
            } else {
                printTime = "00:" + mmStr + ":" + $scope.timeOut % 60
            }
            $("#djs").text(printTime);
            if ($scope.timeOut <= 0) {
                $interval.cancel(timer);
                $("#cQrCode").empty();
                $("#imagQrDiv").empty();
                $("#imagQrDiv").text("订单超时,请重新下单");
                $("#payButton1").hide();
                $("#payButton").hide();
                return;
            }
            if ($scope.timeOut < 10) {

            } else if ($scope.timeOut % 5 == 0) {
                /*$.ajax({
                    type : "PUT",
                    url : location.href,
                    data:{
                    },
                    success : function(r) {
                        console.log(r);
                        if (r == "success") {
                            $interval.cancel(timer);
                            $("#cQrCode").empty();
                            $("#imagQrDiv").empty();
                            $("#imagQrDiv").text("订单支付成功!");
                            $("#payButton1").hide();
                            $("#payButton").hide();
                            if(reUrl != "")
                                location.href = reUrl + "?orderNo=" + orderNo;
                        }else{
                            return;
                        }
                    }
                })*/
            }
            console.log($scope.timeOut);
        }, 1000);

    });
