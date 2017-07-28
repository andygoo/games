/***Author:々守朢 星塵ヅ  2016-05-31***/
function LevelDirector() {
    this.myClock = 0;
}

LevelDirector.prototype.startLevel = function() {
    lzb_projectiles = new Array();
    lzb_afterEffects = new Array();

	lzb_background = new Background("game-bg");

    for(var i=0; i<lzb_background_cloudISpeed.length; i++){
        lzb_background_cloud.push(new Background("cloud", lzb_background_cloudISpeed[i], true));
    }

    for(var i=0; i<lzb_background_woodISpeed.length; i++){
        if(i == 0){
            lzb_background_wood.push(new Background("wood", 0));
            lzb_background_woodISpeed[0] = 0;
        }else{
            lzb_background_wood.push(new Background("wood", 0.5 + (i-1)*0.025));
            lzb_background_woodISpeed[i] = (0.5 + (i-1)*0.025).toFixed(3)*1;
        }
    }

    lzb_people = new People(this.myEOLScore);
    lzb_countDown = new CountDown();
    lzb_btn[3] = new Btn("btn-music");
    lzb_renderInterval=setInterval(renderLoop,lzb_seconds_between_frames);
    eventPackage("add",document,"touchstart", ev_touch, false);
}

LevelDirector.prototype.gameEvents = function(myScore) {
    this.myEOLScore = lzb_people.myScore;

    if(this.myClock * 1.2 > lzb_timer || !lzb_gameStatus){
        gameOver();

        if(this.myEOLScore >= lzb_passScore){
            ajax({
                method: 'post',
                url: getScoreHref,
                data:{score: this.myEOLScore},
                async: true,
                success: function(data)	{
                    if(data){
                        window.location.href= goAwardHref +  Math.random();
                    }else{
                        alert("分数提交失败，请查看网络是否有链接");
                        gameStart();
                    }
                },
                error: function(xhr){
                    alert("分数提交失败，请查看网络是否有链接。");
                    gameStart();
                }
            })
        }else{
            saveImage();
            lzb_layer[1] = new Layer("layer-failure");
            lzb_layer[2] = new Background("canvasImg");

            if(isiOS){
                lzb_layer[2].fullRender();
                lzb_layer[1].render(true);
                lzb_btn[3] = new Btn("btn-again");
                lzb_btn[3].render();
            }else{
                var timer = null;
                timer = setInterval(function(){
                    lzb_layer[1].myOnceSpeed += (lzb_layer[1].myMoveY - lzb_layer[1].myEndY)/6;
                    lzb_layer[1].myOnceSpeed *= 0.75;
                    lzb_layer[1].iSpeed += Math.round(lzb_layer[1].myOnceSpeed);
                    if( Math.abs(lzb_layer[1].myOnceSpeed) <= 1 && Math.abs(lzb_layer[1].myEndY - lzb_layer[1].myMoveY) <= 1 ){
                        lzb_layer[1].render(true);
                        lzb_btn[3] = new Btn("btn-again");
                        lzb_btn[3].render();

                        clearInterval(timer);
                        lzb_layer[1].myY = lzb_layer[1].myEndY;
                        lzb_layer[1].iSpeed = 0;
                        lzb_layer[1].myOnceSpeed = 0;

                        ev_btn("all", 0, 0, lzb_canvas.width, lzb_canvas.height);
                    }else{
                        lzb_layer[1].myMoveY = lzb_layer[1].myY - lzb_layer[1].iSpeed;
                        lzb_layer[2].fullRender();
                    }
                }, 30);
            }

        }

    }

}