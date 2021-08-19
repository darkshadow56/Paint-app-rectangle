var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var randomColor = Math.floor(Math.random()*300);  
var bgColor;
	var canvasImage;	
	var circleCount;
	var circles;
	var color;
	var context;
	var draggingDraw;
	var draggingMove;
	var dragX;
	var dragY;
	var dragIndexDelete;
	var dragIndexMove;
	var dragStartLocation;
	var mouseX;
	var mouseY;
	var radius;
	var targetX;
	var targetY;
	var tempX;
	var tempY;
	var dx;
	var dy;
	var flagRandom= false;


window.addEventListener('load', ()=>{
    canvas.height = window.innerHeight - 70;
    canvas.width = window.innerWidth - 70;

    context.lineWidth = 4;
    context.lineCap = 'round';
    rectangleCount=0;	
		draggingDraw = false;
		bgColor = "#000000";
		rectangleArray = [];

        canvas.addEventListener('mousedown', dragStart, false);
		canvas.addEventListener('mousemove', drag, false);
		canvas.addEventListener('mouseup', dragStop, false);

        canvas.addEventListener('dblclick', deleteCircle,false);

});

window.addEventListener('resize', ()=>{
    canvas.height = window.innerHeight - 70;
    canvas.width = window.innerWidth - 70;
})

    const dragStart = (event) => {
        draggingDraw = true;
        dragStartLocation = getCanvasCoordinates(event);
	    color = "rgb(" + randomColor + "," + randomColor + "," + randomColor +")";
        getImage();
    }

    const drag = (event) => {
        var position;
        if (draggingDraw === true) {
            putImage();
            position = getCanvasCoordinates(event);
            drawRectangle(position);
            context.fillStyle = color;
            context.fill();
        }
    }

    const dragStop = (event) => {
        draggingDraw = false;
        putImage();
        var position = getCanvasCoordinates(event);
        drawCircle(position);		
        context.fillStyle = color;
        context.fill();	
        rectangleCount=rectangleCount+1;
        tempRectangle = {x:tempX, y:tempY, rad:radius, color:color};
        rectangleArray.push(tempRectangle);
        
    }

    const getCanvasCoordinates = (event) => {

        var x = event.clientX - canvas.getBoundingClientRect().left,
            y = event.clientY - canvas.getBoundingClientRect().top;
    
        return {x: x, y: y};
    }

    
    const getImage = () => {
        canvasImage = context.getImageData(0, 0, canvas.width, canvas.height);
    }

    const putImage = () => {
        context.putImageData(canvasImage, 0, 0);
    }

    const drawRectangle = (position) => {
	
		tempX=dragStartLocation.x;
		tempY=dragStartLocation.y;
	    context.beginPath();
		context.rect(tempX, tempY);
		context.closePath();
}

const drawScreen = () => {
    rectangleCount=0;
    rectangleArray = [];
    context.fillStyle = bgColor;
    context.fillRect(0,0,canvas.width,canvas.height);
}	

const togglebtn = () =>{

    if(document.getElementById("#move-btn").name == "drawRectangle")
        { 	
            document.getElementById("btnMve").name = "moveRectangle";
            canvas.removeEventListener("mousedown", mouseDown, false);    
            canvas.addEventListener('mousedown', dragStart, false);
            canvas.addEventListener('mousemove', drag, false);
            canvas.addEventListener('mouseup', dragStop, false);				
        }
  else if(document.getElementById("#move-btn").name == "moveRectangle")
  {         
            document.getElementById("btnMve").name = "drawRectangle";
            canvas.removeEventListener("mousedown", dragStart, false);
            canvas.removeEventListener("mousemove", drag, false);
            canvas.removeEventListener("mouseup", dragStop, false);            
            canvas.addEventListener('mousedown', mouseDown, false);
   }
}

