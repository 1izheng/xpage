var _protocol = window.location.protocol;
var _host = window.location.host;
var api = _protocol + "//" + _host;
var _url = location.search;
var app = new Object();
app = {
    maxtime: 1,
    data: {},
    res:{},
    traTimer : 0,
    flag:false,
    showData: function (res) {
        $('.toAmount').text("￥" + res.amount + "元")
        this.text(account, res.account );
        this.text(timeout, this.formatTime(_tradeNoDataMain.t));
        this.text(realName, res.alipayName);
        this.qrcode = new QRCode(document.getElementById("qrcode"), {
            text: res.payUrl,
            width: 380,
            height: 380,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        if(res.amount){
            $(".copyMoney").attr("data-clipboard-text", res.amount);
            this.copyFun();
        }
        if(res.amount){
            $("#copyBtn").attr("data-clipboard-text", res.amount);
            this.copyBtn();
        }
        if(res.account){
            $("#copyAct").attr("data-clipboard-text", res.account);
            this.copyAct();
        }
        loading.style.display = 'none';
        // acData.action = "qrcode_created|" + this.nowTime();
        // this.logUser(acData);
    },
    showDataqp: function (res) {
        $('.toAmount').text("￥" + res.amount + "元")
        // this.text(amount, "￥" + res.amount + "元");
        // this.text(account, res.account );
        // this.text(orderId, _tradeNoDataMain.oid);
        this.text(timeout, this.formatTime(_tradeNoDataMain.t));
        // this.text(realName, res.alipayName);
        this.qrcode = new QRCode(document.getElementById("qrcode"), {
            text: res.urlsasd,
            width: 380,
            height: 380,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        if(res.amount){
            $(".copyMoney").attr("data-clipboard-text", res.amount);
            this.copyFun();
        }
        if(res.amount){
            $("#copyBtn").attr("data-clipboard-text", res.amount);
            this.copyBtn();
        }
        if(res.account){
            $("#copyAct").attr("data-clipboard-text", res.account);
            this.copyAct();
        }
        loading.style.display = 'none';
        // acData.action = "qrcode_created|" + this.nowTime();
        // this.logUser(acData);
    },
    text: function (node, txt) {
        node.innerText = txt;
    },
    start: function (res) {
    this.showData(res.msg);
    },
    showPayWrap: function () {
        payWrap.style.display = 'block';
        if (this.res.msg && JSON.stringify(this.res.msg) !=='{}') {
            this.showData(this.res.msg);
            return;
        } 
    },
    showDialog: function () {
        dialog.style.display = 'block';
        this.startCountDown();
    },
    hideDialog: function () {
        dialog.style.display = 'none';
    },
    agree: function () {
        this.hideDialog();
        this.showPayWrap();
        this.flag =true;
        acData.action = "click_agree|" + this.nowTime();
        this.logUser(acData);
    },
    disagree: function () {
        this.hideDialog();
        acData.action = "click_disagree|" + this.nowTime();
        this.logUser(acData);
    },
    startCountDown: function () {
        var me = this;
        this.timer = window.setInterval(function () {
            me.countDown()
        }, 1000);
    },
    countDown: function () {
        --this.maxtime;
        this.text(agree, "等待 " + this.maxtime + " 秒");
        if (this.maxtime == 0) {
            window.clearInterval(this.timer);
            this.text(agree, "我已阅读并接受");
            agree.disabled = false;
        }
    },
    cutUrl: function (strName) {
        var strHref = _url;
        var intPos = strHref.indexOf("?");
        var strRight = strHref.substr(intPos + 1);
        if (strName == 'qrcode') {
            return strRight;
        }
        var arrTmp = strRight.split("&");
        for (var i = 0; i < arrTmp.length; i++) {
            var arrTemp = arrTmp[i].split("=");
            if (arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
        }
        return "";
    },
    formatTime:function(t){
        let time = new Date(Number(t)+Number(3*60*1000));
        let hour = time.getHours();
        let min = time.getMinutes();
        if(hour <10){
            hour = '0' + hour;
        }
        if(min <10){
            min = '0' + min;
        }
        let expTime = hour + ':' + min;
        return expTime;
    },
    nowTime:function() {
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
    },
    logUser:function(data) {
        $.ajax({
            url: `${interface_api}/api/rechg/action/addAction`,
            dataType: "json",
            async: true,
            data: data,
            type: "POST",
            success: function (suc) {},
            error: function (err) {}
        });
    },
    copyFun:function(){
        $('.copyMoney').on('click', function () {
        var goAliPayCv = $(".copyMoney").attr("data-clipboard-text");
        var clipboard = new ClipboardJS('.copyMoney');
        clipboard.on('success', function (e) {
            $(".showNone").show();
            setTimeout(function () {
                $(".showNone").fadeOut();
            }, 400);
        });
        clipboard.on('error', function (e) {
            alert("复制金额失败，请手动复制");
        });
    })
    },
    copyBtn:function(){
        $('#copyBtn').on('click', function () {
        var goAliPayCv = $("#copyBtn").attr("data-clipboard-text");
        var clipboard = new ClipboardJS('#copyBtn');
        clipboard.on('success', function (e) {
            $(".showNone").show();
            setTimeout(function () {
                $(".showNone").fadeOut();
            }, 400);
        });
        clipboard.on('error', function (e) {
            alert("复制金额失败，请手动复制");
        });
    })
    },
    copyAct:function(){
        $('#copyAct').on('click', function () {
        //  acData.action = "copy_act|" + app.nowTime();
        //  app.logUser(acData);
        var goAliPayCv = $("#copyAct").attr("data-clipboard-text");
        var clipboard = new ClipboardJS('#copyAct');
        clipboard.on('success', function (e) {
          loading.style.display = 'none';
            $(".showNone").show();
            setTimeout(function () {
                $(".showNone").fadeOut();
            }, 400);
        });
        clipboard.on('error', function (e) {
            alert("复制账号失败，请手动复制");
        });
    })
    }
};