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
    if (this.myCurrentLevel == 1) {
        lzb_background = new Background("card-01");
        lzb_waterAfter = new Background("water-01", 4);
        lzb_people = new People(this.myEOLScore);
        lzb_waterBefore = new Background("water-011", 5);
        lzb_countDown = new CountDown();
    } else if (this.myCurrentLevel == 2) {
        lzb_background = new Background("card-02");
        lzb_waterAfter = new Background("water-02", 4);
        lzb_people = new People(this.myEOLScore);
        lzb_waterBefore = new Background("water-022", 5);
    } else if (this.myCurrentLevel == 3) {
        lzb_background = new Background("card-03");
        lzb_waterAfter = new Background("water-03", 4);
        lzb_people = new People(this.myEOLScore);
        lzb_waterBefore = new Background("water-033", 5);
    }
    lzb_cloud = new Background("cloud", 2, true);

    lzb_renderInterval = setInterval(renderLoop, 1000 / 24);
    lzb_clockInterval = setInterval(clockLoop, 100);
};

LevelDirector.prototype.gameEvents = function () {
    this.myEOLScore = lzb_people.myScore;

    if (this.myClock == lzb_timer) {
        clearInterval(lzb_renderInterval);
        clearInterval(lzb_clockInterval);

        //游戏为什么会暂停了
        if (this.myCurrentLevel == 3 && this.myEOLScore >= this.passScore[this.myCurrentLevel - 1]) {
            ajax({
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
        } else if (this.myEOLScore >= this.passScore[this.myCurrentLevel - 1]) {
            lzb_layer = new Layer("succeed-" + (this.myCurrentLevel + 1), "btn-next");
            lzb_layer.render();
        } else {
            // lzb_layer = new Layer("failure", "btn-over", "btn-again");
            // lzb_layer.render();
        }
    }
}
