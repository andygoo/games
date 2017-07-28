/***Author:々守朢 星塵ヅ  2016-05-31***/
function People(score) {
    this.myWood = $$("wood");
    this.myWoodWidth = Math.round(this.myWood.width * lzb_prop);

    this.people1 = $$("people-01");
    this.people2 = $$("people-02");
    this.people3 = $$("people-03");
    this.myImage = this.people1;
    this.myWidth = Math.round(this.myImage.width * lzb_prop);
    this.myHeight = Math.round(this.myImage.height * lzb_prop);

    this.myX = (lzb_canvas.width - this.myWidth) >> 1;
    this.myY = lzb_canvas.height - this.myHeight;

    this.myLoction = 1;
    this.myJump = false;
    this.down = false;
    this.sHeight = 0;
    this.eHeight = 0;
    this.iSpeed = 0;
    this.currentSpeed = [0.2, 0.18, 0.16, 0.14, 0.12, 0.1, 0.05, 0.05];
    this.currentI = 0;

    this.myScore = score ? score: 0;
    this.goods = new Goods();
}

/*位置渲染*/
People.prototype.render = function() {
    if (lzb_reference.length == 0) {
        return;
    }

    this.myProp = (lzb_reference[4] / this.myWoodWidth);
    var myImage = this.people1;
    var myWidth = Math.round(this.myWidth * this.myProp);
    var myHeight = Math.round(this.myHeight * this.myProp);
    var myX = (lzb_canvas.width - myWidth) >> 1;
    var myY = Math.round(lzb_canvas.height * 0.96 - myHeight);

    if (!this.sHeight) {
        this.sHeight = myY;
        this.eHeight = myY - (myHeight >> 1);
    }

    if (lzb_people_x.length == 0) {
        lzb_people_x[1] = myX;
        lzb_people_x[0] = lzb_people_x[1] - Math.round(lzb_reference[4] * (1 / 3)) + Math.round(lzb_reference[4] * 0.08);
        lzb_people_x[2] = lzb_people_x[1] + Math.round(lzb_reference[4] * (1 / 3)) - Math.round(lzb_reference[4] * 0.08);
    } else {
        if (!this.myJump) {
            myImage = Math.ceil(lzb_levelDirector.myClock / 200) % 2 == 0 ? this.people1: this.people2;
        } else {
            myImage = this.people3;

            if (Math.abs(this.iSpeed) <= this.sHeight - this.eHeight && !this.down) {
                this.iSpeed -= (this.sHeight - this.eHeight) * this.currentSpeed[this.currentI];
                if (this.currentI < this.currentSpeed.length - 1) {
                    this.currentI++;
                }
            } else {
                this.currentI = 0;
                this.down = true;
            }

            if (this.iSpeed < 0 && this.down) {
                this.iSpeed += (this.sHeight - this.eHeight) * this.currentSpeed[0];
            } else if (this.iSpeed >= 0) {
                this.myJump = false;
            }
        }
        lzb_context.drawImage(myImage, lzb_people_x[this.myLoction], myY + this.iSpeed, myWidth, myHeight);

        this.renderStatus();
        this.goods.fire();
    }

    var remainingProjectiles = new Array();
    if (!this.myJump) {
        for (var i = 0; i < lzb_projectiles.length; ++i) {
            if (collision(lzb_people_x[this.myLoction], myY + Math.round(myHeight * 0.9), lzb_people_x[this.myLoction] + myWidth, myY + myHeight, Math.round(lzb_projectiles[i].myX), Math.round(lzb_projectiles[i].myY + (lzb_projectiles[i].myHeight >> 2)), Math.round(lzb_projectiles[i].myX + lzb_projectiles[i].myWidth), Math.round(lzb_projectiles[i].myY + lzb_projectiles[i].myHeight))) {

                if (lzb_projectiles[i].myName == "good-01") {
                    this.myScore += 100;
                    var ae = new AfterEffect("score", lzb_people_x[this.myLoction] + (myWidth >> 1), myY, "+100");
                } else if (lzb_projectiles[i].myName == "good-02") {
                    this.myScore += 50;
                    var ae = new AfterEffect("score", lzb_people_x[this.myLoction] + (myWidth >> 1), myY, "+50");
                } else if (lzb_projectiles[i].myName == "good-03") {
                    this.myScore += 30;
                    var ae = new AfterEffect("score", lzb_people_x[this.myLoction] + (myWidth >> 1), myY, "+30");
                } else if (lzb_projectiles[i].myName == "good-04") {
                    if(this.myScore > 20||this.myScore ==20){
                        this.myScore -= 20;
                    }else if(this.myScore<20){
                        this.myScore =0;
                    }
                    var ae = new AfterEffect("score", lzb_people_x[this.myLoction] + (myWidth >> 1), myY, "-20");
                } else if (lzb_projectiles[i].myName == "good-05") {
                    gameOver();
                }
                lzb_afterEffects.push(ae);

                delete lzb_projectiles[i];
            } else {
                remainingProjectiles.push(lzb_projectiles[i]);
            }
        }

        delete lzb_projectiles;
        lzb_projectiles = remainingProjectiles;
    }
}

/*分数*/
People.prototype.renderStatus = function() {
    var sunit = $$("unit");
    var sunitWidth = Math.round(sunit.width * lzb_prop);
    var sunitHeight = Math.round(sunit.height * lzb_prop);
    var myScore = String(this.myScore);
    var myX = Math.round(lzb_canvas.width * 0.036);
    var myY = Math.round(lzb_canvas.height * 0.036);

    if (myScore.length == 1) {
        myScore = "000" + myScore;
    } else if (myScore.length == 2) {
        myScore = "00" + myScore;
    } else if (myScore.length == 3) {
        myScore = "0" + myScore;
    } else {
        myScore = myScore;
    }

    lzb_context.drawImage(sunit, myX, myY, sunitWidth, sunitHeight);
    for (var i = 0; i < myScore.length; i++) {
        var obj = $$("num" + myScore[i]);
        var objX = myX + sunitWidth * (i + 1) + 10;

        lzb_context.drawImage(obj, objX, myY, sunitWidth, sunitHeight);
    }
}