/**
 * Created by Administrator on 2016/8/3.
 * author yaoqianfeng
 */
//工具函数
function $$(id) {
    return document.getElementById(id);
}

function debug(html) {
    var oTest = $$("debug-info");
    var newNode = document.createElement("div");
    newNode.innerHTML = html;
    oTest.insertBefore(newNode, null);
}

function randomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}
//停止事件冒泡
function stopBubble(e) {
    if (e && e.stopPropagation){
        e.stopPropagation();
    }else{
        window.event.cancelBubble = true
    }
}

/*保存渲染的某帧为图片*/
function saveImage(canvas) {
    var image = new Image();

    if ($$("canvasImg")) {
        $$("canvasImg").src = canvas.toDataURL("image/png");
    } else {
        var imgObj = document.createElement("img");
        imgObj.src = canvas.toDataURL("image/png");
        imgObj.id = "canvasImg";
        $$("imgbox").appendChild(imgObj);
    }
}

/*图片加载进度*/
function loadImage(s) {
    var urlset = [],
        undefined,
        toString = Object.prototype.toString;
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
        imgset[i].onload = function () {
            _imageHandle.call(this, 'load', i);
        };
        imgset[i].onerror = function () {
            _imageHandle.call(this, 'error', i);
        };
        imgset[i].onabort = function () {
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
        if (_isFn(s.oncomplete)) {
            s.oncomplete.call(this, r);
        }
        if (r.complete === imgset.length) {
            _callback();
        }
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
