/*手*/
function Hand() {
    this.hasGoldenHand=false;
    this.isBeated=false;
    this.handActionStep=0;
    this.handAction="stretch";//stretch伸 shrink-缩
    this.speedX=4500;
    this.speedY=3500;
    this.defaultX=Math.round(util.getCoordinateMap(590, 1080).x * application.canvas.width);//手的初始坐标
    this.defaultY=Math.round(util.getCoordinateMap(590, 1080).y * application.canvas.width);//手的初始坐标
    this.targetX=Math.round(util.getCoordinateMap(115, 400).x * application.canvas.width);//手的目标坐标，由手触摸后控制
    this.targetY=Math.round(util.getCoordinateMap(115, 400).y * application.canvas.width);//手的目标坐标，由手触摸后控制
    this.x=0;
    this.y=0;
    this.rect={
        x:0,
        y:0,
        width:0,
        height:0
    };
}

//行为-伸、缩
Hand.prototype.moving = function (modifier) {
    var _self=this;
    var name;
    var gap = (application.canvas.width - _self.targetX) /4;
    var x,y= _self.defaultY;

    if(_self.handActionStep <8){
        _self.x+=_self.speedX * modifier;
        _self.y+=_self.speedY * modifier;
        if(_self.handAction=='stretch'){//伸
            x=parseInt(application.canvas.width-_self.x);
            if(x >= (_self.targetX+4*gap)){
                _self.handActionStep = 0;
            }else if ((_self.targetX+3*gap) < x && x <(_self.targetX+4*gap)) {
                _self.handActionStep = 0;
            } else if ((_self.targetX+2*gap )< x && x <= (_self.targetX+3*gap)) {
                _self.handActionStep = 1;
            } else if ((_self.targetX+gap )< x && x <= (_self.targetX+2*gap)) {
                _self.handActionStep = 2;
            } else if (_self.targetX < x && x <= (_self.targetX+gap)) {
                _self.handActionStep = 3;
            }else if (x <= _self.targetX) {
                _self.handActionStep = 4;
                _self.x=0;
                _self.handAction='shrink';
            }
            name=_self.checkHandStatu(_self.handActionStep);
            _self.paint(name,x,y);
        }else if(_self.handAction=='shrink'){//缩
            x=parseInt(_self.targetX+_self.x);
            if (_self.targetX < x && x <= (_self.targetX+gap)) {
                _self.handActionStep = 4;
            } else if ((_self.targetX+gap) < x && x <= (_self.targetX+2*gap)) {
                _self.handActionStep = 5;
            } else if ((_self.targetX+2*gap) < x && x <= (_self.targetX+3*gap)) {
                _self.handActionStep = 6;
            }else if ((_self.targetX+3*gap) < x && x < (_self.targetX+4*gap)) {
                _self.handActionStep = 7;
            } else if(x >= (_self.targetX+4*gap)){
                _self.handActionStep = 0;
                _self.x = 0;
                _self.handAction='stretch';
                application.game.toucher.isHandMoving=false;
            }
            name=_self.checkHandStatu(_self.handActionStep);
            _self.paint(name,x,y);
        }
    }

};

Hand.prototype.checkHandStatu=function(step){
    var _self=this;
    var name;
    var gloveStyle=_self.hasGoldenHand?'golden':'normal';

    if(_self.hasGoldenHand){
        if(0<=step&&step<4){
            name='golden-hand-a';
        }else if(4<=step&&step<8&&_self.isCatchMoney){
            name='golden-hand-b';
        }else if(4<=step&&step<8){
            name='golden-hand-a';
        }
        return name;
    }else{
        if(0<=step&&step<4) {
            name='normal-hand-a';
        }else if(4<=step&&step<8&&_self.isCatchMoney){
            name='normal-hand-b';
        }else if(4<=step&&step<8){
            name='normal-hand-a';
        }

        //被锤子砸
        if(_self.isBeated){
            name='normal-hand-beated';
        }
        return name;
    }
};

Hand.prototype.paint=function(name,x,y){
    var myImage = util.$$(name);//各个阶段show各个阶段的money形状
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


Hand.prototype.addGloves = function () {

};