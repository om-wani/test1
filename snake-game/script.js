



// Definging the varaibles for making playground area 
var SizeofBox = 18; //
var NumberofRows = 30; //total number of rows 
var NumberofColumns = 50; //total number of coloumns
var Canvas;
var Context;

//Defining varaibles for making snake's structure.
var SnakeShapeX = SizeofBox * 5;
var SnakeShapeY = SizeofBox * 5;

//Defining varaible for snake speed
var SnakeSpeedX = 0;
var SnakeSpeedY = 0;

//Defining the snake's body
var SnakeBody = [];

// Defining varaibles for the positioning of food
var FoodPositionX;
var FoodPositionY;

//The game over status should be false from the start
var GameOver = false;

//Stating what should the code do after the window is done loading
window.onload = function (){
    //setting Canvas height and width
    Canvas = document.getElementById("canvas");
    Canvas.height = NumberofRows * SizeofBox;
    Canvas.width = NumberofColumns * SizeofBox;
    Context = Canvas.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection); //key Event listener for the movements
    //setting the snake speed
    setInterval(update, 1000 / 10);

}



function update(){
    if (GameOver){
        return;
    }

    //coloring the the play area 
    Context.fillStyle = "#2b3636";
    Context.fillRect(0, 0, Canvas.width, Canvas.height);

    //coloring the food
    Context.fillStyle = "white";
    Context.fillRect(FoodPositionX, FoodPositionY, SizeofBox, SizeofBox);

    //to generate new food position
    if(SnakeShapeX == FoodPositionX && SnakeShapeY == FoodPositionY){
        SnakeBody.push([FoodPositionX, FoodPositionY]);
        placeFood();
    }

    //to grow and progress the snake's body 
    for(let i = SnakeBody.length - 1; i > 0; i--){
        SnakeBody[i] = SnakeBody[i-1];
    }
    if(SnakeBody.length){
        SnakeBody[0] = [SnakeShapeX, SnakeShapeY];
    }

    Context.fillStyle = "red";// coloring the snake 
    SnakeShapeX += SnakeSpeedX * SizeofBox;
    SnakeShapeY += SnakeSpeedY * SizeofBox;
    Context.fillRect(SnakeShapeX, SnakeShapeY, SizeofBox, SizeofBox);
    for(let i = 0; i < SnakeBody.length; i++){
        Context.fillRect(SnakeBody[i][0], SnakeBody[i][1], SizeofBox, SizeofBox);
    }

    //it is game over when the following condition exists
    if(SnakeShapeX < 0 
        || SnakeShapeX > NumberofColumns * SizeofBox
        || SnakeShapeY < 0
        || SnakeShapeY > NumberofRows * SizeofBox){
            //when snake touches the limits/ boundries of the canvas
            GameOver = true;
            alert("Game Over");
            
    }
    // when snake touches its own body
    for(let i = 0; i <  SnakeBody.length; i++){
        if(SnakeShapeX == SnakeBody[i][0] && SnakeShapeY == SnakeBody[i][1]){
            GameOver = true;
            alert("Game Over");
            
        }
    }
}

//what should happen when you press WASD or arrow keys
function changeDirection(e){
    if (e.code == "ArrowUp" && SnakeSpeedY != -1 || e.key === "W" && SnakeSpeedY != -1 || e.key === "w" && SnakeSpeedY != -1 || e.key === "I" && SnakeSpeedY != -1 || e.key === "i" && SnakeSpeedY != -1){
        //when up arrow key or 'w'pressed snake will move up
        SnakeSpeedX = 0;
        SnakeSpeedY = -1;
    }
    else if (e.code == "ArrowDown" && SnakeSpeedY != 1 || e.key === "S" && SnakeSpeedY != 1 || e.key === "s" && SnakeSpeedY != 1 || e.key === "K" && SnakeSpeedY != -1 || e.key === "k" && SnakeSpeedY != -1){
        //when down arrow or 's' pressed snake will move down 
        SnakeSpeedX = 0;
        SnakeSpeedY = 1;
    }
    else if (e.code == "ArrowLeft" && SnakeSpeedX != -1 || e.key === "A" && SnakeSpeedX != -1 || e.key === "a" && SnakeSpeedX != -1 || e.key === "J" && SnakeSpeedY != -1 || e.key === "j" && SnakeSpeedY != -1){
        //when left arrow or 'a' pressed snake will move left 
        SnakeSpeedX = -1;
        SnakeSpeedY = 0;
    }
    else if (e.code == "ArrowRight" && SnakeSpeedX != 1 || e.key === "D" && SnakeSpeedX != 1 || e.key === "d" && SnakeSpeedX != 1 || e.key === "L" && SnakeSpeedY != -1 || e.key === "l" && SnakeSpeedY != -1){
        //when right arrow or 'd' pressed snake will move right 
        SnakeSpeedX = 1;
        SnakeSpeedY = 0;
    }
}

//Randomly place food
function placeFood(){
    //x coordinates
    FoodPositionX = Math.floor(Math.random() * NumberofColumns) * SizeofBox;
    //y coordinates
    FoodPositionY = Math.floor(Math.random() * NumberofRows) * SizeofBox;
}

document.addEventListener('keydown', PageReload);
function PageReload(e){
    if(GameOver = true && e.code == "Enter")
    location.reload();
}
