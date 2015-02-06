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

var gameState;
var gameOverMenu;
var restartButton;
var playHUD;
var scoreboard;

/* -------------------------------------------------------------------------
 * Executing Game Code
 * -------------------------------------------------------------------------
 */

gameInitialize(); // This executes the function gameInitalize without arguements.
snakeInitialize();
foodInitialize();
//gameLoop run at a set interval over and over again
setInterval(gameLoop, 1000 / 30);

// functions are a way to perform actions in our code at certain period of
// time in our code
// use functions to modify this information(variable)

// creating functions for the game.
//*initialize our snake, game look, size of our screen
function gameInitialize() { // this function starts the game.
    //variable canvas store document element on the website
    // assign canvas to object on the HTML page
    var canvas = document.getElementById("game-screen"); // returns a reference to an element by it's ID using the DOM structure.
    //context is going to enable to draw 2D thing on the screen
    // use context variable to draw rectangel, line,..
    // get the context of the canvas
    context = canvas.getContext("2d"); // assigning a value to the variable context. It will allow it to draw in 2d.
    //assign the height and width of the browser window
    // getting the whole width of the window and store it in screenWidth
    screenWidth = window.innerWidth; // this window function gives the width of the screen.
    screenHeight = window.innerHeight; // this window function gives the height of the screen.
    // use that information to store within the Width of the canvas
    // to make sure that the whole canvas is the whole screen
    canvas.width = screenWidth; // stores the screen width in canvas.width
    canvas.height = screenHeight; // stores the screen height in canvas.height

    // use keydown event (if the key has been pressed)
    document.addEventListener("keydown", keyboardHandler);
    
    gameOverMenu = document.getElementById("gameOver");
    centerMenuPosition(gameOverMenu);
    
    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", gameRestart);
    
    playHUD = document.getElementById("playHUD");
    scoreboard = document.getElementById("scoreboard");
    
    setState("PLAY");

}
//calling extra function in here
function gameLoop() // this function runs the game at all times.
{
    //background being drawn, snake position being updated, snake being drawn on the screen
    gameDraw();
    drawScoreboard();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
    }
}

// draw our game
function gameDraw()// this function draws the game.
{
    context.fillStyle = "rgb(180, 250, 213)"; // this fills the canvas with a ligh blue color.
    context.fillRect(0, 0, screenWidth, screenHeight); // This makes a rectangle from X = 0 and Y = 0 with the width of screenWidth and the height of screenHeight.
}

function gameRestart() {
    snakeInitialize();
    foodInitialize();
    hideMenu(gameOverMenu);
    setState("PLAY");
}
//initialize all the variables for the snake and setting to values and modify later
function snakeInitialize() {
    snake = [];
    snakeLength = 1; //length of snake 15 block wide
    snakeSize = 20; // size of our snake is 20 pixels
    snakeDirection = "down"; // tell the game which direction of our snake is moving

    for (var index = snakeLength - 1; index >= 0; index--) {
        snake.push({
            x: index,
            y: 0
        });
    }
}
//anything has to do with drawing the snake
function snakeDraw() {
    for (var index = 0; index < snake.length; index++) {
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
    if (snakeDirection == "down") { // check if snake is going down
        snakeHeadY++; // snake position moves down
    }
    else if (snakeDirection == "right") { // check if snake is going right
        snakeHeadX++; // snake position moves to the right
    }
    else if (snakeDirection == "up") { // check if snake is going up
        snakeHeadY--; // snake position moves up
    }
    else if (snakeDirection == "left") { // check if snake is going left
        snakeHeadX--; // snake position moves to the left
    }
    checkFoodCollisions(snakeHeadX, snakeHeadY);
    //asking a program a question(comparing the variable to the string)
    //remove element in the array and store in snaketail
    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY);
    checkSnakeCollisions(snakeHeadX, snakeHeadY);
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
    // context.fillRect(food.x * snakeSize, food.Y *  snakeSize, snakeSize, snakeSize);
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodPosition() {
    //creating a random number from 0 to screenWidth and screenHeight
    //Math.floor gives the nearest integer (no decimal)
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);

    //set the position of the food using randomX and randomY
    //randomX to food.x(food.x is the acutal position of the food)
    //set random position of the x and y-axis
    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}


/* --------------------------------------------------------------------------
 * Input Functions
 * --------------------------------------------------------------------------
 */
//for handling keyboard event
function keyboardHandler(event) { // this functions runs if the player presses the keyboard
    console.log(event);

    if (event.keyCode == "39") { // if the user presses a right button, then the player will be right
        snakeDirection = "right";
    }
    else if (event.keyCode == "40") { // if the user presses a down button, then the player will be down 
        snakeDirection = "down";
    }
    else if (event.keyCode == "38") { // if the user presses a up, then the player will be up
        snakeDirection = "up";
    }
    else if (event.keyCode == "37") { // if the user presses a left button, then the player will be left
        snakeDirection = "left";
    }
}

/* --------------------------------------------------------------------
 * Collision Handling
 * --------------------------------------------------------------------
 */

function checkFoodCollisions(snakeHeadX, snakeHeadY) { // if the snake goes over the food, it will make the snake longer by 1
    if (snakeHeadX == food.x && snakeHeadY == food.y) { // check if the snake head is colliding with the food
        snake.push({
            x: 0,
            y: 0
        });
        snakeLength++; // this changes the snake length by 1
        setFoodPosition(); // Change the position of the food
    }
}

function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0) {
        setState("GAME OVER");
    }

}

function checkSnakeCollisions(snakeHeadX, snakeHeadY) {
   for(var index = 1; index < snake.length; index++) {
       if(snakeHeadX == snake[index].x && snakeHeadY == snake[index].y) {
           setState("GAME OVER");
           return;
       }
   }
    
}
/*------------------------------------------------------------------------------
 * Game State Handling 
 * ----------------------------------------------------------------------------
 */

function setState(state) {
    gameState = state;
    showMenu(state);
}
/*----------------------------------------------------------------------------
 * Menu Functions
 * -------------------- ------------------------------------------------------
 */
function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function hideMenu(menu) {
    menu.style.visibility = "hidden";
}

function showMenu(state) {
    if (state == "GAME OVER") {
        displayMenu(gameOverMenu);
    }
    else if(state == "PLAY") {
        displayMenu(playHUD);
    }
}

function centerMenuPosition(menu) {
    menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
    menu.style.left= (screenWidth / 2) - (menu.offsetWidth / 2) + "px";
}

function drawScoreboard() {
    scoreboard.innerHTML = "Length: "  + snakeLength;
}