/***Author:々守朢 星塵ヅ  2016-05-31***/
function AfterEffect(id, x, y, scorenum) {
    this.myName = id;
    this.myX = x;
    this.myY = y;
    this.myHeight = 0;
    this.myWidth = 0;
    this.myFrameCounter = 0;
    this.myLastFrame = 0;
    this.myFrames = new Array();

    if (this.myName == "spray") {
        this.myLastFrame = 3;
        for (var i = 0; i <= this.myLastFrame; ++i) {
            var offset = i + 1;
            var img = document.getElementById("spray" + lzb_levelDirector.myCurrentLevel + "-" + offset);
            this.myFrames.push(img);
            if (i == 0) {
                this.myWidth = Math.round(img.width * lzb_prop);
                this.myHeight = Math.round(img.height * lzb_prop);
            }

        }
    }
    if (this.myName == "score") {
        this.myLastFrame = 3;
        for (var i = 0; i <= this.myLastFrame; ++i) {
            var offset = i + 1;
            var img = document.getElementById("score" + scorenum);
            this.myFrames.push(img);
            if (i == 0) {
                this.myWidth = Math.round(img.width * lzb_prop);
                this.myHeight = Math.round(img.height * lzb_prop);
            }

        }
    }
}

AfterEffect.prototype.render = function () {
    if (this.myName == "spray") {
        lzb_context.drawImage(this.myFrames[this.myFrameCounter],
        this.myX - (this.myWidth >> 1), Math.round(lzb_canvas.height - this.myHeight - lzb_waterBefore_h / 2),
        this.myWidth, this.myHeight);
    }

    if (this.myName == "score") {
        lzb_context.drawImage(this.myFrames[this.myFrameCounter],
        this.myX, this.myY,
        this.myWidth, this.myHeight);
    }

    this.myFrameCounter++;
    if (this.myFrameCounter > this.myLastFrame) {
        return false;
    }
    return true;
}