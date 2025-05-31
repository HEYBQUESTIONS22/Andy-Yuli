// main.js
let config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  parent: 'gameContainer'
};

let game = new Phaser.Game(config);
let player, cursors, background;

function preload() {
  this.load.image('city', 'assets/backgrounds/city.png');
  this.load.image('ground', 'assets/sprites/ground.png');
  this.load.spritesheet('andy', 'assets/sprites/andy.png', {
    frameWidth: 32,
    frameHeight: 48
  });
}

function create() {
  background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'city').setOrigin(0).setScrollFactor(0);

  const ground = this.physics.add.staticGroup();
  ground.create(400, this.scale.height - 64, 'ground').setScale(2).refreshBody();

  player = this.physics.add.sprite(100, this.scale.height - 150, 'andy');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('andy', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'andy', frame: 4 } ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('andy', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  this.physics.add.collider(player, ground);

  cursors = this.input.keyboard.createCursorKeys();

  document.getElementById('startBtn').onclick = () => {
    document.getElementById('menu').style.display = 'none';
  }
}

function update() {
  background.tilePositionX += 0.5;

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}