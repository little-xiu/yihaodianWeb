$(function() {
    //顶部banner hover事件
    var topbanner = $(".topbanner");
    var topbannerB = topbanner.find(".topbanner-big");
    var timerBanner = null;
    topbanner.hover(function() {
        var that = $(this);
        if (timerBanner) {
            clearTimeout(timerBanner);
            timerBanner = null;
        }
        timerBanner = setTimeout(function() {
            that.animate({ height: "250px" }, 600);
            topbannerB.animate({ marginTop: 0 }, 600);
        }, 300);
    }, function() {
        clearTimeout(timerBanner);
        $(this).animate({ height: '80px' }, 600);
        topbannerB.animate({ marginTop: '-250px' }, 600);
    });
    //顶部banner 关闭按钮点击事件
    $(".close-btn").click(function() {
        topbanner.hide();
    });
    //搜索框聚焦事件
    $(".search-text").focus(function() {
        $(".search-tab").css("display", "block");
    }).blur(function() {
        $(".search-tab").css("display", "none");
    });

    //大图片广告的切换
    // 1.全局变量等
    var curIndex = 0, //当前index
        imgs = $(".banners").find(".list");
    imgLen = imgs.length; //图片总数
    // 2.自动切换定时器处理
    // 定时器自动变换2.5秒每次
    var autoChange = setInterval(function() {
        if (curIndex < imgLen - 1) {
            curIndex++;
        } else {
            curIndex = 0;
        }
        //调用变换处理函数
        changeTo(curIndex);
    }, 2500);

    //大图片滑入滑出事件处理
    $(".banners").find(".list").hover(function() {
        $(".show-btn").css("display", "block");
        clearInterval(autoChange);
    }, function() {
        $(".show-btn").css("display", "none");
        autoChangeAgain();
    });
    //左右按钮划入显示
    $(".show-btn").mouseover(function() {
        $(".show-prev").show();
        $(".show-next").show();
    });
    //左箭头滑入滑出事件处理
    $(".show-prev").hover(function() {
        //滑入清除定时器
        clearInterval(autoChange);
    }, function() {
        //滑出则重置定时器
        autoChangeAgain();
    });
    //左箭头点击处理
    $(".show-prev").click(function() {
        //根据curIndex进行上一个图片处理
        curIndex = (curIndex > 0) ? (--curIndex) : (imgLen - 1);
        changeTo(curIndex);
    });
    //右箭头滑入滑出事件处理
    $(".show-next").hover(function() {
        //滑入清除定时器
        clearInterval(autoChange);
    }, function() {
        //滑出则重置定时器
        autoChangeAgain();
    });
    //右箭头点击处理
    $(".show-next").click(function() {
        curIndex = (curIndex < imgLen - 1) ? (++curIndex) : 0;
        changeTo(curIndex);
    });
    // 其中autoChangeAgain()就是一个重置定时器函数
    //清除定时器时候的重置定时器--封装
    function autoChangeAgain() {
        autoChange = setInterval(function() {
            if (curIndex < imgLen - 1) {
                curIndex++;
            } else {
                curIndex = 0;
            }
            //调用变换处理函数
            changeTo(curIndex);
        }, 2500);
    }
    // 其中changeTo()就是一个图片切换的处理函数
    function changeTo(num) {
        imgs.removeClass('current').eq(num).addClass('current');
        $(".banner-pages").find("li").removeClass('cur-page').eq(num).addClass('cur-page');
    }
    // 每传入一个图片序号，则按理进行goLeft
    // 4.为右下角的那几个li 按钮绑定事件处理
    //对右下角按钮index进行事件绑定处理等
    $(".banner-pages").find("li").each(function(item) {
        $(this).hover(function() {
            clearInterval(autoChange);
            changeTo(item);
            curIndex = item;
        }, function() {
            autoChangeAgain();
        });
    });

    // 全部商品的tab
    $(".allsort-item").hover(function() {
        $(this).addClass('allsort-hover').siblings().removeClass('allsort-hover');
    }, function() {
        $(this).removeClass('allsort-hover');
    });

    //1号抢购按钮点击滑动4张
    var secBox = $(".seckill-goods-wrap");
    var goDistance = $('.seckill-item').width() * 4; //ul一次平移的距离
    var goCount = Math.ceil($('.seckill-item').length / 4) - 1; //平移的总次数3次
    var seclinks = $(".pro-detail"); //li
    var prevBtnSec = $(".sec-prev");
    var nextBtnSec = $(".sec-next");
    var goBox = $(".sec-goods-list"); //ul
    var nextFlag = 0;
    nextBtnSec.click(function() {
        var that = $(this);
        if (nextFlag >= 3) {
            nextFlag = 0;
        }
        if (goCount > 0) {
            --goCount;
            ++nextFlag;
            var goLeft = goDistance * nextFlag;
            goBox.animate({
                marginLeft: "-" + goLeft + "px"
            }, 500, function() {
                prevBtnSec.addClass('sec-prev-hover');
                if (goCount == 0 || nextFlag == 3) {
                    that.removeClass('sec-next-hover');
                }
            });
        }
    });
    prevBtnSec.click(function() {
        var that = $(this);
        if (nextFlag <= 0) {
            nextFlag = 0;
        }
        if (goCount <= 3) {
            ++goCount;
            --nextFlag;
            var goLeft = goDistance * nextFlag;
            goBox.animate({
                marginLeft: "-" + goLeft + "px"
            }, 500, function() {
                nextBtnSec.addClass('sec-next-hover');
                if (goCount == 3 || nextFlag == 0) {
                    that.removeClass('sec-prev-hover');
                }
            });
        }
    });
    secBox.hover(function() {
        if (goCount == 3) {
            prevBtnSec.removeClass('sec-prev-hover');
            nextBtnSec.addClass('sec-next-hover');
        } else if (goCount == 0) {
            nextBtnSec.removeClass('sec-next-hover');
            prevBtnSec.addClass('sec-prev-hover');
        } else {
            nextBtnSec.addClass('sec-next-hover');
            prevBtnSec.addClass('sec-prev-hover');
        }
    }, function() {
        prevBtnSec.removeClass('sec-prev-hover');
        nextBtnSec.removeClass('sec-next-hover');
    });
    //鼠标滑过时图片的平移
    seclinks.hover(function() {
        $(this).addClass('seclink-hover');
    }, function() {
        $(this).removeClass('seclink-hover');
    });
    //排行榜 tab
    $(".rank-item").each(function() {
        var index = $(this).index();
        $(this).mouseover(function() {
            $(this).addClass('current').siblings().removeClass('current');
            $(".rank-content-item").removeClass('current').eq(index).addClass('current');
        });
    });

    // 一次性多张图片反复滑动轮播
    var activityBox = $(".my-activity");
    var prevBtnA = activityBox.find(".btn-prev");
    var nextBtnA = activityBox.find(".btn-next");
    var ulA = $(".my-activity-content").find("ul");
    var liA = ulA.find("li");
    var timerA = setInterval(autoplayA, 3000);
    var flagA = 0;//当前页的索引号
    var timerOver = null;
    //图片切换的处理函数
    function autoplayA() {
        ulA.animate({ marginLeft: '-1104px' }, 600, function() {
            for (var i = 0; i < 6; i++) {
                ulA.find("li:first").appendTo($(this));
            }
            $(this).css("margin-left", 0);
        });
        flagA = (flagA < 2) ? ++flagA : 0;//2是下面a最大的索引号
        $(".dot").find("a").removeClass("a-hover").eq(flagA).addClass("a-hover");
    }

    //左箭头点击处理
    // prevBtnA.click(function() {
    //     if (timerOver) {
    //         clearTimeout(timerOver);
    //         timerOver = null;
    //     }
    //     timerOver = setTimeout(function() {
    //         ulA.animate({ marginLeft: '1104px' }, 600, function() {
    //             for (var i = 0; i < 6; i++) {
    //                 ulA.find("li:last").prependTo($(this));
    //             }
    //             $(this).css("margin-left", 0);
    //         });
    //         flagA = (flagA > 0) ? --flagA : 2;
    //         $(".dot").find("a").removeClass("a-hover").eq(flagA).addClass("a-hover");

    //     }, 250);
    // });
    var oneFuncL = null;
    prevBtnA.one('click', oneFuncL = function() {
        ulA.animate({ marginLeft: '1104px' }, 600, function() {
            for (var i = 0; i < 6; i++) {
                ulA.find("li:last").prependTo($(this));
            }
            $(this).css("margin-left", 0);
        });
        flagA = (flagA > 0) ? --flagA : 2;
        $(".dot").find("a").removeClass("a-hover").eq(flagA).addClass("a-hover");
        prevBtnA.one('click', oneFuncL);
    });

    //右箭头点击处理
    // nextBtnA.click(function() {
    //     if(timerOver) {
    //         clearTimeout(timerOver);
    //         timerOver = null;
    //     }
    //     timerOver = setTimeout(function() {
    //         ulA.animate({marginLeft: "-1104px"}, 600, function() {
    //             for (var i = 0; i < 6; i++) {
    //                 ulA.find("li:first").appendTo($(this));
    //             }
    //             $(this).css("margin-left", 0);
    //         });
    //         flagA = (flagA < 2) ? ++flagA : 0;
    //         $(".dot").find("a").removeClass("a-hover").eq(flagA).addClass("a-hover");
    //     }, 250);
    // });
    var oneFuncR = null;
    nextBtnA.one('click', oneFuncR = function() {
        ulA.animate({ marginLeft: '-1104px' }, 600, function() {
            for (var i = 0; i < 6; i++) {
                ulA.find("li:first").appendTo($(this));
            }
            $(this).css("margin-left", 0);
        });
        flagA = (flagA < 2) ? ++flagA : 0;
        $(".dot").find("a").removeClass("a-hover").eq(flagA).addClass("a-hover");
        nextBtnA.one('click', oneFuncR);
    });

    //右箭头滑入滑出事件处理
    nextBtnA.hover(function() {
        //滑入清除定时器
        clearInterval(timerA);
    }, function() {
        //滑出则重置定时器
        timerA = setInterval(autoplayA, 2500);
    });
    prevBtnA.hover(function() {
        //滑入清除定时器
        clearInterval(timerA);
    }, function() {
        //滑出则重置定时器
        timerA = setInterval(autoplayA, 2500);
    });
    $(".my-activity-content").hover(function() {
        clearInterval(timerA);
    }, function() {
        timerA = setInterval(autoplayA, 2500);
    });

    // 国产食品下的文字自动向上滚动
      $(".comment-right").textSlider();

    // 国产食品下的图片旋转
    $('#stage').stack({
        width:195,  // 堆叠图库图片容器的宽度
        height:225 // 堆叠图库图片的高度
    });
    //1号生鲜左侧大图片轮播
    var colTimer = setInterval(autoCol, 2500);
    var indexCol = 0;
    function autoCol() {
        indexCol = (indexCol < 2) ? ++indexCol : 0;
        $(".jscol-left").removeClass('curli').eq(indexCol).addClass('curli');
        $(".jsnav-left").removeClass('cur').eq(indexCol).addClass('cur');
    }
    $(".jscol-left").hover(function() {
        clearInterval(colTimer);
    }, function() {
        colTimer = setInterval(autoCol, 2500);
    });
    $(".jsnav-left").hover(function() {
        clearInterval(colTimer);
        $(this).addClass('cur').siblings().removeClass('cur');
        var index = $(this).index();
        $(".jscol-left").eq(index).addClass('curli').siblings().removeClass('curli');
    }, function() {
        colTimer = setInterval(autoCol, 2500);
    });

    //酒水饮料左侧大图片轮播
    var rightTimer = setInterval(rightChange, 2000);
    var rIndex = 0;
    function rightChange() {
        rIndex = (rIndex < 2) ? ++rIndex : 0;
        $(".jscol-right").eq(rIndex).addClass('curli').siblings().removeClass('curli');
        $(".jsnav-right").eq(rIndex).addClass('right').siblings().removeClass('right');
    }
    $(".jscol-right").hover(function() {
        clearInterval(rightTimer);
    }, function() {
        rightTimer = setInterval(rightChange, 2000);
    });
    $(".jsnav-right").hover(function() {
        clearInterval(rightTimer);
        $(this).addClass('right').siblings().removeClass('right');
        var index = $(this).index();
        $(".jscol-right").eq(index).addClass('curli').siblings().removeClass('curli');
    }, function() {
        rightTimer = setInterval(rightChange, 2000);
    });
    //懂你想要图片的hover
    $(".want-link").hover(function() {
        $(this).find(".slide").animate({
            top: '-40px',
            height: '70px'
        },500);
    }, function() {
        $(this).find(".slide").animate({
            top: 0,
            height: '30px'
        },500);
    });

    //固定搜索导航随页面滚动出现
    var fixedSort = $(".fixed-search");
    $(window).scroll(function() {
        if($(window).scrollTop() > $(window).height()) {
            fixedSort.css("display", "block");
        } else {
            fixedSort.css("display", "none");
        }
    });

    //toolbar 右侧固定工具栏所有交互
    //个人中心绑定hover事件
    $('.personal-link').hover(function() {
        hoverChange($(this), '.personal-text', '#fb7544', '-60px' );
    }, function() {
        hoverChange($(this), '.personal-text', '#303030', 0);
    });
    //抵用券绑定hover事件
    $(".coupon-link").hover(function() {
        hoverChange($(this), '.coupon-text', '#fb7544', '-48px' );
    }, function() {
        hoverChange($(this), '.coupon-text', '#303030', 0 );
    });
    //收藏夹绑定hover事件
    $(".favorites-link").hover(function() {
        hoverChange($(this), '.favorites-text', '#fb7544', '-48px' );
    }, function() {
        hoverChange($(this), '.favorites-text', '#303030', 0 );
    });
    //用户反馈绑定hover事件
    $('.return-link').hover(function() {
        hoverChange($(this), '.return-text', '#fb7544', '-60px' );
    }, function() {
        hoverChange($(this), '.return-text', '#303030', 0);
    });
    //返回顶部绑定hover事件
    $(".back-link").hover(function() {
        hoverChange($(this), '.back-text', '#fb7544', '-60px' );
    }, function() {
        hoverChange($(this), '.back-text', '#303030', 0);
    });
    //hover事件处理函数
    function hoverChange(parent, child, bgColor, leftDis) {
        parent.find(child).css('background-color', bgColor).animate({
            left: leftDis
        },300);
    }
    // 绑定点击事件
    var loginBox = $(".login-box");
    var loginWrap = loginBox.find(".login-wrap");
    $(".personal-link, .coupon-link, .favorites-link").on('click', function() {
        clickChange();
    });
    //点击事件处理函数
    function clickChange() {
        loginBox.show();
        loginWrap.animate({
            top: 0
        },500);
    }
    //返回顶部点击事件
    $(".back-link").click(function() {
        $("html, body").animate({
            scrollTop: 0
        },300);
    });
    //购物车按钮点击事件
    var toolbarB = $(".toolbar-box");
    $(".tbar-cart").click(function() {
        console.log(toolbarB.css("right"))
        if(toolbarB.css("right") == '-360px') {
            toolbarB.animate({
                right: 0
            },500);
        } else {
            toolbarB.animate({
                right: '-360px'
            },500);
        }
        
    });


    //登录页面关闭按钮点击事件
    $(".login-close").click(function() {
        loginWrap.animate({
            top: '-360px'
        },500,function() { 
            loginBox.hide();
        });
    });


    //登录页面表单的点击事件
    $(".login-input").each(function(i) {
        $(this).focus(function() {
            $(".login-account").eq(i).css("border-color", "#ccc");
            $(".must-write").eq(i).hide();
        });
        $(this).blur(function() {
            $(".login-account").eq(i).css("border-color", "#FF4646");
            $(".must-write").eq(i).show();
        });
    });
    //自动登录点击是否选中
    $(".auto-link").click(function() {
        $(this).toggleClass('login-checked');
    });
    // 更多合作网站tab 
    $(".more-colink").click(function() {
        $(this).toggleClass('more-cobtn');
        $(".more-tab-wrap").toggleClass('more-tab');
    });
    


});

