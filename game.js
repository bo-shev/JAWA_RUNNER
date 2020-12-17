let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

var moto = new Image(); 
var  fon = new Image();

moto.src = "img/smallDnepr1.png"; 
//fon.src = "img/road.png";
fon.src = "img/betterRoad.jpg";

var motoX = 450, motoY = 200;
var motoSpeed = 5, roadSpeed = 7;
var amountCar = 0;

var wayH = 0 , wayW = 0; // напрямок 

//var plusX = 1; var plusY = 1;

var fonPositionY = -1500;

function RandomInteger(min, max) 
{
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function addCar()
{
    transorts.push(new Car("img/smallSatsuma2.png", RandomInteger(150, 170), -100, RandomInteger(1,5)))
    transorts.push(new Car("img/smallSatsuma2.png", RandomInteger(240, 280), -300, RandomInteger(1,5)))
    transorts.push(new Car("img/smallSatsuma1.png", RandomInteger(340, 370), -100, RandomInteger(1,5)))
    transorts.push(new Car("img/smallSatsuma1.png", RandomInteger(430, 450), -100, RandomInteger(1,5)))
}

class Car
{
    constructor(image, x, y, speed)
    {
        this.carSpeed = speed;
        this.x = x;
        this.y = y;
 
        this.image = new Image();
 
        this.image.src = image;
    }

    carRun()
    {
        if (this.x < 340)
        {
            this.y += roadSpeed + this.carSpeed;
        }
        else
        {              
            this.y += roadSpeed - this.carSpeed;
        }
    }

    cheakPosition()
    {
        if (this.y > 900)
        {
            this.y = -100
        }
    }

    
}

function colision(i)
{
    var roadAccident = false;

   // alert(i);
    if(transorts[i].y < (transorts[0].y + transorts[0].image.height ) && transorts[i].y + transorts[i].image.height > transorts[0].y +30 )
    {
      if(transorts[i].x < (transorts[0].x + transorts[0].image.width ) && transorts[i].x + transorts[i].image.width  > transorts[0].x)
        {
            roadAccident = true;            
        }
    }
    return roadAccident;
}

var transorts = 
        [
            new Car("img/smallDnepr1.png", motoX, motoY, 0)
        ];

        function left()
    {
        if(transorts[0].x>100)
        {transorts[0].x -= motoSpeed;}        
    }
    function down()
    {
        if(transorts[0].y < 780)
           { transorts[0].y+= motoSpeed;} 
    }
    function right()
    {   
        if(transorts[0].x<500)
        {transorts[0].x += motoSpeed;}
    }
    function up()
    {
        if(transorts[0].y > 10)
        {transorts[0].y-= motoSpeed;}   
    }

function playerGo()
{
    if (wayH == 1)
    {
        up();
    }
    else if (wayH == 2)
    {
        down();
    }
    if (wayW == 1)
    {
       left();
    }
    else if (wayW == 2)
    {
       right();
    }
}


function draw()
        {
            
          ctx.drawImage(fon, 0, fonPositionY);
         
          for (var i = 0; i < transorts.length; i++)
            {
                ctx.drawImage(transorts[i].image, transorts[i].x, transorts[i].y);
                if( i != 0)
                {
                    transorts[i].cheakPosition();
                    transorts[i].carRun();
                }

                if (i != 0)
                {
                    if (colision(i) == true)
                    {
                        alert("йой най буде");
                    }
                }
            }

            playerGo();
        
         fonPositionY+= roadSpeed;
         
        if(fonPositionY > 0)
        {fonPositionY = -900;}
         // x += plusX; ;
         
         //requestAnimationFrame(draw);
        }
        

function move(e)
{

    switch(e.keyCode){
         
        case 37:  // если нажата клавиша влево
        wayW = 1;           
            break;
        case 38:   // если нажата клавиша вверх
        wayH = 1;           
            break;
        case 39:   // если нажата клавиша вправо
        wayW = 2;       
            break;
        case 40:   // если нажата клавиша вверх
        wayH = 2;        
            break;
        case 32:   // если нажата клавиша вверх
        addCar();
        //transorts.push(new Car("img/smallSatsuma.png", RandomInteger(160, 470), -100, RandomInteger(1,5)))
            break;
       
    }
}

function donTmove(e)
{
    switch(e.keyCode)
    {         
        case 37:  
        wayW = 0;           
            break;
        case 38:   
        wayH = 0;           
            break;
        case 39:   
        wayW = 0;       
            break;
        case 40:   
        wayH = 0;        
            break;
    }
}

addEventListener("keydown", move);

addEventListener("keyup", donTmove);

let interval = setInterval(draw, 20);
//requestAnimationFrame(draw);