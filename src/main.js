// Iain Klotzbach
// Created: 4/30/2025
// Phaser: 3.70.0
//
// Yeet
//
// 
// 
// 
// Art assets from Kenny Assets "Pixel Vehicle Pack" set:
// https://kenney.nl/assets/pixel-vehicle-pack

"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1400,
    height: 800,
    scene: [start,end,level1],
    fps: { forceSetTimeOut: true, target: 60 }   
}

const game = new Phaser.Game(config);