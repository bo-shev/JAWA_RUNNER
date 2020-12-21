let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
var flag =false;
var score = 0, totalScore = 0;
var metr =0, bonus = 1;

var moto = "img/smallDnepr1.png"; 
var  fon = new Image();

//moto.src =  "img/smallSatsuma1.png";//"img/smallDnepr1.png"; 
//fon.src = "img/road.png";
fon.src = "img/betterRoad.jpg";

curentKm = document.getElementById("score");
curentM = document.getElementById("mScore");
//odometr=document.getElementById("odometr");
curentKm.innerHTML=score;

var motoX = 450, motoY = 200;
var motoSpeed = 7, roadSpeed = 6;
var amountCar = 0;

var wayH = 0 , wayW = 0; // напрямок 

//var plusX = 1; var plusY = 1;

var fonPositionY = -1350;


var transorts ;


       
function RandomInteger(min, max) 
{
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function addCar()  
{
    transorts.push(new Car(changeCar(2), RandomInteger(150, 170), -100, RandomInteger(1,roadSpeed-2)))
    transorts.push(new Car(changeCar(2), RandomInteger(245, 280), -300, RandomInteger(1,roadSpeed-2)))
    transorts.push(new Car(changeCar(1), RandomInteger(340, 365), -250, RandomInteger(1,roadSpeed-2)))
    transorts.push(new Car(changeCar(1), RandomInteger(440, 450), -700, RandomInteger(1,roadSpeed-2)))
}

function changeCar(strip)
{
    var temp = RandomInteger(1,4);

    if (strip == 1)
    {
        switch (temp)
        {
            case 1: return "img/smallDnepr1.png";break;
            case 2: return "img/smallSatsuma1.png"; break;
            case 3: return "img/yaz1.png"; break; 
            case 4: return "img/moto1.png"; break; 
        }
    }
    else
    {
        switch (temp)
        {
            case 1: return "img/smallDnepr2.png";break;
            case 2: return "img/smallSatsuma2.png"; break;
            case 3: return "img/yaz2.png"; break;                    
            case 4: return "img/moto2.png"; break;
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
            else 
            {
                this.image = new Image();
                this.image.src = changeCar(2);
            }

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
    ctx.drawImage(fon, 0, fonPositionY);
   
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
                    if (colision(i) == true && flag == true)
                    {                        
                        
                        alert("Ви проїхали: "+ score +" кілометрів");  
                        
                        location.reload();
                        flag = false;
                        break;
                    }
                }
            }

            playerGo();

            if (transorts[0].x < 270)
            {
                bonus = 2;
            }
            else {bonus = 1;}
        
         fonPositionY+= roadSpeed;
            
            if(fonPositionY > 0)
            {fonPositionY = -900;}
            
            if(metr > 1000)
            {
                metr = 0;
                score++;
                //odometr=document.getElementById("odometr");

                //odometr.innerHTML=score + totalScore;
                curentKm.innerHTML=score;
                motoSpeed++;
                 roadSpeed++;
                

            } metr += bonus; 
            curentM.innerHTML=metr;
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
        start();
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
    if (flag != true)
    {
    transorts = [            
        new Car(moto, motoX, motoY, 0)//"img/smallDnepr1.png"
    ];
let interval = setInterval(draw, 20);
addCar();
flag = true;
    }
}


//requestAnimationFrame(draw);