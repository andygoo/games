/***Author:々守朢 星塵ヅ  2016-05-31***/
function CardShow(element, location) {
    this.myImage = document.getElementById(element);
    this.myWidth = Math.round(this.myImage.width * lzb_prop);
    this.myHeight = Math.round(this.myImage.height * lzb_prop);

    if (location == "tr") {
        this.myX = Math.round(lzb_canvas.width * 0.99 - this.myWidth);
        this.myY = lzb_canvas.height * 0.02;
        if (element == "btn-music" || element == "btn-music-hover") {
            ev_btn(element, this.myX, this.myY, this.myWidth, this.myHeight);
        }
    } else if (location == "br") {
        if (element == "btn-about") {
            this.myX = Math.round(lzb_canvas.width * 0.92 - this.myWidth * 2);
        } else {
            this.myX = Math.round(lzb_canvas.width * 0.95 - this.myWidth);
        }
        this.myY = Math.round(lzb_canvas.height * 0.98 - this.myWidth);

        ev_btn(element, this.myX, this.myY, this.myWidth, this.myHeight);
    } else {
        this.myX = Math.round(lzb_canvas.width * 0.01);
        this.myY = lzb_canvas.height * 0.02;
    }
}

//location 1右边，0左边
CardShow.prototype.render = function () {
    lzb_context.drawImage(this.myImage, this.myX, this.myY, this.myWidth, this.myHeight);
}