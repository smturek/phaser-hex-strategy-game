var HexGame = HexGame || {};

HexGame.Unit = function(state, data) {
    var position = state.board.getXYFromRowCol(data.row, data.col);

    Phaser.Sprite.call(this, state.game, position.x, position.y, data.asset);

    this.game = state.game;
    this.state = state;
    this.board = state.board;
    this.row = data.row;
    this.col = data.col;
    this.data = data

    this.anchor.setTo(0.5);
};

HexGame.Unit.prototype = Object.create(Phaser.Sprite.prototype);
HexGame.Unit.prototype.constructor = HexGame.Unit;
