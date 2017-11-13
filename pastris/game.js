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
    this.score = 0;

    this.dropCounter = 0;
    this.fallingInterval = 500;
    this.previousTime = 0;
    this.update();
  }

  loadImages() {
    const imageSources = ["images/banana_bread.png", "images/cherry_cake.png", "images/croissant.png", "images/cupcake.png", "images/donut.png", "images/ice_cream.png", "images/lolipop.png"];
    return imageSources.map(source => {
      const img = new Image();
      img.src = source;
      return img;
    });

  }


  update(time = 0) {
    // const delta = time - this.previousTime;
    // // this.previousTime = time;
    // //
    // // this.dropCounter += delta;
    // // if (this.dropCounter > this.fallingInterval) {
    // //
    // //   this.playedPiece = this.field.hitBottom(this.playedPiece);
    // //   this.dropCounter = 0;
    // // }
    if (this.restart) {
      this.startNewGame();
      this.restart = false;
    }
    if (!this.paused) {
      const delta = time - this.previousTime;
      this.previousTime = time;

      this.dropCounter += delta;
      if (this.dropCounter > this.fallingInterval) {

        this.playedPiece = this.field.hitBottom(this.playedPiece);
        this.dropCounter = 0;
      }
      this.field.draw(this.playedPiece, this.images);
    }
    requestAnimationFrame(this.update.bind(this));
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
    } else if (e.key === "r") {
      this.restart = true;
    }
  }

  setEventListener() {
    this.onKeydown = this.onKeydown.bind(this);
    document.addEventListener('keydown', this.onKeydown);
  }

  deleteEventListener () {
    // this.onKeydown = this.onKeydown.bind(this);

    document.removeEventListener('keydown', this.onKeydown);
  }
}

document.addEventListener("DOMContentLoaded", () => {
    let game1 = new Game();
    }
  );
// game1.startNewGame();
