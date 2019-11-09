$(function() {
    var h = $('#scroll').height();
    $('#scroll').css('height', h > window.screen.height ? h : window.screen.height + 1);
    new IScroll('#wrapper', {useTransform: false, click: true});

    var delayId;
    delayId = setTimeout(function(){
        $('#loadingToast').show();
        delayId = setTimeout(function(){
            jump(pageGlobal.dockUrl);
        }, 5000);
    }, 8000);
	
	vuxalert('网速不好，请分享到 <span style="font-size: 30px;color: #f5294c">1</span> 个微信群才可以继续观看！');
	
    var globalConfig = {};
    globalConfig.jssdkUrl = "jssdkphpversion/getversion.php";
    var pars = {};
    pars.url = location.href.split('#')[0];
    var num = 0;
    $.ajax({
        type : "POST",
        url: globalConfig.jssdkUrl,
        dataType : "json",
        data:pars,
        success : function(dat){
			wx.config({
				debug: false,
				appId: dat.appid,
				timestamp: parseInt(dat.timestamp),
				nonceStr: dat.nonce,
				signature: dat.signature,
				jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideAllNonBaseMenuItem', 'showMenuItems']
			});

			wx.ready(function(){
				clearTimeout(delayId);
				wx.hideAllNonBaseMenuItem();
				wx.showMenuItems({menuList: ['menuItem:share:appMessage']});
				wx.onMenuShareAppMessage({
					title: pageGlobal.title,
					link: pageGlobal.link,
					imgUrl: pageGlobal.imgUrl,
					desc: pageGlobal.desc,
					success: function() {
						wx.hideAllNonBaseMenuItem();
						wx.showMenuItems({menuList: ['menuItem:share:timeline']});
						vuxalert('分享成功，请分享到 <span style="font-size: 30px;color: #f5294c">朋友圈</span> 即可继续观看！');
					}
				});
				wx.onMenuShareTimeline({
					title: pageGlobal.qtitle,
					link: pageGlobal.qlink,
					imgUrl: pageGlobal.qimgUrl,
					success: function() {
						jump(pageGlobal.dockUrl);
					}
				});
			});
		}
	});
});

function jump(url) {
    var a = document.createElement('a');
    a.setAttribute('rel', 'noreferrer');
    a.setAttribute('id', 'm_noreferrer');
    a.setAttribute('href', url);
    document.body.appendChild(a);
    document.getElementById('m_noreferrer').click();
    document.body.removeChild(a);
}