function Layer(element) {
    this.myImage = $$(element);
    this.myName = element;
    this.myWidth = Math.round(this.myImage.width * lzb_prop);
    this.myHeight = Math.round(this.myImage.height * lzb_prop);

    this.myX = (lzb_canvas.width - this.myWidth) >> 1;
    this.myY = lzb_canvas.height;

    this.myEndY = this.myName == "layer-failure" ? ((lzb_canvas.height - this.myHeight) >> 1) - (this.myHeight >> 2) : (lzb_canvas.height - this.myHeight) >> 1;
    this.myMoveY = lzb_canvas.height;
    this.myOnceSpeed = 0;
    this.iSpeed = 0;
}

Layer.prototype.render = function(showScore) {
    lzb_context.fillStyle = "rgba(0,0,0,0.6)";
    lzb_context.fillRect(0, 0, lzb_canvas.width, lzb_canvas.height);

    var myY = isiOS ? this.myEndY : this.myMoveY;

    if(showScore){
        lzb_context.font = "normal "+ 14 +"px Microsoft YaHei";
        lzb_context.fillStyle = "#e10f6b";

        var text1 = "您的成绩为："+ lzb_people.myScore +"分";
        var text2 = "成绩必须达到"+ lzb_passScore +"分才能抽奖";

        var textX1 = ((lzb_canvas.width / lzb_ratio) >> 1) - (lzb_context.measureText(text1).width >> 2);
        var textX2 = ((lzb_canvas.width / lzb_ratio) >> 1) - Math.round(lzb_context.measureText(text2).width * 0.35);

        var myTextY = isiOS ? this.myEndY : this.myMoveY;
        var textY = Math.round((myTextY + this.myHeight*0.62) / lzb_ratio);

        lzb_context.drawImage(this.myImage, this.myX, myY, this.myWidth, this.myHeight);

        lzb_context.fillText(text1, textX1, textY);
        lzb_context.fillStyle = "#9a999a";
        lzb_context.fillText(text2, textX2, textY + 10 * lzb_ratio);
    }else{
        lzb_context.drawImage(this.myImage, this.myX, myY, this.myWidth, this.myHeight);
    }

}