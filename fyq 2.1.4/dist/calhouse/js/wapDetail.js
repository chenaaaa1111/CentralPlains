/*详情页视频全屏*/
var fullScreen = function(config) {
    var vendors = ["", "webkit", "moz", "ms"];
    for (var i = 0; i < vendors.length && !this.requestFullScreen; i++) {
        this.requestFullScreen = this[vendors[i] + "RequestFullScreen"] || this[vendors[i] + "EnterFullScreen"];
    }
    this.isfullscreen = function() {
        return (document.fullScreenElement && document.fullScreenElement !== null) ||
            document.mozFullScreen || document.webkitIsFullScreen;
    }
    this.exitFullScreen = function() {
        for (var i = 0; i < vendors.length && !document.exitFullScreen; i++) {
            document.exitFullScreen = document[vendors[i] + "ExitFullScreen"] || document[vendors[i] + "CancelFullScreen"];
        }
        if (!document.exitFullScreen) {
            return;
        }
        document.exitFullScreen();
    }
    if (this.requestFullScreen) {
        var fullscreenchange,
            fullScreenchangeevents = ["onwebkitfullscreenchange", "onmozfullscreenchange", "onfullscreenchange"],
            len = fullScreenchangeevents.length;
        for (var i = 0; i < len; i++) {
            if (fullScreenchangeevents[i] in this) {
                fullscreenchange = fullScreenchangeevents[i].substring(2);
                break;
            }
        }
        this.addEventListener(fullscreenchange, function(e) {
            var isfullscreen = this.isfullscreen();
            if (this.isfullscreen() && config.fullsceenFunc && typeof config.fullsceenFunc === 'function') {
                config.fullsceenFunc(e);
            } else if (!this.isfullscreen() && config.cancelfullscreenFunc && typeof config.cancelfullscreenFunc === 'function') {
                config.cancelfullscreenFunc(e);
            }
        }, false);
    }
};

var videoFullScreen = function(selector) {
    var ua = navigator.userAgent.toLowerCase();
    var Android = String(ua.match(/android/i)) == "android";
    var playbtn = $(selector).find(".playbtn");
    var preview = $(selector).find(".preview");
    var video = $(selector).find("video")[0];
    if (!video) {
        return;
    }
    if (Android) {
        fullScreen.call(video, {
            cancelfullscreenFunc: function(e) {
                video.pause();
                $(video).removeAttr("controls");
                $(video).hide();
                preview.show();
            }
        });
    }

    playbtn.click(function() {
        preview.hide();
        video.play();
        $(video).attr("controls", "controls");
        if (Android && !video.isfullscreen() && video.requestFullScreen) {
            video.requestFullScreen();
        }
    });

    $(video).on("pause", function(e) {
        if (Android && video.isfullscreen() && video.exitFullScreen) {
            video.exitFullScreen();
        }
    });

    $(video).on('ended', function() {
        /*播放完毕自动退出全屏*/
        document.webkitCancelFullScreen();
    }, false);
};

/*显示出错提示*/
function showTips(msg) {
    var tipLayer = $("#tipLayer");
    tipLayer.find(".collectH4").html(msg);
    $('#tipLayer').openModal();
}

