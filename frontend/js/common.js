jQuery(document).ready(function($){

	window.gotoPage = function(i){
		$('.page').removeClass('show').eq(i).addClass('show');
	}

	if($('.gallery-list').length){
		$.ajax({
			url:'/api/imagelist',
			type:'GET',
			dataType:'json',
			//data:{
			//	image:renderPic
			//},
			success:function(result){
				console.log(result);
				if(result.code==1){
				//	success
					var imglist = '';
					var listData = result.msg;
					for(var i=0;i<listData.length;i++){
						imglist = imglist+'<li>'+'<img src="/'+listData[i].url+'" alt=""/></li>';
					}
					$('.gallery-list').append(imglist);

				}
			}
		})
	}

	$('.gallery-list').on('click', 'li', function(){
		$('.showbigimg .pic').html($(this).html());
		$('.showbigimg').addClass('show');
	});

	$('.showbigimg .close-btn').on('click', function(){
		$('.showbigimg').removeClass('show');
	});

	$('.showbigimg .overlay').on('click', function(){
		$('.showbigimg').removeClass('show');
	});

});