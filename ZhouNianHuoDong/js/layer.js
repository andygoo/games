;
(function ($) {
    $.fn.layer = function (opt) {
        var opt = $.extend({},
            $.fn.layer.defaults, opt);
        $(this).on("click", function () {
            mainlayer(opt, 0, $(this));
        });
    };
    jQuery.layer = function (opt) {
        var opt = $.extend({},
            $.fn.layer.defaults, opt);
        mainlayer(opt, 1, 0);
    };
    $.fn.layer.defaults = {
        title: "",
        contents: "",
        addclass: "",//添加的addclass样式
        iconClass: "", //图标样式
        button_1: null,//按钮1文本，默认为空不显示 双按钮
        button_2: null,//按钮2文本，默认为空不显示 双按钮
        button_3: null,//按钮3文本，默认为空不显示 单按钮
        masklayer: true,//显示遮罩层
        autoclose: 0, //自动关闭，单位为秒，默认0不
        fadeout: 0,
        //窗口淡出过渡时间，单位毫秒默认为0
        fadein: 0
        //窗口淡入过渡时间，单位毫秒默认为0
    };
    function mainlayer(opt, t, th) {
        $("#greybackground").remove();
        if (opt.masklayer) {
            $("body").append("<div id=\"greybackground\"></div>");
        }
        var _layerbutton = "";
        if (opt.button_1 != null) {
            _layerbutton += "<a class=\"btn-grey\">" + opt.button_1 + "</a>";
        }
        if (opt.button_2 != null) {
            _layerbutton += "<a class=\"btn-red\">" + opt.button_2 + "</a>";
        }

        if (opt.button_3 != null) {
            _layerbutton += "<a class=\"btn-red only\">" + opt.button_3 + "</a>";
        }
        _layerbutton += "";
        var _alertlayer = "";
        var _class = "";
        var _iconClass = "";
        if (opt.addclass != "") {
            _class = opt.addclass;
        }
        if (opt.iconClass != "") {
            _iconClass = opt.iconClass;
        }
        if (opt.poptype == 0) {
        }

        if (opt.button_1 != null || opt.button_2 != null || opt.button_3 != null) {
            var html = "<div class=\"alertlayer-1 " + _class + "\">";
            html += "<header>" + opt.title + "</header>";
            html += "<p>" + opt.contents + "</p>";
            html += "</div>";
        } else if (opt.button_1 == null && opt.button_2 == null && opt.button_3 == null) {
            var html = "<div class=\"alertlayer ui-window-2\"><section class=\"content\">" + opt.contents + "</section></div>";
            html += "</div>";
        }

        $("body").append(html);
        _alertlayer = $(".alertlayer-1");
        if (_alertlayer.children(".layerinput").length == 0) {
            _alertlayer.append(_layerbutton);
        }
        //_alertlayer.fadeIn(opt.fadein);

        //buttton callback
        if (opt.confirm != null) {
            _alertlayer.find(".layerbutton").click(function (e) {
                if (opt.confirmback != null) {
                    opt.confirmback(_alertlayer);
                } else {
                    layer.close(_alertlayer);
                }
                //  e.stopImmediatePropagation();
            });
        }
        //close
        _alertlayer.find(".btn-grey").click(function (e) {
            if (opt.closeback != null) {
                opt.closeback(_alertlayer);
            } else {
                _alertlayer.addClass("move-out")
                setTimeout(function () {
                    layer.close(_alertlayer, opt.fadeout);
                }, 200);
            }
            e.stopImmediatePropagation(); //页面有多个相同标签时，阻止连续触发事件
        });
        _alertlayer.find(".only").click(function (e) {
            if (opt.closeback != null) {
                opt.closeback(_alertlayer);
            } else {
                _alertlayer.addClass("move-out")
                setTimeout(function () {
                    layer.close(_alertlayer, opt.fadeout);
                }, 200);
            }
            e.stopImmediatePropagation(); //页面有多个相同标签时，阻止连续触发事件
        });
        if (opt.autoclose != 0) {
            setTimeout(function () {
                    layer.close(_alertlayer, opt.fadeout);
                },
                parseInt(opt.autoclose * 1000));
        }
    }

    jQuery.loading = function () {
        var str = ''
            + '<div class="alertlayer ui-window-5" id="loading">'
            + '<div class="loading-wrap">'
            + '<i class="icon-loading withe"></i>'
            + '</div>'
            + '<p>努力加载中...</p>'
            + '</div>'
        $("body").append(str);
        //$("#greybackground").remove();
        //$("body").append("<div id=\"greybackground\"></div>");
    }
    jQuery.loadingrm = function () {
        $("#loading").fadeOut(200);
        //$("#greybackground").fadeOut(200);
    }

})(jQuery);
var layer = {
    close: function (a, fo) {
        var alertlayer = ".alertlayer";
        if (a) {
            alertlayer = a;
        }
        if (!fo) {
            fo = 0
        }
        $("#greybackground").fadeOut(fo, function () {
            $(this).remove()
            $(alertlayer).remove()
        });
    }
}