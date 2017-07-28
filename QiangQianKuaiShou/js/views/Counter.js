/*计数器*/
function Counter() {
    var _self = this;
    _self.counterValue=0;
    _self.timerTopRight = {
        name: 'timer',
        startX: Math.round(util.getCoordinateMap(602, 32).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(602, 32).y * application.canvas.height)
    };
    _self.timerTopLeft = {
        name: 'timer',
        startX: Math.round(util.getCoordinateMap(45, 32).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(45, 32).y * application.canvas.height)
    };
    _self.topLeft = {
        name: 'label-counter',
        startX: Math.round(util.getCoordinateMap(40, 32).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(40, 32).y * application.canvas.height)
    };
    _self.caculatorbB = {
        name: 'label-counter',
        startX: Math.round(util.getCoordinateMap(40, 176).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(40, 176).y * application.canvas.height)
    }

    _self.gloves={
        name:"golden-glove",
        value:0,
        startX: Math.round(util.getCoordinateMap(570,40).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(570,40).y * application.canvas.height)
    };
};

Counter.prototype.paint = function (counterObj,x,y) {
    var _self = this;
    var myImage = util.$$(counterObj.name);
    var x = x?x:counterObj.startX;
    var y = y?y:counterObj.startY;
    var width = Math.round(myImage.width * appConfig.prop);
    var height = Math.round(myImage.height * appConfig.prop);

    application.context.drawImage(myImage, x, y, width, height);
};

Counter.prototype.initTimer = function (obj) {
    var _self = this;
    _self.paint(obj);
};

Counter.prototype.updateTimer = function () {

};

Counter.prototype.initCaculator = function (obj) {
    var _self = this;
    _self.paint(obj);
};

Counter.prototype.updateCaculator = function () {

};
