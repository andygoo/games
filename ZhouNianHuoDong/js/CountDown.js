/***Author:々守朢 星塵ヅ  2016-05-31***/
function CountDown() {
    this.totalTimer = lzb_timer;
    this.myImageBg = document.getElementById("timer-01");
    this.myImage = document.getElementById("timer-02");
    this.myLoction = document.getElementById("water-011").height * lzb_prop;


    this.myWidth = Math.round(this.myImageBg.width * lzb_prop);
    this.myHeight = Math.round(this.myImageBg.height * lzb_prop);

    this.myX = Math.round((lzb_canvas.width - this.myWidth) >> 1);
    this.myY = Math.round(lzb_canvas.height - (this.myHeight + this.myLoction) / 2);
}

CountDown.prototype.render = function () {
    var secTimer = ((this.totalTimer - lzb_levelDirector.myClock) / 1000).toFixed(1);
    var progWidth = Math.round((1 - (lzb_levelDirector.myClock / this.totalTimer).toFixed(3)) * this.myWidth);

    secTimer = secTimer + " s";

    lzb_context.drawImage(this.myImageBg, this.myX, this.myY, this.myWidth, this.myHeight);
    lzb_context.drawImage(this.myImage, this.myX, this.myY, progWidth, this.myHeight);
}