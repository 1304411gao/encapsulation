function loadFn(obj){
			
	var loadedImg = {};
	var len = 0;
	for (var i in obj.loadImg){
		len++;
	}
	var prog = 0;
	for (var i in obj.loadImg){
		var imgObj = new Image();
		imgObj.src = obj.loadImg[i];
		imgObj.key = i;
		imgObj.onload = function (){
			loadedImg[this.key] = this;
			prog++;
			if (obj.prog){
				obj.prog(parseInt(prog/len*100));
			}
			if (prog>=len){
				if (obj.complete){
					obj.complete(loadedImg);
				}
			}
		}
		
	}
}

//碰撞检测。
	function collide(obj1,obj2){	
		var l1 = obj1.x;
		var r1 = l1+obj1.w;
		var t1 = obj1.y;
		var b1 = t1+obj1.h;
		
		var l2 = obj2.x;
		var r2 = l2+obj2.w;
		var t2 = obj2.y;
		var b2 = t2+obj2.h;
		
		if (r1>l2&&l1<r2&&b1>t2&&t1<b2){
			return true;
		}else{
			return false;
		}
	}
	function randomFn(a,b){
		return parseInt(Math.random()*(b-a+1)+a);
	}