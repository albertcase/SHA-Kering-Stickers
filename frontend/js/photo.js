jQuery(document).ready(function($){

	//	for canvas
	// create a wrapper around native canvas element (with id="c")
	var canvas = new fabric.Canvas('c');
	canvas.setWidth($('.upload-img').width());
	canvas.setHeight($('.upload-img').height());
	canvas.setBackgroundColor('#fff');

	function toFixed2 (num) {
		return parseFloat(+num.toFixed(2));
	}

	//step is represent the upload sequece
	var frameNum;

	//Apply bxSlider function
	function loadSlide(element){
		var slider = element.bxSlider({
			mode: 'horizontal'
		});
	};

	var step=0;
	var renderPic;
	//photo
	var photo = {
		initPhoto:function(){
			step=0;
			$('.camera-block').addClass('show');
			$('.photo-frame').removeClass('show');
			$('.btn-ok').addClass('hide');
			$('.slide-words').removeClass('show');
			//$('.upload-img .previewimg').html('<canvas>');
			canvas.clear();
		},
		uploadPhoto:function(ele,canvaswidth){

			lrz(ele.files[0],{width:canvaswidth*2.2},{quality:1})
				.then(function (rst) {
					// 处理成功会执行
					step=1;
					fabric.Image.fromURL(rst.base64,function(imgobj){
						imgobj.scale(0.5);
						imgobj.set({
							hasControls:false,
							hasBorders:false
						});
						canvas.add(imgobj);
					});
					$('.title-frame').addClass('hide');
					$('.camera-block').removeClass('show');
					$('.photo-frame').addClass('show');
					$('.btn-ok').removeClass('hide');
				})
				.catch(function (err) {
					// 处理失败会执行
				})
				.always(function () {
					// 不管是成功失败，都会执行
				});

		},
		adjustPhoto:function(){
			step=1;
			$('.slider-frame').removeClass('show');
			$('.title-frame').addClass('hide');
		},
		selectFrame:function(f,p){
			console.log(canvas);
			step=2;
			$('.title-frame').removeClass('hide').html('给勇敢美丽的你挑选一个相框');
			$('.slider-frame').addClass('show');
			$('.page-3 .btn-ok').html('确定');
			if(!$('.slider-frame .bx-wrapper').length){
				loadSlide($('.slider'));
			}
			$('.slide-words').removeClass('show');
			if(canvas._objects.length>1){
				canvas.remove(canvas._objects[1]);
			}
		},
		finishFrame:function(f,p){
			//the value is 0,1,2,3
			step=3;
			frameNum = $('.slider-frame .bx-pager-link.active').parent().index()+1;
				var curImg = $('.slider li').eq(frameNum).find('img').attr('src');

			fabric.Image.fromURL(curImg,function(imgobj){
				imgobj.set({
					width:$('#c').width(),
					height:$('#c').height(),
					selectable:false
				});
				canvas.add(imgobj);
			});

			$('.slider-frame').removeClass('show');
			$('.slide-words').addClass('show');
			if(!$('.words-list .bx-wrapper').length){
				loadSlide($('.words-list'));
			}
			$('.title-frame').html('给您的照片“发声”');
			$('.page-3 .btn-ok').html('完成');
		},
		renderPhoto:function(){
			$('.slide-words').removeClass('show');
			var wordsNum = $('.slide-words .bx-pager-link.active').parent().index()+1;
				ele = $('.slide-words .words-list li').eq(wordsNum);
				selectedWords = $('.slide-words .words-list li').eq(wordsNum).html();

			fabric.Image.fromURL(ele.find('img').attr('src'),function(imgobj2){
				imgobj2.set({
					left:$('#c').width()*0.1,
					top:$('#c').height() - $('#c').width()*0.8*65/500-15,
					width:$('#c').width()*0.8,
					height:$('#c').width()*0.8*65/500,
					selectable:false
				});
				canvas.add(imgobj2);

				renderPic = canvas.toDataURL({
					format: 'png',
					quality: 1
				});
				$('.btn-ok').addClass('hide');
				ajaxloading.showLoading();
				$.ajax({
					url:'/api/createImg',
					type:'POST',
					dataType:'json',
					data:{
						image:renderPic
					},
					success:function(result){
						if(result.code==1){
							//	success
							$('.p4-photo').html('<img src="'+window.location.origin+'/'+result.msg+'">');
							gotoPage(2);
							//show the button
							$('.btn-ok').removeClass('hide');
							var shareimg = window.location.origin+'/'+result.msg,
								sharetitle='制止暴力不公，推动女性发展。我很荣幸支持了白丝带女性权益活动！#BeHerVoice#',
								sharedesc='制止暴力不公，推动女性发展。我很荣幸支持了白丝带女性权益活动！#BeHerVoice#',
								sharelink=window.location.origin+'/site/gallery';
							wxshare(sharetitle,shareimg,sharelink,sharedesc);
							ajaxloading.hideLoading();
						}
					}
				});
			});
		}
	};



	$('.p2-product').on('click', function(){
		photo.initPhoto();
		gotoPage(1);
	});

	//upload image and catch the file
	$('.upload-photo').on('change', function(e){

		var canvaswidth = $('#c').width();
		photo.uploadPhoto(e.target,canvaswidth);
		//reset the input file to active change event every time
		$(this).val("");
	});


	$('.btn-list').on('click', function(){
		window.location.href = '/site/gallery';
	});

	$('.btn-share').on('click', function(){
		$('.share-block').addClass('show');
	});

	$('.share-block').on('click', function(){
		$('.share-block').removeClass('show');
	});

	$('.page-3 .btn-back').on('click', function(){

		switch (step){
			case 0:
				gotoPage(0);
				break;
			case 1:
				photo.initPhoto();
				break;
			case 2:
				photo.adjustPhoto();
				break;
			case 3:
				photo.selectFrame();
				break;
		}

	});

	$('.page-3 .btn-ok').on('click', function(){
	//	finish frame, start select words

		switch (step){
			case 0:
				gotoPage(0);
				break;
			case 1:
				photo.selectFrame();
				break;
			case 2:
				photo.finishFrame();
				break;
			case 3:
				photo.renderPhoto();
				break;
		}
	});

	//start
	gotoPage(0);

});

