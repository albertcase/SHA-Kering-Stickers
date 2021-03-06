jQuery(document).ready(function(){

    window.wxshare = function(title,shareimg,sharelink,desc){
        $.ajax({
            url:'/weixin/jssdk',
            type:'GET',
            data:{url:window.location.href},
            dataType:'json',
            success:function(result){
                var wxdata = result;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: wxdata.appid, // 必填，公众号的唯一标识
                    timestamp: wxdata.time, // 必填，生成签名的时间戳
                    nonceStr: wxdata.noncestr, // 必填，生成签名的随机串
                    signature: wxdata.sign,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.onMenuShareTimeline({
                    title: title, // 分享标题
                    link: sharelink, // 分享链接
                    imgUrl: shareimg, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: sharelink, // 分享链接
                    imgUrl: shareimg, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

            }
        })
    };

    //Init the share function
    var shareimg = window.location.origin+'/images/theme-kr/frame-0.png',
        sharetitle='制止暴力不公，推动女性发展。我很荣幸支持了白丝带女性权益活动！#BeHerVoice#',
        sharedesc='制止暴力不公，推动女性发展。我很荣幸支持了白丝带女性权益活动！#BeHerVoice#',
        sharelink=window.location.origin+'/site/index';
    wxshare(sharetitle,shareimg,sharelink,sharedesc);


});