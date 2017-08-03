var EventHub=require('./EventHub');
//所有操作任务的控制台
var MasterTask=(function(){
    var start=function(){
        console.log("开始游戏");
        //1、渲染礼物、蛋糕、任务、背景、时钟
        //2、添加/取消监听事件
        //3、流程控制
    };

    var renderTask=function(){};
    var EventListener=function(){
        //使用订阅/发布模式

        //整个画布的触摸动作
        EventHub.on("stage",function(v){

        });

        //各流程的触摸动作，当emit时指定区域
        EventHub.on("step1Btn1",function(v,type){

        });

        EventHub.on("step1Btn2",function(v,type){

        });

        EventHub.on("step2Btn",function(v){

        });


    };
    var setFlow=function(){
        //设置当前的任务流程
    };

    var getFlow=function(){
        //返回当前的任务流程
    };
    return start
})();

module.exports=MasterTask;