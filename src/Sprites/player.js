class player extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y,texture,frame,upkey,downkey,playerspeed){
        super(scene,x,y,texture,frame);

        this.up = upkey;
        this.down = downkey;

        this.playerSpeed = playerspeed;

        scene.add.existing(this);

    }

    update(){

        if (this.up.isDown) {
            // Check to make sure the sprite can actually move up
            if (this.y > (this.displayHeight/2)) {
                this.y -= this.playerSpeed;
            }
        }

        if(this.down.isDown){
            // Check to make sure sprite can move down
            if(this.y < (game.config.height - (this.displayHeight/2))){
                this.y+=this.playerSpeed;
            }
        }

    }
}