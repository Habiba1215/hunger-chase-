class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {

    cheetah1 = createSprite(100, displayHeight - 200)
    cheetah1.addAnimation("cheetahImg", cheetahImg)
    cheetah1.scale = 0.6;
    cheetah1.setCollider("rectangle", 0, 0, 400, 300)
    cheetah1.debug = true
    cheetah2 = createSprite(200, displayHeight - 175)
    cheetah2.addAnimation("cheetahImg", cheetahImg)
    cheetah2.scale = 0.6;
    cheetah2.setCollider("rectangle", 0, 0, 400, 300)
    cheetah2.debug = true;
    cheetah = [cheetah1, cheetah2]
    deer = createSprite(displayWidth / 2, displayHeight - 200)
    deer.addAnimation("deerImg", deerImg)
    deer.scale = 0.4
    deer.debug = true
    deer.x = displayWidth / 2
    deer.setCollider("rectangle", 0, 0, 300, 300)

    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      player.getDeer();
      player.updateDeer(displayWidth/10);
      form = new Form()
      form.display();
    }

  }
  play() {
    form.hide()
    Player.getPlayerInfo()
    if (allPlayers !== undefined) {
      var x;
      //var y = displayHeight - 250 ;
      var index = 0
      rank =0;
      
      for (var plr in allPlayers) {
        background("green")
        image(bg, 0, 0, displayWidth * 10, displayHeight)
        player.updateDeer(random(10, 20));
        //deer.velocityX = random(20,25)
        index = index + 1
        x = allPlayers[plr].distance
        //y = displayHeight + 100
        cheetah[index - 1].x = x
        //cheetah [index-1].y = y
console.log(deer.x)
        if (index === player.index) {
          camera.position.x = x + displayWidth / 4
          camera.position.y = displayHeight / 2
          fill("red")
          ellipse(cheetah[index - 1].position.x, cheetah[index - 1].position.y, 60, 60)

        }
      }
      if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
        player.distance += 50
        player.update()
      }
    }

    for (var i = 0; i < cheetah.length; i++) {
      if (cheetah[i].isTouching(deer) || cheetah[i].distance === 15000) {
        //image(bg2,player.x,displayHeight/2,displayWidth,displayHeight) 
        // deer.destroy();
        rank = i + 1;
        deer.velocityX = 0
        gameState = 2;
        game.update(2)
        player.updateCount(0);
      }
    }
    if (deer.x >= 12000) {
      //deer.velocityX = 0 
      rank = 3;
      gameState = 2;
      game.update(2)
      player.updateCount(0);
    }


    drawSprites();
  }

  end() {
    background(bg2)
    image(bg2, 0, 0, displayWidth, displayHeight)
    var button = createButton("Restart");
    button.position(displayWidth / 2 - 200, displayHeight / 2 + 50);
    button.style("width", "400px"); button.style("height", "100px");
    button.style("backgroundColor", "red"); button.style("border-radius", "50px");
    button.style("font-size", "50px");
    button.mousePressed(() => {

      document.location.reload(true);
    })
    if (rank === 3) {
      form.subtitle.html("deer escaped!!")
    }
    else {


      if (player.index === rank) {
        form.subtitle.html("Congratulations!!! the deer is caught ! Do you Wish to Play Again!!!");
        form.subtitle.position(displayWidth / 2 - 200, displayHeight / 5);
        form.subtitle.style("background-color", "red");

      } else {
        form.subtitle.html("Your Opponent caught the Deer! Do you Wish to Play Again!!!");
        game.update(0);
        player.updateCount(0);
        player.deletePlayers();
        form.subtitle.position(displayWidth / 2 - 300, displayHeight / 5);
        form.subtitle.style("background-color", "red");
      }
    }
    cheetah1.destroy();
    cheetah2.destroy();
    //deer.destroy();
  }

}