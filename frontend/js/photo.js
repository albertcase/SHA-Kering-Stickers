jQuery(document).ready(function($){

	//	for canvas
	// create a wrapper around native canvas element (with id="c")
	var canvas = new fabric.Canvas('c');
	canvas.setWidth($('.upload-img').width());
	canvas.setHeight($('.upload-img').height());

	canvas.on('mouse:move', function(e) {

	});


	//step is represent the upload sequece
	var step= 0,
		uploadImgSrc,
		frameNum;

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
			$('.btn-ok').addClass('hide');
			//$('.upload-img .previewimg').html('');
		},
		uploadPhoto:function(rst){
			console.log(rst);
			fabric.Image.fromURL(rst,function(imgobj){
				canvas.add(imgobj);
			});
			$('.camera-block').removeClass('show');
			$('.photo-frame').addClass('show');
			//
			$('.btn-ok').removeClass('hide');

		},
		selectFrame:function(f,p){
			$('.slider-frame').addClass('show');
			loadSlide($('.slider'));
			$('.btn-ok').addClass('btn-sf');
		},
		finishFrame:function(f,p){
			console.log('finishFrame');
			//console.log();
			//the value is 0,1,2,3
			frameNum = $('.slider-frame .bx-pager-link.active').parent().index()+1;
				var curImg = $('.slider li').eq(frameNum).find('img').attr('src');
			console.log(curImg);

			fabric.Image.fromURL(curImg,function(imgobj){
				imgobj.scale(0.5);
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
		renderPhoto:function(f,p){
			console.log(f);
			var wordsNum = $('.slide-words .bx-pager-link.active').parent().index()+1;
				selectedWords = $('.slide-words .words-list li').eq(wordsNum).html();
			//$('.selected-words').html(selectedWords);
			//$('.slide-words').removeClass('show');
			//
			console.log(selectedWords);
			var alignedRightText = new fabric.Text(selectedWords, {
				textAlign: 'center'
			});
			canvas.add(alignedRightText);

			var renderPic = canvas.toDataURL('png');

			$.ajax({
				url:'/api/createImg',
				type:'POST',
				dataType:'json',
				data:{
					image:p
				},
				success:function(result){
					console.log(result);
					if(result.code==1){
					//	success
						$('.p4-photo').html('<img src="'+window.location.origin+'/'+result.msg+'">');
					}

					gotoPage(2);
				}
			})
		}
	};



	$('.p2-product').on('click', function(){
		gotoPage(1);
	});

	//upload image and catch the file
	$('.upload-photo').on('change', function(e){

		//photo.uploadPhoto(e);
		upload(e.target);
	});

	function upload (ele) {
		lrz(ele.files[0],{quality:1})
			.then(function (rst) {
				// 处理成功会执行
				console.log(rst);
				photo.uploadPhoto(rst.base64);
				$('.previewimg').append('<img src="'+rst.base64+'">');

			})
			.catch(function (err) {
				// 处理失败会执行
			})
			.always(function () {
				// 不管是成功失败，都会执行
			});
	};


	$('.page-3 .btn-back').on('click', function(){
		if($('.camera-block').hasClass('show')){
			gotoPage(0);
		}else{
			photo.initPhoto();
		}
	});

	$('.btn-list').on('click', function(){
		window.location.href = 'gallery';
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
			photo.renderPhoto(frameNum,uploadImgSrc);
		}else if($(this).hasClass('btn-sf')){
			photo.finishFrame();
		}else{
			photo.selectFrame();
		}
	});

	//start

	//go to page3
	gotoPage(1);
	photo.initPhoto();
	//test first
	//loadSlide($('.words-list'));







});

