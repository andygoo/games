/***Author:々守朢 星塵ヅ  2016-05-31***/
function Layer(element, btn1, btn2) {
    this.location = 0;
    this.myName = element;
    this.btnName1 = btn1;
    this.btnName2 = btn2;
    this.opacity = document.getElementById("opacity");
    this.myImage = document.getElementById(element);
    this.btn1 = document.getElementById(btn1);
    this.btn2 = document.getElementById(btn2);

    if (Math.round(this.myImage.width * lzb_prop) >= Math.round(lzb_canvas.height * 0.72)) {
        this.myWidth = Math.round(this.myImage.width * lzb_prop * 0.95);
        this.myHeight = Math.round(this.myImage.height * lzb_prop * 0.95);
    } else {
        this.myWidth = Math.round(this.myImage.width * lzb_prop);
        this.myHeight = Math.round(this.myImage.height * lzb_prop);
    }

    if (this.btnName1) {
        this.btnWidth1 = Math.round(this.btn1.width * lzb_prop);
        this.btnHeight1 = Math.round(this.btn1.height * lzb_prop);
        this.location = Math.round(this.btnHeight1 * 1);
    }
    if (this.btnName2) {
        this.btnWidth2 = Math.round(this.btn2.width * lzb_prop);
        this.btnHeight2 = Math.round(this.btn2.height * lzb_prop);
    }

    if (this.myName != "game") {
        this.myX = (lzb_canvas.width - this.myWidth) >> 1;
        this.myY = ((lzb_canvas.height - this.myHeight) >> 1) - this.location;
    } else {
        this.myX = (lzb_canvas.width - this.myWidth * 0.85) >> 1;
        this.myY = Math.round(lzb_canvas.height * 0.2) - this.location;
    }
}

Layer.prototype.render = function () {
    if (this.myName != "game") {
        lzb_context.drawImage(this.opacity, 0, 0, lzb_canvas.width, lzb_canvas.height);
        lzb_context.drawImage(this.myImage, this.myX, this.myY, this.myWidth, this.myHeight);
    } else {
        lzb_context.drawImage(this.myImage, this.myX, this.myY, Math.round(this.myWidth * 0.85), Math.round(this.myHeight * 0.85));
    }

    if (this.btnName2) {
        lzb_context.drawImage(this.btn1, Math.round(((lzb_canvas.width - this.btnWidth1 - this.btnWidth2) >> 1) - lzb_canvas.width * 0.02), Math.round(this.myY + this.myHeight + this.btnHeight1 * 0.5), this.btnWidth1, this.btnHeight1);

        lzb_context.drawImage(this.btn2, Math.round(((lzb_canvas.width - this.btnWidth1) >> 1) + (this.btnWidth2 >> 1) + lzb_canvas.width * 0.02), Math.round(this.myY + this.myHeight + this.btnHeight2 * 0.5), this.btnWidth2, this.btnHeight2);

        ev_btn(this.btnName1, Math.round(((lzb_canvas.width - this.btnWidth1 - this.btnWidth2) >> 1) - lzb_canvas.width * 0.02), Math.round(this.myY + this.myHeight + this.btnHeight1 * 0.5), this.btnWidth1, this.btnHeight1);
        ev_btn(this.btnName2, Math.round(((lzb_canvas.width - this.btnWidth1) >> 1) + (this.btnWidth2 >> 1) + lzb_canvas.width * 0.02), Math.round(this.myY + this.myHeight + this.btnHeight2 * 0.5), this.btnWidth2, this.btnHeight2);

    } else if (this.btnName1) {
        if (this.myName != "game") {
            lzb_context.drawImage(this.btn1, ((lzb_canvas.width - this.btnWidth1) >> 1), Math.round(this.myY + this.myHeight + this.btnHeight1 * 0.5), this.btnWidth1, this.btnHeight1);
            ev_btn(this.btnName1, ((lzb_canvas.width - this.btnWidth1) >> 1), Math.round(this.myY + this.myHeight + this.btnHeight1 * 0.5), this.btnWidth1, this.btnHeight1);
        } else {
            lzb_context.drawImage(this.btn1, ((lzb_canvas.width - this.btnWidth1) >> 1), Math.round(this.myY + this.myHeight * 0.8 + this.btnHeight1 * 0.5), this.btnWidth1, this.btnHeight1);
            ev_btn(this.btnName1, ((lzb_canvas.width - this.btnWidth1) >> 1), Math.round(this.myY + this.myHeight * 0.8 + this.btnHeight1 * 0.5), this.btnWidth1, this.btnHeight1);
        }
    }
}
