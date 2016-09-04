var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var slime = {
  x:60,
  y:60,
};
function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(enemyImg,slime.x,slime.y);
}
setTimeout(draw,1000);
