<link id="skin_style" href="/css/emoji.css" type="text/css" rel="stylesheet" charset="utf-8" /> 
<center style="font-size:12px">
<?php
for ($i = 0; $i < count($list); $i++) {
	echo $list[$i]['nickname']."<br>";
}
?>
</center>