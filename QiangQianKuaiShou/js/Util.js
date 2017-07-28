var requestAnimFrame=(function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();
var util = {
    $$: function (id) {
        return document.getElementById(id);
    },
    debug: function (html) {
        var oTest = $$("debug-info");
        var newNode = document.createElement("div");
        newNode.innerHTML = html;
        oTest.insertBefore(newNode, null);
    },
    ajax: function (obj) {
        var xhr = (function () {
            if (typeof XMLHttpRequest != 'undefined') {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != 'undefined') {
                var version = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
                for (var i = 0; i < version.length; i++) {
                    try {
                        return new ActiveXObject(version[i]);
                    } catch (e) {
                        //跳过
                    }
                }
            } else {
                throw new Error('您的系统或浏览器不支持XHR对象！');
            }
        })();
        obj.url = obj.url + '?rand=' + Math.random();
        obj.data = (function (data) {
            var arr = [];
            for (var i in data) {
                arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
            }
            return arr.join('&');
        })(obj.data);
        if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
        if (obj.async === true) {
            xhr.onreadystatechange = function () {
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
    },
    getPixelRatio :function(context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;

        return (window.devicePixelRatio || 1) / backingStore;
    },
    /*保存渲染的某帧为图片*/
    saveImage: function () {
        var image = new Image();

        if (this.$$("canvasImg")) {
            this.$$("canvasImg").src = application.canvas.toDataURL("image/png");
        } else {
            var imgObj = document.createElement("img");
            imgObj.src = application.canvas.toDataURL("image/png");
            imgObj.id = "canvasImg";
            this.$$("imgbox").appendChild(imgObj);
        }
    },

    /**
     * 获取设计稿上的坐标定位与canvas画布上的映射匹配
     * @param psX
     * @param psY
     * @returns {{x: number, y: number}}
     */
    getCoordinateMap:function(psX, psY){
        var rateX=psX/750;
        var rateY=psY/1334;
        return {x:rateX,y:rateY};
    },
    getRandom:function(min,max){
        return Math.floor(Math.random() * (max - min) + min);
    }
};