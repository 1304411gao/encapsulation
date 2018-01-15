

/* 获取URL中参数 */
function GetQueryUrl(name){
    
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null){
        return unescape(r[2]);
    }
    return null;
}

/* 懒加载方法 */
/*
*  2个参数  1：要进行懒加载的jq对象 2：事件触发时的回调
* */

function bindLazyLoad(_obj,_fun){
    var scrTop = $(window).scrollTop() + $(window).height();
    if(scrTop >= _obj.offset().top){
        //最后触发回调时将该对象传回去
        _fun(_obj);
    }
    $(window).on("scroll",function(){
        scrTop = $(window).scrollTop() + $(window).height();
        if(scrTop >= _obj.offset().top){
            //最后触发回调时将该对象传回去
            _fun(_obj);
        }
    });
}



/* 根据浏览器宽度给font-size赋值，rem */
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize' ,
        recalc = function () {
            window.clientWidth = docEl.clientWidth;
            if (! window.clientWidth) return ;
            docEl. style.fontSize = 20 * (window.clientWidth / 320) + 'px';
            window.base = 20 * ( window.clientWidth / 320);
        };
    // Abort if browser does not support addEventListener
    if (! doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener( 'DOMContentLoaded', recalc, false);
})(document, window);


/* 搞定辣鸡微信调整字体大小造成的错乱 */
(function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }
    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
        });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', {
                'fontSize': 0
            });
        });
    }
})();


/* 生成随机数 */
function getRandomArr(){
    var arr = [];
    while(arr.length <= 9){
        var num = getRandom(0,99);
        var bol = true;
        for (var i = 0; i < arr.length; i++) {
            if (num == arr[i]) {
                bol = false;
            }
        }
        if (bol == true) {
            arr.push(num);
        }
    }
    return arr;
};
/* 获取随机数 */
function getRandom(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min);
};

/* 解析html */
function noEscapeHtml(html) {
    return html.replace(/(\&|\&)gt;/g, ">")
        .replace(/(\&|\&)lt;/g, "<")
        .replace(/(\&|\&)quot;/g, "\"");
}

/* 字符串去标签 */
function tagRemove(_str) {
    var reg = /<[^<]+>/g;
    var str = _str.replace(reg, function (a) {
        var reg2 = /br/i;
        if (reg2.test(a)) {
            return "";
        } else {
            return "";
        }
    });
    return str;
}


/* 输入屏蔽关键字 */
function sensitive(_str) {
    //关键字数组
    var arr = ["共产党", "毛泽东", "习近平", "傻逼", "我操", "fuck", "suck", "狗逼", "操你妈", "二逼", "王八", "中华民国", "台独", "国民党", "蒋介石", "支那", "AV女优", "激情", "操逼", "法轮功", "屄", "屌", "鸡巴", "小穴", "口交", "足交", "射精", "你妈", "他妈的", "狗日"];
    
    var i = 0;
    while (_str.indexOf(arr[i]) < 0) {
        
        i++;
        if (i > arr.length) {
            return true;
        }
    }
    return false;
}


/* cookie操作 */
//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//从cookie中取值
function getCookie(name) {
    var arr = document.cookie.split("; ");//必须加一空格，因为在cookie中有空格
    
    for (var i = 0; i < arr.length; i++) {
        var nameArr = arr[i].split("=");
        if (nameArr[0] == name) {
            return nameArr[1];
        }
    }
}

//删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}



/* 判断某一字符串在另一字符串中出现的次数 */
function patch(re, s) {
    re = eval("/" + re + "/ig")
    return s.match(re).length;
}