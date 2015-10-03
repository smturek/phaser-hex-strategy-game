var HexGame = HexGame || {};

HexGame.GameState = {

    init: function() {
        this.TILE_W = 56;
        this.TILE_H = 64;
        this.MARGIN_X = 30;
        this.MARGIN_Y = 5;
    },
    create: function() {
        this.map = JSON.parse(this.game.cache.getText('map'));
        this.board = new HexGame.Board(this, this.map.grid);

        //unit groups
        this.playerUnits = this.add.group();
        this.enemyUnits = this.add.group();

        this.initUnits();

        //run turn
        this.newTurn();
    },
    initUnits: function() {
        //load player units
        this.playerUnitsData = JSON.parse(this.game.cache.getText('playerUnits'));

        var unit;
        this.playerUnitsData.forEach(function(unitData) {
            unit = new HexGame.Unit(this, unitData);

            //unit belongs to the player
            unit.isPlayer = true;

            this.playerUnits.add(unit);
        }, this);

        this.enemyUnitsData = JSON.parse(this.game.cache.getText('enemyUnits'));

        this.enemyUnitsData.forEach(function(unitData) {
            unit = new HexGame.Unit(this, unitData);

            this.enemyUnits.add(unit);
        }, this);
    },
    clearSelection: function() {
        this.board.setAll('alpha', 1);

        //remove attached events from tiles
        this.board.forEach(function(tile) {
            tile.events.onInputDown.removeAll();
        }, this);
    },
    newTurn: function() {
        //array to get all alive units
        this.allUnits = [];

        this.playerUnits.forEach(function(unit) {
            this.allUnits.push(unit);
        }, this);

        this.enemyUnits.forEach(function(unit) {
            this.allUnits.push(unit);
        }, this);

        //randomize array
        this.shuffle(this.allUnits);

        //keep track of the index of the current moving unit
        this.currentUnitIndex = 0;

        //prepare next unit
        this.prepareNextUnit();
    },
    //shuffle array method from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript)
    shuffle: function(array) {
      var counter = array.length, temp, index;

      // While there are elements in the array
      while (counter > 0) {
          // Pick a random index
          index = Math.floor(Math.random() * counter);

          // Decrease counter by 1
          counter--;

          // And swap the last element with it
          temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }

      return array;
    },
    prepareNextUnit: function() {
        //if there are units to move
        if(this.currentUnitIndex < this.allUnits.length) {
            //grab unit
            var unit = this.allUnits[this.currentUnitIndex];
            this.currentUnitIndex++;

            if(unit.alive) {
                unit.showMovementOptions();
            }
            else {
                this.prepareNextUnit();
            }
        }
        else {
            this.newTurn();
        }
    }
};
