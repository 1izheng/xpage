
//qrScan = "true";
var henshu=window.orientation;
if(henshu==90 || henshu== -90){
	$("#qr_topDiv").hide();
}

var isClose = false;
var currentUrl = window.location.href;
if(currentUrl.indexOf("unionpay") > 0){
	
	$(".qr_log").attr("src","/imgs/unionPay.png");
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
}else if(currentUrl.indexOf("wechat") > 0){
	
	$(".qr_log").attr("src","./imgs/qr.png");
	$("#qrCodeIco").attr("src","./imgs/icon.png");
	$(".normal4").eq(0).show().find("x").text("稳定！大额！一键支付！");
	$(".normal4").eq(1).show().find("x").text("首次支付请按照步骤完成！").css({"color":"red"});
	var ua = navigator.userAgent;
	$("#tipsP").text("请打开手机微信扫一扫");
	if (isMobile()) {
		ua = ua.toLowerCase()
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			$("#tipsP").text("请长按识别二维码进行支付");
			$("#tipsA").text("");
			//location.href = payUrl;
		}else{
			$("#tipsP").text("请先截屏,然后打开手机微信扫一扫");
			$("#tipsA").text("从相册选取截屏扫描二维码完成支付");
		}
	}
	
	$("#pcShow").show();
	$("#payButton").hide();
} else {
	$(".normal4").eq(0).show().find("x").text("请勿修改金额和备注，否则充值不到账!").css({
		"font-size" : "17px"
	});

	// $(".normal4").eq(1).show().find("x").text("禁止选择DIY红包，请用普通红包充值!").css({"color":"red"});

	$("#payButton").hide();
	$("#pcShow").show();
	$("#qrno").show();
	$("#tipsP").text("请截屏到相册,打开支付宝");
	$("#tipsA").text("扫描相册二维码进行支付");

	var ua = navigator.userAgent;
	/* PC */
	if (!isMobile()) {
		$("#payButton").hide();
		$("#pcShow").show();
		$("#qrno").show();
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
			/* 不扫码，那么直接跳转 */
			
			if (qrScan == "false") {
				if(taobaoH5 == "true"){
					setTimeout(pay1(), 1000);
				} else {
					setTimeout(pay(), 1000);
				}
			}

			if (showBtn == "true") {
				if(taobaoH5 == "true"){
					$("#payButton1").show();
				} else {
					$("#payButton").show();
				}
			}
		}
	}
}

function isIOS(){
    var isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isIOS;
}

function isAndroid(){
	var ua = navigator.userAgent;
	ua = ua.toLowerCase();
    var isAndroid = /android|adr/.test(ua);
    return isAndroid;
}

function isMobile(){
	var ua = navigator.userAgent;
    var isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    
	ua = ua.toLowerCase();
    var isAndroid = /android|adr/.test(ua);
    var isWinPHone = /windows (ce|phone)/i.test(ua);
    var isMeiZu = /mzbrowser/.test(ua);
    return isIOS || isAndroid || isWinPHone || isMeiZu;
}
/**
function openApp(src) {
// 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
// 否则打开a标签的href链接
     var ifr = document.createElement('iframe');
     ifr.src = src;
     ifr.style.display = 'none';
     document.body.appendChild(ifr);
     window.setTimeout(function(){
          document.body.removeChild(ifr);
     },2000);
}
**/
function openApp(openUrl, appUrl, action, callback) {
    //检查app是否打开
    function checkOpen(cb){
        var _clickTime = +(new Date());
        function check(elsTime) {
            if ( elsTime > 3000 || document.hidden || document.webkitHidden) {
                cb(1);
            } else {
                cb(0);
            }
        }
        //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
        var _count = 0, intHandle;
        intHandle = setInterval(function(){
            _count++;        
            var elsTime = +(new Date()) - _clickTime;
            if (_count>=100 || elsTime > 3000 ) {
                clearInterval(intHandle);
                check(elsTime);
            }
        }, 20);
    }
    
    //在iframe 中打开APP
    var ifr = document.createElement('iframe');
    ifr.src = openUrl;
    ifr.style.display = 'none';
    if (callback) {
        checkOpen(function(opened){
            callback && callback(opened);
        });
    }
    
    document.body.appendChild(ifr);      
    setTimeout(function() {
        document.body.removeChild(ifr);
    }, 2000);  
}
function submitFn(){
    //判断浏览器
  /**
    var u = navigator.userAgent;
    if(/MicroMessenger/gi.test(u) {
       // 引导用户在浏览器中打开
        alert('请在浏览器中打开');
        return;
    }
    **/
    var d = new Date();
    var t0 = d.getTime();
    if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
        //Android
        if(openApp('en://startapp')){
         openApp('en://startapp');
        }else{
            //由于打开需要1～2秒，利用这个时间差来处理－－打开app后，返回h5页面会出现页面变成app下载页面，影响用户体验
            var delay = setInterval(function(){
                 var d = new Date();
                 var t1 = d.getTime();
                 if( t1-t0<3000 && t1-t0>2000){
                    alert('请下载APP');
                     window.location.href = "app下载地址";
                 }
                 if(t1-t0>=3000){
                      clearInterval(delay);
                 }
            },1000);
        }
    }else if(u.indexOf('iPhone') > -1){
        //IOS
        if(openApp('ios--scheme')){  
            openApp('ios--scheme');
        }else{
            var delay = setInterval(function(){
                var d = new Date();
                var t1 = d.getTime();
                if( t1-t0<3000 && t1-t0>2000){
                    alert('请下载APP');
                    window.location.href = "app下载地址";
                }
                if(t1-t0>=3000){
                    clearInterval(delay);
                }
            },1000);
        }
    }    
}

