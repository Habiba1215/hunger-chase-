
    class Player {
        constructor(){
          this.index = null;
          this.distance = 0;
          this.name = null;
        }
      
        getCount(){
          var playerCountRef = database.ref('playerCount');
          playerCountRef.on("value",(data)=>{
            playerCount = data.val();
          })
        }
      
        updateCount(count){
          database.ref('/').update({
            playerCount: count
          });
        }
        getDeer(){
          var deerRef = database.ref('deer/x');
          deerRef.on("value",(data)=>{
            deer.x = data.val();
          })
        }
        updateDeer(x){
          database.ref('deer/').update({
            x: deer.x+x
          });
        }
      
        update(){
          var playerIndex = "players/player" + this.index;
          database.ref(playerIndex).set({
            name:this.name,
            distance:this.distance
          });
        }
        deletePlayers(){
          var players = database.ref("players")
          players.remove()
        }
      
        static getPlayerInfo(){
          var playerInfoRef = database.ref('players');
          playerInfoRef.on("value",(data)=>{
            allPlayers = data.val();
          })
        }
      }
