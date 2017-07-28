/***Author:々守朢 星塵ヅ  2016-05-31***/
var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var goRankHref = "../duanwu/goRank.do";
var getScoreHref = "../duanwu/getScore.do";
var goAwardHref = "../duanwu/goAward.do";
var lzb_imgSrc = "img/game/";
var lzb_canvas;
var lzb_context;
var lzb_paused;
var lzb_layer;
var lzb_renderInterval;
var lzb_clockInterval;

var lzb_prop;
var lzb_ratio;
var lzb_timer = 30000;

var lzb_background;
var lzb_waterAfter;
var lzb_waterBefore;
var lzb_waterBefore_h;
var lzb_cloud;
var lzb_musicShow;
var lzb_cardShow;
var lzb_cardTips;
var lzb_countDown;

var lzb_people;
var lzb_people_x;
var lzb_people_y;
var lzb_people_getX;
var lzb_people_getY;
var lzb_score_w;
var lzb_score_h;

var lzb_afterEffects;
var lzb_kind = ["good-01","good-02","good-03","good-04"];
var lzb_projectiles;
var lzb_levelDirector;
var lzb_passScore = [500,1200,2500];

eval(function(p,a,c,k,e,r){e=function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'[257-9e-wyzA-S]'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5 randomNum(a,b){9 c=b-a,d=o.B();i a+o.round(d*c)}5 gameStart(){j.beginPath(),j.fillStyle="#32b1aa",j.fillRect(0,0,k.C,k.D),p=7 Background("E-bg"),p.2(),F=7 Layer("E","q-start"),F.2(),r=7 G("q-about","H"),s=7 G("q-rank","H"),r.2(),s.2()}5 main(a,b){9 b=b?b:0;l=7 LevelDirector(a,b),l.startLevel()}5 renderLoop(){9 a,b,c;t(j.clearRect(0,0,k.C,k.D),!8){m(p.2(),lzb_waterAfter.2(),lzb_cloud.2(),r.2(),s.2(),document.addEventListener("touchstart",ev_touch,!1),a=7 I,b=0;b<e.u;++b)e[b].2()?a.v(e[b]):n e[b];m(n e,e=a,lzb_people.2(),c=7 I,b=0;b<f.u;++b)J{f[b].2()?c.v(f[b]):n f[b]}K(d){}n f,f=c,lzb_waterBefore.2(),lzb_countDown.2()}}5 clockLoop(){8||(l.myClock+=100,l.gameEvents())}5 pause(){L==8&&(8=!1),8=!8,8&&console.log("游戏暂停")}5 ajax(a){5 c(){200==b.M?a.success(b.responseText):alert("获取数据错误！错误代号："+b.M+"，错误信息："+b.statusText)}9 b=5(){9 a,b;t("N"!=O P)i 7 P;t("N"==O Q)throw 7 Error("您的系统或浏览器不支持XHR对象！");m(a=["w.y.6.0","w.y.3.0","w.y"],b=0;b<a.u;b++)J{i 7 Q(a[b])}K(c){}}();a.g=a.g+"?rand="+o.B(),a.h=5(a){9 c,b=[];m(c in a)b.v(R(c)+"="+R(a[c]));i b.join("&")}(a.h),"get"===a.z&&(a.g+=-1==a.g.indexOf("?")?"?"+a.h:"&"+a.h),a.A===!0&&(b.onreadystatechange=5(){4==b.readyState&&c()}),b.open(a.z,a.g,a.A),"post"===a.z?(b.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),b.S(a.h)):b.S(L),a.A===!1&&c()}',[],55,'||render|||function||new|lzb_paused|var|||||lzb_projectiles|lzb_afterEffects|url|data|return|lzb_context|lzb_canvas|lzb_levelDirector|for|delete|Math|lzb_background|btn|lzb_cardShow|lzb_cardTips|if|length|push|MSXML2||XMLHttp|method|async|random|width|height|game|lzb_layer|CardShow|br|Array|try|catch|null|status|undefined|typeof|XMLHttpRequest|ActiveXObject|encodeURIComponent|send'.split('|'),0,{}))