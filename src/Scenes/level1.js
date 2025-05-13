class level1 extends Phaser.Scene{

    constructor(){
        super("Level1");

        this.my = {sprite: {},text: {}};

        this.trailerHit = false;
        this.cabinHit = false;

        this.playerSpeed = 13;
        this.bulletSpeed = 15;

        this.bulletCooldown = 3;        // Number of update() calls to wait before making a new bullet
        this.bulletCooldownCounter = 0;

        this.my.sprite.bullet = [];   
        this.maxBullets = 10;           // Don't create more than this many bullets

        this.my.sprite.emittedBullet = [];

        this.myScore = 0;

        this.my.sprite.sedans =[]
        this.maxSedans = 7;

        this.my.sprite.sedanBlue = []
        this.maxSedanBlue = 3;

        this.my.sprite.tow = []
        this.maxTow = 4;

        this.myScore = 0;

        this.playerHealth = 10;

        this.waveOne = true;
        this.waveTwo = false;
        this.waveThree = false;

        this.currentWave = 0;
    }

    init_game(){
        this.myScore = 0;
        this.my.sprite.bullet = [];
        this.my.sprite.sedans = [];
        this.my.sprite.sedanBlue = [];
        this.my.sprite.tow = [];
        this.waveOne = true;
        this.partOne = true;
        this.currentWave = 0;
        this.playerHealth = 10;
        this.my.sprite.emittedBullet = [];
    }

    preload(){

        this.load.setPath("./assets/");

        this.load.image("hotdog","hotdog.png");
        this.load.image("bullet","projectile.png");

        this.load.atlasXML("vehicles","spritesheet_complete.png","spritesheet_complete.xml");
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");

        this.load.image("whitePuff00", "whitePuff00.png");
        this.load.image("whitePuff01", "whitePuff01.png");
        this.load.image("whitePuff02", "whitePuff02.png");
        this.load.image("whitePuff03", "whitePuff03.png");

        this.load.image("sedan","sedan.png");
        this.load.image("sedanBlue","sedan_blue.png");
        this.load.image("tow","towtruck.png");
        this.load.image("tire","tire.png");

    }

    create(){
        this.init_game();

        let my = this.my;

        this.up = this.input.keyboard.addKey("W");
        this.down = this.input.keyboard.addKey("S");
        this.shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.start = this.input.keyboard.addKey("Q");

        my.text.score = this.add.bitmapText(10, 0, "rocketSquare", "Score " + this.myScore);
        my.text.lives = this.add.bitmapText(config.width-200, 0, "rocketSquare", "Lives: " + this.playerHealth);

        document.getElementById('description').innerHTML = '<h2>Array Boom.js</h2><br>W: Up// S: Down // Space: fire/emit'

        this.timerEvent = this.time.addEvent({
            delay: 60000, // Delay in milliseconds (1000 = 1 second)
            callback: this.updateTimer(), // The function to call when the timer fires
            callbackScope: this, // The context in which the callback function is executed
            loop: false // Whether the timer should repeat indefinitely
          });

        this.waveDelay = this.time.addEvent({
            delay: 20000, // Delay in milliseconds (1000 = 1 second)
            callback: this.nextWave(), // The function to call when the timer fires
            callbackScope: this, // The context in which the callback function is executed
            loop: true // Whether the timer should repeat indefinitely
        });
          
/*
        my.sprite.sedan = this.add.sprite(game.config.width-200,500,"vehicles","sedan.png");
        my.sprite.sedan.setScale(2.5);
        my.sprite.sedan.scorePoints = 25;
*/
        my.sprite.trailer = this.add.sprite(game.config.width-200,500,"vehicles","trucktank_trailer.png");
        my.sprite.trailer.setScale(2.5);
        my.sprite.trailer.scorePoints = 25;

        my.sprite.cabin = this.add.sprite(game.config.width-150,500,"vehicles","truckcabin_vintage.png");
        my.sprite.cabin.setScale(2.5);
        my.sprite.cabin.setPoints = 25;

        /*
        my.sprite.police = this.add.sprite(game.config.width, game.config.height/2, "vehicles","police.png");
        my.sprite.police.setScale(2.5);
        my.sprite.police.scorePoints = 25;

        */
        my.sprite.player = new player(this,100,game.config.height/2,"hotdog",null,this.up,this.down,this.playerSpeed);
        my.sprite.player.setScale(2);

        this.anims.create({
            key: "puff",
            frames: [
                { key: "whitePuff00" },
                { key: "whitePuff01" },
                { key: "whitePuff02" },
                { key: "whitePuff03" },
            ],
            frameRate: 20,    // Note: case sensitive (thank you Ivy!)
            repeat: 5,
            hideOnComplete: true
        });

    }



    update(){
        let my = this.my;

       // Setting the the Vehicle's speed when it spawns
       /*
        if(my.sprite.sedan.visible){
            my.sprite.sedan.x -= 15;
        }
        */
        if(my.sprite.trailer.visible){
            my.sprite.trailer.x -= 10;
        }
        if(my.sprite.cabin.visible){
            my.sprite.cabin.x -= 10
        }

        // Code for the first wave
        if(true){
            

            if (my.sprite.sedans.length < this.maxSedans) {
                my.sprite.sedans.push(this.add.sprite(
                    game.config.width+100, Math.random()*config.height, "sedan")
                );
            }
                my.sprite.sedans = my.sprite.sedans.filter((sedans) => sedans.x+400 >  (sedans.displayWidth/2));


            for(let sedan of my.sprite.sedans){
                sedan.setScale(2.5);
                sedan.scorePoints = 25;
                sedan.x -= 15
                this.vehicleCollision(my.sprite.player,sedan);
            }

            // Enemy 2
            if (my.sprite.sedanBlue.length < this.maxSedanBlue) {
                my.sprite.sedanBlue.push(this.add.sprite(
                    game.config.width+700, Math.random()*config.height, "sedanBlue")
                );
            }
            for(let sedan of my.sprite.sedanBlue){
                sedan.setScale(2.5);
                sedan.scorePoints = 50;
                if(sedan.x > config.width-400){
                    sedan.x -= 18;
                }
                if(sedan.x <= config.width-400 && sedan.x > config.width-800){
                    sedan.x -= 10;
                    sedan.y += 3;
                }
                if(sedan.x <= config.width-800 && sedan.x > config.width-1200){
                    sedan.x -= 15;
                    sedan.y -= 5;
                }
                else{
                    sedan.x -= 15;
                }
                this.vehicleCollision(my.sprite.player,sedan);
            }
            my.sprite.sedanBlue = my.sprite.sedanBlue.filter((sedanBlue) => sedanBlue.x+400 >  (sedanBlue.displayWidth/2));

            // Enemy 3
            if (my.sprite.tow.length < this.maxTow) {
                my.sprite.tow.push(this.add.sprite(
                    game.config.width+500, Math.random()*config.height, "tow")
                );
            }
            my.sprite.tow = my.sprite.tow.filter((tow) => tow.x+400 >  (tow.displayWidth/2));
            for(let tow of my.sprite.tow){
                tow.setScale(2.5);
                tow.scorePoints = 100;
                tow.x -= 5;
                
                if(tow.x == config.width-100){
                    console.log("added")
                    my.sprite.emittedBullet.push(this.add.sprite(
                        tow.x, tow.y, "tire")
                    );
                }
                if(tow.x == config.width-300){
                    my.sprite.emittedBullet.push(this.add.sprite(
                        tow.x, tow.y, "tire")
                    );
                }
                if(tow.x <= config.width -500 && tow.x > config.width-700){
                    tow.y +=3;
                    if(tow.x == config.width-600){
                        my.sprite.emittedBullet.push(this.add.sprite(
                            tow.x, tow.y, "tire")
                        );
                    }
                }
                if(tow.x <= config.width-700 && tow.x > config.width-900){
                    tow.y -=4;
                    if(tow.x == config.width-800){
                        my.sprite.emittedBullet.push(this.add.sprite(
                            tow.x, tow.y, "tire")
                        );
                    }
                }
                this.vehicleCollision(my.sprite.player,tow);
            }

            for(let tire of my.sprite.emittedBullet){
                tire.setScale(2.5);
                tire.x -= 20;
                tire.scorepoints = 10;
                this.vehicleCollision(my.sprite.player,tire);
            }
            my.sprite.emittedBullet = my.sprite.emittedBullet.filter((emittedBullet) => emittedBullet.x+400 >  (emittedBullet .displayWidth/2));


            //Handle bullet collisions with all vehicles
            for (let bullet of my.sprite.bullet) {
            for(let sedan of my.sprite.sedans){
                this.bulletCollision(bullet,sedan);
            }
            for(let sedan of my.sprite.sedanBlue){
                this.bulletCollision(bullet,sedan);
            }
            for(let tow of my.sprite.tow){
                this.bulletCollision(bullet,tow);
            }
            this.groupBullet(bullet,my.sprite.trailer,my.sprite.cabin,this.hit1,this.hit2)
            }
        }


        if (Phaser.Input.Keyboard.JustDown(this.shoot)) {
            // Are we under our bullet quota?
            if (my.sprite.bullet.length < this.maxBullets) {
                my.sprite.bullet.push(this.add.sprite(
                    my.sprite.player.x, my.sprite.player.y-(my.sprite.player.displayHeight/3), "bullet")
                );
            }
        }

        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y >  -(bullet.displayHeight/2));
         
        // set bullets that go off screen to be deleted next tick
        for(let bullet of my.sprite.bullet){
            if (bullet.x  > (game.config.width)){
                bullet.y = -100; 
            }
        }

        // Boundary Checks
        this.groupBounds(my.sprite.trailer,my.sprite.cabin);

        //Checks for if a vehicle collides with the player
        this.groupCollision(my.sprite.player,my.sprite.trailer,my.sprite.cabin,this.hit1,this.hit2)

        //Handle bullet collisions with all vehicles
        for (let bullet of my.sprite.bullet) {
            this.groupBullet(bullet,my.sprite.trailer,my.sprite.cabin,this.hit1,this.hit2)
        }


        for (let bullet of my.sprite.bullet) {
            bullet.x += this.bulletSpeed;
        }

        my.sprite.player.update();
        if(this.timerEvent.getElapsed() >= 30000){
            this.scene.start("End");
        }

        if(this.playerHealth == 0){
            this.scene.start("End");
        }
    }





    vehicleCollision(player,vehicle){
        if (this.collides(vehicle, player)) {
            // start animation
            this.puff = this.add.sprite(vehicle.x, vehicle.y, "whitePuff03").setScale(0.25).play("puff");
            // clear out bullet -- put x offscreen, will get reaped next update
            vehicle.visible = false;
            vehicle.x = -100;
            // Update score
            this.myScore -= vehicle.scorePoints;
            this.updateScore();
            this.playerHealth -= 1;
            this.updateLives();
            //this.updateScore();
            // Have new vehicle appear after end of animation
            this.puff.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                vehicle.visible = true;
                vehicle.y = Math.random()*config.height/2;
            }, this);

        }

    }

    // Checks whether a bullet has collided with a vehicle
    bulletCollision(bullet,vehicle,points){
        if (this.collides(vehicle, bullet)) {
            // start animation
            this.puff = this.add.sprite(vehicle.x, vehicle.y, "whitePuff03").setScale(0.25).play("puff");
            // clear out bullet -- put x offscreen, will get reaped next update
            bullet.y = -100;
            vehicle.visible = false;
            // Update score
            this.myScore += vehicle.scorePoints;
            this.updateScore();
            // Have new vehicle appear after end of animation
            this.puff.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                vehicle.visible = true;
                vehicle.y = Math.random()*config.height/2;
                vehicle.x = game.config.width+100;
            }, this);

        }
    }

    // Checks if a vehicles is within the bounds of the game
    boundaryCheck(vehicle){
        //Checks if the given vehicle has gone off screen
        if(vehicle.x < -90){
            vehicle.y = Math.random()*config.height;
            vehicle.x = config.width+100;
        }

        // Set a constraint on the height that vehicles can spawn
        // this prevents vehicles from "clipping" into the upper and lower boundaries
        if(vehicle.y < 50 || vehicle.y > game.config.height-50){
            vehicle.y = Math.random()*config.height/2;
        }

    }

    // Collision checker
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    // score updater
    updateScore() {
        let my = this.my;
        my.text.score.setText("Score " + this.myScore);
    }

    // Life updater
    updateLives(){
        let my = this.my;
        my.text.lives.setText("Lives: "+this.playerHealth);
    }

    // Collision checker for pairs of objects
    groupBullet(bullet,vehicle1,vehicle2,hit1,hit2){

        // Checks if object one was hit
        if(this.collides(bullet,vehicle1)){
            this.puff = this.add.sprite(vehicle1.x, vehicle1.y, "whitePuff03").setScale(0.25).play("puff");
            hit1 = true;
            bullet.y = -100;
            vehicle1.visible = false;
            vehicle1.x = -150
            this.myScore += vehicle1.scorePoints;
            this.updateScore();
        }
        // Checks if object two was hit
        if(this.collides(bullet,vehicle2)){
            this.puff = this.add.sprite(vehicle2.x, vehicle2.y, "whitePuff03").setScale(0.25).play("puff");
            hit2 = true;
            bullet.y = -100;
            vehicle2.visible = false;
            vehicle2.x = -150
            this.myScore += vehicle2.scorePoints;
            this.updateScore();
        }
            

        if(hit1 == true && hit2 == true){
            vehicle1.visible = true;
            vehicle2.visible = true;
            vehicle1.x = game.config.width + 100;
            vehicle2.x = game.config.width + 150;
            let y = Math.random()*config.height/2;
            if(y < 50 || y > game.config.height-50){
                y = Math.random()*config.height/2;
            }
            vehicle1.y = y;
            vehicle2.y = y;
            hit1 = false;
            hit2 = false;
            
        }


    }
    groupBounds(vehicle1,vehicle2){
        if(vehicle1.x < -100 && vehicle2.x < -100){
            vehicle1.visible = true;
            vehicle2.visible = true;
            vehicle1.x = game.config.width + 100;
            vehicle2.x = game.config.width + 150;
            let y = Math.random()*config.height/2;
            if(y < 50 || y > game.config.height-50){
                y = Math.random()*config.height/2;
            }
            vehicle1.y = y;
            vehicle2.y = y;
        }
    }

    groupCollision(player,vehicle1,vehicle2,hit1,hit2){
        if(this.collides(player,vehicle1)){
            this.puff = this.add.sprite(vehicle1.x, vehicle1.y, "whitePuff03").setScale(0.25).play("puff");
            hit1 = true;
            vehicle1.visible = false;
            vehicle1.x = -150
            this.myScore -= vehicle1.scorePoints;
            this.updateScore();
            this.playerHealth -=1;
            this.updateLives();
        }
        // Checks if object two was hit
        if(this.collides(player,vehicle2)){
            this.puff = this.add.sprite(vehicle2.x, vehicle2.y, "whitePuff03").setScale(0.25).play("puff");
            hit2 = true;
            vehicle2.visible = false;
            vehicle2.x = -150
            this.myScore -= vehicle2.scorePoints;
            this.updateScore();
            this.playerHealth -=1;
            this.updateLives();
        }

    }

    updateTimer(){
        // Update the timer display or perform other actions here
        console.log('Timer event fired!');
      }

    nextWave(){
        if(this.currentWave == 0){
            this.waveOne = false;
            this.waveTwo = true;
        }
        if(this.currentWave == 1){
            this.waveTwo = false;
            this.waveThree = true;
        }
        this.currentWave +=1;
    }
}
