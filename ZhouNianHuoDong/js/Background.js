/***Author:々守朢 星塵ヅ  2016-05-31***/
function Background(element, velocity, location) {
    this.myImage = document.getElementById(element);
    this.myVelocity = velocity ? velocity * lzb_prop : false;
    this.myLocation = location;
    this.myX = this.myLocation ? lzb_canvas.width : 0;
    this.myWidth = Math.round(this.myImage.width * lzb_prop);
    this.myHeight = Math.round(this.myImage.height * lzb_prop);

    if (element == "water-011") {
        lzb_waterBefore_h = this.myHeight;
    }
    this.myName = element;
}

Background.prototype.render = function () {
    if (this.myVelocity) {
        var pullWidth = this.myWidth - this.myX;
        var locationY = this.myLocation ? lzb_canvas.height * 0.2 : lzb_canvas.height - this.myHeight;

        lzb_context.drawImage(this.myImage, this.myX, locationY, this.myWidth, this.myHeight);
        if (Math.abs(this.myX) + lzb_canvas.width >= this.myWidth) {
            var newmyX = this.myWidth + this.myX
            lzb_context.drawImage(this.myImage, newmyX, locationY, this.myWidth, this.myHeight);
        }

        this.myX -= this.myVelocity;
        if (Math.abs(this.myX) >= this.myWidth) {
            this.myX = this.myLocation ? lzb_canvas.width : 0;
        }
    } else {
        lzb_context.drawImage(this.myImage, 0, 0, this.myWidth, this.myHeight);
    }
}