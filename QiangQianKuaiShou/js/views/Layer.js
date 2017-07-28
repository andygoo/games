/*弹层*/
function Layer(){

}
//抢钱成功
Layer.prototype.success=function(){
    var _self=this;
    var nowValue=application.game.txt.getMoneyValue();
    var progress={'-1':'back','1':'one','2':'two','3':'three','4':'four'};
    var levelValue=application.game.txt.gate[progress[application.game.gameNumber]].moneyCounter.total.value;
    var rate='xxx';
    var html;
    html='<div class="info-list success">' +
        '<dl>' +
        '<dt>Level 1</dt>' +
        '<dd class="money">到手金额:<span class="n-value">'+nowValue+'</span><span class="level-value">/'+levelValue+'</span></dd>' +
        '<dd class="info">' +
        '<p>抢钱速度，超过全国<span class="emp">'+rate+'</span>的人</p>' +
        '<p>炫耀一下</p>' +
        '<p>马上拥有金手套<img src="images/layer-golden-glove-small.png"/></p>' +
        '</dd></dl>' +
        '</div>' +
        '<div class="btn-list">' +
        '<div class="btn btn-back"></div>' +
        '<div class="btn btn-share"></div>' +
        '<div class="btn btn-refresh"></div>' +
        '</div>';
    var container=$("#layer");
    container.find('.layer-bg').show();
    container.find('.container').html(html);
    container.find('.container').on('click','.btn-back',function(){
        application.game.btn.onBack();
        _self.close();
    });
    container.find('.container').on('click','.btn-share',function(){
        application.game.btn.onShare();
        _self.close();
    });
    container.find('.container').on('click','.btn-refresh',function(){
        application.game.btn.onRefresh();
        _self.close();
    });
    return html;
};

//抢钱失败
Layer.prototype.fail=function(){
    var _self=this;
    var nowValue=application.game.txt.getMoneyValue();
    var progress={'-1':'back','1':'one','2':'two','3':'three','4':'four'};
    var levelValue=application.game.txt.gate[progress[application.game.gameNumber]].moneyCounter.total.value;
    var rate='xxx';
    var html;
    html='<div class="info-list fail">' +
        '<dl>' +
        '<dt>Level 1</dt>' +
        '<dd class="money">到手金额:<span class="n-value">'+nowValue+'</span><span class="level-value">/'+levelValue+'</span></dd>' +
        '<dd class="info">' +
        '<p>抢钱速度，超过全国<span class="emp">'+rate+'</span>的人</p>' +
        '<p>炫耀一下</p>' +
        '<p>马上拥有金手套<img src="images/layer-golden-glove-small.png"/></p>' +
        '</dd></dl>' +
        '</div>' +
        '<div class="btn-list">' +
        '<div class="btn btn-back"></div>' +
        '<div class="btn btn-share"></div>' +
        '<div class="btn btn-refresh"></div>' +
        '</div>';
    var container=$("#layer");
    container.find('.layer-bg').show();
    container.find('.container').html(html);
    container.find('.container').on('click','.btn-back',function(){
        application.game.btn.onBack();
        _self.close();
    });
    container.find('.container').on('click','.btn-share',function(){
        application.game.btn.onShare();
        _self.close();
    });
    container.find('.container').on('click','.btn-refresh',function(){
        application.game.btn.onRefresh();
        _self.close();
    });
    return html;
};

//购买金手套
Layer.prototype.buyHander=function(){
    var _self=this;
    var moneyValue=6000;
    var html;
    html='<div class="info-list buy-gloves">' +
        '<div class="img"><img src="images/layer-golden-glove-big.png"></div>' +
        '<div class="text"><p>确认以'+moneyValue+'游戏币购买一个金手套?</p></div>' +
        '</div>' +
        '<div class="btn-list">' +
        '<div class="btn btn-yes"></div>' +
        '<div class="btn btn-no"></div>' +
        '</div>';
    var container=$("#layer");
    container.find('.layer-bg').show();
    container.find('.container').html(html);
    container.find('.container').on('click','.btn-yes',function(){
        application.game.btn.onConfirm();
        _self.close();
    });
    container.find('.container').on('click','.btn-no',function(){
        application.game.btn.onCancel();
        _self.close();
    });
    return html;
};

/*展开*/
Layer.prototype.open=function(){

};

/*闭合*/
Layer.prototype.close=function(){
    var container=$("#layer");
    container.find('.layer-bg').hide();
    container.find('.container').html('');
    console.log("关闭layer");
};
