
var snake; // store position of the snake on the screen
var snakeLength; // store the length of the snake: how long it is on the screen
var snakeSize; //how big it is the snake on the screen in pixel

var context; //
var screenWidth; // store width of our screen
var screenHeight; // store the height of our screen so we have access to them

gameInitialize();
snakeInitialize();
gameDraw();

//*initialize our snake, game look, size of our screen
function gameInitialize()
{
    //variable canvas store document element on the website
    // assign canvas to object on the HTML page
    var canvas = document.getElementById("game-screen");
    //context is going to enable to draw 2D thing on the screen
    // use context variable to draw rectangel, line,..
    context = canvas.getContext("2d");
    //assign the height and width of the browser window
    // getting the whole width of the window and store it in screenWidth
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight
    // to make sure that the whole canvas is the whole screen
    canvas.width = screenWidth;
    canvas.height = screenHeight;    
}
//calling extra function in here
function gameLoop()
{
   
}
// draw our game
function gameDraw()
{
    context.fillStyle = "rgb(180, 250, 213)";
    context.fillRect(0, 0, screenWidth, screenHeight);    
}
//initialize all the variables for the snake and setting to values and modify later
function snakeInitialize()
    snake = [];
    snakeLength = 15;
    snakeSize = 20;
    
    for(var index = 0; index < snakeLength; index++) {
        snake.push( {
                x: index,
                y: 0
            });       
    }
{
    
}
//anything has to do with drawing the snake
function snakeDraw()
{
    
}
//update the snake so the snake can move on the screen
function snakeUpdate()
{
    
}


