jQuery(document).ready(function($){

	//click the camera btn
	$('.camera-block img').on('touchstart', function(){
		//alert(2);
		//$('.upload-photo').trigger('touchstart');
	});

	$('.upload-photo').on('change', function(e){
		//alert(1);

		var reader  = new FileReader(),
			file    = $('.upload-photo')[0].files[0],
			preview = $('.upload-img img');
		reader.onloadend = function () {
			//preview.src = reader.result;
			preview.attr('src',reader.result);
			$('.camera-block').removeClass('show');
			$('.photo-frame').addClass('show');
		};
		if (file) {
			reader.readAsDataURL(file);
		} else {
			preview.attr('src','');
		}
		console.log(file)

	});

});