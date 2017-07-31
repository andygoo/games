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

var lzb_Mprepare;
var lzb_Mcard01;
var lzb_Mcard02;
var lzb_Mcard03;
var lzb_Mfailure;
var lzb_Msucceed;
var lzb_musicArray = new Array();

/*随机位置生成*/
function randomNum(Min,Max) {
		var Range = Max - Min;
		var Rand = Math.random();
		return(Min + Math.round(Rand * Range));
}

function gameStart(){
		lzb_context.beginPath();
		lzb_context.fillStyle = "#32b1aa";
		lzb_context.fillRect(0, 0, lzb_canvas.width, lzb_canvas.height);
		
		lzb_background 	= new Background("game-bg");
		lzb_background.render();
		
		lzb_layer = new Layer("game", "btn-start");
		lzb_layer.render();
		
		lzb_cardShow = new CardShow("btn-about", "br");
		lzb_cardTips = new CardShow("btn-rank", "br");
		lzb_cardShow.render();
		lzb_cardTips.render();
}

function main(currentLevel, currentScore){
		var currentScore = currentScore ? currentScore : 0;
		lzb_levelDirector = new LevelDirector(currentLevel, currentScore);
		lzb_levelDirector.startLevel();
}

/*循环渲染*/
function renderLoop() {
		lzb_context.clearRect(0, 0, lzb_canvas.width, lzb_canvas.height)
    if(lzb_paused) return;
		
		lzb_background.render();
		lzb_waterAfter.render();
		lzb_cloud.render();	
		lzb_cardShow.render();
		lzb_cardTips.render();
		
		document.addEventListener("touchstart", ev_touch, false);
		
		/*物品*/
    var remainingProjectiles = new Array();
    for(var i = 0; i < lzb_projectiles.length; ++i) {
        if(lzb_projectiles[i].render()) {
            remainingProjectiles.push(lzb_projectiles[i]);
        } else delete lzb_projectiles[i];
    }
    delete lzb_projectiles;
    lzb_projectiles = remainingProjectiles;

		lzb_people.render();
		
		/*水花*/
		var remainingAfterEffects = new Array();
    for (var i = 0; i < lzb_afterEffects.length; ++i) {
				try{
						if (lzb_afterEffects[i].render()) {
								remainingAfterEffects.push(lzb_afterEffects[i]);
						} else delete lzb_afterEffects[i];
				}catch(err){
						console.log(222);
				}
    }
    delete lzb_afterEffects;
    lzb_afterEffects = remainingAfterEffects;
		
		lzb_waterBefore.render();
		lzb_countDown.render();
}
/*计时器*/
function clockLoop() {
    if(lzb_paused) return;

    lzb_levelDirector.myClock += 100;
    lzb_levelDirector.gameEvents();
}

/*暂停渲染*/
function pause() {
    if(lzb_paused == null) lzb_paused = false;
    lzb_paused = !lzb_paused;
    if(lzb_paused) console.log("游戏暂停");
}

function ajax(obj) {
	var xhr = (function () {
		if (typeof XMLHttpRequest != 'undefined') {
			return new XMLHttpRequest();
		} else if (typeof ActiveXObject != 'undefined') {
			var version = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
			for (var i = 0;i< version.length; i ++) {
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
			obj.success(xhr.responseText);			//回调传递参数
		} else {
			alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
		}	
	}
}