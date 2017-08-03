/**
 * 2016-12-01 William
 * 通讯模块 
 * 用于解决前端与后端的通信
 */
var Ajax = (function() {
    var glob_config = {
    	delay:2000,
        method:'get',
        url:'',
        data:'',
        async:true,
        cache:true,
        contentType:'application/x-www-form-urlencoded',
        showLoading:true,
        beforeSend:null,
        success:function(){},
        error:function(){}
    };
    var _beforeSendReq = {};
    var reqArr = 0;
    var loadSetTimeout;
    var _ajaxSetup = function (conf) {
        for(var key in conf){
            glob_config[key] = conf[key];
        }
    };

    //请求，参数为一个字面直接量对象
    var _ajax = function(conf) {
        var config = {};
        for(var key in glob_config){
            config[key] = glob_config[key];
        }
        for(var key in conf){
            config[key] = conf[key];
        }

        reqArr++;
        if(loadSetTimeout){
            clearTimeout(loadSetTimeout);
        }
        loadSetTimeout = setTimeout(function () {

            console.log(reqArr)
            if(config.showLoading && reqArr > 0){
                if(window.UcsmyUI != undefined && UcsmyUI.ULoadingDialog != undefined){
                    window.setTimeout(function(){UcsmyUI.ULoadingDialog.show();},0);
                }
            }
        },config.delay);


        //通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题
        if(!config.cache){
            config.url = config.url + '?rand=' + Math.random();
        }
        config.data = _translateParams(config.data); //通过_translateParams()将名值对转换成字符串
        config.method = config.method.toLowerCase();
        //若是GET请求，则将数据加到url后面
        if(config.method === 'get') {
            config.url += config.url.indexOf('?') == -1 ? '?' + config.data : '&' + config.data;
        }
        var _callback = function() {
            if(xhr.status == 200) { //判断http的交互是否成功，200表示成功
                var resText = xhr.responseText;
                var jsonObj;
                if (typeof(JSON) == 'undefined'){
                    jsonObj = eval("("+resText+")");
                }else{
                    jsonObj = JSON.parse(resText);
                }
                config.success(jsonObj); //回调传递参数
                reqArr--;
            }else {
                config.error(xhr.status,xhr.statusText);
                reqArr--;
            }

            if(config.statusCode){
                for(var key in config.statusCode){
                    if(xhr.status == key){
                        config.statusCode[key]();
                    }
                }
            }
            if(config.showLoading){
                if(reqArr == 0){
                    if(window.UcsmyUI != undefined && UcsmyUI.ULoadingDialog != undefined){
                        window.setTimeout(function(){UcsmyUI.ULoadingDialog.hide();},100);
                    }
                }
            }
        }
        //定义XHR对象
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        //在使用XHR对象时，必须先调用open()方法，
        //它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
        xhr.open(config.method, config.url, config.async);
        //新增 beforeSend() 方法，发送请求前可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头
        _beforeSendReq = {
            setRequestHeader:function (e,t) {
                xhr.setRequestHeader(e,t);
            }
        };
        if(config.beforeSend && config.beforeSend(_beforeSendReq) == false){
            _callback();
            return;
        }

        if(config.method === 'post') {
            //post方式需要自己设置http的请求头，来模仿表单提交。
            //放在open方法之后，send方法之前。
            xhr.setRequestHeader('Content-Type',config.contentType);
            xhr.send(config.data); //post方式将数据放在send()方法里
        } else {
            xhr.send(null); //get方式则填null
        }
        // console.log(config.async)
        if(config.async === true) { //true表示异步，false表示同步
            //使用异步调用的时候，需要触发readystatechange 事件
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) { //判断对象的状态是否交互完成
                    _callback(); //回调
                }
            };
        }else{ //同步
            _callback();//回调
        }
    }
    //名值对转换为字符串
    var _translateParams = function(data) {
        var arr = [];
        for(var i in data) {
            //特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        return arr.join('&');
    }

    return {
        ajax:function(config){
            _ajax(config);
        },
        get: function(config) {
            config.method = 'get';
            _ajax(config);
        },
        post: function(config) {
            config.method = 'post';
            _ajax(config);
        },
        ajaxSetup: function (config) {
            _ajaxSetup(config);
        }
    }
})();

module.exports = Ajax;