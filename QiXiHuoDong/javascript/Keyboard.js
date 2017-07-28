/***Author:々守朢 星塵ヅ  2016-05-31***/
function ev_touch(ev) {
    var sx, sy, ex, ey;
    var distance = 20 * lzb_ratio;

    sx = Number(ev.touches[0].pageX) * lzb_ratio;
    sy = Number(ev.touches[0].pageY) * lzb_ratio;

    var moveFun = function(ev) {
        ev.preventDefault();

        ex = Number(ev.touches[0].pageX) * lzb_ratio;
        ey = Number(ev.touches[0].pageY) * lzb_ratio;
    }

    var endFun = function(ev) {
        ev.preventDefault();

        if (ex == "undefined" || ex == null) {
            eventPackage('remove',document,'touchmove', endFun, false);
            eventPackage('remove',document,'touchend', endFun, false);
            return;
        }

        if (ey - sy < -(distance * 4) && sy > ey && !lzb_people.myJump && ex - sx > distance * 4 && ex > sx && lzb_people.myLoction < 2) {
            lzb_people.myJump = true;
            lzb_people.down = false;
            lzb_people.myLoction++;
        }else if (ey - sy < -(distance * 4) && sy > ey && !lzb_people.myJump && ex - sx < distance * 4 && sx > ex && lzb_people.myLoction > 0) {
            lzb_people.myJump = true;
            lzb_people.down = false;
            lzb_people.myLoction--;
        }else if (ey - sy < -(distance * 2) && sy > ey && !lzb_people.myJump) {
            lzb_people.myJump = true;
            lzb_people.down = false;
        } else if(!lzb_people.myJump){
            if (ex - sx > distance && ex > sx && lzb_people.myLoction < 2) {
                lzb_people.myLoction++;
            }
            if (ex - sx < distance && sx > ex && lzb_people.myLoction > 0) {
                lzb_people.myLoction--;
            }
        }

        eventPackage('remove',document,'touchmove', endFun, false);
        eventPackage('remove',document,'touchend', endFun, false);
    }

    eventPackage('add',document,'touchmove', moveFun, false);
    eventPackage('add',document,'touchend', endFun, false);
}

var firTime = 0;
var coordinates = new Array();
function ev_btn(btn, btnX, btnY, btnW, btnH) {
    if (coordinates.indexOf(btn) < 0) {
        coordinates.push(btn, btnX, btnY, btnW, btnH)
    }

    var btnEvent={
        "btn-start":function(){
            coordinates = [];
            lzb_ismusic = true;
            lzb_musicArray[0].render(lzb_ismusic,function(){
                main();
                _hmt.push(['_trackEvent', '七夕活动', 'click', 'GO']);
            });
        },
        "all":function(){
            coordinates = [];
            gameStart();
        },
        "btn-music":function(){
            coordinates = [];
            lzb_ismusic = !lzb_ismusic;
            lzb_musicArray[0].render(lzb_ismusic,function(){});
        },
        "btn-again":function(){
            coordinates = [];
            lzb_ismusic = false;
            lzb_musicArray[0].render(false,function(){
                gameStart();
            });
            _hmt.push(['_trackEvent', '七夕活动', 'click', '游戏说明']);
        },
        "btn-about":function(){
            coordinates = [];
            lzb_layer[0] = new Layer("layer-about");
            var timer = null;

            timer = setInterval(function(){
                lzb_layer[0].myOnceSpeed += (lzb_layer[0].myMoveY - lzb_layer[0].myEndY)/6;
                lzb_layer[0].myOnceSpeed *= 0.75;
                lzb_layer[0].iSpeed += Math.round(lzb_layer[0].myOnceSpeed);

                if( Math.abs(lzb_layer[0].myOnceSpeed) <= 1 && Math.abs(lzb_layer[0].myEndY - lzb_layer[0].myMoveY) <= 1 ){
                    clearInterval(timer);
                    lzb_layer[0].myY = lzb_layer[0].myEndY;
                    lzb_layer[0].iSpeed = 0;
                    lzb_layer[0].myOnceSpeed = 0;
                    ev_btn("all", 0, 0, lzb_canvas.width, lzb_canvas.height);
                }else{
                    lzb_layer[0].myMoveY = lzb_layer[0].myY - lzb_layer[0].iSpeed;
                }
                gameStart(true);
                lzb_layer[0].render();
            }, 30);
            _hmt.push(['_trackEvent', '七夕活动', 'click', '游戏说明']);
        },
        "btn-rank":function(){
            coordinates = [];
            window.location.href = goRankHref;
            _hmt.push(['_trackEvent', '七夕活动', 'click', '排行榜']);
        }
    };
    var btnFun = function(ev) {
        if (Date.parse(new Date()) - firTime < 10 && firTime != 0) {
            return;
        } else {
            firTime = Date.parse(new Date());
        }

        x = Number(ev.touches[0].pageX) * lzb_ratio;
        y = Number(ev.touches[0].pageY) * lzb_ratio;

        for (var i = 0; i < coordinates.length; i += 5) {
            if (x > coordinates[i + 1] && x < coordinates[i + 1] + coordinates[i + 3] && y > coordinates[i + 2] && y < coordinates[i + 2] + coordinates[i + 4]) {
                btnEvent[coordinates[i]]();
                break;
            }
        }
    };

    if(lzb_btn_event_count==0){
        eventPackage('add',document,'touchstart', btnFun, false);
    }
    lzb_btn_event_count++;
}