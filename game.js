let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

var moto = "img/smallDnepr1.png"; 
var  fon = new Image();

//moto.src =  "img/smallSatsuma1.png";//"img/smallDnepr1.png"; 
//fon.src = "img/road.png";
fon.src = "img/betterRoad.jpg";

var motoX = 450, motoY = 200;
var motoSpeed = 7, roadSpeed = 6;
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
    transorts.push(new Car("img/smallSatsuma2.png", RandomInteger(150, 170), -100, RandomInteger(1,roadSpeed-2)))
    transorts.push(new Car("img/smallSatsuma2.png", RandomInteger(240, 280), -300, RandomInteger(1,roadSpeed-2)))
    transorts.push(new Car(changeCar(1), RandomInteger(340, 370), -100, RandomInteger(1,roadSpeed-2)))
    transorts.push(new Car("img/smallSatsuma1.png", RandomInteger(430, 450), -100, RandomInteger(1,roadSpeed-2)))
}

function changeCar(strip)
{
    var temp = RandomInteger(1,2);

    if (strip == 1)
    {
        switch (temp)
        {
            case 1: return "img/smallDnepr1.png";break;
            case 2: return "img/smallSatsuma1.png"; break;
                
                   
        }
    }
    
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
            this.y = RandomInteger(-750, -150);
            this.carSpeed = RandomInteger(1, roadSpeed-2);
            
            if(this.x > 340)
            {
                this.image = new Image();
                this.image.src = changeCar(1);
            }
            else {}

        }
    }

    
}

function colision(i)
{
    var roadAccident = false;

   // alert(i);
    if(transorts[i].y < (transorts[0].y + transorts[0].image.height -20 ) && transorts[i].y + transorts[i].image.height -20> transorts[0].y  )
    {
      if(transorts[i].x < (transorts[0].x + transorts[0].image.width ) && transorts[i].x + transorts[i].image.width  - 15> transorts[0].x)
        {
            roadAccident = true;            
        }
    }
    return roadAccident;
}

var transorts = 
        [
            new Car(moto, motoX, motoY, 0)//"img/smallDnepr1.png"
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
var  tsImg = new Image();
function prewievDraw()
{
    ctx.drawImage(fon, 0, fonPositionY+150);
    
    tsImg.src = moto;
    ctx.drawImage(tsImg, motoX, motoY);
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
prewievDraw();

addEventListener("keydown", move);

addEventListener("keyup", donTmove);


function start()
{
let interval = setInterval(draw, 20);
addCar();
}


//requestAnimationFrame(draw);