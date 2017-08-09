/***Author:々守朢 星塵ヅ  2016-05-31***/
function People(score){
		this.people = document.getElementById("people");
		
		this.myImage = this.people;
    this.myWidth = Math.round(this.myImage.width * lzb_prop);
    this.myHeight = Math.round(this.myImage.height * lzb_prop);
		
		this.loactionY = Math.round(document.getElementById("water-011").height * lzb_prop*0.8);
		
		
		this.myX = lzb_canvas.width>>1;
    this.myY = lzb_canvas.height - this.myHeight - this.loactionY;
	
		lzb_people_x = lzb_canvas.width>>1;
		lzb_people_y = this.myY;
		
		this.myScore = score ? score :0;
		this.goods = new Goods();	//粽子下落
}


/*位置渲染*/
People.prototype.render = function() {
		var drawY = null;

		if(lzb_people_getX){
				this.myX = lzb_people_getX;
		}
		
		var pullWidth = this.myWidth;
    var pullHeight = this.myHeight;
		
		drawY = this.myX - (this.myWidth>>1)
		
		lzb_context.drawImage(this.myImage, drawY, this.myY, pullWidth, pullHeight);
    this.renderStatus();
		this.goods.fire();
		
		var remainingProjectiles = new Array();
   	for (var i = 0; i < lzb_projectiles.length; ++i) {
				if (Collision(this.myX-(this.myWidth>>1), this.myY, this.myX+(this.myWidth>>1), this.myY + this.myHeight, Math.round(lzb_projectiles[i].myX), Math.round(lzb_projectiles[i].myY), Math.round((lzb_projectiles[i].myX + lzb_projectiles[i].myWidth)*0.8), Math.round((lzb_projectiles[i].myY + lzb_projectiles[i].myHeight)*0.78))){
						if (lzb_projectiles[i].myName == "good-01") {
								this.myScore += 50;
								var ae = new AfterEffect("score",  Math.round(lzb_projectiles[i].myX), this.myY, "50");
						} else if (lzb_projectiles[i].myName == "good-02") {
								this.myScore += 10;
								var ae = new AfterEffect("score",  Math.round(lzb_projectiles[i].myX), this.myY, "10");
						} else if (lzb_projectiles[i].myName == "good-03") {
								if(this.myScore!=0){
										this.myScore -= 10;
										var ae = new AfterEffect("score",  Math.round(lzb_projectiles[i].myX), this.myY, "00");
								}
						} else if (lzb_projectiles[i].myName == "good-04") {
								this.myScore += 20;
								var ae = new AfterEffect("score",  Math.round(lzb_projectiles[i].myX), this.myY, "20");
						}
						lzb_afterEffects.push(ae);
						
						delete lzb_projectiles[i];
				}else if (Collision(0, lzb_canvas.height-lzb_waterBefore_h, lzb_canvas.width, lzb_canvas.height, Math.round(lzb_projectiles[i].myX), Math.round(lzb_projectiles[i].myY), Math.round(lzb_projectiles[i].myX + lzb_projectiles[i].myWidth), Math.round((lzb_projectiles[i].myY + lzb_projectiles[i].myHeight)*0.9))){
						var ae = new AfterEffect("spray",  Math.round(lzb_projectiles[i].myX), Math.round(lzb_projectiles[i].myY));
						lzb_afterEffects.push(ae);
				}else{
						remainingProjectiles.push(lzb_projectiles[i]);
				}
		}
		
		delete lzb_projectiles;
		lzb_projectiles = remainingProjectiles;
}

/*分数*/
People.prototype.renderStatus = function() {
		var sunit = document.getElementById("unit");
		var myScore = String(this.myScore);
		var myY = Math.round(lzb_canvas.height*0.02);
		
		if(myScore.length==1){
				myScore = "0000"+myScore;	
		}else if(myScore.length == 2){
				myScore = "000"+myScore;
		}else if(myScore.length == 3){
				myScore = "00"+myScore;	
		}else if(myScore.length == 4){
				myScore = "0"+myScore;	
		}else{
				myScore = myScore;	
		}
		
		lzb_context.drawImage(sunit, (lzb_canvas.width-(myScore.length+1)*lzb_score_w)/2, myY, lzb_score_w, lzb_score_h);
		for(var i=0;i<myScore.length;i++){
				var obj = document.getElementById("num"+myScore[i]);
				var objY = (lzb_canvas.width-(myScore.length+1)*lzb_score_w)/2+lzb_score_w*(i+1);

				lzb_context.drawImage(obj, objY, myY, lzb_score_w, lzb_score_h);
		}
}

People.prototype.left = function(engaged) {
    if (this.myVisible == false) return;

    if (!engaged) {
        if (!this.myRight) {
            this.myVelX = 0;
        }
        this.myLeft = false;
        return;
    }

    this.myVelX = -1 * this.myVelocity;
    this.myLeft = true;
}
People.prototype.right = function(engaged) {
    if (this.myVisible == false) return;

    if (!engaged) {
        if (!this.myLeft) {
            this.myVelX = 0;
        }
        this.myRight = false;
        return;
    }

    this.myVelX = this.myVelocity;
    this.myRight = true;
}
