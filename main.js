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
var slime = new Slime();

function Slime() {
  this.x = 96;
  this.y = 448;
  this.speedX = 0;
  this.speedY = -64;
  this.pathDes = 0;
  this.move = function(){
    
    if (isCollided(enemyPath[this.pathDes].x,enemyPath[this.pathDes].y,this.x,this.y,64/FPS,64/FPS)){
      this.x = enemyPath[this.pathDes].x;
      this.y = enemyPath[this.pathDes].y;
      
      if(this.x == enemyPath[this.pathDes+1].x){
        if(this.y > enemyPath[this.pathDes+1].y){
          this.speedY = -64;
          this.speedX = 0;
        }else{
          this.speedY = 64;
          this.speedX = 0;
        }
      }else if(this.y == enemyPath[this.pathDes+1].y){
        if(this.x > enemyPath[this.pathDes+1].x){
          this.speedY = 0;
          this.speedX = -64;
        }else{
          this.speedY = 0;
          this.speedX = 64;
        }
      }
      this.pathDes += 1;
    }else{
      this.x += this.speedX/FPS;
      this.y += this.speedY/FPS;
    }      
  }
};

function isCollided(pointX,pointY,targetX,targetY,targetWidth,targetHeight){
  if(pointX >= targetX
    &&pointX <= targetX + targetWidth
    &&pointY >= targetY
    &&pointY <= targetY + targetHeight
  ){
    return true;
  }else{
    return false;
  }
}

var enemyPath=[
  {x:96,y:64},
  {x:384,y:64},
  {x:384,y:192},
  {x:224,y:192},
  {x:224,y:320},
  {x:544,y:320},
  {x:544,y:96},
];
var isBuilding = false;

$("#game-canvas").on("click",function(){
  if(cursor.x >= 576 && cursor.y >= 416){
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
