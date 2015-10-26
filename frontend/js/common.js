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
			preview = $('.item-1 img');
		reader.onloadend = function () {
			//preview.src = reader.result;
			preview.attr('src',reader.result);
		};
		if (file) {
			reader.readAsDataURL(file);
		} else {
			preview.attr('src','');
		}
		console.log(file)

	});

});