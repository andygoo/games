/*动作、游戏控制台*/
//开始、暂停、重新启动、停止功能
function Game(){
    this.gameCounter=0;//记录当前第几关
    this.lastTime =0;//上一幀的时间位置
    this.gameNumber=0;
    this.isEnabled=false;
    this.isRunnning=false;
    this.isCatchMoney=true;//是否抓住钱
    this.totalMoney=0;
}
/*暂停*/
Game.prototype.pause=function(){

};

/*重新启动*/
Game.prototype.restart=function(){

};

/*停止*/
Game.prototype.stop=function(){
    console.log("当前游戏停止，切换到下一关");
    var _self=this;
    var progress={'-1':'back','1':'one','2':'two','3':'three','4':'four'};
    _self.isRunnning=false;
    _self.toucher.eventHandle('remove',document,'touchstart', function(){}, false);

    // _self.txt.paint(_self.txt.gate[progress[_self.gameNumber]].moneyCounter.now,_self.txt.getMoneyValue(),'#f44038',"bold "+32*appConfig.ratio+"px Arial",'right');

    util.saveImage();
    //如果积分数大于通关数，显示成功弹层；否则显示失败弹层
    if(_self.txt.gate[progress[_self.gameNumber]].moneyCounter.now.value>=_self.txt.gate[progress[_self.gameNumber]].moneyCounter.total.value){
        _self.layer.success();
        if(_self.gameNumber<4){
            _self.gameNumber++;
        }
    }else{
        _self.layer.fail();
    }
};

/*开始*/
Game.prototype.start=function(){
    var _self=this;

    var background=new Background();
    background.paint(background.index,window.innerWidth*appConfig.ratio,window.innerHeight*appConfig.ratio);
    _self.background=background;

    _self.btn=new Button();
    _self.toucher = new Toucher();
    //判断区域落点，触发对应的事件处理函数
    _self.btn.btnFn=_self.btn.touchGameCoin();
    _self.btn.paint(_self.btn.index.start);
    _self.btn.paint(_self.btn.back.index);

    _self.txt=new Text();
    _self.counter=new Counter();
    _self.hand=new Hand();
    _self.money=new Money();
    _self.hammer=new Hammer();
    _self.layer=new Layer();
    this.showGateList(1,"diyiguan");
};

/**
 *
 * @param gateName {string}||{int} -1 "one"、"two"、"three"、"four"、"what" 需要展示的关数 -1为回退操作
 * @param action 动作
 */
