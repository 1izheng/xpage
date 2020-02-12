//rem
new function (){
    var _self = this;
    _self.width = 490;//设置默认最大宽度   (640/490/2=0.65306)
    _self.fontSize = 100;//默认字体大小
    _self.widthProportion = function(){var p = (document.body&&document.body.clientWidth||document.getElementsByTagName("html")[0].offsetWidth)/_self.width;return p>1?1:p<0.65306?0.65306:p;}; 
    _self.changePage = function(){
        document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+_self.widthProportion()*_self.fontSize+"px !important");
        //  alert(_self.widthProportion());
    }
    _self.changePage();
    window.addEventListener('resize',function(){_self.changePage();},false);
}