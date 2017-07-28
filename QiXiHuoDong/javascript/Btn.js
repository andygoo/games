function Btn(element, isbind) {
    this.myImage = $$(element);
    this.myName = element;
    this.myWidth = Math.round(this.myImage.width * lzb_prop);
    this.myHeight = Math.round(this.myImage.height * lzb_prop);

    this.myX = 0;
    this.myY = 0;

    this.isbind = isbind ? false: true;
}

Btn.prototype.render = function() {
    switch (this.myName) {
        case "btn-music":
            this.myImage = lzb_ismusic ? $$(this.myName) : $$(this.myName + "-hover");
            this.myX = lzb_canvas.width - Math.round(lzb_canvas.width * 0.036) - this.myWidth;
            this.myY = Math.round(lzb_canvas.height * 0.036);
            break;

        case "btn-start":
            this.myX = lzb_canvas.width - this.myWidth - lzb_canvas.width * 0.1;
            this.myY = Math.round(lzb_canvas.height * 0.528);
            break;

        case "btn-again":
            this.myX = lzb_canvas.width >> 1;
            this.myY = lzb_layer[1].myEndY + lzb_layer[1].myHeight - (this.myHeight >> 1);
            break;

        case "btn-rank":
            this.myX = lzb_canvas.width - this.myWidth - Math.round(lzb_canvas.width * 0.06);
            this.myY = lzb_canvas.height - this.myHeight - Math.round(lzb_canvas.height * 0.025);
            break;

        case "btn-about":
            this.myX = lzb_canvas.width - Math.round(this.myWidth * 2.1) - Math.round(lzb_canvas.width * 0.06);
            this.myY = lzb_canvas.height - this.myHeight - Math.round(lzb_canvas.height * 0.025);
            break;
    }
    lzb_context.drawImage(this.myImage, this.myX, this.myY, this.myWidth, this.myHeight);
    if (this.isbind) ev_btn(this.myName, this.myX, this.myY, this.myWidth, this.myHeight);
}