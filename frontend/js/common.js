function gotoPin(i) {
	var $pin = $('.wrap .pin');
	var $next = $pin.eq(i);
	var $current = $pin.filter('.current');
	$next.addClass('current');
	$current.removeClass('current');
	if ($current.index() != i) {
		$next.trigger('pincurrent');
	};
	if(i==1){
		ga('send','UD', 'Page2-Cheers');
	}else if(i==2){
		ga('send','UD', 'Page3-Tipsy');
	}else if(i==3){
		ga('send','UD', 'Page4-Turn');
	}else if(i==4){
		ga('send','UD', 'Page6-Result');
	};
}

function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

function QueryString(){
	// This function is anonymous, is executed immediately and
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return query_string;
};

function imgLoadDeferred($container) {
	var deferred = $.Deferred();
	var $img = $($container).find('img');
	var count = 0;
	deferred.notify(count, $img.length);
	$img.on('load error', function(e) {
		count++;
		deferred.notify(count, $img.length);
		if (count >= $img.length) {
			deferred.resolve();
		}
	});
	return deferred.promise();
}

function loadImg() {
	$('.wrap img').each(function(i, elem) {
		this.src0 = this.src;
		this.src = '';
	});
	imgLoadDeferred($('.loading-wrap')).done(function() {
		$('.wrap .pin-1 img').each(function(i, elem) {
			this.src = this.src0;
		});
		imgLoadDeferred($('.wrap .pin-1')).progress(function(count, length) {
			var progress = count / length;
			var progressHeight = Math.min(50 * progress, 50) + '%';
			$('.loading-wrap .layer-2').css({height: progressHeight});
		}).done(function() {

			//Hide the loading page
			var loadtime = setTimeout(function(){
				$('.loading-wrap').css({display: 'none'});
				gotoPin(0);
				clearTimeout(loadtime);
			},2000);
			$('.wrap').css({top: '0%'});
			$('.wrap img').each(function(i, elem) {
				this.src = this.src0;
			});
		});
	});
}

jQuery(document).ready(function($){
	loadImg();

	// 倒转手机
	$('.pin-4').on('pincurrent', function(e) {
		//$(this).removeClass('flip');
		if(window.DeviceOrientationEvent){
			window.addEventListener('deviceorientation', deviceorientation2);
		}else{
			alert('this device is not support orientation');
		}

	});

	//user click effect,just for test mobile on pc
	$('.p4-2').on('click', function(){
		$('.pin-4').addClass('flip');
		if(QueryString().username){
			sendUsername(encodeURIComponent(QueryString().username));
		}
	});



	function deviceorientation2(eventData) {
		if (Math.abs(eventData.gamma) > 70) {
			$(window).off('deviceorientation');
			$('.pin-4').addClass('flip');

			ga('send','UD', 'Turn-Upside-Down');
			//	recode the user action
			if(QueryString().username){
				sendUsername(encodeURIComponent(QueryString().username));
			}

		}
	};

	//Api for weixin
	function sendUsername(username){
		$.ajax({
			url:'api.php',
			type:"get",
			dataType:'json',
			data:{
				action:'support',
				username:username
			},
			success:function(data){
			//	success
				ga('send','UD', 'Page5-Support');
			}

		});
	}


	$('.wrap').on('touchstart', function(e) {
		var data = $(this).data();
		data.touchstart = true;
		//data.touchmove = false;
		data.startX = e.originalEvent.changedTouches[0].pageX,
		data.startY = e.originalEvent.changedTouches[0].pageY;
	});
	$('.wrap').on('touchmove', function(e) {
		e.preventDefault();
		var data = $(this).data();
		data.touchmove = true;
	});
	$('.wrap').on('touchend', function(e) {

		var data = $(this).data();
		data.endX = e.originalEvent.changedTouches[0].pageX,
		data.endY = e.originalEvent.changedTouches[0].pageY;
		if (data.touchstart && data.touchmove) {
			if (Math.abs(data.startX-data.endX) < Math.abs(data.startY-data.endY)) {
				var delta = data.startY>data.endY ? 1: -1;
				var $pin = $('.pin');
				var index = $('.pin.current').index();

				//index 0,1,2,3,4
				if(index>-1 && index<5){
					if(index==3 && delta==1){
						if(!$('.pin').eq(3).hasClass('flip')){
							delta = 0;
						}else{
							delta=1;
						}
					}
					var nextIndex = index + delta;
					if(nextIndex>-1 && nextIndex<5){
						if(delta==-1){
							$('.pin').eq(nextIndex).removeClass('active');
							gotoPin(nextIndex);
						}else if(delta==1){
							$('.pin').eq(nextIndex-1).addClass('active');
							gotoPin(nextIndex);
						}
					}
				}
			}
		}
		data.touchstart = false;
		data.touchmove = false;
	});

    $('.p6-btn-1').on('click', function(){
        $('.p6-content').hide();
        $('.p6-content-2').show();
		ga('send','UD', 'Coupons');
    });
    $('.p6-btn-2').on('click', function(){
        $('.p6-content').hide();
        $('.p6-content-share').show();
		ga('send','UD', 'Sharing');
    });
	$('.p6-content-share').on('click',function(){
		$('.p6-content-share').hide();
		$('.p6-content-1').show();
		ga('send','UD', 'Follow');
		if(isWeiXin()){
			ga('send','UD', 'Share-Wechat');
		}
	});
    $('.p6-btn-3').on('click', function(){
        $('.p6-content').hide();
        $('.p6-content-qrcode').show();
    });
    $('.p6-btn-back').on('click', function(){
        $('.p6-content').hide();
        $('.p6-content-1').show();
    });

});
