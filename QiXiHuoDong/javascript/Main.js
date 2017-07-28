/*启动运行游戏*/

function $$(id){
    return document.getElementById(id);
}

function debug(html){
    var oTest = $$("debug-info");
    var newNode = document.createElement("div");
    newNode.innerHTML =html;
    oTest.insertBefore(newNode,null);
}

function randomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

function eventPackage(eventType,element, eType, handle, bol){
    var packageFn={
        add:function(element, eType, handle, bol) {
            if(element.addEventListener){
                element.addEventListener(eType, handle, bol);
            }else if(element.attachEvent){
                element.attachEvent("on"+eType, handle);
            }else{
                element["on"+eType] = handle;
            }
        },
        remove:function(element, eType, handle, bol) {
            if(element.addEventListener){
                element.removeEventListener(eType, handle, bol);
            }else if(element.attachEvent){
                element.detachEvent("on"+eType, handle);
            }else{
                element["on"+eType] = null;
            }
        }
    };
    packageFn[eventType](element, eType, handle, bol);
}

function ajax(obj) {
    var xhr = (function() {
        if (typeof XMLHttpRequest != 'undefined') {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != 'undefined') {
            var version = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
            for (var i = 0; i < version.length; i++) {
                try {
                    return new ActiveXObject(version[i]);
                } catch(e) {
                    //跳过
                }
            }
        } else {
            throw new Error('您的系统或浏览器不支持XHR对象！');
        }
    })();
    obj.url = obj.url + '?rand=' + Math.random();
    obj.data = (function(data) {
        var arr = [];
        for (var i in data) {
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        return arr.join('&');
    })(obj.data);
    if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data: '&' + obj.data;
    if (obj.async === true) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback();
            }
        };
    }
    xhr.open(obj.method, obj.url, obj.async);
    if (obj.method === 'post') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(obj.data);
    } else {
        xhr.send(null);
    }
    if (obj.async === false) {
        callback();
    }
    function callback() {
        if (xhr.status == 200) {
            obj.success(xhr.responseText);
        } else {
            obj.error(xhr);
        }
    }
}

/*保存渲染的某帧为图片*/
function saveImage() {
    var image = new Image();

    if($$("canvasImg")){
        $$("canvasImg").src = lzb_canvas.toDataURL("image/png");
    }else{
        var imgObj = document.createElement("img");
        imgObj.src = lzb_canvas.toDataURL("image/png");
        imgObj.id = "canvasImg";
        $$("imgbox").appendChild(imgObj);
    }
}

