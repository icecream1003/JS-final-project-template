var bgImg = document.createElement("img");
bgImg.src = "images/map.png";

var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";

var towerbtnImg = document.createElement("img");
towerbtnImg.src = "images/tower-btn.png";

var towerImg = document.createElement("Img");
towerImg.src = "images/tower.png";

var crosshairImg = document.createElement("img");
crosshairImg.src = "images/crosshair.png";

var canvas = document.getElementById("game-canvas");

var ctx = canvas.getContext("2d");

var FPS = 60;
var tower = {
  x:0,
  y:0,
  range:96,
  damage:5,
  shoot:function(){
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(slimes[this.aimingSlimeId].x,slimes[this.aimingSlimeId].y);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 10;
    ctx.stroke();
    slimes[this.aimingSlimeId].hp -= 5;
  },
  fireRate:1,
  readyToShootTime:1,
  aimingSlimeId:null,
  searchSlime:function(){
    this.readyToShootTime -= 1/FPS;
    for(var i=0;i<slimes.length;i++){
      var distance = Math.sqrt(Math.pow(this.x-slimes[i].x,2)+Math.pow(this.y-slimes[i].y,2)
      );
      if(distance<=this.range){
        this.aimingSlimeId = i;
        if(this.readyToShootTime <= 0){
          this.shoot;
          this.readyToShootTime = this.fireRate;
        }
      return;
      }
    }
    this.aimingSlimeId = null;
  }
};

var cursor = {
  x:0,
  y:0,
};
var slimes = [];
var clock = 0;
var hp = 100;

function Slime() {
  this.x = 96;
  this.y = 448;
  this.speedX = 0;
  this.speedY = -64;
  this.pathDes = 0;
  this.hp = 100;
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
  clock++;
  
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(towerbtnImg,576,416,64,64);
  ctx.drawImage(towerImg,tower.x,tower.y);
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("HP:" + hp,10,50);
  
  for(var i=0;i<slimes.length;i++){
    if(slimes[i].hp <= 0){
      slimes.splice(i,1);
    }else{
      slimes[i].move();
      ctx.drawImage(enemyImg,slimes[i].x,slimes[i].y);
    }
  }
  
  tower.searchSlime();
  if(tower.aimingSlimeId!=null){
    var id = tower.aimingSlimeId;
    ctx.drawImage(crosshairImg,slimes[id].x,slimes[id].y);
  }
  
  if(clock % 80 == 0){
    var newSlime = new Slime();
    slimes.push(newSlime);
  }
  
  if(isBuilding == true){
    ctx.drawImage(towerImg,cursor.x,cursor.y);
  }
}

setInterval(draw,1000/FPS);
