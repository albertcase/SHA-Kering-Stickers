jQuery(document).ready(function($){

	//	for canvas
	// create a wrapper around native canvas element (with id="c")
	var canvas = new fabric.Canvas('c');
	canvas.setWidth($('.upload-img').width());
	canvas.setHeight($('.upload-img').height());

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

	//photo
	var photo = {
		initPhoto:function(){
			$('.camera-block').addClass('show');
			$('.photo-frame').removeClass('show');
			$('.btn-ok').addClass('hide').removeClass('mergePhoto');
			//$('.upload-img .previewimg').html('<canvas>');
			canvas.clear();
		},
		uploadPhoto:function(ele,canvaswidth){

			lrz(ele.files[0],{width:canvaswidth*2.2},{quality:1})
				.then(function (rst) {
					// 处理成功会执行
					fabric.Image.fromURL(rst.base64,function(imgobj){
						imgobj.scale(0.5);
						canvas.add(imgobj);
					});
					$('.camera-block').removeClass('show');
					$('.photo-frame').addClass('show');
					//
					$('.btn-ok').removeClass('hide');

				})
				.catch(function (err) {
					// 处理失败会执行
				})
				.always(function () {
					// 不管是成功失败，都会执行
				});

		},
		selectFrame:function(f,p){
			$('.slider-frame').addClass('show');
			loadSlide($('.slider'));
			$('.btn-ok').addClass('btn-sf');
		},
		finishFrame:function(f,p){
			//the value is 0,1,2,3
			frameNum = $('.slider-frame .bx-pager-link.active').parent().index()+1;
				var curImg = $('.slider li').eq(frameNum).find('img').attr('src');

			fabric.Image.fromURL(curImg,function(imgobj){
				imgobj.scale(0.5);
				//imgobj.set({
				//	width:''
				//})
				canvas.add(imgobj);
			});

			//$('.upload-img .frameimg').append(curImg);
			$('.slider-frame').removeClass('show');
			$('.btn-ok').addClass('mergePhoto').removeClass('btn-sf');
			$('.slide-words').addClass('show');
			$('.title-frame').addClass('hide');
			loadSlide($('.words-list'));
		},
		selectWords:function(w){

		},
		renderPhoto:function(){
			var wordsNum = $('.slide-words .bx-pager-link.active').parent().index()+1;
				selectedWords = $('.slide-words .words-list li').eq(wordsNum).html();
			var alignedRightText = new fabric.Text(selectedWords, {
				left:0,
				top:0.84 * $('#c').height(),
				textAlign: 'center',
				fontSize: 28
			});
			alignedRightText.scale(0.5);
			alignedRightText.setColor('#000');
			canvas.add(alignedRightText);
			var renderPic = canvas.toDataURL({
				format: 'jpeg',
				quality: 1
			});
			//hide the button
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
						var shareimg = window.location.origin+'/'+result.msg;
						wxshare(shareimg);
						ajaxloading.hideLoading();
					}
				}
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

	$('.page-3 .btn-back').on('click', function(){
		if($('.camera-block').hasClass('show')){
			gotoPage(0);
		}else{
			photo.initPhoto();
		}
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

	$('.page-3 .btn-ok').on('click', function(){
	//	finish frame, start select words


		if($(this).hasClass('mergePhoto')){
			photo.renderPhoto();
		}else if($(this).hasClass('btn-sf')){
			photo.finishFrame();
		}else{
			photo.selectFrame();
		}
	});



	//start
	gotoPage(0);







});

