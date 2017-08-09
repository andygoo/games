/***Author:々守朢 星塵ヅ  2016-05-31***/
window.onload = function() {
		var $imgBox = document.getElementById("imgbox");
    imageLoad({
        url: function(v) {
            if (lzb_context == undefined) {
                if (!initCanvas()) {
                    alert("不支持canvas");
                    return;
                }
            }
						
            loading = [];
            loadImg = ["game-bg.jpg", "loader-01.png", "loader-02.png", "game.png", "btn-about.png", "btn-rank.png", "btn-again.png", "btn-again-hover.png", "btn-next.png", "btn-next-hover.png", "btn-over.png", "btn-over-hover.png", "btn-start.png", "btn-start-hover.png", "failure.png", "good-01.png", "good-02.png", "good-03.png", "good-04.png", "layer-about.png", "unit.png", "num0.png", "num1.png", "num2.png", "num3.png", "num4.png", "num5.png", "num6.png", "num7.png", "num8.png", "num9.png", "score50.png", "score20.png", "score10.png","score00.png", "opacity.png", "pass-01.png", "pass-02.png", "pass-03.png", "people.png", "spray1-1.png", "spray1-2.png", "spray1-3.png", "spray1-4.png", "spray2-1.png", "spray2-2.png", "spray2-3.png", "spray2-4.png", "spray3-1.png", "spray3-2.png", "spray3-3.png", "spray3-4.png", "succeed-2.png", "succeed-3.png", "timer-01.png", "timer-02.png", "tips-01.png", "tips-02.png", "tips-03.png", "card-01.jpg", "card-02.jpg", "card-03.jpg", "cloud.png", "water-01.png", "water-02.png", "water-03.png", "water-011.png", "water-022.png", "water-033.png"];

            for (var i = 0; i <= loadImg.length - 1; i++) {
                loading[loading.length] = lzb_imgSrc + loadImg[i] + '?_=' + (new Date).getTime();
                if (loadImg[i].indexOf("game-bg") >= 0) {
                    $image = document.getElementById("game-bg");
                    lzb_prop = lzb_canvas.width / $image.width;
										
                    lzb_context.beginPath();
                    var bgColor = lzb_context.createLinearGradient(0, 0, 0, 140);
                    bgColor.addColorStop(0, 'rgb(74, 168, 239)');
                    bgColor.addColorStop(1, 'rgb(214, 239, 255)');
                    lzb_context.fillStyle = bgColor;
                    lzb_context.rect(0, 0, lzb_canvas.width, lzb_canvas.height);
                    lzb_context.fill();
                }else if (loadImg[i].indexOf("loader-01") >= 0) {
                    loadImg1 = document.getElementById("loader-01");
                    
                    load_w = loadImg1.width;
                    load_h = loadImg1.height;

                    load_x = (lzb_canvas.width - load_w) >> 1;
                    load_y = (lzb_canvas.height - load_h) >> 1;
										
                    lzb_context.drawImage(loadImg1, load_x, load_y, load_w, load_h);
                }else{
										var imgObj = document.createElement("img");
										imgObj.src = lzb_imgSrc + loadImg[i] + '?_=' + (new Date).getTime();
										imgObj.id = loadImg[i].split(".")[0];
										$imgBox.appendChild(imgObj);	
								}
            }
            return loading;
        },
        oncomplete: function(s) {
						loadImg2 = document.getElementById("loader-02");
            lzb_context.drawImage(loadImg2, 0, 0, Math.round(load_w * (s.complete / s.total)), load_h, load_x, load_y, Math.round(load_w * (s.complete / s.total)), load_h);
        },
        complete: function(imgs, s) {
						if (s.total == s.load + s.error) {
								lzb_score_w = Math.round(document.getElementById("unit").width * lzb_prop);
                lzb_score_h = Math.round(document.getElementById("unit").height * lzb_prop);
                gameStart();
						}
        }
    });
};

function initCanvas() {
    lzb_canvas = document.getElementById('canvas');
    lzb_canvas.width = window.innerWidth;
    lzb_canvas.height = window.innerHeight;

    if (!lzb_canvas.getContext) {
        return false;
    }
    lzb_context = lzb_canvas.getContext('2d');
    lzb_context.font = 0.9 * lzb_ratio + "rem Arial";

    return true;
}

function imageLoad(s) {
    var urlset = [], undefined, toString = Object.prototype.toString;
    switch (toString.apply(s.url)) {
    case '[object String]':
        urlset[urlset.length] = s.url;
        break;
    case '[object Array]':
        if (!s.url.length) {
            return false;
        }
        urlset = s.url;
        break;
    case '[object Function]':
        s.url = s.url();
        return imageLoad(s);
    default:
        return false;
    }
    var imgset = [],
    r = {
        total: urlset.length,
        load: 0,
        error: 0,
        abort: 0,
        complete: 0,
        currentIndex: 0
    },
    timer,
    _defaults = {
        url: '',
        onload: 'function',
        onerror: 'function',
        oncomplete: 'function',
        ready: 'function',
        complete: 'function',
        timeout: 15
    };
    for (var v in _defaults) {
        s[v] = s[v] === undefined ? _defaults[v] : s[v];
    }
    s.timeout = parseInt(s.timeout) || _defaults.timeout;
    timer = setTimeout(_callback, s.timeout * 1000);
    for (var i = 0,
    l = urlset.length,
    img; i < l; i++) {
        img = new Image();
        img.loaded = false;
        imgset[imgset.length] = img;
    }
    for (i = 0, l = imgset.length; i < l; i++) {
        imgset[i].onload = function() {
            _imageHandle.call(this, 'load', i);
        };
        imgset[i].onerror = function() {
            _imageHandle.call(this, 'error', i);
        };
        imgset[i].onabort = function() {
            _imageHandle.call(this, 'abort', i);
        };
        imgset[i].src = '' + urlset[i];
    }
    if (_isFn(s.ready)) {
        s.ready.call({},
        imgset, r);
    }
    function _imageHandle(handle, index) {
        r.currentIndex = index;
        switch (handle) {
        case 'load':
            this.onload = null;
            this.loaded = true;
            r.load++;
            if (_isFn(s.onload)) {
                s.onload.call(this, r);
            }
            break;
        case 'error':
            r.error++;
            if (_isFn(s.onerror)) {
                s.onerror.call(this, r);
            }
            break;
        case 'abort':
            r.abort++;
            break;
        }
        r.complete++;
        if (_isFn(s.oncomplete)) {s.oncomplete.call(this, r);}
        if (r.complete === imgset.length) {_callback();}
    }
    function _callback() {
        clearTimeout(timer);
        if (_isFn(s.complete)) {
            s.complete.call({},
            imgset, r);
        }
    }
    function _isFn(fn) {
        return toString.apply(fn) === '[object Function]';
    }
    return true;
}