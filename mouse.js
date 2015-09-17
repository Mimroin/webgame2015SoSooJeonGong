window.addEventListener("mousemove",onMouseMove,false);
window.addEventListener("mousedown",onMouseDown,false);
window.addEventListener("mouseup",onMouseUp,false);

var bMouseClicked = false;
intMouseX = 440;
intMouseY = 260;
var strMouseStatus = "준비중";

var imgBackground = new Image();
imgBackground.src = "background.jpg";

var imgChar = new Image();
imgChar.src = "char.png";

imgChar.addEventListener("load", drawScreen, false);

function onMouseMove(e){
	strMouseStatus = "Moving now";
	if(bMouseClicked){
		var theCanvas = document.getElementById("GameCanvas");
		bMouseClicked = true;
		intMouseX = e.clientX - theCanvas.offsetLeft-42;
		intMouseY = e.clientY - theCanvas.offsetTop-50;
		drawScreen();
	}
}
function onMouseDown(e){
	strMouseStatus = "클릭!";
	var theCanvas = document.getElementById("GameCanvas");
	bMouseClicked = true;
	intMouseX = e.clientX - theCanvas.offsetLeft-42;
	intMouseY = e.clientY - theCanvas.offsetTop-50;
	drawScreen();
}
function onMouseUp(e){
	strMouseStatus = "클릭 끝!";
	bMouseClicked = false;
	intMouseX = 440;
	intMouseY = 260;
	drawScreen();
}

function drawScreen(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	Context.drawImage(imgBackground,0,0,960,600);
	Context.drawImage(imgChar,intMouseX,intMouseY,85,85);

	Context.fillStyle = "#FFF";
	Context.font = '24px namumgothic';
	Context.textBaseline = "top";
	Context.fillText("발생한 마우스 이벤트는 : " + strMouseStatus,5,5);
	Context.fillText("마우스 좌표는  x : " + intMouseX + "  y : " + intMouseY,5,32);

}
