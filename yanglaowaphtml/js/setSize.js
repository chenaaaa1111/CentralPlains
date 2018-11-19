 $(function(){
//   window.onload = function () {
//       obj.init();
//   }
//   var obj = {
//       init: function () {
//           window.addEventListener('resize', obj.setFontSize);
//       },
//       setFontSize: function () {
//           var gWidth = document.body.clientWidth, gPicWidth = 750, gmax = gWidth / gPicWidth * 20;
//           if (gmax > 14) gmax = 14;
//           gmax = parseInt(gmax);
//           document.body.style.fontSize = gmax + "px";
//           document.documentElement.style.fontSize = gmax + "px";
//       }
//   }

    // var isMove=false;

	var w = $(window).width();
    var h = $(window).height();
    var sh=$(window).scrollTop();
    console.log(sh);
	if(w >= 375){
		$('.housepic').css('margin-left','8px');
		$('.itemfor').css('margin-right', '7px');
	}else{
	    $('.itemfor').css('margin-right', '5px');
	}
	
	//map地图自适应高度
    $('#allmap').height(h - $('.header').height() - $('.footer').height());
    //下拉箭头展开
    var n = 0;
    $('.slidetog img').click(function(){
    	n++
    	if(n%2 == 1){
    		$(".show_item").slideDown(400);
    		$(".Preview").css('height', 'auto');
    		$('.slidetog').css('margin-top','0');
    		$('.slidetog img').css('transform','rotate(180deg)');
    	}else if(n%2 == 0){
    		$(".show_item").slideUp(400);
    		$(".Preview").height(70);
    		$('.slidetog').css('margin-top','15px');
    		$('.slidetog img').css('transform','');
    	}
    });
    
    //筛选页底部按钮自适应外边距
    var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	       
    var gh = h - $('.filterheader').height() - $('.fil_popups').height()*7 -$('.btn_box').height() - 119 - 81 - 8;
    if(w <= 320){
    	// $('.btn_box').css('margin-top','20px');
    }else if(isAndroid){
    	$('.Mechcontant .search input').css('padding-top','3px');
    	// $('.btn_box').css('margin-top', '30px');
    	$('.picnum').addClass('posinpic');
    }
    else{
    	// $('.btn_box').css('margin-top',gh);
    }
    
    $('.fil_check input').click(function(){
    	$(this).attr('checked','checked');
    });
    //map-弹窗
    var ch = h - 280;
    $('.district').click(function(){
    	$('.popup_window').show();
    	$('.citynames').show();
    	$('.citynames').css('position','fixed');
    	$('.citynames').css('margin-top',ch);
    	isMove=true;
    });
    
    
    $('.popup_window').click(function(){
    	$('.popup_window').hide();
        $('.navbarList').hide();
        console.log('88');
    	$('.citynames').hide();
    	$('.phoneList').hide();
        $('#arrays').hide();
        $('#BpMap').hide();
        $('html,body').css('overflow','auto');
        $('.ultables').hide();
        isMove=false;

    });
     $('.navbarList').click(function () {
         $('.popup_window').hide();
         $(this).hide();
     });
    if(w <= 320){
        $('.cityname').css({ "float": "left", "width": "172px" });
        $('.cityOth').css({ "float": "left", "width": "190px" });
        $('.cityother').css('width', '198px');
    	$('.address').addClass('textover');
    	$('.fwObj').addClass('wraptext');
    	$('.fwObj').css('width','217px');   	
    	$('.serset span').css('width','24.25%');
    	$('.setlistspan').css('margin-right','1%');
    	$('.careOldMen').css('width','28%');
    	$('.optery').css('width', '164px');
    	$('.popupname').css('width', '178px');
    }else if(w > 320 && w <= 375){
    	$('.address').css('width','190px');
    	$('.cityname').css({"float":"left","padding-left":"10px"});
    	$('.fwObj').addClass('wraptext');
    	$('.fwObj').css('width','250px');
    	$('.optery').css('width','200px');
    	$('.tops').css('margin-top','5px');
    	// $('.optery').css('white-space', 'nowrap');
    	$('.popupname').css('width', '201px');
    }else{
    	$('.address').css('width','255px');
    	$('.fwObj').addClass('wraptext');
    	$('.fwObj').css('width','250px');
    	$('.tops').css('margin-top','8px');
    	$('.cityname').css({"float":"left","padding-left":"10px"});
    	$('.address').css('margin', '3px 0 1px 0');
    	$('.popupname').css('width', '255px');
    }
    
    //详情页设置滑动图片距离
    if(w <= 320){
    	$('.halfs .state').css('margin-left','5px');
    }else if(w > 320 && w <= 375){
    	$('.halfs .state').css('margin','0 11px');
    }else{
    	$('.halfs .state').css('margin','0 16px');
    }
     
    if(w <= 320){
    	$('.operationbox').css('padding-left','5px');
    	$('.description span').css('line-height','18px');
    }else{
    	$('.operationbox').css('padding-left','10px');
    }

    if(w <= 375){
    	$('.tp5').css('margin-top','5px');
    }else{
    	$('.phone').css('letter-spacing','0');
    }

    $('.servicebox span').click(function(){
    	$(this).toggleClass('spanstyle');
    });
    $('.phone_consultation').click(function () {
        isMove=true;
        $('.popup_window').show();
        var scrollTop=$(window).scrollTop();
        $('.phoneList').css({'top':scrollTop+h/2,'margin-top':'-125.25px'});

        $('.phoneList').show();
    })
    $('.phoneList').click(function () {
        $(this).hide();
        $('.popup_window').hide();
    });
    $('.array').click(function () {
        $('.popup_window').show();
        $('#arrays').show();
        $('html').css('overflow','hidden');
        isMove=true;
    });
     $('#arrays').click(function () {
         $(this).hide();
         $('.popup_window').hide();
         $('html').css('overflow','auto');
         isMove=true;
     });
     $('.morelist').click(function () {
         $('.navbarList').show();
         $('.popup_window').show();

     });
     $('.goodbutton').click(function (eev) {
         $(this).toggleClass('active');
         if($(this).hasClass('active')){
            localStorage.setItem('isGood',true);
         }else{
            localStorage.setItem('isGood',false);
         }

     });
     $("#collectionIcon").click(function(event){
        if(event.target.src.indexOf("collections.png")>=0){
            event.target.src="./images/coalready.png"
        }else{
            event.target.src="./images/collections.png"
        }
     });
 
});
