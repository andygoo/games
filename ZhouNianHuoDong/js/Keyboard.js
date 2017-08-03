/***Author:々守朢 星塵ヅ  2016-05-31***/
function ev_touch(ev) {
    var lzb_people_w = document.getElementById("people").width * lzb_prop;
    var lzb_people_h = document.getElementById("people").height * lzb_prop;
    var x;
    var y;
    var ex;
    var ey;

    var moveFun = function (ev) {
        ev.preventDefault();
        var sx = x, sy = y;

        ex = Number(ev.touches[0].pageX) * lzb_ratio;
        if (ex < (lzb_people_w >> 1)) {
            ex = lzb_people_w >> 1;
        }
        if (ex > lzb_canvas.width - (lzb_people_w >> 1)) {
            ex = lzb_canvas.width - (lzb_people_w >> 1);
        }
        ey = Number(ev.touches[0].pageY) * lzb_ratio;

        lzb_people.left(false);
        lzb_people.right(false);
        if (ex > sx) {
            lzb_people.right(true);
        } else if (ex < sx) {
            lzb_people.left(true);
        }

        lzb_people_getX = ex;
        lzb_people_getY = ey;
    }

    x = Number(ev.touches[0].pageX) * lzb_ratio;
    y = Number(ev.touches[0].pageY) * lzb_ratio;

    if (x > lzb_people_x - (lzb_people_w >> 1) && x < lzb_people_x + (lzb_people_w >> 1) && y > lzb_people_y && y < lzb_people_y + lzb_people_h) {
        lzb_people.left(false);
        lzb_people.right(false);

        if (x > lzb_people_getX) {
            lzb_people.right(true);
        } else if (x < lzb_people_getX) {
            lzb_people.left(true);
        }
        lzb_people_getX = x;

        document.addEventListener('touchmove', moveFun, false);
        document.addEventListener('touchend', function (ev) {
            if (ex && ey) {
                lzb_people_x = ex;
            }
            lzb_people.left(false);
            lzb_people.right(false);
        }, false);
    }
}

var firTime = 0;
var coordinates = new Array();

function ev_btn(btn, btnX, btnY, btnW, btnH) {
    if (coordinates.indexOf(btn) < 0) {
        coordinates.push(btn, btnX, btnY, btnW, btnH)
    }

    var btnFun = function (ev) {
        if (Date.parse(new Date()) - firTime < 10 && firTime != 0) {
            return;
        } else {
            firTime = Date.parse(new Date());
        }

        x = Number(ev.touches[0].pageX) * lzb_ratio;
        y = Number(ev.touches[0].pageY) * lzb_ratio;

        for (var i = 0; i < coordinates.length; i += 5) {
            if (x > coordinates[i + 1] && x < coordinates[i + 1] + coordinates[i + 3] && y > coordinates[i + 2] && y < coordinates[i + 2] + coordinates[i + 4]) {

                if (coordinates[i] == "btn-about") {
                    _hmt.push(['_trackEvent', '端午活动', 'click', '游戏说明']);
                    coordinates = [];
                    lzb_layer = new Layer("layer-about");
                    lzb_layer.render();
                    ev_btn("all", 0, 0, lzb_canvas.width, lzb_canvas.height);
                }
                if (coordinates[i] == "btn-rank") {
                    _hmt.push(['_trackEvent', '端午活动', 'click', '排行榜']);
                    coordinates = [];
                    window.location.href = goRankHref;
                }
                if (coordinates[i] == "btn-start") {
                    // _hmt.push(['_trackEvent', '端午活动', 'click', '开始接粽子']);
                    var btnObj = document.getElementById(coordinates[i] + "-hover");
                    if (btnObj) {
                        lzb_context.drawImage(btnObj, coordinates[i + 1], coordinates[i + 2], coordinates[i + 3], coordinates[i + 4]);
                    }
                    coordinates = [];
                    main(1);
                }
                if (coordinates[i] == "all") {
                    coordinates = [];
                    gameStart();
                }
                if (coordinates[i] == "btn-next" && lzb_levelDirector.myCurrentLevel <= 3) {
                    var btnObj = document.getElementById(coordinates[i] + "-hover");
                    if (btnObj) {
                        lzb_context.drawImage(btnObj, coordinates[i + 1], coordinates[i + 2], coordinates[i + 3], coordinates[i + 4]);
                    }
                    coordinates = [];
                    main(lzb_levelDirector.myCurrentLevel + 1, lzb_levelDirector.myEOLScore);
                }
                if (coordinates[i] == "btn-again") {
                    var btnObj = document.getElementById(coordinates[i] + "-hover");
                    if (btnObj) {
                        lzb_context.drawImage(btnObj, coordinates[i + 1], coordinates[i + 2], coordinates[i + 3], coordinates[i + 4]);
                    }
                    coordinates = [];
                    main(1);
                }
                if (coordinates[i] == "btn-over") {
                    var btnObj = document.getElementById(coordinates[i] + "-hover");
                    if (btnObj) {
                        lzb_context.drawImage(btnObj, coordinates[i + 1], coordinates[i + 2], coordinates[i + 3], coordinates[i + 4]);
                    }
                    coordinates = [];
                    gameStart();
                }
                break;
            }
        }

    }
    document.addEventListener("touchstart", btnFun, false);
}
