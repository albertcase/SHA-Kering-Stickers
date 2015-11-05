<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/frontend/js/fabric.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/frontend/js/lrz.all.bundle.js"></script>
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/frontend/js/photo.js"></script>
<div class="wrapper">
    <!--For the introduction page-->
    <div class="page page-2">
        <div class="p2-1">
            <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/theme-kr/p2-1.png" alt=""/>
        </div>
        <p class="p2-des">我们诚意邀请您通过白丝带女性权益活动，<br>
            把#BeHerVoice#的信息传扬出去。 <br>
        </p>
        <div class="p2-product">
            <div class="pp-1 pp"></div>
            <div class="pp-2 pp">
                <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/theme-kr/p2-2.png" alt=""/>
            </div>
            <div class="pp-3 pp">
                点击支持
            </div>
        </div>
    </div>
    <!--For the photo page-->
    <div class="page page-3">
        <div class="camera-block ">
            <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/theme-kr/frame-0.png" alt=""/>
            <input type="file" accept="image/*" class="upload-photo"/>
        </div>
        <!--canvas-->

        <div class="photo-frame show">
            <div class="upload-img">
                <div class="previewimg">
                    <canvas id="c"></canvas>
                    <!--<img src="<?php echo Yii::app()->request->baseUrl; ?>/images/theme-kr/photo-sample.jpg" alt=""/>-->
                </div>
                <div class="frameimg">
                    <!--<img src="<?php echo Yii::app()->request->baseUrl; ?>/images/theme-kr/frame-1.png" alt=""/>-->
                </div>
                <div class="selected-words"></div>
            </div>
            <div class="slider-frame ">
                <ul class="slider">
                    <li class="">
                        <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/theme-kr/frame-1.png" alt=""/>
                    </li>
                    <li class="">
                        <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/theme-kr/frame-2.png" alt=""/>
                    </li>
                    <li class="">
                        <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/theme-kr/frame-3.png" alt=""/>
                    </li>
                    <li class="">
                        <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/theme-kr/frame-4.png" alt=""/>
                    </li>
                </ul>
            </div>
            <div class="slide-words">
                <!-- 文字请严格按照书写换行来，然后canvas处理可识别书写换行,16个空格-->
                <ul class="words-list">
                    <li>                I support the white ribbon for women
            campaign #BeHerVoice#
                    </li>
                    <li>                Together, let’s raise our voice against
            violence #BeHerVoice#
                    </li>
                    <li>                Breaking the silence not lives, I
            support #BeHerVoice#
                    </li>
                    <li>
                       赋权女性，支持#BeHerVoice#
                    </li>
                    <li>
                  反对暴力，为你发声#BeHerVoice#
                    </li>
                    <li>
                  打破沉默，支持#BeHerVoice#
                    </li>
                </ul>
            </div>
            <h4 class="title-frame">给勇敢美丽的你挑选一个相框</h4>
        </div>
        <div class="p3-buttons">
            <div class="btn-back">
                返回
            </div>
            <div class="btn-ok">
                确认
            </div>
        </div>

    </div>

    <!-- render photo-->
    <div class="page page-4">
        <div class="p4-photo"></div>
        <div class="p4-2">
            感谢您的支持！<br>
            立刻将它转发到您的朋友圈，即可参与#BeHerVoice#抽奖活动，<br>
            赢取丝黛拉•麦卡妮（Stella McCartney）时尚包袋。<br>
            获奖名单将于11月26日公布，请大家密切关注！<br>
        </div>
        <div class="p3-buttons">
            <div class="btn-back btn-list">
                查看支持者
            </div>
            <div class="btn-ok btn-share">
                分享到朋友圈
            </div>
        </div>
    </div>


</div>
<div class="p2-bottom-bg">
    <div class="bleft"></div>
    <div class="bright"></div>
</div>
<div class="share-block">
    <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/theme-kr/share.png" alt=""/>
</div>
