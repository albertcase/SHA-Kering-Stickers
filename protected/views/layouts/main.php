<!DOCTYPE HTML>
<html>
<head>
	<title>kering</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="format-detection" content="telephone=no">
	<!--禁用手机号码链接(for iPhone)-->
	<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0,minimal-ui" />
	<!--自适应设备宽度-->
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<!--控制全屏时顶部状态栏的外，默认白色-->
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="Keywords" content="kering">
	<meta name="Description" content="...">
	<!-- the development css-->
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/frontend/css/style.css" />
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/frontend/js/jquery.min.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/frontend/js/jquery.bxslider.min.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/frontend/js/rem.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/frontend/js/common.js"></script>
	<!-- the production css-->
	<!--<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/dist/css/style.css" />-->


</head>
<body>
	<div class="logo">
		<img src="<?php echo Yii::app()->request->baseUrl; ?>/images/theme-kr/logo.png" alt=""/>
	</div>
	<?php echo $content; ?>
	<div class="p2-bottom-bg">
		<div class="bleft"></div>
		<div class="bright"></div>
	</div>
</body>
</html>

