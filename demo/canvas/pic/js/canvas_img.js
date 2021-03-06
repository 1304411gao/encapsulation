window.onload = function(){
    loadFn({
        loadImg: {
            i1: "img/img1.jpg",
            i2: "img/img2.jpg",
            i3: "img/img3.jpg"
        },
        complete:init
    });
    
    function init(_imgs) {
        let imgs = [];
        // todo 这里排序不对 先写死
        // for(let n in _imgs){
        //     imgs.push(_imgs[n]);
        //     console.log("?" + n);
        // }
        imgs = [_imgs.i1, _imgs.i2, _imgs.i3];
        loadFn({
            loadImg: {
                i1: "img/11.jpg",
                i2: "img/12.jpg",
                i3: "img/13.jpg"
            },
            complete:main
        });
        
        function main (_mImgs){
            let mImgs = [];
            // todo 这里排序不对 先写死
            // for(let m in _mImgs){
            //     mImgs.push(_mImgs[m]);
            //     console.log(m)
            // }
            mImgs = [_mImgs.i1, _mImgs.i2, _mImgs.i3];
            const canvas = document.getElementById("myCanvas");
            canvas.width = 1920 / 3;
            canvas.height = 1080 / 3;
            const ctx = canvas.getContext("2d");
            
            //定义常用变量
            let cw = canvas.width, //canvas宽度
                ch = canvas.height, //canvas高度
                s = 10, //将高度分割的份数
                ss = .05;
            sf = [ss, ss*3, ss, ss*4, ss*2, ss, ss*2, ss, ss*2, ss, ss*2];
            console.log(sf);
            img1 = _imgs.i1, //要绘制的图片对象
                imgNum = 3, //图片合成数
                interval = 200, //移动区间
                timeNode = 50, //时间区间
                row = 300,
                col = 100,
                globalIndex = 0; //当前index
            for(let i = 0; i < sf.length; i++){
                let last = 0;
                let num = 0;
                for (let j = 0; j < i; j++){
                    num += sf[j];
                }
                if(i-1 < 0) last = 0;
                ctx.drawImage(img1, 0, img1.height* num, img1.width, img1.height* sf[i], 0, ch* num, cw, ch* sf[i]);
            }
            
            function test(_index, _nextIndex){
                
                let time = 0; //时间节点
                let arg = arguments;
                //动画效果定时器
                let continuousNum = 0;
                function continuous() {
                    continuousNum++;
                    if(continuousNum % 2 == 0) {
                        time ++;
                        ctx.clearRect(0,0,cw,ch);
                        for(let i = 0; i < sf.length; i++){
                            let last = 0;
                            let num = 0;
                            for (let j = 0; j < i; j++){
                                num += sf[j];
                            }
                            if(i-1 < 0) last = 0;
                            
                            let nowImg = imgs[_index];
                            let r = randomFn(interval, -interval);
                            if(time < timeNode * .15){
                                nowImg = imgs[_index];
                            }else if(time > timeNode * .15 && time < timeNode * .3){
                                nowImg = mImgs[_index];
                            }else if(time > timeNode * .3 && time < timeNode * .6){
                                nowImg = mImgs[arg[randomFn(1, 0)]];
                            }else if(time > timeNode * .6 && time < timeNode * .85){
                                nowImg = mImgs[_nextIndex];
                            }else if(time > timeNode * .85){
                                nowImg = imgs[_nextIndex];
                            }
                            if(time >= timeNode){
                                ctx.drawImage(nowImg, 0, nowImg.height* num, nowImg.width, nowImg.height* sf[i], 0, ch* num, cw, ch* sf[i]);
                                if(i >= sf.length -1) return false;
                                
                            }else{
                                ctx.drawImage(nowImg, 0 + r, nowImg.height* num, nowImg.width, nowImg.height* sf[i], 0, ch* num, cw, ch* sf[i]);
                                for(let k = 0; k < 500; k++){
                                    ctx.fillStyle="rgba(255, 255, 255, .2)";
                                    ctx.fillRect(randomFn(cw, 0),randomFn(ch, 0),1,1);
                                }
                            }
                        }
                    }
                    if(continuousNum > 1000) {
                        continuousNum = 0;
                    }
                    requestAnimationFrame(continuous);
                }
                continuous();
            }
            
            
            //执行动画定时器
            let startAnimationNum = 0;
            function startAnimation() {
                startAnimationNum++;
                if(startAnimationNum % 700 == 0) {
                    run();
                }
                if(startAnimationNum > 2103) {
                    startAnimationNum = 0;
                }
                requestAnimationFrame(startAnimation);
            }
            startAnimation();
            //跑！
            function run(){
                let nextIndex;
                globalIndex >= imgs.length - 1? nextIndex = 0 : nextIndex = globalIndex+1;
                test(globalIndex, nextIndex);
                globalIndex >= imgs.length - 1? globalIndex = 0 : globalIndex ++;
            }
        }
    }
};

//随机数函数
function randomFn(max,min){
    return parseInt(Math.random()*(max - min + 1)+min);
}