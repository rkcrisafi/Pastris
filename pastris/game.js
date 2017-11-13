import Grid from "./grid.js";
import Piece from "./piece.js";


class Game {
  constructor () {
    this.canvas = document.getElementById('canvas');
    this.canvas.setAttribute("width", 200);
    this.canvas.setAttribute("height", 420);
    this.context = canvas.getContext('2d');

    this.images = this.loadImages();
    setTimeout(() => this.startNewGame(), 100);

  }

  startNewGame() {

    this.context.fillStyle = '#ffffff';
    this.context.fillRect(0, 0, canvas.width, canvas.height);

    this.field = new Grid(10, 21, this.context, this.canvas);
    this.playedPiece = Piece.newPlayedPiece();
    this.deleteEventListener();
    this.setEventListener();
    this.paused = false;
    this.restart = false;

    this.dropCounter = 0;
    this.fallingInterval = 1000;
    this.previousTime = 0;
    this.update();
  }

  loadImages() {
    const imageSources = ["images/banana_bread.png", "images/cherry_cake.png", "images/cookie.png", "images/cupcake.png", "images/donut.png", "images/ice_cream.png", "images/lolipop.png"];
    return imageSources.map(source => {
      const img = new Image();
      img.src = source;
      return img;
    });

  }


  update(time = 0) {

    if (!this.paused) {
      const delta = time - this.previousTime;
      this.previousTime = time;

      this.dropCounter += delta;
      if (this.dropCounter > this.fallingInterval) {

        this.playedPiece = this.field.hitBottom(this.playedPiece);
        this.dropCounter = 0;
        if (this.field.score >= 135000) {
          this.fallingInterval = 100;
        } else if (this.field.score >= 45000) {
          this.fallingInterval = 250;
        } else if (this.field.score >= 15000){
          this.fallingInterval = 500;
        } else if (this.field.score >= 5000) {
          this.fallingInterval = 750;
        }
      }
      this.field.draw(this.playedPiece, this.images);
    }
    if (!this.field.gameOver) {
      requestAnimationFrame(this.update.bind(this));
    } else {
      this.drawGameOver();

    }
  }

  drawGameOver () {
    this.context.font = '40px serif';
    this.context.fillStyle = "red";
    this.context.fillText('Game Over', 8, 220);
  }

  onKeydown (e) {
    if (e.key === "ArrowDown" && (!this.paused)) {
      this.playedPiece = this.field.hitBottom(this.playedPiece);
    } else if (e.key === "ArrowLeft" && !this.paused) {
      this.playedPiece.pos.x --;
      if (this.field.collide(this.playedPiece)) {
        this.playedPiece.pos.x ++;
      }
    } else if (e.key === "ArrowRight" && !this.paused) {
      this.playedPiece.pos.x ++;
      if (this.field.collide(this.playedPiece)) {
        this.playedPiece.pos.x --;
      }
    } else if (e.key === "ArrowUp" && !this.paused) {
      let originalPiece = this.playedPiece.form.map(el => el.slice());
      this.playedPiece.form = this.field.rotate(this.playedPiece.form);
      if (this.field.collide(this.playedPiece)) {
        this.playedPiece.form = originalPiece;
      }
    } else if (e.key === "p") {
      this.paused = this.paused ? false : true;
    } else if (e.key === "s") {
      this.startNewGame();
    }
  }

  setEventListener() {
    this.onKeydown = this.onKeydown.bind(this);
    document.addEventListener('keydown', this.onKeydown);
  }

  deleteEventListener () {
    document.removeEventListener('keydown', this.onKeydown);
  }

}

function startGame(e) {
  if (e.key === "s") {
    let game = new Game();
    document.removeEventListener("keydown", startGame);
  }
}

document.addEventListener("keydown", startGame);
// game1.startNewGame();
