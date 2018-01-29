$(function(){
	
	//图片预加载
	loadFn({
		loadImg: {
			bg: 'img/bg.jpg',
			xiang: 'img/xiang.png'
		},
		complete:init
	});
	
	//初始化canvas
	var $canvas = $("#myCanvas");
	var wW = $(window).width();
	var wH = $(window).height();
	var cl = $canvas.offset().left;
	var ct = $canvas.offset().top;
	var cw = 600;
	var ch = 600;
	console.log(cl,ct);
	$canvas.attr("width", cw);
	$canvas.attr("height", ch);
	var ctx = $canvas.get(0).getContext("2d");
	
	//全局控制
	var game = {
		start: false
	}
	//蛇头
	var snake = {
		w: 20,
		h: 20,
		speed: 5,
		color: "red",
		x: 10,
		y: 10,
		direction: "right",
		di: true,
		lang: 0,
		pos: []
	}
	
	snake.draw = function(){
		this.move();
		this.die();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y,this.w,this.h);
	}
	snake.position = function(){
		this.pos.push({
			x: this.x,
			y: this.y
		});
		if(this.pos.length > this.lang){
			this.pos.shift();
		}
	}
	snake.body = function(){
		ctx.fillStyle = "chocolate";
		for(var i = 0; i < this.pos.length; i++){
			ctx.fillRect(this.pos[i].x,this.pos[i].y,this.w,this.h);
		}
	}
	snake.move = function(){
		var dir = this.direction;
		if(dir == "up"){
			this.y -= this.speed;
		}else if(dir == "right"){
			this.x += this.speed;
		}else if(dir == "down"){
			this.y += this.speed;
		}else if(dir == "left"){
			this.x -= this.speed;
		}
	}
	snake.die = function(){
		if(this.x + this.w >= cl + cw || this.x <= cl || this.y + this.h >= ct + ch || this.y <= ct){
			console.log("撞墙了");
			this.di = false;
			clearInterval(timer);
		}
	}
	
	//食物
	function Food(){
		this.w = 20;
		this.h = 20;
		this.x = randomFn(cl, cl+cw - this.w);
		this.y = randomFn(ct, ct+ch - this.h);
		this.color = "black";
	}
	Food.prototype.draw = function(){
		
		ctx.fillStyle = this.color;
		ctx.drawImage(foodImg,0,0,foodImg.width,foodImg.height,this.x,this.y,this.w,this.h);
	}
	
	var food = new Food();
	var foodImg;
	var timer;
	//执行
	snake.draw();
	function run(){
		timer = setInterval(function(){
			// ctx.clearRect(0,0,600,600);
			snake.body();
			snake.draw();
			snake.position();
			
			food.draw();
			
			if(collide(snake, food)){
				food = new Food();
				snake.lang++;
			}
		},20);
	}
	
	function init(imgs){
		foodImg = imgs.xiang
	}
	
	
	//响应事件。
	$("#btn").one("click", function(){
		run();
	})
	
	$(document).on("keydown", function(e){
		var key = e.keyCode;
		if(key == 38 && snake.direction != "down"){	
			snake.direction = "up";
		}else if(key == 39 && snake.direction != "left"){
			snake.direction = "right";
		}else if(key == 40 && snake.direction != "up"){
			snake.direction = "down";
		}else if(key == 37 && snake.direction != "right"){
			snake.direction = "left";
		}
	});
})
