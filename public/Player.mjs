import GameConfig from "./GameConfig.js";

class Player {
  constructor({x, y, score, id}) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
    this.speed = 5;
    this.width = 50;
    this.height = 50;
    this.color = '#ccc';
    this.alive = true;
    this.rank = 0;
    this.socketId = null;
  }

  movePlayer(dir, speed) {
    if (dir === 'left') {
      if (this.x < 0) {
        this.x = 0;
      } else {
        this.x -= speed;
      }
    } else if (dir === 'right') {
      if (this.x > GameConfig.GAME_WIDOW_WIDTH - this.width) {
        this.x = GameConfig.GAME_WIDOW_WIDTH - this.width;
      } else {
        this.x += speed;
      }
    } else if (dir === 'up') {
      if (this.y < 0) {
        this.y = 0;
      } else {
        this.y -= speed;
      }
    } else if (dir === 'down') {
      if (this.y > GameConfig.GAME_WIDOW_HEIGHT - this.height) {
        this.y = GameConfig.GAME_WIDOW_HEIGHT - this.height;
      } else {
        this.y += speed;
      }
    }
  }

  collision(item) {

  }

  calculateRank(arr) {

  }
}

export default Player;