Game.prototype.showGateList=function(gateNumber,action){
    var _self=this;
    if(gateNumber==-1){
        //返回上一关
        console.info("返回上一关游戏通关画面，非列表");
        return false;
    }

    var progress={'-1':'back','1':'one','2':'two','3':'three','4':'four'};
    var gateName=progress[gateNumber];

    //画背景图，解绑事件，绘制按钮，然后绑定按钮事件
    _self.toucher.eventHandle('remove',document,'touchstart', function(){}, false);
    application.context.clearRect(0, 0, application.canvas.width, application.canvas.height);

    //对相应的通关按钮绑定事件
    _self.btn.coordinates=[];
    _self.background.paint(_self.background.gate,application.canvas.width,application.canvas.height);

    _self.counter.paint(_self.counter.topLeft);
    _self.txt.paint(_self.txt.counter.topLeft,_self.totalMoney,'#fbe985',20*appConfig.ratio+"px Microsoft Yahei",'left');

    _self.btn.paint(_self.btn.rank);
    _self.txt.paint(_self.txt.rank,'排行榜','#fbe985',20*appConfig.ratio+"px Microsoft Yahei",'center');

    var offset=[];//由于激活状态和未激活状态的图片尺寸大小有差异，需要重新计算绘图开始位置
    if(_self.btn.gateList.gateCoin[gateName].enabled){
        offset.push(Math.round(util.$$(_self.btn.gateList.gateCoin[gateName].enabledName).width-util.$$(_self.btn.gateList.gateCoin[gateName].name).width)/2);
        offset.push(Math.round(util.$$(_self.btn.gateList.gateCoin[gateName].enabledName).height-util.$$(_self.btn.gateList.gateCoin[gateName].name).height)/2);
        _self.btn.gateList.gateCoin[gateName].startX = _self.btn.gateList.gateCoin[gateName].startX-offset[0];
        _self.btn.gateList.gateCoin[gateName].startY = _self.btn.gateList.gateCoin[gateName].startY-offset[1];
        _self.btn.gateList.gateCoin[gateName].name = _self.btn.gateList.gateCoin[gateName].enabledName;
        _self.btn.paintOther([_self.btn.gateList.gateCoin[gateName].starshine]);
    }

    _self.btn.paint(_self.btn.gateList.gateCoin[gateName]);
    _self.btn.paint(_self.btn.back.gateList);
    switch(gateName){
        case "one":
            //绘制非当前关数按钮/非当前按钮绑定事件区域的按钮
            _self.btn.paintOther([
                _self.btn.gateList.gateCoin.one.shadow,
                _self.btn.gateList.gateCoin.two, _self.btn.gateList.gateCoin.two.shadow, _self.btn.gateList.gateCoin.two.starshine,
                _self.btn.gateList.gateCoin.three, _self.btn.gateList.gateCoin.three.shadow, _self.btn.gateList.gateCoin.three.starshine,
                _self.btn.gateList.gateCoin.four, _self.btn.gateList.gateCoin.four.shadow, _self.btn.gateList.gateCoin.four.starshine,
                _self.btn.gateList.gateCoin.what, _self.btn.gateList.gateCoin.what.shadow
            ]);

            break;
        case "two":
            _self.btn.paintOther([
                _self.btn.gateList.gateCoin.one, _self.btn.gateList.gateCoin.one.shadow, _self.btn.gateList.gateCoin.one.starshine,
                _self.btn.gateList.gateCoin.one.shadow,
                _self.btn.gateList.gateCoin.three, _self.btn.gateList.gateCoin.three.shadow, _self.btn.gateList.gateCoin.three.starshine,
                _self.btn.gateList.gateCoin.four, _self.btn.gateList.gateCoin.four.shadow, _self.btn.gateList.gateCoin.four.starshine,
                _self.btn.gateList.gateCoin.what, _self.btn.gateList.gateCoin.what.shadow
            ]);
            break;
        case "three":
            _self.btn.paintOther([
                _self.btn.gateList.gateCoin.one, _self.btn.gateList.gateCoin.one.shadow, _self.btn.gateList.gateCoin.one.starshine,
                _self.btn.gateList.gateCoin.two, _self.btn.gateList.gateCoin.two.shadow, _self.btn.gateList.gateCoin.two.starshine,
                _self.btn.gateList.gateCoin.three.shadow,
                _self.btn.gateList.gateCoin.four, _self.btn.gateList.gateCoin.four.shadow, _self.btn.gateList.gateCoin.four.starshine,
                _self.btn.gateList.gateCoin.what, _self.btn.gateList.gateCoin.what.shadow
            ]);
            break;
        case "four":
            _self.btn.paintOther([
                _self.btn.gateList.gateCoin.one, _self.btn.gateList.gateCoin.one.shadow, _self.btn.gateList.gateCoin.one.starshine,
                _self.btn.gateList.gateCoin.two, _self.btn.gateList.gateCoin.two.shadow, _self.btn.gateList.gateCoin.two.starshine,
                _self.btn.gateList.gateCoin.three, _self.btn.gateList.gateCoin.three.shadow, _self.btn.gateList.gateCoin.three.starshine,
                _self.btn.gateList.gateCoin.four.shadow,
                _self.btn.gateList.gateCoin.what, _self.btn.gateList.gateCoin.what.shadow
            ]);
            break;
        case "what":
            _self.btn.paintOther([
                _self.btn.gateList.gateCoin.one, _self.btn.gateList.gateCoin.one.shadow, _self.btn.gateList.gateCoin.one.starshine,
                _self.btn.gateList.gateCoin.two, _self.btn.gateList.gateCoin.two.shadow, _self.btn.gateList.gateCoin.two.starshine,
                _self.btn.gateList.gateCoin.three, _self.btn.gateList.gateCoin.three.shadow, _self.btn.gateList.gateCoin.three.starshine,
                _self.btn.gateList.gateCoin.four, _self.btn.gateList.gateCoin.four.shadow, _self.btn.gateList.gateCoin.four.starshine,
                _self.btn.gateList.gateCoin.what, _self.btn.gateList.gateCoin.what.shadow
            ]);
            break;
    }
    _self.toucher.eventHandle('add',document,'touchstart', _self.btn.btnFn, false);
};

