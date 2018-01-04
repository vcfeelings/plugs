/*
* @Author: feelings
* @Date:   2017-12-22 15:43:06
* @Last Modified time: 2018-01-03 16:28:12
*/

'use strict';
;(function(window,document,jquery,undefined){
    var Inits = function(ele,opts){
       this.$ele = ele,
       this.defaults = {
            WIDTH:350,
            HEIGHT:200,
            title:'提示',//弹窗标题
            content:'是否要操作？',//弹窗内容
            animate:'scaleAnimate',//动画类型scaleAnimate,translate_Y,translateY,scaleBig四种
            type:'confirmBox',//设置弹窗类型alertBox，confirmBox，tipBox
            _class : 'div',//设置弹窗层div 为了操作
            confirmText:'确定',
            cancelText:'取消',
            confirmCallback:function(){},
            cancelCallback:function(){}
        },
        this.init = $.extend({},this.defaults,opts);
    };
    Inits.prototype = {
        pup:function(){
            var _this = this;
            var ele = _this.$ele;

            //设置弹窗框架元素结构
            var popHtml = '<div class="popup '+_this.init._class+'"><div class="popupContainer"><div class="title"><span></span><i class="popupClose">X</i></div><div class="content"></div></div></div>'
            var confirmBoxHtml = '<div class="operate"><span class="cancel">'+_this.init.cancelText+'</span><span class="confirm">'+_this.init.confirmText+'</span></div>';
            var alertBoxHtml = '<div class="operate"><span class="confirm">'+_this.init.confirmText+'</span></div>';

            var openPopup = function(){
                //body添加弹窗div
                $('body').append(popHtml);

                var panel = $('.popup');
                var close = $('.popupClose');
                var popupAnimate =_this.init.animate;
                var popupType = _this.init.type;
                var popupClass = $('.'+_this.init._class);
                var popContainer = popupClass.children('.popupContainer');
                var popTitle = popContainer.find('.title');
                var popContent = popContainer.find('.content');

                //设置title content
                popTitle.html(_this.init.title);
                popContent.html(_this.init.content);
                //设置容器宽高
                popContainer.css({
                    width:_this.init.WIDTH+'px',
                    height: _this.init.HEIGHT+'px'
                });
                //确认 取消 回调函数
                var callbackFuc = function(){
                    var confirmlBtn = popContainer.find('.confirm');
                    var cancelBtn = popContainer.find('.cancel');

                    confirmlBtn.on('click',function(){
                        _this.init.confirmCallback();
                    })
                    cancelBtn.on('click',function(){
                        _this.init.cancelCallback();
                    })
                }
                //设置动画样式
                popContainer.attr('class','popupContainer '+popupAnimate+' '+popupType);
                //设置弹窗类型
                var len = popContainer.find('.operate').length;
                if(popContainer.hasClass('confirmBox')&&len==0){
                    popContainer.append(confirmBoxHtml);
                    callbackFuc();
                }else if(popContainer.hasClass('alertBox')&&len==0){
                    popContainer.append(alertBoxHtml);
                    callbackFuc()
                }
                //显示 弹窗
                setTimeout(function(){
                    popupClass.addClass('isVisible');
                },10)
                //关闭弹窗function
                var closePopup = function(){
                    if( $(event.target).is('.popupClose') || $(event.target).is('.popup') ) {
                        event.preventDefault();
                        popupClass.removeClass('isVisible');
                        setTimeout(function(){
                            panel.remove();
                        },300)
                    }
                };
                popupClass.on('click', function(event){
                    closePopup();
                });
            };
            //调用显示弹窗function
            ele.on('click', function(event){
                openPopup();
            });
            //键盘ESC关闭弹窗
            $(document).keyup(function(event){
                if(event.which=='27'){
                    panel.removeClass('isVisible');
                }
            });
        }
    }
    $.fn.Popup = function(opts){
        var inits = new Inits(this,opts);
        return inits.pup();
    }
})(window,document,jQuery);