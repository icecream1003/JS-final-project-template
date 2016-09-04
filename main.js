var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var enemy = document.createElement("img");
enemy.src = "images/slime.gif";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
function draw(){
  ctx.drawImage(bgImg,0,0);
}
setTimeout(draw,1000);