$(function() {
    /*隐藏loading*/
    $('.loading').hide();
    (function() {
        var swipeNum = $('.swipe-wrapBox').length;
        $('#mySwipeFootB .number').html(swipeNum);
        if (swipeNum === 0) {
            $('#mySwipeFootB .cur').html(swipeNum);
        }
        var wh = $(window).height() * 0.82;
        $('.brokerContact').css({
            'bottom': -800 + 'px'
        });

        $("#mySwipe").find(".swipe-title i").click(function() {
            $(this).parent().hide();
        });
        
        function askfree(obj) {
            $(obj).click(function (e) {
                e.stopPropagation();
                $("#brokerWapper").animate({
                    'bottom': 0
                });
                $('.popbg').css({
                    zIndex: 93,
                    display: 'block',
                    opacity: 0.5
                });
            });
        }
        /*免费咨询弹出框*/
        askfree('.fixedbotRedbtn');
        askfree('#brokerBtn');
        /*咨询小区专家弹出框*/
        askfree('#consult');

        /*经纪人弹出框--遮罩，点击遮罩层,关闭弹出框*/
        $('.popbg').click(function (e) {
            e.stopPropagation();
            $('#brokerWapper').animate({
                'bottom': '-800px'
            });
            $('.popbg').hide();
        });

        /*经纪人弹出框--关闭按钮*/
        $('.brokerclose_btn').on("click", function(e) {
            $('#brokerWapper').animate({
                'bottom': '-800px'
            });
            $('.popbg').hide();
        });
    })();

    var flag = 1;
    /*更多*/
    $("#more").click(function(e) {
        e.stopPropagation();
        $(".moredrop-down").removeClass('animated fadeOutUpBig').addClass("animated fadeIn").css("display", "block");
    });
    $(document).click(function() {
        $(".moredrop-down").removeClass('animated fadeIn').addClass('animated fadeOutUpBig');
    });
    /*收藏*/
    $('#collectBtn').click(function() {
        if (flag == 1) {
            $("#collectBtn i").html('favorite');
            flag = 0;
        } else {
            $("#collectBtn i").html('favorite_border');
            flag = 1;
        }
    });

    /*收藏图标*/
    $('#likeBtn').on('click',function (e) {
        e.stopPropagation();
        if (flag == 1) {
            $("#likeBtn i").html('favorite');
            $("#likeBtn i").css('color','#e50011');
            flag = 0;
        } else {
            $("#likeBtn i").html('favorite_border');
            $("#likeBtn i").css('color','#fff');
            flag = 1;
        }
    });

    /*图片和数字对应*/
    // showSwipeImage(0);
    var elem = document.getElementById('mySwipe');
    window.mySwipe = Swipe(elem, {
        transitionEnd: function(index, element) {
            // showSwipeImage(index);
            $('#mySwipeFootB .cur').html(index + 1);
        }
    });

    // function showSwipeImage(index) {
    //     var srcPhoto = $('.swipe-wrap .swipe-wrapBox').eq(index).find('img').attr('data-swipe');
    //     var newImg = new Image();
    //     newImg.src = srcPhoto;
    //     newImg.onload = function() {
    //         $('.swipe-wrap .swipe-wrapBox').eq(index).find('img').attr('src', srcPhoto);
    //     }
    // }
});

/*左右滑动栏*/
(function() {
    function setBorderBoxWidth(element, width) {
        var el = $(element);
        var bl = parseInt(el.css('border-left-width'));
        var br = parseInt(el.css('border-right-width'));
        var pl = parseInt(el.css('padding-left'));
        var pr = parseInt(el.css('padding-right'));
        var w = width - bl - br - pl - pr;
        el.width(w);
    }

    function setBorderBoxHeight(element, height) {
        var el = $(element);
        var bl = parseInt(el.css('border-top-width'));
        var br = parseInt(el.css('border-bottom-width'));
        var pl = parseInt(el.css('padding-top'));
        var pr = parseInt(el.css('padding-bottom'));
        var h = height - bl - br - pl - pr;
        el.height(h);
    }
    var HIScroll = function(swElt) {
        var phcount, pheleWidth, phwindowWidth = $(window).width(),
            cols = $(swElt).data("cols"),
            iScrollBody = $(swElt).children(".iscroll"),
            items = iScrollBody.children(),
            hxcount = items.length,
            itemMargin = parseInt($(items).css("margin-right")),
            eleWidth = (phwindowWidth - itemMargin * (cols + 1)) / cols;
        items.each(function() {
            $(this).width(setBorderBoxWidth(this, eleWidth));
        });
        var wrapperWidth = $(items).innerWidth() * hxcount + hxcount * itemMargin;
        iScrollBody.width(eleWidth * hxcount + (hxcount - 1) * itemMargin);
        var iScroll = new IScroll(swElt, {
            preventDefault: false,
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            snapSpeed: 400,
            snap: "a"
        });
    };
    document.addEventListener('touchmove', function(e) {}, false);
    if (window.jQuery || window.Zepto) {
        (function($) {
            $.fn.iScroll = function(params) {
                return this.each(function() {
                    $(this).data('iscroll', new HIScroll($(this)[0], params));
                });
            }
        })(window.jQuery || window.Zepto)
    }
})();

/* 修复：小区--播放小区视频时，点击侧边栏，视频遮挡住了侧边栏 */
$(function () {
    var video = $("video");
    if (video.length > 0) {
        var videoPreview = $(".videoBox .preview");
        var navButton = $("a[data-activates='nav-mobile']");
        var nav = $("#nav-mobile");
        var more = $("#more");

        videoPreview.click(function () {
            video.show();
        });

        navButton.click(function () {
            videoPreview.show();
            video.hide();
            video[0].pause();
        });

        more.click(function () {
            videoPreview.show();
            video.hide();
        });
    }
});

