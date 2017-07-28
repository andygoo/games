/**
 * Created by Administrator on 2016/8/3.
 * author yaoqianfeng
 */
function touch(){

}
//要防止事件冒泡
touch.prototype.eventHandle=function(eventType,element, eType, handle, bol){
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
touch.prototype.touchGrid=function(){
    //当触摸到相应的格子时，返回当前坐标，计算坐标所在的格子数组索引，计算是否抽中图片
}
