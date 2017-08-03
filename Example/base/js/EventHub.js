/**
 * 2016-11-21 William
 * Publish/Subscribe 
 * 用于解决组件间的通信耦合
 */
var UEventHub = (function() {
	//页面加载完成事件
	var EVENT_RENDER_COMPLETE = 'EVENT_RENDER_COMPLETE';

	var _handlers = {};

	/**
	 * 添加订阅事件,返回事件对象
	 * @param {string} e 事件
	 * @param {function} fn 回调函数
	 * @return {Object} event_object 事件类型
	 */
	var _on = function(e, fn) {
		if(!(e in _handlers)) {
			_handlers[e] = [];
		}
		var _event_object = {
			fn: fn,
			e: e
		};
		_handlers[e].push(_event_object);
		return _event_object;
	};
	/**
	 * 发布消息
	 * @param {string} e 事件类型
	 */
	var _emit = function(e) {
		if(!_handlers[e]) return;
		var args = Array.prototype.slice.call(arguments, 1);
		for(var i = 0; i < _handlers[e].length; i++) {
			(function() {
				var _handlerFn = _handlers[e][i].fn;
				//var _handler = function() {
					_handlerFn.apply(this, args)
				//}.bind(this);
				//setTimeout(_handler, 0);
			})();
		}
	}
	/**
	 * 取消订阅
	 * @param {Object} event_object
	 */
	var _off = function(event_object) {
		if(_handlers[event_object.e]) {
			for(var i = _handlers[event_object.e].length-1; i > -1; i--) {
				if(event_object === _handlers[event_object.e][i]) {
					_handlers[event_object.e].splice(i, 1);
				}
			}
		}
	}

	var _ready = function(fn) {
		_on(EVENT_RENDER_COMPLETE, fn);
	}

	return {
		/**
		 * 添加订阅事件,返回事件对象
		 * @param {string} e 事件
		 * @param {function} fn 回调函数
		 * @return {Object} event_object 事件类型
		 */
		on: _on,
		/**
		 * 发布消息
		 * @param {string} e 事件类型
		 */
		emit: _emit,
		/**
		 * 取消订阅
		 * @param {Object} event_object
		 */
		off: _off,
		/**
		 * 页面完成加载
		 */
		ready: _ready
	}
})();

module.exports = UEventHub;