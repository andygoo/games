/***Author:々守朢 星塵ヅ  2016-05-31***/
//摆放礼物出现的位置
function GoodsMove(element, location) {
    this.myGood = $$(element);
    this.myFire1 = $$("good-05");
    this.myFire2 = $$("good-06");
    this.myName = element;
    this.myLocation = location;
    this.iSpeed = 0.5;

    this.myWidth = this.myGood.width * lzb_prop;
    this.myHeight = this.myGood.height * lzb_prop;

    this.myInitialWidth = Math.round(this.myGood.width * lzb_prop);
    this.myInitialHeight = Math.round(this.myGood.height * lzb_prop);

    this.myX = (lzb_canvas.width - this.myWidth) >> 1;
    this.myY = 0;
}

GoodsMove.prototype.render = function() {
    this.myWidth = Math.round( Math.pow(this.myInitialWidth, this.iSpeed) );
    this.myHeight = Math.round( Math.pow(this.myInitialHeight, this.iSpeed) );

    this.myX = (lzb_canvas.width - this.myWidth) >> 1;
    if(this.myLocation == 0){
        this.myX = this.myX - Math.round( Math.pow(lzb_reference[4], this.iSpeed) * (1/3)) * 0.8;
    }else if(this.myLocation == 2){
        this.myX = this.myX + Math.round( Math.pow(lzb_reference[4], this.iSpeed) * (1/3)) * 0.8;
    }

    if(this.iSpeed < 1.2){
        this.myY = lzb_reference[3] + Math.round( Math.pow(lzb_canvas.height - lzb_reference[3], this.iSpeed) ) - Math.round( Math.pow(lzb_reference[5], this.iSpeed) );

        if(this.myName == "good-05"){
            this.myGood = Math.ceil(lzb_levelDirector.myClock/100)%2 == 0 ? this.myFire1 : this.myFire2;
        }

        lzb_context.drawImage(this.myGood, this.myX, this.myY, this.myWidth, this.myHeight);
        this.iSpeed = this.iSpeed + 0.005;
        return true;
    }
    return false;
}

