/*锤子*/
function Hammer() {
    this.step = 0;
    this.speed = 2500;// 每秒移动的像素
    this.isFail = false;
    this.hammerTimer = null;
    this.style = 'normal';//'hammer' 'hammer-beat'
    this.startX = Math.round(util.getCoordinateMap(30, 200).x * application.canvas.width);
    this.startY = Math.round(util.getCoordinateMap(30, 200).x * application.canvas.width);
    this.stopX = Math.round(util.getCoordinateMap(30, 300).x * application.canvas.width);
    this.stopY = Math.round(util.getCoordinateMap(30, 300).y * application.canvas.height);
    this.x = 0;
    this.y = 0;
    this.rect={
        x:0,
        y:0,
        width:0,
        height:0
    }
}
//设置一次，掉一次锤子
Hammer.prototype.isFailing = function () {
    var _self=this;
    if(!_self.isFail){//产生的随机数条件符合而且上一次的锤子结束运动
        _self.isFail=true;
    }
    return _self.isFail;
};

Hammer.prototype.fall = function (modifier) {
    var _self = this;
    var x =parseInt( _self.x = _self.startX);
    var y=_self.y = parseInt(_self.y + _self.speed * modifier);

    _self.paint('hammer-' + _self.style,x,y);
    //判断该锤子状态是否应该结束
    if (y >= _self.stopY) {
        _self.y = 0;
        _self.isFail=false;
    }
};

Hammer.prototype.moving = function (modifier) {

};

Hammer.prototype.paint=function(name,x,y){
    var myImage = util.$$(name);
    var width = Math.round(myImage.width * appConfig.prop);
    var height = Math.round(myImage.height * appConfig.prop);
    application.context.drawImage(myImage, x, y, width, height);
    this.rect={
        x:x,
        y:y,
        width:width,
        height:height
    };
};