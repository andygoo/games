/*对象、状态/行为、属性*/
function App(){
    var _self = this;
    _self.canvas=null;
    _self.context=null;
    _self.isPaper=false;
    _self.prop=0;
}
//铺好布局，一切就绪，将开始游戏
App.prototype.init=function(){
    var _self = this;
    //初始化画布
    _self.isPaper=(function(){
        _self.canvas=util.$$(appConfig.container);
        _self.canvas.width = window.innerWidth;
        _self.canvas.height = window.innerHeight;
        if (!_self.canvas.getContext) {
            return false;
        }
        _self.context = _self.canvas.getContext('2d');

        appConfig.ratio= util.getPixelRatio(_self.context);
        return true;
    })();

    //加载资源文件
    var loader=new Loader();
    loader.loadingImage({
        url: function () {
            return loader.getUrl();
        },
        oncomplete: function (s) {
            loader.loadingEffect(s);
        },
        complete: function (imgs, s) {
            if (s.total == s.load + s.error) {
                var $image = util.$$("index-bg");
                //首页设计稿尺寸是1242×2016，其他页是750×1334
                appConfig.prop=((_self.canvas.width) / $image.width);
                appConfig.propH=((_self.canvas.height) / $image.height);
                // var html="<div>ratio="+appConfig.ratio+",prop="+appConfig.prop+"</div><div>window.innerWidth="+window.innerWidth+",canvasWidth="+_self.canvas.width+"</div><div>imageWidth="+$image.width+"</div>";
                // $("#debug-info").append(html);
                if(_self.isPaper){
                    _self.game= new Game();
                    _self.game.start();
                }
            }
        }
    });
};

var application=(function () {
    var appInstance = new App();
    return appInstance;
})();
application.init();