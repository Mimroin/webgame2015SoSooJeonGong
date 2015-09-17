window.addEventListener("load", drawScreen, true);
function drawScreen(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");

//	Context.fillStyle = "#4aa3df";
//	Context.fillRect(0,0,1000,700);

	Context.fillStyle = "#000000";
	Context.fillRect(5,5,150,100);

	var gradient=Context.createLinearGradient(0,0,170,0);
	gradient.addColorStop("0","#ffdead");
	gradient.addColorStop("0.5","#ffdead");
	gradient.addColorStop("1","#ffdead");
	
	Context.strokeStyle=gradient;
	Context.lineWidth=5;
	Context.strokeRect(5,5,150,100);

	Context.beginPath();
	Context.moveTo(48,75);
	Context.lineTo(40,95);
	Context.strokeStyle="#ff0";
	Context.stroke();

	Context.beginPath();
	Context.moveTo(112,75);
	Context.lineTo(120,95);
	Context.strokeStyle="#ff0";
	Context.stroke();

	Context.beginPath();
	Context.moveTo(80,85);
	Context.lineTo(80,100);
	Context.strokeStyle="#ff0";
	Context.stroke();


	Context.beginPath();
	Context.arc(80,40,40,1*Math.PI,2*Math.PI,true);
	Context.fillStyle="#ff0";
	Context.fill();
	
	Context.beginPath();
	Context.arc(80,50,60,1*Math.PI,2*Math.PI,false);
	Context.fillStyle="#8b4513";
	Context.fill();
}
