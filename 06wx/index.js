// 必须先引入layer 与jquery 
const app = {
    API: `${window.location.protocol}//${window.location.host}`, //当前域名
    NAViGATER: navigator.userAgent, //当前设备类型
    INTERFACE_API: '', //请求地址
    AJAX_ROTTRA: 15,  //ajax 轮训次数
    loadingInterface: null, //loading
    startLoading: new Function(), //开启loading
    endLoading: new Function(), //关闭loading
    getData: new Function(),    //请求数据
    cutUrl: new Function(),  //截取参数
    error: new Function(),  //错误展示
    isJudgmaentType: new Function(),//判断数据类型
    isMobile: new Function() ,  //判断设备类型
    saveCallback:null  //保存回掉函数

};

// 开启loading
app.startLoading = () => {
    layui.use(['layer'], function () {
        // loading层
        var width = document.body.offsetWidth;
        var wdithpx = (width / 2 - 70 / 2);
        app.loadingInterface = layer.load(1, {
            content: '正在加载中...',
            shade: [0.8, '#393D49'],
            offset: ['40%', wdithpx],
            // time: 10 * 1000,
            success: function (layero) {
                layero.find('.layui-layer-content').css({
                    'padding-top': '40px',
                    'width': '90px',
                    'color': '#fff',
                    'background-position-x': '16px'
                });
            }
        })
    });
}


// 关闭loading
app.endLoading = () => {
    layui.use(['layer'], function () {
        layer.close(app.loadingInterface);
    });
}


//截取参数
app.cutUrl = (strName) => {
    let curLocaSerch = decodeURIComponent(location.search);
    let intPos = curLocaSerch.indexOf('?');
    var strRight = curLocaSerch.substr(intPos + 1);
    var arrTmp = strRight.split("&");
    for (var i = 0; i < arrTmp.length; i++) {
        var arrTemp = arrTmp[i].split("=");
        if (arrTemp[0].toUpperCase() == strName.toUpperCase()) {
            return arrTemp[1];
        }
    }
    return "";
}

//判断数据类型
app.isJudgmaentType = (isType, data) => {
    function istype(type) {
        return function (obj) {
            return Object.prototype.toString.call(obj).includes(type);
        }
    }
    let types = ['Object', 'String', 'Boolean', 'Array', 'Null', 'undefined'];
    let fns = {}
    types.forEach(type => {
        fns['is' + type] = istype(type)
    })
    return fns[isType](data)
}

//错误展示
app.error = (err) => {
    $("#err").show();
    $(".error-title").text(err)
    $('#content').hide();
}
//请求地址
app.INTERFACE_API = decodeURIComponent(app.cutUrl("a"))

//请求数据
app.getData = (callback) => {
    app.saveCallback = callback;
    // 请求参数
    // app.endLoading()
    const req = {
        oid: app.cutUrl('oid'),
        sign: app.cutUrl('sign'),
        t: app.cutUrl('t')
    }

    // ajax
    $.ajax({
        url: `${app.INTERFACE_API}/api/rechg/getTradeNo`,
        type: "POST",
        contentType: "application/json",
        async: false, //请求是否异步，默认为异步，这也是ajax重要特性   
        data: JSON.stringify(req),
        dataType: "json",
        timeout: 10000,
        success: (res) => {
            if (res && res.code === 80006) {
                setTimeout(() => {
                    app.AJAX_ROTTRA--;
                    if (app.AJAX_ROTTRA <= 0) {
                        app.error('下单失败,请重新下单');
                        $(".loading").hide();
                        return
                    }
                    app.getData(app.saveCallback);
                }, 1000)
            }
            if (res && res.code === 400) {
                $(".loading").hide();
                if (app.isJudgmaentType('isArray', res.err)) {
                    app.error('下单失败,请重新下单')
                    return
                }
                app.error(res.err)
            };

            if (res && res.code === 200) {
              $(".loading").hide();
              app.saveCallback(res.msg);
            }
        },
        error: (err) => {
            console.log(err)
        }

    })
}

//判断设备类型
app.isMobile = () => {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid == true)
      return "Android";
    if (isiOS == true)
      return "Ios";
    return "PC";
}

