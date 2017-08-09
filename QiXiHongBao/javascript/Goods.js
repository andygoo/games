/***Author:々守朢 星塵ヅ  2016-05-31***/
function Goods() {
		this.myMaxOnScreen = 3;
		this.good = "";
		this.frequency = 0;
}

Goods.prototype.fire = function() {
		var speed = 50 - lzb_levelDirector.myCurrentLevel*10
		this.good = lzb_kind[(randomNum(0,speed))]
		
		if (this.good == "good-01" || this.good == "good-02" || this.good == "good-03" || this.good == "good-04") {
    		lzb_projectiles.push(new GoodsFall(this.good));
		}
}

