var imgBackground = new Image();
imgBackground.src = "background.jpg";

var imgChar = new Image();
imgChar.src = "char.png";

imgChar.addEventListener("load", drawScreen, false);

function drawScreen(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");

	Context.drawImage(imgBackground,0,0,960,600);
	Context.drawImage(imgChar,440,260,85,85);
}
