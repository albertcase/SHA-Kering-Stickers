jQuery(document).ready(function($){

	window.gotoPage = function(i){
		$('.page').removeClass('show').eq(i).addClass('show');
	};

	window.ajaxloading = {
		showLoading:function(){
			if(!$('.ajax-loading').length){
				$('body').append('<div class="ajax-loading">'+
					'<div class="loading"><span class="icon-loading"></span>loading...</div>'+ '</div>');
			}
		},
		hideLoading:function(){
			if($('.ajax-loading').length){
				$('.ajax-loading').remove();
			}
		}
	}

	//for imagelist
	var pageindex = 1,totalpage;
	if($('.gallery-list').length){
		getImageList(1);
	}
	$('.gallery-list-wrap').on('scroll', function(){
		if($('.gallery-list').height() - $('.gallery-list-wrap').height()<=$(this).scrollTop() ){
			if(pageindex>totalpage) return;
			pageindex++;
			getImageList(pageindex);
		}
	});

	function getImageList(pageindex){
		ajaxloading.showLoading();
		$.ajax({
			url:'/api/imagelist',
			type:'POST',
			dataType:'json',
			data:{
				page:pageindex
			},
			success:function(result){
				console.log(result);
				if(result.code==1){
					if(pageindex==1){
						totalpage=result.totalpage;
					}
					//	success
					var imglist = '';
					var listData = result.msg;
					for(var i=0;i<listData.length;i++){
						imglist = imglist+'<li>'+'<img src="/'+listData[i].url+'" alt=""/></li>';
					}
					$('.gallery-list').append(imglist);
					ajaxloading.hideLoading();
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