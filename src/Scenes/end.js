class end extends Phaser.Scene{
    constructor(data){
        super("End");
        this.score = data;
    }

    create(){
        this.add.text((config.width/2)-500,(config.height/2)-150, "Your score:"+this.score, {
            fontFamily: 'Times, serif',
            fontSize: 50,
            wordWrap: {
                width: 1000
            }
        });

        this.add.text((config.width/2)-100,(config.height/2), "Play Again? Press Space",{
            fontFamily:'Times, serif',
            fontSize:30,
            wordWrap:{
                width: 500
            }
        });

        this.start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.start)){
            this.scene.start("Start");
        }
    }
}