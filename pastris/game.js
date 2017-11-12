import Grid from "./grid.js";
import Piece from "./piece.js";


class Game {
  constructor () {
    this.canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');

  }

  startNewGame() {

    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, canvas.width, canvas.height);

    this.field = new Grid(10, 21, this.context, this.canvas);
    this.playedPiece = Piece.newPlayedPiece();
    this.deleteEventListener();
    this.setEventListener();

    this.dropCounter = 0;
    this.fallingInterval = 500;
    this.previousTime = 0;

    this.update();
  }


  update(time = 0) {
    const delta = time - this.previousTime;
    this.previousTime = time;

    this.dropCounter += delta;
    if (this.dropCounter > this.fallingInterval) {

      this.playedPiece = this.field.hitBottom(this.playedPiece);
      this.dropCounter = 0;
    }

    this.field.draw(this.playedPiece);
    requestAnimationFrame(this.update.bind(this));
  }

  onKeydown (e) {
    if (e.key === "ArrowDown") {
      this.playedPiece = this.field.hitBottom(this.playedPiece);
    } else if (e.key === "ArrowLeft") {
      this.playedPiece.pos.x --;
      if (this.field.collide(this.playedPiece)) {
        this.playedPiece.pos.x ++;
      }
    } else if (e.key === "ArrowRight") {
      this.playedPiece.pos.x ++;
      if (this.field.collide(this.playedPiece)) {
        this.playedPiece.pos.x --;
      }
    } else if (e.key === "ArrowUp") {
      let originalPiece = this.playedPiece.form.map(el => el.slice());
      this.playedPiece.form = this.field.rotate(this.playedPiece.form);
      if (this.field.collide(this.playedPiece)) {
        this.playedPiece.form = originalPiece;
      }

    }
  }

  setEventListener() {
    document.addEventListener('keydown', this.onKeydown.bind(this));
  }

  deleteEventListener () {
    document.removeEventListener('keydown', this.onKeydown.bind(this));
  }
}

let game1 = new Game();
game1.startNewGame();
