/***Author:々守朢 星塵ヅ  2016-05-31***/
function LevelDirector(currentLevel, currentScore) {
    this.myCurrentLevel = currentLevel ? currentLevel : 1;
    this.myClock = 0;
    this.myEOLScore = currentScore ? currentScore : 0;
    this.passScore = lzb_passScore;
}

LevelDirector.prototype.startLevel = function () {
    lzb_projectiles = new Array();
    lzb_afterEffects = new Array();

    lzb_cardShow = new CardShow("gift-tips");
    lzb_handleLeft=new CardShow("draw-l","dl");
    lzb_handleRight=new CardShow("draw-r","dr");
    lzb_background = new Background("card-01");
    lzb_waterAfter = new Background("water-01", 4);
    lzb_people = new People(this.myEOLScore);
    lzb_waterBefore = new Background("water-011", 5);
    lzb_countDown = new CountDown();
    lzb_cloud = new Background("cloud", 2, true);

    lzb_renderInterval = setInterval(renderLoop, 1000 / lzb_speed);
    lzb_clockInterval = setInterval(clockLoop, 100);
};

LevelDirector.prototype.gameEvents = function () {
    this.myEOLScore = lzb_people.myScore;
    //切换游戏速度
    if(lzb_levelDirector.myClock<5000){
        lzb_speed=24;
    }else{
        if((lzb_levelDirector.myClock>=5000)&&(lzb_levelDirector.myClock<10000)){
            lzb_speed=24*1.2;
        }else if((lzb_levelDirector.myClock>=10000)&&(lzb_levelDirector.myClock<15000)){
            lzb_speed=24*1.2*1.1;
        }else if(lzb_levelDirector.myClock>=15000){
            if(Math.floor(lzb_speedTimer/5000)!=lzb_speedCounter){
                lzb_speed=lzb_speed*1.1;
                lzb_speedCounter++;
            }
            lzb_speedTimer += 100;
        }
        clearInterval(lzb_renderInterval);
        lzb_renderInterval = setInterval(renderLoop, 1000 / lzb_speed);
    }
    //游戏为什么会暂停了
    if(lzb_stop){
        clearInterval(lzb_renderInterval);
        clearInterval(lzb_clockInterval);
        console.info("挑战结束，弹出弹层");
        AjaxTask.ajax({
            method: 'post',
            url: getScoreHref,
            data: {score: this.myEOLScore},
            async: true,
            success: function (data) {
                if (data) {
                    window.location.href = goAwardHref + Math.random();
                } else {
                    alert("分数提交失败，请查看网络是否有链接");
                    gameStart();
                }
            },
            error: function (data) {
                alert("分数提交失败，请查看网络是否有链接");
                gameStart();
            }
        })
    }
};
