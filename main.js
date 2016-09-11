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

var tower = {
  x:0,
  y:0,
};

var cursor = {
  x:0,
  y:0,
};

var slime = {
  x:0,
  y:0,
};
var isBuilding = false;
$("#game-canvas").on("click",function(){
  if(cursor.x >= 590 && cursor.y >= 430){
    console.log("click");
    if(isBuilding == false){
      isBuilding = true;
    }else{
      isBuilding = false;
    }
  }
})
$("#game-canvas").on("mousemove",function(event){
  cursor.x = event.offsetX;
  cursor.y = event.offsetY;
  tower.x = event.offsetX;
  tower.y = event.offsetY;
});

function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(enemyImg,slime.x,slime.y);
  ctx.drawImage(towerbtnImg,590,430,50,50);
  ctx.drawImage(towerImg,tower.x,tower.y)
  if(isBuilding == true){
    ctx.drawImage(towerImg,cursor.x,cursor.y);
  }
}

setInterval(draw,16);