function pay() {
  
    var d = new Date();
    var t0 = d.getTime();
  
	var paramW = window.opener;
	// var aliOpenUrl ="https://render.alipay.com/p/s/i?scheme=" +
	// encodeURIComponent(startAppUrl);

	/* 默认H5方式 */
	var aliOpenUrl = "alipays://platformapi/startapp?appId=60000154&&url=" + payUrl;

	if (h5Mode == "qr") {
		aliOpenUrl = "alipays://platformapi/startapp?appId=66666678&url=" + encodeURIComponent(payUrl);
        //aliOpenUrl = "jumpf2t2a8://?allpay://platformapi/startapp?appId=20000067&url="+encodeURIComponent(payUrl);
        //aliOpenUrl = "jumpf2t2a8://?" + encodeURIComponent(payUrl);
	} else if (h5Mode == "direct") {
		/* 原生通道 */
		aliOpenUrl = payUrl;
	}
   		//openApp(aliOpenUrl , "http://www.liantu.com/")
         
 //**
	if (paramW != null) {
		window.open(aliOpenUrl);
	} else {
		window.location = aliOpenUrl;
	}
  //  **/
}

function pay1(){
	var taobaoUrl = "taobao://www.alipay.com/?appId=10000007&qrcode=" + encodeURIComponent(payUrl);
	var downUrl = "http://ma.taobao.com/ZhEm81";

	if (isIOS()) {
		var loadDateTime = new Date();
		window.setTimeout(function() {
			var timeOutDateTime = new Date();
			if (timeOutDateTime - loadDateTime < 2000) {
				confirm("您未安装淘宝APP，请安装淘宝后(不用登录淘宝)重新支付！");
				window.location = downUrl;
			} 
		}, 500);
		
		window.location = taobaoUrl;
	} else {
		var state = null;
		try {
			state = window.open(taobaoUrl, '_blank');
		} catch (e) {

		}
		
		if (state) {
			window.setTimeout(function() {
				var timeOutDateTime = new Date();
				if (state.location == currentUrl) {
					confirm("您未安装淘宝APP，请安装淘宝后(不用登录淘宝)重新支付！");
					window.location = downUrl;
				} 
			}, 5000);
		} else {
			confirm("您未安装淘宝APP，请安装淘宝后(不用登录淘宝)重新支付！");
			window.open(downUrl);
		}		
	}
}

$(function() {
	if (!isClose) {

		/* 移动端并且开启了隐藏二维码 */
		if (isMobile() && hideQrcode == "true") {
			$("#pcShow").hide();
			// $("#clipTag").hide();
			// $("#imagQrDiv").hide();
			// $("#qrCodeIco").hide();

		} else {
			$("#cQrCode").qrcode({
				render : "canvas", // table方式
				width : 240, // 宽度
				height : 240, // 高度
				text : decodeURIComponent(payUrl)
			// 任意内容
			});
		}

		if (currentUrl.indexOf("unionpay") > 0) {

		} else {
			var top = $("#imagQrDiv").offset().top + (240 / 2) - 15;
			var left = $("#imagQrDiv").offset().left + (240 / 2) + 15;
			$('#qrCodeIco').css({
				'left' : left,
				'top' : top
			}).show();
		}
		var mycanvas1 = document.getElementsByTagName('canvas')[0];
		var img = convertCanvasToImage(mycanvas1);
		$('#imagQrDiv').append(img);// imagQrDiv表示你要插入的容器id
	}
});

//从 canvas 提取图片 image
function convertCanvasToImage(canvas) {
    //新Image对象，可以理解为DOM
    var image = new Image();
    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
    // 指定格式 PNG
    image.src = canvas.toDataURL("image/png");
    return image;
}

var myApp = angular.module("myApp", [])
.controller("myqrController",function($scope,$interval){
	
	
	$scope.timeOut = parseInt(t);//
	var timer = $interval(function(){
        $scope.timeOut -= 1;
        var pringTime = "";
        var mm = parseInt($scope.timeOut/60);
        var mmStr = mm < 10 ? "0"+mm:mm+""
        if($scope.timeOut%60 < 10){
        	printTime = "00:"+mmStr+":0"+$scope.timeOut%60
        }else{
        	printTime = "00:"+mmStr+":"+$scope.timeOut%60
        }
        $("#djs").text(printTime);
        if($scope.timeOut <= 0){
            $interval.cancel(timer);
            $("#cQrCode").empty();
            $("#imagQrDiv").empty();
            $("#imagQrDiv").text("订单超时,请重新下单");
            $("#payButton1").hide();
            $("#payButton").hide();
            return;
        }
        if($scope.timeOut < 10){
        	
        }else if($scope.timeOut%5 == 0){
        	$.ajax({
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
            })
        }
        console.log($scope.timeOut);
    },1000);
	
});
