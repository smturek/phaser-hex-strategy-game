var HexGame = HexGame || {};

HexGame.Board = function(state, grid) {
    Phaser.Group.call(this, state.game);

    this.state = state;
    this.game = state.game;
    this.grid = grid;
    this.rows = this.grid.length;
    this.cols = this.grid[0].length;

    this.terrains = [
        {asset: 'grass'},
        {asset: 'water', blocked: true},
        {asset: 'rocks'},
        {asset: 'grasstrees'},
        {asset: 'grasstrees2'}
    ];

    //create hexagons
    var row, col, title, x, y;
    for(row = 0; row < this.rows; row++) {
        for(col = 0; col < this.cols; col ++) {
            //even rows
            if(row % 2 === 0 ) {
                x = this.state.MARGIN_X + col * this.state.TILE_W;
            }
            //odd rows
            else {
                x = this.state.MARGIN_X + col * this.state.TILE_W + this.state.TILE_W/2;
            }

            y = this.state.MARGIN_Y + row * this.state.TILE_H * 3/4;

            //create new tile
            tile = new Phaser.Sprite(this.game, x, y, this.terrains[this.grid[row][col]].asset);

            //keep some information in the tile object
            tile.row = row;
            tile.col = col;
            tile.terrainAsset = this.terrains[this.grid[row][col]].asset;
            tile.blocked = this.terrains[this.grid[row][col]].blocked;

            tile.inputEnabled = true;
            tile.input.pixelPerfectClick = true;

            tile.events.onInputDown.add(function(tile) {
                var adj = this.getAdjacent(tile, true);

                adj.forEach(function(tile){
                    tile.alpha = 0.3;
                }, this);
            }, this);

            //add tile to Board group
            this.add(tile);
        }
    }
};

HexGame.Board.prototype = Object.create(Phaser.Group.prototype);
HexGame.Board.prototype.constructor = HexGame.Board;

HexGame.Board.prototype.getFromRowCol = function(row, col) {
    var foundTile;

    this.forEach(function(tile) {
        if(tile.row === row && tile.col === col) {
            foundTile = tile;
        }
    }, this);

    return foundTile;
};

HexGame.Board.prototype.getXYFromRowCol = function(row, col) {
    var pos = {};

    if(row % 2 === 0 ) {
        pos.x = this.state.MARGIN_X + col * this.state.TILE_W + this.state.TILE_W/2;
    }
    //odd rows
    else {
        pos.x = this.state.MARGIN_X + col * this.state.TILE_W + this.state.TILE_W;
    }

    pos.y = this.state.MARGIN_Y + row * this.state.TILE_H * 3/4 + this.state.TILE_H/2;

    return pos;
};

HexGame.Board.prototype.getAdjacent = function(tile, rejectBlocked) {
    var adjacentTiles = [];
    var adjTile;
    var row = tile.row;
    var col = tile.col;
    var relativePositions = [];

    //relative positions of adjacent cells depend on whether the row is odd or even
    if(row % 2 === 0) {
        relativePositions = [
            {r: -1, c: 0},
            {r: -1, c: -1},
            {r: 0, c: -1},
            {r: 0, c: 1},
            {r: 1, c: 0},
            {r: 1, c: -1},
        ];
    }
    else {
        relativePositions = [
            {r: -1, c: 0},
            {r: -1, c: 1},
            {r: 0, c: -1},
            {r: 0, c: 1},
            {r: 1, c: 0},
            {r: 1, c: 1},
        ];
    }

    relativePositions.forEach(function(pos) {
        //check that we are not on the edge of the map
        if((row + pos.r >=0 ) && (row + pos.r < this.rows) && (col + pos.c >= 0) && (col + pos.c < this.cols)) {

            //get adjacent tile
            adjTile = this.getFromRowCol(row + pos.r, col + pos.c);

            if(!rejectBlocked || !adjTile.blocked) {
                adjacentTiles.push(adjTile);
            }
        }
    }, this);

    return adjacentTiles;
};
