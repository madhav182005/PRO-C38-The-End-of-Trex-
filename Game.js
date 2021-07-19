class Game {
    constructor(){}
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      trex = createSprite(100,200); 
      trex_collided = createSprite(100,300); 
      trex_running = createSprite(100,400); 
      
    //creating cars array 
      trexs = [trex, trex_collided, trex_running];
    }
  
    play(){
      form.hide();
      textSize(30);
      text("Game Start", 100, 80)
      Player.getPlayerInfo();
  
      if(allPlayers !== undefined){
        var index = 0; 
        var x = 0; 
        var y = 0; 
        for(var plr in allPlayers){
          index = index+1;
          x = x+200; 
          y = displayHeight - allPlayers[plr].distance; 
          trex [index - 1].x = x; 
          trex [index - 1].y = y;
          if(index === player.index){
            trex [index - 1].shapeColor = "blue"; 
            camera.position.x = displayWidth/2; 
            camera.position.y = trex[index - 1].y; 
          }
        }
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=50
        player.update();
      }
  
      drawSprites(); 
    }
  }
  