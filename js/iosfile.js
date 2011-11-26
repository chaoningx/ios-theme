
var appMock = [
    { type: 'folder', title: '社交', css: 'folder-icon' },
    { type: 'folder', title: '游戏', css: 'folder-icon' },
    { type: 'icon', title: '信息', css: 'message-icon' },
    { type: 'folder', title: '社交', css: 'folder-icon' },
    { type: 'folder', title: '游戏', css: 'folder-icon' },
    { type: 'icon', title: '信息', css: 'message-icon' },
    { type: 'folder', title: '社交', css: 'folder-icon' },
    { type: 'folder', title: '游戏', css: 'folder-icon' },
    { type: 'icon', title: '信息', css: 'message-icon' },
    { type: 'folder', title: '社交', css: 'folder-icon' },
    { type: 'folder', title: '游戏', css: 'folder-icon' },
    { type: 'icon', title: '信息', css: 'message-icon' }
];

var IOS = {};
$(function() {
	IOS.Util = {
		parse: function(str, data) {
	        var reg = new RegExp('\{(.*?)\}', 'gmi'), seg = '', result = [], pos = 0;
	        while ((seg = reg.exec(str)) != null) {
	            var end = reg.lastIndex - seg[0].length, key = seg[1], val = data[key];
	            result.push(str.slice(pos, end));
	            result.push(val);
	            pos = reg.lastIndex;
	        }
	        
	        if (pos < str.length) {
	            result.push(str.slice(pos));
	        }
	        return result.join('');
	    }
	};
	
	IOS.Icon = {
		create: (function() {
			var tpl = '<dl data-type={type} class="icon" style="top: {top}px; left: {left}px;"><dd class="{css}"></dd><dt class="icon-text">{title}</dt></dl>';
			return function(info, left, top) {
				info.top = top;
				info.left = left;
				return IOS.Util.parse(tpl, info);
			};
		}())
	};
	
	IOS.Action = {
		initialize: function() {
			var i = 0, data = appMock, len = data.length,
				temp = [], target,
				level = 1,
				top = 0,
				left = 0,
				docWidth = document.body.scrollWidth,
		        docHeight = document.body.scrollHeight;
			
			for(i; i < len; i++) {
				target = data[i];
				left = i * 200;
				top = level * 110;
				if(left > docWidth) {
					left = 0;
					top = ++level * 110 + 88;
				}
				temp.push(IOS.Icon.create(target, left, top));
			};
			$('#icon-list').css({
		    	width: docWidth,
		    	height: docHeight
		    }).append(temp.join(''));
		},
		bind: function() {
			var flag = true,
		        done = true,
		        currentActiveIcon = null,
		        folderOpen = function(pos, callback) {
			        $('#mask').fadeIn('slow');
//			        暂时不做适配了；
			        $('#corner').css('left', pos.left + 18);
			        $('#corner-inner').css('left', pos.left + 20);
			        $('#dark').css('top', pos.top + 115).fadeIn('normal', function() {
			            $('#app-container').slideDown('normal', function() {
			                done = true;
			                flag = false;
			            });
			            $('#corner-inner').fadeOut('fast');
			        });
			        currentActiveIcon.style.zIndex = 3;
			        callback && callback();
		    	},
		        folderClose = function(callback) {
			    	$('#app-container').slideUp('normal', function() {
			            $('#dark').fadeOut('normal', function() {
			                done = true;
			                flag = true;
			                currentActiveIcon.style.zIndex = 1;
			                callback && callback();
			            });
			            $('#mask').fadeOut('fast');
			        });
			        $('#corner-inner').fadeIn('normal');
		    	};
		    
		    $(".icon").click(function() {
		        if(this.getAttribute('data-type') == 'icon') { return; }
		        if(!done) { return; }
		        done = false;
		        var offset = $(this).offset();
		        
		        if(flag) {
		        	currentActiveIcon = this;
		        	folderOpen(offset);
		        }else {
		        	folderClose();
		        }
		    });
		}
	};
	IOS.Action.initialize();
	IOS.Action.bind();
});






























