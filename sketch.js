//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var lastFed;
var foodObj;
var feed, addFood;

function preload()
{
  //load images here
  dog = loadImage("images/doglmg.png");
  dog2 = loadImage("images/doglmg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);

  foodObj = new Food();
  
  dog = createSprite(250, 450, 60,60);
  (dog.addImage(doglmg.png));
  (dog2.addImage(doglmg1.png));
  dog.scale=0.15;

  //database = firebase.database()
   
  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  textSize(35)
  fill("red")
  text("foodStock", 90,90);
  //add styles here
  foodObj.display();


  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();
}

//function to read values from database
function readStock(data)
{
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//function to write values in database
function writeStock(x)
{
  if(x <= 0)
  {
     x = 0;
  }
  else
  {
    x = x-1;
  }
  
  database.ref('/').update({
    Food:xs
  })
}


