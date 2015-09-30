var HexGame = HexGame || {};

HexGame.BootState = {
    init:  function() {
        this.game.state.backgroundColor = '#fff';

        this.scale.ScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload: function() {
        this.load.image('bar', 'assets/images/preloader-bar.png');
    },
    create: function() {
        this.state.start('Preload');
    }
};
