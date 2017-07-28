/*
* 背景
* */
function Background(){
    var _self=this;
    _self.index={
        name:'index-bg',
        startX:0,
        startY:0
    };
    _self.gate={
        name:'gate-list-bg',
        startX:0,
        startY:0,
        one:{
            name:'gate-bg-one',
            startX:0,
            startY:0,
            bedding:{
                name:'bedding',
                startX:Math.round(util.getCoordinateMap(0,820).x*application.canvas.width),
                startY:Math.round(util.getCoordinateMap(0,820).y*application.canvas.height)
            }
        },
        two:{
            name:'gate-bg-two',
            startX:0,
            startY:0,
            bedding:{
                name:'bedding',
                startX:Math.round(util.getCoordinateMap(0,820).x*application.canvas.width),
                startY:Math.round(util.getCoordinateMap(0,820).y*application.canvas.height)
            }
        },
        three:{
            name:'gate-bg-three',
            startX:0,
            startY:0,
            bedding:{
                name:'bedding',
                startX:Math.round(util.getCoordinateMap(0,820).x*application.canvas.width),
                startY:Math.round(util.getCoordinateMap(0,820).y*application.canvas.height)
            }
        },
        four:{
            name:'gate-bg-four',
            startX:0,
            startY:0,
            bedding:{
                name:'bedding',
                startX:Math.round(util.getCoordinateMap(0,820).x*application.canvas.width),
                startY:Math.round(util.getCoordinateMap(0,820).y*application.canvas.height)
            }
        },
    };
    _self.rank={
        name:'rank-bg',
        startX:0,
        startY:0
    }
}

/*各个关卡、步骤的背景图片*/
Background.prototype.paint=function(bgObj,width,height){
    var _self=this;
    var myImage = util.$$(bgObj.name);
    var x = bgObj.startX;
    var y = bgObj.startY;
    var w = width?width:Math.round(myImage.width * appConfig.prop);
    var h = height?height:Math.round(myImage.height * appConfig.propH);
    application.context.drawImage(myImage,x,y,w,h);
};
