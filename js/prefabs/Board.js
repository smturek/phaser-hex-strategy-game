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

            //add tile to Board group
            this.add(tile);
        }
    }
};

HexGame.Board.prototype = Object.create(Phaser.Group.prototype);
HexGame.Board.prototype.constructor = HexGame.Board;
