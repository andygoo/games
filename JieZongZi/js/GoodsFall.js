/***Author:々守朢 星塵ヅ  2016-05-31***/
function GoodsFall(weapon) {
		this.myGood = document.getElementById(weapon);
		this.myName = weapon;
		
		this.myVelY = lzb_canvas.height/((30/lzb_levelDirector.myCurrentLevel)+20);
    this.myFrameCounter = 0;
	
    this.myWidth = this.myGood.width * lzb_prop;
		this.myHeight = this.myGood.height * lzb_prop;
		
    this.myX = randomNum(0, lzb_canvas.width-this.myWidth);
		this.myY = -this.myHeight;
}

GoodsFall.prototype.render = function() {
    if (this.myName == "good-01" || this.myName == "good-02" || this.myName == "good-03" || this.myName == "good-04") {
			lzb_context.drawImage(this.myGood, this.myX, this.myY, this.myWidth, this.myHeight);
			
			this.myY += this.myVelY;
			this.myFrameCounter++;
			return true;
		}
		
		return false;
}