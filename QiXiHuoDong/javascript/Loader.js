/***Author:々守朢 星塵ヅ  2016-05-31***/
window.onload = function () {
    if (lzb_context == undefined) {
        if (!initCanvas()) {
            alert("不支持canvas");
            return;
        }
    }

    imageLoad({
        url: function () {
            var $imgBox = $$("imgbox");
            loading = [];
            loadImg = [
                "start-bg.jpg", "btn-start.png", "btn-rank.png", "btn-about.png", "layer-about.png",
                "game-bg.jpg", "wood.png", "girl.png", "unit.png", "num0.png",
                "num1.png", "num2.png", "num3.png", "num4.png", "num5.png",
                "num6.png", "num7.png", "num8.png", "num9.png", "people-01.png",
                "people-02.png", "people-03.png", "countdown-01.png", "countdown-02.png", "cloud-01.png",
                "cloud-02.png", "good-01.png", "good-02.png", "good-03.png", "good-04.png",
                "good-05.png", "good-06.png", "btn-music.png", "btn-music-hover.png", "layer-failure.png",
                "btn-again.png"
            ];

            for (var i = 0; i <= loadImg.length - 1; i++) {
                loading[loading.length] = lzb_imgSrc + loadImg[i] + '?_=' + (new Date).getTime();
                var imgObj = document.createElement("img");
                imgObj.src = lzb_imgSrc + loadImg[i] + '?_=' + (new Date).getTime();
                imgObj.id = loadImg[i].split(".")[0];
                $imgBox.appendChild(imgObj);
            }
            return loading;
        },
        oncomplete: function (s) {
            lzb_context.beginPath();
            lzb_context.fillStyle = "#000";
            lzb_context.rect(0, 0, lzb_canvas.width, lzb_canvas.height);
            lzb_context.fill();

            lzb_context.font = "normal " + 12 * lzb_ratio + "px arial";
            lzb_context.fillStyle = "#fefefe";

            var myText = Math.round((s.complete / s.total) * 100) + " %";
            var myX = (lzb_canvas.width / lzb_ratio - (lzb_context.measureText(myText).width >> 1) >> 1);
            lzb_context.fillText(myText, myX, ((lzb_canvas.height / lzb_ratio) >> 1) - 6 * lzb_ratio);
        },
        complete: function (imgs, s) {
            if (s.total == s.load + s.error) {
                $image = $$("game-bg");
                lzb_prop = lzb_canvas.width / $image.width;

                gameStart();
            }
        }
    });
};