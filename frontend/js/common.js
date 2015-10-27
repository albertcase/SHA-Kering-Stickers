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
		uploadPhoto:function(){
			var reader  = new FileReader(),
				file    = $('.upload-photo')[0].files[0],
				preview = $('.upload-img');
			reader.onloadend = function () {
				//preview.src = reader.result;
				//preview.attr('src',reader.result);
				preview.append('<img src="'+reader.result+'">');
				$('.camera-block').removeClass('show');
				$('.photo-frame').addClass('show');
				loadSlide($('.slider'));
			};
			if (file) {
				reader.readAsDataURL(file);
			} else {
				preview.attr('src','');
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
			$('.upload-img').append(curImg);
			$('.slider-frame').hide();
			$('.btn-ok').addClass('mergePhoto');
		},
		selectWords:function(w){

		},
		renderPhoto:function(f,p,w){
			console.log('renderPhoto');
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

	//upload image and catch the file
	$('.upload-photo').on('change', function(e){
		photo.uploadPhoto();
	});
	$('.btn-ok').on('click', function(){
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
	//test first
	loadSlide($('.words-list'));


});