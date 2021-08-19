var bgColor;
    var canvas;
    var canvasImage;    
    var RectCount;
    var Rectangle;
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

window.addEventListener('load', init, false);

//resizing of canvas, based on the window size  (called on: load, resize of window)
window.onload = window.onresize = function() 
    {
        var canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth * 0.6;
        canvas.height = window.innerHeight * 0.8;
        drawRects();
    }   

//initialize global variables   (called on: load of window) 
function init() 
    {
        canvas = document.getElementById("canvas");
        context = canvas.getContext('2d');
        context.lineWidth = 4;
        
    
        RectCount=0;    
        draggingDraw = false;
        bgColor = "#000000";
        Rectangle = [];
        
        //event listeners to draw Rectangle
        canvas.addEventListener('mousedown', dragStart, false);
        canvas.addEventListener('mousemove', drag, false);
        canvas.addEventListener('mouseup', dragStop, false);
        
        //event listener to delete Rectangle
        canvas.addEventListener('dblclick', deleteRect,false);
    }   


//      Drawing of Rectangle with random colors 
    
function dragStart(event) {
    draggingDraw = true;
    dragStartLocation = getCanvasCoordinates(event);
    color = "rgb(" + Math.floor(Math.random()*200) + "," + Math.floor(Math.random()*200) + "," + Math.floor(Math.random()*200) +")";
    getImage();
}

function drag(event) {
    var position;
    if (draggingDraw === true) {
        putImage();
        position = getCanvasCoordinates(event);
        drawRect(position);
        context.fillStyle = color;
        context.fill();
    }
}
function dragStop(event) {
    draggingDraw = false;
    putImage();
    var position = getCanvasCoordinates(event);
    drawRect(position);     
    context.fillStyle = color;
    context.fill(); 
    RectCount=RectCount+1;
    tempCircle = {x:tempX, y:tempY, rad:radius, color:color};
    
    Rectangle.push(tempCircle);
    
}
    
function getCanvasCoordinates(event) {

    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function getImage() {
    canvasImage = context.getImageData(0, 0, canvas.width, canvas.height);
}

function putImage() {
    context.putImageData(canvasImage, 0, 0);
}

function drawRect(position) {
    
        tempX=dragStartLocation.x;
        tempY=dragStartLocation.y;
        
        radius = Math.sqrt(Math.pow((tempX - position.x), 2) + Math.pow((tempY - position.y), 2));
        context.beginPath();
        context.arc(tempX, tempY, radius, 0, 2 * Math.PI, false);
        context.closePath();
}

//      On click of Erase Button

function drawScreen() {
        RectCount=0;
        Rectangle = [];
        context.fillStyle = bgColor;
        context.fillRect(0,0,canvas.width,canvas.height);
    }   

//      On click of Draw / Move Button
    
function togglebtn(){

        if(document.getElementById("btnMve").name == "drawRectangle")
            {   
        
                canvas.removeEventListener("mousedown", mouseDown, false);
            
                document.getElementById("btnMve").name = "Move Shape";      
                document.getElementById("spid").innerHTML="Click here to move the Rectangle";
        
                canvas.addEventListener('mousedown', dragStart, false);
                canvas.addEventListener('mousemove', drag, false);
                canvas.addEventListener('mouseup', dragStop, false);                
            }
      else if(document.getElementById("btnMve").name == "Move Shape")
      {         
        
                canvas.removeEventListener("mousedown", dragStart, false);
                canvas.removeEventListener("mousemove", drag, false);
                canvas.removeEventListener("mouseup", dragStop, false);
                
            
                document.getElementById("btnMve").name = "Draw Shape";
                document.getElementById("spid").innerHTML="Click here to draw the Rectangle";
                
                canvas.addEventListener('mousedown', mouseDown, false);
       }
 }
    
//      To Move/ Delete the Rectangle 

    // function drawRects() {
    //  var i;
    //  var x;
    //  var y;
    //  var rad;
    //  var color;
        
    //  context.fillStyle = bgColor;
    //  context.fillRect(0,0,canvas.width,canvas.height);       
        
    //  for (i=0; i < RectCount; i++) {
    //      rad = circles[i].rad;
    //      x = circles[i].x;
    //      y = circles[i].y;
    //      color=circles[i].color;
    //      context.beginPath();
    //      context.arc(x, y, rad, 0, 2*Math.PI, false);
    //      context.closePath();
    //      context.fillStyle = color;
    //      context.fill();
    //  }       
    // }    
    //To check whether the Rectangle was clicked
    function isRectClicked(shape,mx,my) {       
        var dx;
        var dy;
        dx = mx - shape.x;
        dy = my - shape.y;
        return (dx*dx + dy*dy < shape.rad*shape.rad);
    }

//      To Delete the Rectangle (on double-click)

function deleteRect(event) 
{
        var i;
        var bRect = canvas.getBoundingClientRect();
//      var highestIndex=-1;
        dragIndexDelete=-1;
        
        mouseX = (event.clientX - bRect.left)*(canvas.width/bRect.width);
        mouseY = (event.clientY - bRect.top)*(canvas.height/bRect.height);
                    
        return false;
}

//      To Move the Rectangle Manually
    
function mouseDown(event) 
{
        var i;
        var highestIndex = -1;      
        var bRect = canvas.getBoundingClientRect();
    
        mouseX = (event.clientX - bRect.left)*(canvas.width/bRect.width);
        mouseY = (event.clientY - bRect.top)*(canvas.height/bRect.height);
        
        // //To find that which circle has been clicked
        // for (i=0; i < RectCount; i++) {
        //  if  (isRectClicked(Rectangle[i], mouseX, mouseY)) {
        //      draggingMove = true;
        //      if (i > highestIndex) {
        //          dragX = mouseX - Rectangle[i].x;
        //          dragY = mouseY - Rectangle[i].y;
        //          highestIndex = i;
        //          dragIndexMove = i;
        //      }               
        //  }
        // }
        // if (draggingMove) {
        //  window.addEventListener("mousemove", mouseMove, false);
        //  //Remove the circle and then push it to the top of the array
        //  Rectangle.push(Rectangle.splice(dragIndexMove,1)[0]);
            
        // }
        // canvas.removeEventListener("mousedown", mouseDown, false);
        // window.addEventListener("mouseup", mouseUp, false);
        
        // if (event.preventDefault) {
        //      event.preventDefault();
        //  } 
        // else if (event.returnValue) {
        //      event.returnValue = false;
        //  } 
        return false;
}
    
    function mouseUp(event) {

        canvas.addEventListener("mousedown", mouseDown, false);
        window.removeEventListener("mouseup", mouseUp, false);
        if (draggingMove) {
            draggingMove = false;
            window.removeEventListener("mousemove", mouseMove, false);
        }
    }

    function mouseMove(event) {
        
        var posX;
        var posY;
        var shapeRad =Rectangle[RectCount-1].rad;
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
        
        Rectangle[RectCount-1].x = posX;
        Rectangle[RectCount-1].y = posY;
        
        drawRects();
    }