/* ----------------------------------------------------------------------------
 * Variable
 *  ---------------------------------------------------------------------------
 */
// multi line comment
// variables are storage location for information
// Variable store information in memory somewhere
// so We have access to this information and modify this information
var snake; // store position of the snake on the screen
var snakeLength; // store the length of the snake: how long it is on the screen
var snakeSize; //how big it is the snake on the screen in pixel
var snakeDirection; // store in  which direction the snake is moving

var food; // store its position on the screen

var context; //
var screenWidth; // store width of our screen
var screenHeight; // store the height of our screen so we have access to them

/* -------------------------------------------------------------------------
 * Executing Game Code
 * -------------------------------------------------------------------------
 */ 

gameInitialize();
snakeInitialize();
foodInitialize();
//gameLoop run at a set interval over and over again
setInterval(gameLoop, 1000/30);

// functions are a way to perform actions in our code at certain period of
// time in our code
// use functions to modify this information(variable)


//*initialize our snake, game look, size of our screen
function gameInitialize() {
    //variable canvas store document element on the website
    // assign canvas to object on the HTML page
    var canvas = document.getElementById("game-screen");
    //context is going to enable to draw 2D thing on the screen
    // use context variable to draw rectangel, line,..
    // get the context of the canvas
    context = canvas.getContext("2d");
    //assign the height and width of the browser window
    // getting the whole width of the window and store it in screenWidth
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    // use that information to store within the Width of the canvas
    // to make sure that the whole canvas is the whole screen
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    
    // use keydown event (if the key has been pressed)
    document.addEventListener("keydown", keyboardHandler );
    
}
//calling extra function in here
function gameLoop() 
{
    //background being drawn, snake position being updated, snake being drawn on the screen
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();

   
}
// draw our game
function gameDraw()
{
    context.fillStyle = "rgb(180, 250, 213)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}
//initialize all the variables for the snake and setting to values and modify later
function snakeInitialize(){
    snake = [];
    snakeLength = 5; //length of snake 15 block wide
    snakeSize = 20; // size of our snake is 20 pixels
    snakeDirection = "down"; // tell the game which direction of our snake is moving
    
    for(var index = snakeLength; index >= 0; index--) {
        snake.push( {
                x: index,
                y: 0
            });       
    }
}
//anything has to do with drawing the snake
function snakeDraw(){
    for(var index = 0; index < snake.length; index++) {
        context.fillStyle = "white";
        // fill x and y position and the size of the snake
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}
//update the snake so the snake can move on the screen
function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    //moving snake to the right by increasing the x-position by 1
    //conditional statement (if) determine if we go up or down
    if(snakeDirection == "down") {
        snakeHeadY++;
    }
    else {
        snakeHeadX++; // snake position moves to the right
    }
    //asking a program a question(comparing the variable to the string)
    //remove element in the array and store in snaketail
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

/* --------------------------------------------------------------
 * Food Functions
 * --------------------------------------------------------------
 */

function foodInitialize() {
    // call our food variable and assign it a value
    // curly brace creates food object
    food = {
        x: 0,
        y: 0
    };
    //call the set position of the food function
    setFoodPosition();
}
// draw our food
function foodDraw() {
    context.fillStyle = "white";
    context.fillRect(food.x * snakeSize, food.Y *  snakeSize, snakeSize, snakeSize);
}

function setFoodPosition() {
    //creating a random number from 0 to screenWidth and screenHeight
    //Math.floor gives the nearest integer (no decimal)
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY =  Math.floor(Math.random() * screenHeight);
    
    //set the position of the food using randomX and randomY
    //randomX to food.x(food.x is the acutal position of the food)
    //set random position of the x and y-axis
    food.x = Math.floor (randomX / snakeSize);
    food.y = Math.floor (randomY / snakeSize);
}

/* --------------------------------------------------------------------------
 * Input Functions
 * --------------------------------------------------------------------------
 */
//for handling keyboard event
function keyboardHandler(event) { // keyCode 39 mean right direction 
    console.log(event);
    if(event.keyCode == "39") {
         snakeDirection = "right";
     }
     else if (event.keyCode == "40") { // keyCode 40 means down direction
         snakeDirection = "down";
}
}