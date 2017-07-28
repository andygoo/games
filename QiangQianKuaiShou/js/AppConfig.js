var appConfig={
    container:"canvas",
    margin:[0,0,0,0],
    isShowDebugInfo:true,
    gameInterval:0,
    secondsBetweenFrame:1000/60, //28幀(Hz)=1000/28 60幀(Hz)=1000/60
    hammerSpeed:1000,//锤子的下落速度，即每秒移动的像素点
    moneySpeed:1000,
    timer:0,
    timerCounter:20,
    countdown:20*1000,
    horizonGridCount:5,//水平格子数
    verticalGridCount:10,//垂直格子数
    gridMap:[],//格子数组索引,指明那个格子是图片or纯色
    prop:null, //计算canvas上绘图时图片与实际图片的缩放比例
    ratio:null, //图片高清化用的，相当于dpr
    imgSrc:'images/',//图片路径
    hasGoldenHand:false,//是否拥有金手套
    passValue:{ //通关条件
        one:{
            time:20*1000,//
            score:2000
        },
        two:{
            time:20*1000,//
            score:3000
        },
        three:{
            time:20*1000,//
            score:4000
        },
        four:{
            time:20*1000,//
            score:5000
        }
    },
    nowMoney:100//当前有多少钱
};