/**
 * Created by Administrator on 2016/8/4.
 * author yaoqianfeng
 */
function grid(){
    var _self=this;
    _self.ctx=appConfig.context;
    _self.gridWidth = (function(){
        var w=Math.floor((appConfig.canvas.width-(appConfig.horizonGridCount+1)*2) / appConfig.horizonGridCount);
        return w;
    })();
    _self.gridHeight = (function(){
        var h=Math.floor((appConfig.canvas.height-(appConfig.verticalGridCount+1)*2) / appConfig.verticalGridCount);
        return h;
    })();
    appConfig.margin[0]=Math.floor((appConfig.canvas.height-(_self.gridHeight+2)*appConfig.verticalGridCount)/2);
    appConfig.margin[2]=appConfig.margin[0];
    appConfig.margin[1]=Math.floor((appConfig.canvas.width-(_self.gridWidth+2)*appConfig.horizonGridCount)/2);
    appConfig.margin[3]=appConfig.margin[1];

    _self.coordinate=(function(){
        var x,y;
        var coordinate=[];
        //生成格子坐标
        for(var j=0;j<appConfig.verticalGridCount;j++){
            for(var i=0;i<appConfig.horizonGridCount;i++){
                x=i*(_self.gridWidth+2)+1+appConfig.margin[1];
                y=j*(_self.gridHeight+2)+1+appConfig.margin[0];
                coordinate.push([x,y]);
            }
        }
        return coordinate;
    })();
}

grid.prototype.draw=function(x, y, width, height, isImageGrid, index){
    /*生产格子,用于在相应的坐标位置绘制纯色格子、图片格子*/
    console.info("生产格子");
    //画矩形 or 画图
    //双缓冲 or 离屏(save/restore)
    var _self = this;
    if (isImageGrid) {

    } else {
        var colorList = [
            "rgb(205,15,15)", "rgb(20,150,14)", "rgb(222,194,64)", "rgb(218,113,35)", "rgb(39,131,234)",
            "rgb(235,15,196)"
        ];
        _self.ctx.fillStyle = colorList[index];
        _self.ctx.lineWidth = 1;
        _self.ctx.strokeStyle = "#fff";
        _self.ctx.fillRect(x, y, width, height);
        _self.ctx.strokeRect(x, y, width, height);
    }
}