//国产食品下的层叠加图片幻灯片插件
(function($){

    $.fn.stack = function(options) {  

        // Create some defaults, extending them with any options that were provided
        var o = $.extend({
            width:  400,            // width of the Stacking Gallery Images
            height: 500,            // height fo the Stacking Gallery Images
            next:'#next',       // id for the Next Navigation Button
            prev:'#previous', // id for the Previous Navigation Button
            autoplay: true  
        },options);
            
        var stack = $(this);  // the id for the gallery.
        //设置图片容器的宽高
        stack.width(o.width);
        stack.height(o.height);
        // var stackImg = stack.find("li"); // 不能用这个，变量会存储一开始的不会改变
        var stackImg    = '#' + stack.attr('id') + ' li';
        // var stackImg = "#stage li";
        var count = $(stackImg).length; // counts the number of images in the gallery
        var timer = null;
        if(o.autoplay) {
            timer = setInterval(function(){
                $(o.next).click();
            }, 2000);
            stack.hover(function() {
                clearInterval(timer);
            }, function() {
                timer = setInterval(function(){
                    $(o.next).click();
                }, 2000);
            });
            $(".rotate-btns").hover(function() {
                clearInterval(timer);
            }, function() {
                timer = setInterval(function(){
                    $(o.next).click();
                }, 2000);
            }); 
        }
        var curPage = 1;      
        $(o.next).click(function(){
            $(stackImg).eq(0).appendTo(stack);
            anim();
            curPage = (curPage < count) ? ++curPage : 1;
            $(".cur-num").text(curPage);
        });    
        $(o.prev).click(function(){
            $(stackImg).eq(count - 1).prependTo(stack);
            anim();
            curPage = (curPage > 1) ? --curPage : 3;
            $(".cur-num").text(curPage);     
        });
        //文档加载完js自动设置所有图片位置
        anim();    
        function anim() {
            for(var i = 0; i < count; i++) {
                $(stackImg).eq(i).css("z-index", (count-(i+1)));
                //每一个li里最后都添加了一个跟背景颜色相同的颜色蒙板
                //（position: absolute;z-index: -1;width: 100%;top: 0;left: 0;height: 225px;background-color: #f89d5d;），设置其透明度变化
                $(stackImg).eq(i).find(".color-mask").animate({
                    opacity: (Math.floor((i / (count - 0.5)) * 10) / 10)
                }, 200);  
                $(stackImg).eq(i).animate({
                    width: (o.width-(i*20)),
                    top: - (i*10),
                    left: i*10
                },400);      
            }
        }
    };  
  
})( jQuery );

// 国产食品下的文字自动向上滚动插件
(function($) {
    $.fn.textSlider = function(options) {
        var defaults = { //初始化参数
            line: 1,
            speed: 'normal',
            timer: 2000
        };
        var opts = $.extend(defaults, options);
        this.each(function() {
            var timerID;
            var obj = $(this);
            var $ul = obj.children("ul");
            var $height = $ul.find("li").height();
            var $Upheight = 0 - opts.line * $height;
            obj.hover(function() {
                clearInterval(timerID);
            }, function() {
                timerID = setInterval(moveUp, opts.timer);
            });

            function moveUp() {
                $ul.animate({ "margin-top": $Upheight }, opts.speed, function() {
                    for (i = 0; i < opts.line; i++) { //只有for循环了才可以设置一次滚动的行数
                        $ul.find("li:first").appendTo($ul);
                    }
                    $ul.css("margin-top", 0);
                });
            };
            timerID = setInterval(moveUp, opts.timer);
        });
    };
})(jQuery);