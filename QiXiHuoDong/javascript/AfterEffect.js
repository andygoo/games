/***Author:々守朢 星塵ヅ  2016-05-31***/
//碰撞后的效果
function AfterEffect(id, x, y, scorenum) {
    this.myName = id;
    this.scorenum = scorenum;
    this.myX = x;
    this.myY = y;
    this.myHeight = 0;
    this.myWidth = 0;
    this.myFrameCounter = 0;
    this.myLastFrame = 0;
    this.myFrames = new Array();

    if (this.myName == "score") {
        this.myLastFrame = 8;
    }
}

AfterEffect.prototype.render = function() {
    if (this.myName == "score") {
        var fontSize = this.myFrameCounter <=6 ? this.myFrameCounter * 2 : 12;
        lzb_context.font = "normal "+ fontSize * lzb_ratio +"px arial";
        lzb_context.fillStyle = "#ffde00";
        var myX = this.myX/lzb_ratio - (lzb_context.measureText(this.scorenum).width >> 1);
        lzb_context.fillText(this.scorenum, myX, this.myY/lzb_ratio);
    }
    this.myFrameCounter++;

    if (this.myFrameCounter > this.myLastFrame) {
        return false;
    }
    return true;
}