const drawRectangle = () => {
    var i;
    var x;
    var y;
    var rad;
    var color;
    
    context.fillStyle = bgColor;
    context.fillRect(0,0,canvas.width,canvas.height);		
    
    for (i=0; i < rectangleCount; i++) {
        rad = rectangleArray[i].rad;
        x = rectangleArray[i].x;
        y = rectangleArray[i].y;
        color=rectangleArray[i].color;
        context.beginPath();
        context.rect(x, y, false);
        context.closePath();
        context.fillStyle = color;
        context.fill();
    }		
}

const isRectangleClicked = (shape,mx,my) => {		
    var dx;
    var dy;
    dx = mx - shape.x;
    dy = my - shape.y;
    return (dx*dx + dy*dy < shape.rad*shape.rad);
}

const deleteRectangle = (event) =>{
		var i;
		var bRect = canvas.getBoundingClientRect();
//		var highestIndex=-1;
		dragIndexDelete=-1;
		
		mouseX = (event.clientX - bRect.left)*(canvas.width/bRect.width);
		mouseY = (event.clientY - bRect.top)*(canvas.height/bRect.height);
		//To find that which circle has been clicked
		for (i=0; i < rectangleArray; i++) {
			if	(isRectangleClicked(rectangleArray[i], mouseX, mouseY)) {
				dragIndexDelete = i;		
			}
		}
		//Remove the circle from the array
		if ( dragIndexDelete> -1 ){
			rectangleArray.splice(dragIndexDelete,1)[0];
			rectangleCount=rectangleCount-1;
		}
		
		if (event.preventDefault) {
			event.preventDefault();
		} 
		else if (event.returnValue) {
			event.returnValue = false;
		} 
		drawRectangle();				
		return false;
}

const mouseDown = (event) =>{
		var i;
		var highestIndex = -1;		
		var bRect = canvas.getBoundingClientRect();
	
		mouseX = (event.clientX - bRect.left)*(canvas.width/bRect.width);
		mouseY = (event.clientY - bRect.top)*(canvas.height/bRect.height);
		
		//To find that which circle has been clicked
		for (i=0; i < rectangleArray; i++) {
			if	(isCircleClicked(rectangleArray[i], mouseX, mouseY)) {
				draggingMove = true;
				if (i > highestIndex) {
					dragX = mouseX - rectangleArray[i].x;
					dragY = mouseY - rectangleArray[i].y;
					highestIndex = i;
					dragIndexMove = i;
				}				
			}
		}
		if (draggingMove) {
			window.addEventListener("mousemove", mouseMove, false);
			//Remove the circle and then push it to the top of the array
			rectangleArray.push(circles.splice(dragIndexMove,1)[0]);
			
		}
		canvas.removeEventListener("mousedown", mouseDown, false);
		window.addEventListener("mouseup", mouseUp, false);
		
		if (event.preventDefault) {
				event.preventDefault();
			} 
		else if (event.returnValue) {
				event.returnValue = false;
			} 
		return false;
}

const mouseUp = (event) => {

    canvas.addEventListener("mousedown", mouseDown, false);
    window.removeEventListener("mouseup", mouseUp, false);
    if (draggingMove) {
        draggingMove = false;
        window.removeEventListener("mousemove", mouseMove, false);
    }
}

const mouseMove = (event) => {
		
    var posX;
    var posY;
    var shapeRad = rectangleArray[rectangleCount-1].rad;
    var minX = shapeRad;
    var maxX = canvas.width - shapeRad;
    var minY = shapeRad;
    var maxY = canvas.height - shapeRad;
    
    var bRect = canvas.getBoundingClientRect();
    mouseX = (event.clientX - bRect.left)*(canvas.width/bRect.width);
    mouseY = (event.clientY - bRect.top)*(canvas.height/bRect.height);
    
    posX = mouseX - dragX;
    posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
    posY = mouseY - dragY;
    posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
    
    rectangleArray[rectangleCount-1].x = posX;
    rectangleArray[rectangleCount-1].y = posY;
    
    drawRectangle();
}






    


