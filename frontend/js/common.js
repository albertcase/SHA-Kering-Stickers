jQuery(document).ready(function($){

	function gotoPage(i){
		$('.page').removeClass('show').eq(i).addClass('show');
	}

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
			$('.upload-img .previewimg').html('');
		},
		uploadPhoto:function(){
			var reader  = new FileReader(),
				file    = $('.upload-photo')[0].files[0],
				preview = $('.upload-img .previewimg');
			reader.onloadend = function () {
				preview.html('<img src="'+reader.result+'">');
				$('.camera-block').removeClass('show');
				$('.photo-frame').addClass('show');
				loadSlide($('.slider'));
				$('.btn-ok').removeClass('hide');
			};
			if (file) {
				reader.readAsDataURL(file);
			} else {
				preview.find('img').attr('src','');
			}
		},
		selectFrame:function(f,p){

		},
		finishFrame:function(f,p){
			console.log('finishFrame');
			//console.log();
			//the value is 0,1,2,3
			var frameNum = $('.bx-pager-link.active').parent().index(),
				curImg = $('.slider li').eq(frameNum).html();
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
		renderPhoto:function(f,p,w){
			console.log('renderPhoto');
			var wordsNum = $('.slide-words .bx-pager-link.active').parent().index();
				selectedWords = $('.slide-words .words-list li').eq(wordsNum).html();
			//$('.selected-words').html(selectedWords);
			//$('.slide-words').removeClass('show');
			gotoPage(3);
			$.ajax({
				url:'',
				type:'get',
				dataType:'json',
				data:{},
				success:function(){

				}
			})
		}
	};

	$('.p2-product').on('click', function(){
		gotoPage(2);
	});

	//upload image and catch the file
	$('.upload-photo').on('change', function(e){
		photo.uploadPhoto();
	});

	$('.page-3 .btn-back').on('click', function(){
		if($('.camera-block').hasClass('show')){
			gotoPage(1);
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
			photo.renderPhoto();


		}else{
			photo.finishFrame();
		}
	});

	//start

	//go to page3
	gotoPage(3);
	//photo.initPhoto();
	//test first
	//loadSlide($('.words-list'));




});