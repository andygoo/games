//渲染背景
function Background(element, iSpeed, randomX) {
    var num = randomX ? "-0" + randomNum(1, 2) : "";
    this.girl= $$("girl");
    this.myImage = $$(element + num);

    var new_prop = this.myImage.width >= lzb_canvas.width ? 1 : lzb_prop;
    this.myWidth = Math.round(this.myImage.width * new_prop);
    this.myHeight = Math.round(this.myImage.height * new_prop);
    this.myX = randomX ? randomNum(0, lzb_canvas.width) : (lzb_canvas.width - this.myWidth) >> 1;
    this.myY = 0;

    this.iSpeed = iSpeed ? iSpeed: 0;
    this.myVelY = 0;
}

Background.prototype.fullRender = function() {
    lzb_context.drawImage(this.myImage, 0, 0, lzb_canvas.width, lzb_canvas.height);
}

Background.prototype.cloudRender = function() {
    initial = Math.round(lzb_canvas.height * 0.2);
    var myWidth, myHeight, myX, myY;

    if (this.myVelY == 0) {
        this.myY = initial;
        this.myVelY = lzb_canvas.height - initial;
    }

    myWidth = Math.round(Math.pow(this.myWidth, this.iSpeed));
    myHeight = Math.round(Math.pow(this.myHeight, this.iSpeed));

    if (this.iSpeed <= 1.025) {
        myY = this.myY + Math.round(Math.pow(this.myVelY, this.iSpeed)) - myHeight;
        this.iSpeed = this.iSpeed + 0.0005;
    }

    lzb_context.drawImage(this.myImage, this.myX, myY, myWidth, myHeight);
}

Background.prototype.woodRender = function() {
    initial = Math.round(lzb_canvas.height * 0.2);
    var myWidth, myHeight, myX, myY;

    if (this.myVelY == 0) {
        this.myY = initial;
        this.myVelY = lzb_canvas.height - initial;
    }

    if (this.iSpeed == 0) {
        myWidth = Math.round(Math.pow(this.myWidth, 0.5));
        myHeight = Math.round(Math.pow(this.myHeight, 0.5));
        myX = (lzb_canvas.width - myWidth) >> 1;
        myY = this.myY + Math.round(Math.pow(this.myVelY, 0.5)) - myHeight;

        if (lzb_reference.length == 0) {
            lzb_reference[0] = myWidth;
            lzb_reference[1] = myHeight;
            lzb_reference[2] = myX;
            lzb_reference[3] = myY;
        }

        var girlWidth =  Math.round(Math.pow(this.girl.width * lzb_prop, 0.9));
        var girlHeight = Math.round(Math.pow(this.girl.height * lzb_prop, 0.9));
        lzb_context.drawImage(this.girl, myX, myY - girlHeight, girlWidth, girlHeight);
    } else {
        myWidth = Math.round(Math.pow(this.myWidth, this.iSpeed));
        myHeight = Math.round(Math.pow(this.myHeight, this.iSpeed));
        myX = (lzb_canvas.width - myWidth) >> 1;

        if (this.iSpeed <= 1.04) {
            myY = this.myY + Math.round(Math.pow(this.myVelY, this.iSpeed)) - myHeight;
            if (this.iSpeed == lzb_background_woodISpeed[lzb_background_woodISpeed.length - 1] && lzb_reference.length <= 4) {
                lzb_reference[4] = myWidth;
                lzb_reference[5] = myHeight;
                lzb_reference[6] = myX;
                lzb_reference[7] = myY;
            }
            this.iSpeed = this.iSpeed + 0.005;
        } else {
            this.iSpeed = 0.5;
        }
    }
    lzb_context.drawImage(this.myImage, myX, myY, myWidth, myHeight);

    /* var rect={
        strokeStyle:"#7e482a",
        fillStyle:"#7e482a"
    };

    drawRoundedRect(
        rect.strokeStyle,
        rect.fillStyle,
        Math.round((myX + myWidth * 0.05) / lzb_ratio),
        Math.round((myY + (myHeight >> 1)) / lzb_ratio - myHeight / lzb_ratio * 1.2),
        Math.round(myWidth / lzb_ratio * 0.045),
        Math.round(myHeight / lzb_ratio * 1.2),
        Math.round(myWidth / lzb_ratio * 0.02)
    );

    drawRoundedRect(
        rect.strokeStyle,
        rect.fillStyle,
        Math.round((myX + myWidth * 0.95) / lzb_ratio - myWidth / lzb_ratio * 0.045),
        Math.round((myY + (myHeight >> 1)) / lzb_ratio - myHeight / lzb_ratio * 1.2),
        Math.round(myWidth / lzb_ratio * 0.045),
        Math.round(myHeight / lzb_ratio * 1.2),
        Math.round(myWidth / lzb_ratio * 0.02)
    );*/
}