Game.prototype.main=function(){
    var _self=application.game;
    var now = Date.now();
    var delta = (now - _self.lastTime) / 1000.0;
    var timerCounter=parseInt((now-_self.startTime)/1000);

    if(_self.isRunning){
        if(timerCounter<(appConfig.timerCounter+1)){
            _self.render(timerCounter);
            _self.update(delta);
            requestAnimFrame(application.game.main);
            _self.lastTime=now;
        }else if(timerCounter==(appConfig.timerCounter+1)){
            _self.stop();
        }
    }else{
        _self.stop();
    }
};
Game.prototype.render=function(timerCounter){
    // console.log("第"+timerCounter+"秒");
    var _self=this;
    var progress={'-1':'back','1':'one','2':'two','3':'three','4':'four'};

    _self.background.paint(_self.background.gate[progress[_self.gameNumber]],application.canvas.width,application.canvas.height);

    //累计金额数目
    _self.totalMoney+=_self.txt.getMoneyValue();

    //绘制女巫&罐子
    _self.background.paint(_self.background.gate[progress[_self.gameNumber]].bedding);

    //绘制level n文字
    _self.txt.paint(_self.txt.gate[progress[_self.gameNumber]]);

    //绘制当前金额值/通关值
    _self.txt.paint(_self.txt.gate[progress[_self.gameNumber]].moneyCounter.now,_self.txt.getMoneyValue(),'#f44038',"bold "+32*appConfig.ratio+"px Arial",'right');
    _self.txt.paint(_self.txt.gate[progress[_self.gameNumber]].moneyCounter.total,'/'+appConfig.passValue.one.score,'#793605',"bold "+32*appConfig.ratio+"px Arial",'left');

    //计算时间值
    _self.counter.paint(_self.counter.timerTopLeft);
    _self.txt.paint(_self.txt.timer.topLeft,timerCounter+'s','#f44038',"bold "+18*appConfig.ratio+"px Arial",'center');
    //绘制金手套
    _self.counter.paint(_self.counter.gloves);
    _self.txt.paint(_self.txt.counter.gloves,'x'+_self.counter.gloves.value,'#fde23d',"bold "+28*appConfig.ratio+"px Arial",'center');
};

Game.prototype.update=function(modifier){
    var _self=this;
    //掉钱
    //下落的money形状不变的话，但下落的位置已经变化，需要做好判断
    _self.money.fall(_self.money.fallMoney, modifier);

    //掉锤子
    //何时会掉锤子
    if(_self.hammer.isFailing()){
        //锤子需要完整的下落
        _self.hammer.fall(modifier);
    }

    //手的运动轨迹
    if(_self.toucher.isHandMoving){
        _self.hand.moving(modifier);
        //碰撞检测
        if(_self.hand.handAction=='stretch'){
            _self.toucher.checkCollisions();
        }
    }

    //如何触发掉钱动作、动手行为、铁锤出现、捡钱行为(碰撞行为)？
    //将产生堆叠钱的行为

};

//显示游戏统计信息
Game.prototype.showStatic=function(name){
    //判断显示
    // this.layer.success();
    this.layer[name]();
};

/*显示排行榜功能*/
Game.prototype.showRanking=function(){
    console.info("显示排行榜");
};
