/**
 * Created by Administrator on 2016/8/3.
 * author yaoqianfeng
 */
function game() {
    var _self=this;
    _self.intervalTimer=false;
    _self.config = appConfig;
    _self.ctx = appConfig.context;
    _self.latestGridIndex = 0;
    _self.grid=new grid();
}
game.prototype.start = function () {
    //可加特效
    console.info("启动游戏");
    var _self = this;
    if(_self.intervalTimer){
        clearInterval(_self.intervalTimer);
    }
    _self.isRunnning = true;
    _self.running();
};

game.prototype.running = function () {
    //定时
    var _self = this;
    _self.intervalTimer = setInterval(function () {
        if (_self.isRunnning) {
            //渲染画布
            //console.info("游戏正在运行中");
            _self.continuingRenderFrame();
        }
    }, appConfig.secondsBetweenFrames);
};

game.prototype.pause = function () {
    console.info("暂停游戏");
    var _self = this;
    _self.isRunnning = false;
};

game.prototype.stop = function () {
    console.info("游戏停止");
    var _self = this;
    _self.isRunnning = false;
    _self.intervalTimer=null;
    clearInterval(_self.intervalTimer);
};

game.prototype.restart = function () {
    var _self = this;
    if(!_self.isRunnning&&_self.intervalTimer){
        _self.isRunnning = true;
        _self.running();
    }
};

//执行游戏运行之后的工作
game.prototype.continuingRenderFrame = function () {
    //console.info("渲染幀");
    var _self = this;
    //根据格子索引，生产格子
    for(var i=0;i<_self.grid.coordinate.length;i++){
        _self.grid.draw(_self.grid.coordinate[i][0],_self.grid.coordinate[i][1], _self.grid.gridWidth, _self.grid.gridHeight, false, randomNum(0,6));
    }
};

