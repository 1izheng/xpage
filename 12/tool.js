"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _protocol = window.location.protocol;
var _host = window.location.host;
var api = _protocol + "//" + _host;
var ua = navigator.userAgent;
//is app
var isAliUa = ua.toLowerCase();
//格式化-设备型号
var uaage = ua.split("(")[1].split(")")[0];
//工具函数 1、获取url参数、订单过期、拼接时间函数 2.判断是否pc 还是移动
var Tool = /** @class */ (function () {
    function Tool() {
        this.urldata = decodeURIComponent(location.search);
    }
    //获取url参数
    Tool.prototype.cutUrl = function (strName) {
        var intPos = this.urldata.indexOf("?");
        var strRight = this.urldata.substr(intPos + 1);
        if (strName === "qrcode") {
            return strRight;
        }
        else {
            var arrTmp = strRight.split("&");
            for (var i = 0; i < arrTmp.length; i++) {
                var arrTemp = arrTmp[i].split("=");
                if (arrTemp[0].toUpperCase() == strName.toUpperCase()) {
                    return arrTemp[1];
                }
            }
            return "";
        }
    };
    //判断是否移动还是pc
    Tool.prototype.isMatchPcAndMobile = function () {
        var _uamatch = ua.match(/(iPhone|iPod|Android|ios|Mobile)/i);
        if (_uamatch) {
            return true;
        }
        else {
            return false;
        }
    };
    //订单过期、非法操作
    Tool.prototype.removeEl = function (text, el) {
        if (text === void 0) { text = "订单过期"; }
        if (el === undefined || el === "undefined") {
            var _el = document.querySelector(".wrap");
            if (_el) {
                _el.innerHTML = "<p>" + text + "</p>";
            }
        }
        else {
            el.innerHTML = "<p>" + text + "</p>";
        }
    };
    //获取当前时间
    //行为时间
    Tool.prototype.nowTime = function () {
        var time = new Date();
        var y = time.getFullYear();
        var mon = time.getMonth() + 1;
        mon = mon < 10 ? "0" + mon : mon;
        var d = time.getDate();
        d = d < 10 ? "0" + d : d;
        var h = time.getHours();
        h = h < 10 ? "0" + h : h;
        var m = time.getMinutes();
        m = m < 10 ? "0" + m : m;
        var s = time.getSeconds();
        s = s < 10 ? "0" + s : s;
        var sdate = y + "-" + mon + "-" + d + " " + h + ":" + m + ":" + s;
        return sdate;
    };
    //判断
    Tool.prototype.isAlipage = function () {
        if (isAliUa.match(/Alipay/i) == "alipay") {
            return true;
        }
        else {
            return false;
        }
    };
    //生成随机字符串
    /**
     * randomWord 产生任意长度随机字母数字组合
     * @param randomFlag 是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
     * @param min
     * @param max
     * @returns {string}
     */
    Tool.prototype.randomWord = function (randomFlag, min, max) {
        var str = "";
        var range = min;
        var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var pos;
        // 随机产生
        if (randomFlag) {
            range = Math.round(Math.random() * (max - min)) + min;
        }
        for (var i = 0; i < range; i++) {
            pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    };
    return Tool;
}());
//倒计时类
var TimeCountDown = /** @class */ (function (_super) {
    __extends(TimeCountDown, _super);
    function TimeCountDown() {
        var _this = _super.call(this) || this;
        //获取URL里面的时间戳
        _this.time = _super.prototype.cutUrl.call(_this, "t");
        return _this;
    }
    //存储倒计时-防止页面刷新后-重置
    TimeCountDown.prototype.setTime = function (times) {
        if (times === void 0) { times = 180; }
        //订单倒计时
        var dqOidtime = this.time;
        //过期时间
        var endtimeCountDown = times * 1000 + parseInt(dqOidtime);
        //当前时间戳 
        var _nowTime = new Date().getTime();
        //倒计时过期时间
        var locksecends = (parseInt(endtimeCountDown) - _nowTime) / 1000;
        //直线倒计时
        this.pageCountDown(locksecends);
    };
    //倒计时-解决时间差
    TimeCountDown.prototype.setTimecha = function (times) {
        if (times === void 0) { times = 180; }
        //当前时间戳 
        var _nowTime = new Date().getTime();
        //console.log(_nowTime +"当前时间-服务器时间");
        //订单倒计时
        var dqOidtime = this.time;
        //过期时间
        var endtimeCountDown = times * 1000 + parseInt(dqOidtime);
        console.log(endtimeCountDown + "过期时间");
        //获取上海时间
        var _nowTimeBeijing = (new Date).toLocaleString(undefined, {
            hour12: false,
            timeZone: "Asia/Shanghai"
        });
        console.log(_nowTimeBeijing + "上海时间");
        //格式化上海时间为时间戳
        var timeges = new Date(_nowTimeBeijing).getTime();
        console.log(timeges + '格式化上海时间');
        console.log(new Date(timeges));
        alert(new Date(timeges) + '');
        //alert(timeges);
        //倒计时过期时间
        var locksecends = (parseInt(endtimeCountDown) - timeges) / 1000;
        console.log(locksecends + "倒计时过期时间");
        //直线倒计时
        this.pageCountDown(locksecends);
    };
    //倒计时dom操作
    TimeCountDown.prototype.pageCountDown = function (intDiff) {
        var _this = this;
        var day = 0, hour = 0, minute = 0, second = 0;
        //节点
        var hour_show = document.getElementById("hour_show");
        var minute_show = document.getElementById("minute_show");
        var second_show = document.getElementById("second_show");
        this.twoPageCountDownTimer = setInterval(function () {
            if (intDiff > 0) {
                day = Math.floor(intDiff / (60 * 60 * 24));
                hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                if (minute <= 9)
                    minute = '0' + minute;
                if (second <= 9)
                    second = '0' + second;
                if (hour_show && minute_show && second_show) {
                    hour_show.innerHTML = '<s id="h"></s>' + hour + '时';
                    minute_show.innerHTML = '<s></s>' + minute + '分';
                    second_show.innerHTML = '<s></s>' + second + '秒';
                }
                if (hour <= 0 && minute <= 0 && second <= 0) {
                    _super.prototype.removeEl.call(_this, "订单过期");
                    clearInterval(_this.twoPageCountDownTimer);
                }
                intDiff--;
            }
            else {
                clearInterval(_this.twoPageCountDownTimer);
                _super.prototype.removeEl.call(_this, "订单过期");
                return;
            }
        }, 1000);
    };
    return TimeCountDown;
}(Tool));
