var bgImg = document.createElement("img");
bgImg.src = "images/map.png";

var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";

var towerbtnImg = document.createElement("img");
towerbtnImg.src = "images/tower-btn.png";

var towerImg = document.createElement("Img");
towerImg.src = "images/tower.png";

var canvas = document.getElementById("game-canvas");

var ctx = canvas.getContext("2d");

var FPS = 60;
var tower = {
  x:0,
  y:0,
};

var cursor = {
  x:0,
  y:0,
};

var slime = {
  x:96,
  y:448,
  speedX:0,
  speedY:-64,
  move: function(){
  this.y = this.y+(this.speedY/FPS);
  }
};

var isBuilding = false;

$("#game-canvas").on("click",function(){
  if(cursor.x >= 576 && cursor.y >= 416){
    console.log("click");
    if(isBuilding == false){
      isBuilding = true;
    }else{
      isBuilding = false;
    }
  }else if(isBuilding == true){
    tower.x = cursor.x;
    tower.y = cursor.y;
  }
})

$("#game-canvas").on("mousemove",function(event){
  cursor.x = event.offsetX - (event.offsetX % 32);
  cursor.y = event.offsetY - (event.offsetY % 32);
});

function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(enemyImg,slime.x,slime.y);
  ctx.drawImage(towerbtnImg,576,416,64,64);
  ctx.drawImage(towerImg,tower.x,tower.y);
  slime.move();
  if(isBuilding == true){
    ctx.drawImage(towerImg,cursor.x,cursor.y);
  }
}

setInterval(draw,1000/FPS);
