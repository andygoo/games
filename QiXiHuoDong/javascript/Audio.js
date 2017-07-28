function Audio(element) {
    this.sound = $$(element);
    if (lzb_musicArray.indexOf(this.sound) < 0) {
        lzb_musicArray.push(this.sound);
    }
}
Audio.prototype.render = function(isPlay,callback) {
    var _this_=this;
    if(isPlay&&isiOS){
        if(_this_.sound.readyState!=4){
            _this_.sound.load();
        }
    }

    for (var i = 0; i < lzb_musicArray.length; i++) {
        if (lzb_musicArray[i].currentTime > 0) {
            lzb_musicArray[i].muted=true;
            lzb_musicArray[i].pause();
            lzb_musicArray[i].currentTime = 0;
            lzb_musicArray[i].volume=0;
        }
    }

    if (!lzb_ismusic) {
        _this_.sound.muted=true;
        _this_.sound.pause();
        callback();
    } else {
        if (isPlay) {
            _this_.sound.muted=false;
            _this_.sound.play();
            callback();
        }
    }
}