/*图片加载进度*/
function imageLoad(s) {
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

/*检测是否支持canvas*/
function initCanvas() {
    lzb_canvas = $$('canvas');
    lzb_canvas.width = window.innerWidth;
    lzb_canvas.height = window.innerHeight;

    if (!lzb_canvas.getContext) {
        return false;
    }
    lzb_context = lzb_canvas.getContext('2d');
    return true;
}

//游戏开始界面渲染 isbind是游戏说明弹出屏蔽点击事件用的
function gameStart(isbind) {
    lzb_gameStatus = true;

    lzb_background = new Background("start-bg");
    lzb_background.fullRender();

    lzb_btn[0] = new Btn("btn-start", isbind);
    lzb_btn[0].render();

    lzb_btn[1] = new Btn("btn-rank", isbind);
    lzb_btn[1].render();

    lzb_btn[2] = new Btn("btn-about", isbind);
    lzb_btn[2].render();

    lzb_musicArray[0] = new Audio("music");
}

/*暂停渲染（暂时没有用到）*/
function pause() {
    if (lzb_paused == null) lzb_paused = false;
    lzb_paused = !lzb_paused;
    if (lzb_paused) console.info("游戏暂停");
}

/*游戏结束*/
function gameOver() {
    lzb_gameStatus = false;
    clearTimeout(lzb_renderInterval);
}

//主游戏进程，贯穿整个游戏进度
function main(currentScore) {
    var currentScore = currentScore ? currentScore: 0;
    lzb_levelDirector = new LevelDirector(currentScore);
    lzb_levelDirector.startLevel();
}

/*循环渲染*/
function renderLoop() {
    if (lzb_paused) return;
    lzb_background.fullRender();

    for (var j = 0; j < lzb_background_cloudISpeed.length; j++) {
        lzb_background_cloud[j].cloudRender();
    }
    //var start=new Date().getTime();
    for (var i = 0; i < lzb_background_woodISpeed.length; i++) {
        lzb_background_wood[i].woodRender();
    }
    //var end=new Date().getTime();
    //debug((end-start)+"毫秒");
    /*物品*/
    var remainingProjectiles = new Array();
    for (var i = 0; i < lzb_projectiles.length; ++i) {
        if (lzb_projectiles[i].render()) {
            remainingProjectiles.push(lzb_projectiles[i]);
        } else delete lzb_projectiles[i];
    }
    delete lzb_projectiles;
    lzb_projectiles = remainingProjectiles;

    lzb_people.render();

    /*分数*/
    var remainingAfterEffects = new Array();
    for (var i = 0; i < lzb_afterEffects.length; ++i) {
        try {
            if (lzb_afterEffects[i].render()) {
                remainingAfterEffects.push(lzb_afterEffects[i]);
            } else delete lzb_afterEffects[i];
        } catch(error) {}
    }
    delete lzb_afterEffects;
    lzb_afterEffects = remainingAfterEffects;

    lzb_countDown.render();
    lzb_btn[3].render();

    lzb_levelDirector.myClock += 50;
    lzb_levelDirector.gameEvents();
}

/*碰撞检测*/
function collision(AX1, AY1, AX2, AY2, BX1, BY1, BX2, BY2) {
    if (AX1 < BX1) {
        if (AX2 < BX1) {
            return false;
        } else {
            if (AY1 < BY1) {
                if (AY2 < BY1) return false;
                else return true;
            } else {
                if (AY1 > BY2) return false;
                else return true;
            }
        }
    } else {
        if (AX1 > BX2) {
            return false;
        } else {
            if (AY1 < BY1) {
                if (AY2 < BY1) return false;
                else return true;
            } else {
                if (AY1 > BY2) return false;
                else return true;
            }
        }
    }
    return false;
}

/*这2个是画桥的柱子*/
function roundedRect(pillarX, pillarY, width, height, pillarRadius) {
    if (width > 0) {
        lzb_context.moveTo(pillarX + pillarRadius, pillarY);
    } else {
        lzb_context.moveTo(pillarX - pillarRadius, pillarY);
    }
    /*lzb_context.arcTo(pillarX + width, pillarY, pillarX + width, pillarY + height, pillarRadius);
    lzb_context.arcTo(pillarX + width, pillarY + height, pillarX, pillarY + height, pillarRadius);
    lzb_context.arcTo(pillarX, pillarY + height, pillarX, pillarY, pillarRadius);
    if (width > 0) {
        lzb_context.arcTo(pillarX, pillarY, pillarX + pillarRadius, pillarY, pillarRadius);
    } else {
        lzb_context.arcTo(pillarX, pillarY, pillarX - pillarRadius, pillarY, pillarRadius);
    }*/
}

function drawRoundedRect(strokeStyle, fillStyle, pillarX, pillarY, width, height, pillarRadius) {
    lzb_context.beginPath();
    roundedRect(pillarX, pillarY, width, height, pillarRadius);
    lzb_context.closePath();
    lzb_context.strokeStyle = strokeStyle;
    lzb_context.fillStyle = fillStyle;
    lzb_context.stroke();
    lzb_context.fill();
}

/*画桥的扶手（暂没用）*/
function drawBridge(array, direction) {
    if (!array instanceof Array) {
        return;
    }

    var zoom = 1;
    var bc = lzb_canvas.width / lzb_ratio - (array[2] - Math.round(array[0] * zoom));
    var ab = Math.round(Math.tan(60 * Math.PI / 180) * bc);

    lzb_context.beginPath();
    lzb_context.fillStyle = "#aa6d3f";
    if (direction) {
        lzb_context.moveTo(array[2], array[3]);
        lzb_context.lineTo(array[2] + Math.round(array[0] * (1 + zoom)), array[3]);
        lzb_context.lineTo(array[6] + Math.round(array[4] * (1 + zoom)), array[7]);
        lzb_context.lineTo(array[6], array[7]);

    } else {
        lzb_context.moveTo(array[1], array[3]);
        lzb_context.lineTo(array[1] + Math.round(array[0] * (1 + zoom)), array[3]);
        lzb_context.lineTo(array[5] + Math.round(array[4] * (1 + zoom)), array[7]);
        lzb_context.lineTo(array[5], array[7]);
    }

    lzb_context.closePath();
    lzb_context.fill();
}
