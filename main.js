var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";
var towerbtnImg = document.createElement("img");
towerbtnImg.src = "images/tower-btn.png";
var cursor = {
  x:0,
  y:0,
};
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var slime = {
  x:0,
  y:0,
};
$("#game-canvas").on("mousemove",function(event){
  console.log("x:" + event.offsetX+",y:"+event.offsetY);
});
function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(enemyImg,slime.x,slime.y);
  ctx.drawImage(towerbtnImg,590,430,50,50);
}
setInterval(draw,16);
