/***Author:々守朢 星塵ヅ  2016-05-31***/
function CountDown(){
	this.totalTimer = lzb_timer;
	this.totalTimer = lzb_timer;
	this.myImageBg = $$("countdown-01");
	this.myImage = $$("countdown-02");

	this.myWidth = Math.round(this.myImageBg.width * lzb_prop);
	this.myHeight = Math.round(this.myImageBg.height * lzb_prop);

	this.myX = Math.round((lzb_canvas.width - this.myWidth)>>1);
	this.myY = Math.round(lzb_canvas.height*0.036) + (this.myHeight >> 2);
	this.timeX = 0;
}

CountDown.prototype.render = function() {
	var secTimer = Math.floor(((this.totalTimer - lzb_levelDirector.myClock * 1.2) / 1000)).toFixed(1);
	var progWidth  = Math.floor( (1-(lzb_levelDirector.myClock * 1.2 / this.totalTimer)) * this.myWidth );

	secTimer = parseInt(secTimer)+" s";
	lzb_context.drawImage(this.myImageBg, this.myX, this.myY, this.myWidth, this.myHeight);
	lzb_context.drawImage(this.myImage, this.myX, this.myY, progWidth, this.myHeight);

	if(this.timeX == 0){
		this.timeX = ((lzb_canvas.width - Math.round(lzb_context.measureText(secTimer).width)) / lzb_ratio) >> 1;
	}else{
		lzb_context.font = "normal "+ 4 * lzb_ratio +"px arial";
		lzb_context.fontHeight = this.myHeight / lzb_ratio;

		lzb_context.fillStyle = "#fefefe";
		lzb_context.fillText(secTimer, this.timeX ,this.myY / lzb_ratio + lzb_context.fontHeight - (lzb_context.fontHeight >> 2));
	}
}