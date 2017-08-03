var Util=(function(){
    /*随机位置生成*/
    function randomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    return {
        randomNum:randomNum
    };
})();
