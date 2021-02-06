var database ,dog,dog1,dog2
var foods
//var form
var feed,add
var foodobject
var fedTime
var lastFed
//Create variables here

function preload()

{
  dogimg1 = loadImage("Dog.png")
  dogimg2 = loadImage("happy dog.png")
  
}

function setup() {
	createCanvas(1000,400);
  database = firebase.database();
  console.log(database);
 
  foodobject = new Food()
  dog = createSprite(800,200,150,150);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(800,95)
  add.mousePressed(addFoods)


} 

function draw(){
 background(0,138,86);

 foodobject.display()
 fill("white");
 textSize(15)
  
 fedTime=database.ref('FeedTime')
 fedTime.on("value",function(data){ 
  lastFed=data.val();
 });
 if(lastFed>=12)
 {
   text("Last Feed : " + lastFed % 12 + "PM", 150,30);
 }else if(lastFed==0 )
 {
   text("Last Feed : 12 AM" , 150,30)
 }else
 {
   text("Last Feed : " + lastFed + "AM", 150,30);
 }

 textSize(15)
 fill("white");
text("Pet dog : Bruno",740,300);

drawSprites();
}
function readPosition(data){
  foods = data.val();
  foodobject.updateFoodStock(foods)
}

function showError(){
 console.log("Error in writing to the database");
}



function FeedDog(){

dog.addImage(dogimg2);

foodobject.updateFoodStock(foodobject.getFoodStock()-1);
database.ref('/').update({
Food:foodobject.getFoodStock(),
FeedTime:hour()
})
}
function addFoods(){
  foods++
  database.ref('/').update({
    Food:foods
  })
  }