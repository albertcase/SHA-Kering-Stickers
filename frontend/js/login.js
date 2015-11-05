jQuery(document).ready(function($){

//vertify the page
	$('.user-submit').on('touchstart', function(e){
		e.preventDefault();
		console.log($('.user-pwd').val());
		$.ajax({
			url:'/api/check',
			type:'POST',
			dataType:'json',
			data:{password:$('.user-pwd').val()},
			success:function(result){
				if(result.code==1){
					window.location.href = '/site/photo';
				}else{
					alert('您的密码输入有误，请重新输入');
				}
			}
		});
	});

});