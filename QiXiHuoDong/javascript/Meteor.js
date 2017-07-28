/*流星效果*/
function Meteor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.o = Math.random();
    this.l = 0;

    this.stars = [];
    this.meteors = new Array(8);
}

Meteor.prototype = {
    constructor: Meteor,

    //出现流星
    animate: function() {
        for (var i = 0; i < this.meteors.length; i++) {
            this.resetMeteor(i);
        }
        var obj = this;
        requestAnimationFrame(function() {
            obj.fRender();
            requestAnimationFrame(arguments.callee);
        });
    },
    //渲染流星
    fRender: function() {
        lzb_context.clearRect(0, 0, this.width, this.height);
        for (var i = 0; i < this.meteors.length; i++) {
            var line = lzb_context.createLinearGradient(this.meteors[i].x, this.meteors[i].y, this.meteors[i].x + this.meteors[i].l, this.meteors[i].y - 1 / 2 * this.meteors[i].l);
            line.addColorStop(0, "rgba(224,224,224," + this.meteors[i].o + ")");
            line.addColorStop(0.4, "rgba(51,51,51," + this.meteors[i].o + ")");
            line.addColorStop(1, "rgb(0,0,0)");
            lzb_context.strokeStyle = line;
            lzb_context.lineWidth = this.meteors[i].r;

            lzb_context.beginPath();
            lzb_context.moveTo(this.meteors[i].x, this.meteors[i].y);
            lzb_context.lineTo(this.meteors[i].x + this.meteors[i].l, this.meteors[i].y - 1 / 2 * this.meteors[i].l);
            lzb_context.closePath();

            lzb_context.stroke();

            if (this.meteors[i].x >= this.width || this.meteors[i].y >= this.height * 2 / 3) {
                if (this.meteors[i].l > 0) this.meteors[i].l -= 4;
                else {
                    this.resetMeteor(i);
                }
            } else {
                this.meteors[i].x -= 4;
                this.meteors[i].y += 2;
                if (this.meteors[i].l <= Math.ceil(this.height / 2.5)) {
                    this.meteors[i].l += 3;
                }
            }
        }
    },

    //渲染静态的星星和月亮
    bRender: function() {
        for (var i = 0; i < 10; i++) {
            var x = Math.ceil(Math.random() * this.width);
            var y = Math.ceil(Math.random() * this.height * 4 / 5);
            var o = Math.random() * 150 / y;
            var r = Math.ceil(Math.random() * 1);

            if (y < this.height / 3) this.stars.push(new meteor(x, y, r));
        }
    },

    //重置流星组
    resetMeteor: function(index) {
        var i = Math.floor(Math.random() * this.stars.length);
        this.Meteor[index] = new Meteor(this.stars[i].x, this.stars[i].y, this.stars[i].r);
    }
}