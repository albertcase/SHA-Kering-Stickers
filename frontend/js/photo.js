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
		uploadPhoto:function(){
			var reader  = new FileReader(),
				file    = $('.upload-photo')[0].files[0],
				preview = $('.upload-img .previewimg');
			previewimg = $('.upload-img .previewimg img')[0];
			reader.onloadend = function () {
				//preview.html('<img src="'+reader.result+'">');
				$('.camera-block').removeClass('show');
				$('.photo-frame').addClass('show');
				//
				$('.btn-ok').removeClass('hide');
				uploadImgSrc = reader.result;

				fabric.Image.fromURL(uploadImgSrc,function(imgobj){
					imgobj.scale(0.5);
					canvas.add(imgobj);
				});


				step=1;
			};
			if (file) {
				reader.readAsDataURL(file);
			} else {
				preview.find('img').attr('src','');
			}
		},
		selectFrame:function(f,p){
			loadSlide($('.slider'));
		},
		finishFrame:function(f,p){
			console.log('finishFrame');
			//console.log();
			//the value is 0,1,2,3
			frameNum = $('.slider-frame .bx-pager-link.active').parent().index()+1;
				var curImg = $('.slider li').eq(frameNum).html();
			console.log(curImg);
			$('.upload-img .frameimg').append(curImg);
			$('.slider-frame').hide();
			$('.btn-ok').addClass('mergePhoto');
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
			$.ajax({
				url:'/api/createImg',
				type:'POST',
				dataType:'json',
				data:{
					image:p,
					border:f,
					text:selectedWords
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
		photo.uploadPhoto();
	});

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

		photo.selectFrame();
		if($(this).hasClass('mergePhoto')){
			photo.renderPhoto(frameNum,uploadImgSrc);
		}else{
			photo.finishFrame();
		}
	});

	//start

	//go to page3
	gotoPage(1);
	photo.initPhoto();
	//test first
	//loadSlide($('.words-list'));







});

