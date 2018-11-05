$(function() {
	var ua = navigator.userAgent.toLowerCase();　　
	var isWeixin = ua.indexOf('micromessenger') != -1;　　
	if(isWeixin) {
		$('.mask').show();
//		$('.btnBox .btn').on('touchstart', function() {
//			$('.mask').fadeIn("slow");
//		})　　　
	}
	
	$('.btnBox .iphoneBtn').on('touchstart', function() {
//		alert(1);
		window.open('https://itunes.apple.com/cn/app/id1241179489?mt=8','_self');
	})
	$('.btnBox .androidBtn').on('touchstart', function() {
//		alert(2)
		window.open('http://apifang.centaline.com.cn/download/appclients/fyq.apk','_self');

	})

})