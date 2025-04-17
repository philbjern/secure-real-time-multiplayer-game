import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import GameConfig from './GameConfig.js';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');


const players = []
const collectibles = []

const setup = () => {
  canvas.width = GameConfig.GAME_WIDOW_WIDTH;
  canvas.height = GameConfig.GAME_WIDOW_HEIGHT;

  context.fillStyle = GameConfig.CANVAS_BACKGROUND_COLOR;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const player = new Player({
    x: 100,
    y: 100,
    score: 0,
    id: Date.now(),
  });
  
  const player2 = new Player({
    x: 200,
    y: 200,
    score: 0,
    id: Date.now() + 1,
  });

  players.push(player);
  players.push(player2);
}

const update = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update game objects here
  // e.g., player.update(), collectible.update(), etc.
  players.forEach(player => {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
  });
  

  requestAnimationFrame(update);
}

setup()
while (true) {
  // Game loop
  update();

  // Handle socket events here
  socket.on('playerData', (data) => {
    // Update player data based on server response
    console.log(data);
  });

  socket.on('collectibleData', (data) => {
    // Update collectible data based on server response
    console.log(data);
  });
  socket.on('gameOver', (data) => {
    // Handle game over event
    console.log('Game Over:', data);
  });
}