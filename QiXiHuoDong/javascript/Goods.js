/***Author:々守朢 星塵ヅ  2016-05-31***/
function Goods() {
	this.good = "";
	this.location = 1;
}

Goods.prototype.fire = function() {
	if (lzb_levelDirector.myClock % 800 == 0) {
		var goodCode = randomNum(0, lzb_kind.length * 2 - 1);

		if (goodCode == 0) {
			this.good = lzb_kind[4];
		} else if (goodCode >= 1 && goodCode <= 2) {
			this.good = lzb_kind[3];
		} else if (goodCode >= 3 && goodCode <= 5) {
			this.good = lzb_kind[2];
		} else if (goodCode >= 6 && goodCode <= 7) {
			this.good = lzb_kind[1];
		} else if (goodCode >= 8 && goodCode <= 9) {
			this.good = lzb_kind[0];
		}

		this.location = randomNum(0, lzb_people_x.length - 1);
		if (this.good == lzb_kind[lzb_kind.length - 1]) {
			this.location = 1;
		}

		lzb_projectiles.push(new GoodsMove(this.good, this.location));
	}
}