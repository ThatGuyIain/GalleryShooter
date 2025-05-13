class start extends Phaser.Scene{
    constructor(){
        super("Start");
    }

    preload(){
        
    }

    create(){
        this.add.text((config.width/2)-500,(config.height/2)-150, "Food Truck Driver Commits Domestic Terrorism", {
            fontFamily: 'Times, serif',
            fontSize: 50,
            wordWrap: {
                width: 1000
            }
        });

        this.add.text((config.width/2)-100,(config.height/2), "Start: Press Space",{
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
            this.scene.start("Level1");
        }
    }
}