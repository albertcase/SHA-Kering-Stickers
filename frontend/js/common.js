jQuery(document).ready(function($){

	window.gotoPage = function(i){
		$('.page').removeClass('show').eq(i).addClass('show');
	}

});