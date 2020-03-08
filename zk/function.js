//（前面加0） 补齐成I位数
function buqi(num,i){
    num=num.toString();
    var length=num.length;
    if(length<i){
        for(var j=0;j<i-length;j++ ){
            num=0+num;
        }
    }
    return num;
}



//返回对象
function writeObj(obj){ 
 var description = ""; 
 for(var i in obj){ 
 var property=obj[i]; 
 description+=i+" = "+property+"\n"; 
 } 
 return description; 
} 


//时间戳转换成时间
function getDate(tm){
    if(!tm||tm==0){
        return '';
    }
    var time = new Date(parseInt(tm) * 1000);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
} 
function add0(m){return m<10?'0'+m:m; }
//验证手机号，如果是，返回true,否则返回false
function is_shoujihao(str){
    var reg=/^1[3458]\d{9}$/gi;
    return reg.test(str);
}


//验证邮箱，如果是返回true,否则返回false
function is_youxiang(str){
    var reg=/^\w+[.\w]*@(\w+\.)+\w{2,4}$/gi;
    return reg.test(str);
}


//验证IP是否有效，如果是返回true,否则返回false
function is_ip(str){
    var reg = /^([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}$/gi;
    return reg.test(str);
}

//验证是否含有非法字符，含有非法返回非法字符，否则返回false
function is_feifa(str){
    var reg = /[=;:#&\\\/\^\$\(\)\[\]\{\}\*\+\?\-\"\']+/gi;
    var result= reg.exec(str);
    return result;
}

//得到充值类型
function get_charge_type(charge_type){
    switch(charge_type){
        case '1':
            return '微信扫码';
        case '2':
            return '支付宝红包';
        case '3':
            return '支付宝扫码';
        case '4':
            return '支付宝收款';
        case '5':
            return '旺信红包';
        case '6':
            return '支付宝转卡';
        case '7':
            return '聚合码微信';
        case '8':
            return '聚合码支付宝';
        case '10':
            return '微信到卡';
        case '11':
            return '银联扫码';
        case '12':
            return '银联手动';
        case '13':
            return '支转卡复制';
        case '14':
            return '云闪付复制';
        case '15':
            return '支转帐复制';
        case '16':
            return '微转账复制';
        case '17':
            return '支转账飞行';
        case '18':
            return '云闪付平安';
        case '19':
            return '支付宝淘宝';
    }
}



//得到浏览器类型
function get_browser_type(){
    if(!is_mobile()){
        return 'pc';
    }else if (/MicroMessenger/.test(window.navigator.userAgent)) {
        return 'weixin';
    } else if (/AlipayClient/.test(window.navigator.userAgent)) {
        return 'zhifubao';
    } else {
        return 'mobile';
    }      
}


//是否手机端
function is_mobile() {

    var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;

    var u = navigator.userAgent;

    if (null == u) {
        return true;
    }
    var result = regex_match.exec(u);
    if (null == result) {
        return false
    } else {
        return true
    }

}


