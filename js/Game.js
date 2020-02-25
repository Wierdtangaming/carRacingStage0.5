class Game {
  constructor(){


  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    });

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var player_countref = await database.ref('player_count').once("value");
      if  (player_countref.exists()){
        player_count = player_countref.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play() {
    form.hide();
    text("Game is starting!", 120,100);
    Player.getPayerInfo();
    if(allplayers !== undefined) {
      var display_position  = 130;
      if(plr === "player"+player.index) {
        fill("red");
      }
      else{
        fill("black");
      }
      display_position += 20;
      text(allplayers[plr].name+":" + allplayers[plr].distance,120,display_position);   
    }
    if(keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance+= 50;
      player.update();   
     }
  } 
}
