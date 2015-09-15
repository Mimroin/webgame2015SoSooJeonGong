window.addEventListener("load", drawScreen, true);
function drawScreen(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");

	Context.fillStyle = "#4aa3df";
	Context.fillRect(0,0,1000,700);
}
