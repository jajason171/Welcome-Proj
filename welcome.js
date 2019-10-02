var canvas = document.getElementById("canvas"); //canvas is a element is used to draw graphics on a web.
var ctx = canvas.getContext("2d"); //I use to draw snow
var particlesOnScreen = 500; // set a number to the partical (snow)
var particlesArray = []; // set a empty array to partical
var w,h; // create canvas height,width
w = canvas.width = window.innerWidth; // add value to canvas width which the width of a window’s content area
h = canvas.height = window.innerHeight; // add value to canvas height which the height of a window’s content area

function random(min, max) {  // add random function to crate ramdom number 
    return min + Math.random() * (max - min + 1);   // math is for java to perform mathematical tasks on number
};

function clientResize(ev){ // add function to resize canvas width and height as client window
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
};
window.addEventListener("resize", clientResize); // add function to resize as user resize

function createSnowFlakes() {          // here we create snow inside the emtry array 
    for(var i = 0; i < particlesOnScreen; i++){   // i=0 define i value is 0 // i < particlesOnScreen  set condition that if i still less than the particlesOnScreen run the command // if run command plus 1 to i
        particlesArray.push({
            x: Math.random() * w,   // horizontal line and vertical line of the snowflake multiplied the width and the height of the screen so they will start to move
            y: Math.random() * h,  
            opacity: Math.random(),  // random opacity of snow
            speedX: random(-11, 11),  
            speedY: random(7, 15),    // random speed moving of snow
            radius:random(0.5, 4.2),  // random size of snow
        })
    }
};

function drawSnowFlakes(){      //draw + coloring snow
    for(var i = 0; i < particlesArray.length; i++){    // i=0 define i value is 0 // i < particlesArray.length  set condition that if i still less than the array length run the command // if run command plus 1 to i
        var gradient = ctx.createRadialGradient(  
            particlesArray[i].x,  // The x-axis or horizontal line coordinate of the start circle. 
            particlesArray[i].y,  // The y-axis or vertical line coordinate of the start circle.
            0,                    // The radius of the start circle.
            particlesArray[i].x,  // The x-axis or horizontal line coordinate of the end circle.
            particlesArray[i].y,  // The y-axis or vertical line coordinate of the end circle.
            particlesArray[i].radius // The radius of the end circle
            );

            //addColorStop() that takes 2 values first value is a value between the position between start and end in a gradient
            gradient.addColorStop(0, "rgba(255, 255, 255," + particlesArray[i].opacity + ")");  // white
            gradient.addColorStop(.8, "rgba(210, 236, 242," + particlesArray[i].opacity + ")");  // gray
            gradient.addColorStop(1, "rgba(237, 247, 249," + particlesArray[i].opacity + ")");   // lighter gray
          
            ctx.beginPath(); //create a new path
            ctx.arc(          //add a circular arc
                particlesArray[i].x, // The x-axis (horizontal) coordinate of the arc's center.
                particlesArray[i].y, // The y-axis (vertical) coordinate of the arc's center.
                particlesArray[i].radius, // The radius. Must be non-negative.
                0,                        // The angle at which the arc starts,
                Math.PI*2,                // The angle at which the arc ends
                false                     //  parametar whitch indicates wether the arc to be drawn counter-clockwise 
                );
        ctx.fillStyle = gradient;   // add  gradient and a A CSS color value to display at the stop position.
        ctx.fill();                 
    }
};

function moveSnowFlakes(){       // moving snow
    for (var i = 0; i < particlesArray.length; i++) {       // i=0 define i value is 0 // i < particlesArray.length  set condition that if i still less than the array length run the command // if run command plus 1 to i
        particlesArray[i].x += particlesArray[i].speedX;     
        particlesArray[i].y += particlesArray[i].speedY;     
  //when the snowflakes reaches a value grather than the height of the screen we reset it to start again from the top with a random X axis value and -50 Y axis value
        if (particlesArray[i].y > h) {                                                                               
            particlesArray[i].x = Math.random() * w * 1.5;
            particlesArray[i].y = -50;
        }
    }
};

function updateSnowFall  () {  // called on an interval of 50
    ctx.clearRect(0, 0, w, h); //that clears the canvas so that we don’t get the snowflakes painted one behind the other
    drawSnowFlakes();
    moveSnowFlakes();
};
// also calling in the drawSnowFlakes(); moveSnowFlakes(); and createSnowFlakes(); methods.
setInterval(updateSnowFall,50);
createSnowFlakes();