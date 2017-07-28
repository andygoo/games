/*配置信息*/
var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var goRankHref = "../duanwu/goRank.do";     //排行榜
var getScoreHref = "../duanwu/getScore.do"; //分数提交（ajax）
var goAwardHref = "../duanwu/goAward.do";   //抽奖页面路径
var lzb_imgSrc = "img/game/";               //图片路径

var lzb_canvas;
var lzb_context;
var lzb_paused;
var lzb_renderInterval;

var lzb_prop;                               //计算图片的比例
var lzb_ratio;                              //图片高清化用的，相当于dpr
var initial;                                //第一个木板的初始位置，基于设计稿
var lzb_timer = 20 * 1000;                   //倒计时总时间
var lzb_gameStatus = true;                  //游戏是否结束
var lzb_countDown;                          //倒计时

var lzb_btn = new Array();                  //所有按钮
var lzb_btn_event_count=0;
var lzb_layer = new Array();                //所有弹出

var lzb_background;
var lzb_background_wood = new Array();
var lzb_background_woodISpeed = new Array(23);         //木板的总数
var lzb_reference = new Array();            //记录最小木板跟最大木板的x,y,w,h（8个），用于人物物品位置
var lzb_background_cloud = new Array();
var lzb_background_cloudISpeed = [0.575, 0.575, 0.645, 0.680, 0.610, 0.715, 0.785, 0.785, 0.855, 0.925, 0.960];
var lzb_bridge = new Array();
var lzb_ismusic = true;                     //默认音乐开启
var lzb_musicArray = new Array();           //音乐，为后面可能出现多个音频切换，批量处理用的

var lzb_people;
var lzb_people_x = new Array();

var lzb_afterEffects;                       //动画帧频处理
var lzb_seconds_between_frames=1000/28;     //28幀
var lzb_kind = ["good-01", "good-02", "good-03", "good-04", "good-05"];
var lzb_projectiles;                        //配合动画帧频处理
var lzb_levelDirector;                      //关卡（可扩张多关卡）
var lzb_passScore = 500;                    //通关最低分值