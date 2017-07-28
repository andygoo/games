function Text(){
    this.counter={
        topLeft:{
            name: 'label-counter',
            value:0,
            startX: Math.round(util.getCoordinateMap(60, 37).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(60, 37).y * application.canvas.height)
        },
        gloves:{
            value:0,
            startX: Math.round(util.getCoordinateMap(350,70).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(350,70).y * application.canvas.height)
        }
    };

    this.rank={
        name: '排行榜',
        startX: Math.round(util.getCoordinateMap(322, 32).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(322, 32).y * application.canvas.height),
    };

    this.timer={
        topRight:{
            name:'19s',
            value:'19s',
            startX: Math.round(util.getCoordinateMap(665, 200).x * (application.canvas.width/ appConfig.ratio)),
            startY: Math.round(util.getCoordinateMap(665, 200).y * (application.canvas.width/ appConfig.ratio))
        },
        topLeft:{
            name:'19s',
            value:'19s',
            startX: Math.round(util.getCoordinateMap(108, 200).x * (application.canvas.width/ appConfig.ratio)),
            startY: Math.round(util.getCoordinateMap(108, 200).y * (application.canvas.width/ appConfig.ratio))
        }
    };

    this.gate={
        one:{
            name:'Level1',
            value:'level1',
            startX: Math.round(util.getCoordinateMap(276, 1030).x * (application.canvas.width/ appConfig.ratio)),
            startY: Math.round(util.getCoordinateMap(276, 1030).y * (application.canvas.height/ appConfig.ratio)),
            moneyCounter:{
                now:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                },
                total:{
                    value:appConfig.passValue.one.score,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                }
            }
        },
        two:{
            name:'Level2',
            value:'level2',
            startX: Math.round(util.getCoordinateMap(276, 1030).x * (application.canvas.width/ appConfig.ratio)),
            startY: Math.round(util.getCoordinateMap(276, 1030).y * (application.canvas.height/ appConfig.ratio)),
            moneyCounter:{
                now:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                },
                total:{
                    value:appConfig.passValue.two.score,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                }
            }
        },
        three:{
            name:'Level3',
            value:'level3',
            startX: Math.round(util.getCoordinateMap(276, 1030).x * (application.canvas.width/ appConfig.ratio)),
            startY: Math.round(util.getCoordinateMap(276, 1030).y * (application.canvas.height/ appConfig.ratio)),
            moneyCounter:{
                now:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                },
                total:{
                    value:appConfig.passValue.three.score,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                }
            }
        },
        four:{
            name:'Level4',
            value:'level4',
            startX: Math.round(util.getCoordinateMap(276, 1030).x * (application.canvas.width/ appConfig.ratio)),
            startY: Math.round(util.getCoordinateMap(276, 1030).y * (application.canvas.height/ appConfig.ratio)),
            moneyCounter:{
                now:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                },
                total:{
                    value:appConfig.passValue.four.score,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                }
            }
        }
    };
}

Text.prototype.paint=function(obj,value,color,font,textAlign){
    var app=application;
    var x = obj.startX;
    var y = obj.startY;
    var value=value?value:obj.value;
    var w=app.context.measureText(value).width;
    app.context.textAlign=textAlign;
    app.context.font=font?font:32*appConfig.ratio+"px Arial";
    app.context.fillStyle=color?color:'#fff';
    app.context.fillText(value,x,y);
};


Text.prototype.getGloveValue=function(){
    return this.counterValue;
};

Text.prototype.setGloveValue=function(value){
    this.counterValue=value;
};

Text.prototype.getMoneyValue=function(){
    var progress={'-1':'back','1':'one','2':'two','3':'three','4':'four'};
    return application.game.txt.gate[progress[application.game.gameNumber]].moneyCounter.now.value;
};

Text.prototype.setMoneyValue=function(value){
    var progress={'-1':'back','1':'one','2':'two','3':'three','4':'four'};
    application.game.txt.gate[progress[application.game.gameNumber]].moneyCounter.now.value=value;
};