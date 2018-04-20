$(function(){

    (function(){
        var src = $("#loading > img").attr("src");
        var img = new Image();
        img.onload = function(){
            console.log("OKOKOK");
            loadFn({
                loadImg: {
                    i1: "img/bg.jpg",
                    i2: "img/end-1.png",
                    i3: "img/end-2.png",
                    i4: "img/end-3.png",
                    i5: "img/end-4.png",
                    i6: "img/end-5.png",
                    i7: "img/end-6.png",
                    i8: "img/page1-1.png",
                    i9: "img/page1-2.png",
                    i10: "img/page1-3.png",
                    i11: "img/page1-4.png",
                    i12: "img/page1-title1.png",
                    i13: "img/page1-title2.png",
                    i14: "img/page1-title3.png",
                    i15: "img/page2-1.png",
                    i16: "img/page2-2.png",
                    i17: "img/page2-3.png",
                    i18: "img/page2-4.png",
                    i19: "img/page2-tab1.png",
                    i20: "img/page2-tab1a.png",
                    i21: "img/page2-tab2.png",
                    i22: "img/page2-tab2a.png",
                    i23: "img/page2-tab3.png",
                    i24: "img/page2-tab3a.png",
                    i25: "img/page3-1.png",
                    i26: "img/page3-2.png",
                    i27: "img/prevP.png",
                    i28: "img/qr.png"
                },
                complete:init
            });
        }
        img.src = src;
    })();

    document.addEventListener("WeixinJSBridgeReady", function () {

        $('.bgm')[0].play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {
        $('.bgm')[0].play();
    }, false);
    $('.bgm')[0].play();
    $(document).on("click", function(){
        alert($('.bgm').attr('src'))
        $('.bgm')[0].play();
    })
    $('.music').on('touchstart',function(){
        if($(this).hasClass('okPlay')){
            $('.bgm')[0].pause();
            $(this).removeClass('okPlay').attr("src","http://sd-gold.oss-cn-beijing.aliyuncs.com/web/mmm1.png").removeClass("musicAnima");
        }else{
            $('.bgm')[0].play();
            $(this).addClass('okPlay').attr("src","http://sd-gold.oss-cn-beijing.aliyuncs.com/web/mmm.png").addClass("musicAnima");
        }
    });



    /* 添加动画名 */
    var $item = $(".item");
    $item.find(".page3-1").addClass("animated").data("a","fadeInLeft");
    $item.find(".title").addClass("animated").data("a","puffIn1");
    $(".item .txt p").addClass("animated").data("a","fadeIn");
    $(".back-menu").addClass("animated").data("a","fadeInLeft");
    $(".page-mark").addClass("animated").data("a","fadeInRight");

    function init(imgs){

        setTimeout(function(){

            $('#loading').hide();
            $(".prevP").show();
            $(".music").show();
            for(var i = 0; i < $(".animated").length; i++){
                $(".animated").eq(i).addClass($(".animated").eq(i).data("a")).css("opacity","1");
            }

        },1000);
        /* TODO 修改上方时间 ↑↑*/



    }
    //清楚默认事件
    $(document).on("touchstart",function(e){
        e.stopPropagation();
    });


    var num = $(".swiper-slide").size();

    /* siwper实例化 */
    var mySwiper = new Swiper('.swiper-container', {
        initialSlide: 0,
        direction : 'vertical',
        onSlideChangeEnd: function(swiper) {//划完
            var index = swiper.activeIndex;
            var ad = $(".swiper-slide").eq(index).find(".animated");
            for (var i = 0; i < ad.length; i++) {
                ad.eq(i).addClass(ad.eq(i).data("a")).css("opacity", "1");
            }

            if(index = num){
                $(".prevP").hide();
            }
        },
        onSlideChangeStart: function(swiper){//刚开始划
            for(var i = 0; i < $(".animated").length; i++){
                $(".animated").eq(i).removeClass($(".animated").eq(i).data("a")).css("opacity","0");
            }
        }
    });


    /* 目录切换 */
    $("#page2 .tab").on("click", function(){

        var index = $(this).data("index");
        $(this).siblings(".tab").removeClass("active");
        $(this).addClass("active");
        $("#page2 .box").eq(index - 1).show().siblings(".box").hide();
    });


    /* 目录点击 */
    (function(){

        var node = $("#page2 .box li");

        for(var i = 0; i < node.length; i++){
            node.eq(i).attr("name", i);
            node.eq(i).on("click", function(){
                var index = parseInt($(this).attr("name"));
                mySwiper.slideTo(index + 2);
            });


        }
    })();

    /* 返回目录 */
    $(".back-menu").on("click", function(){
        mySwiper.slideTo(1);
    });

});
