import Piece from "./piece.js";

class Grid {
  constructor(width, height, context, canvas) {
      let theGrid = [];
      for (let i = 0; i < height; i ++ ) {
        theGrid.push(new Array(width).fill(0));
      }
      this.grid = theGrid;

    this.canvas = canvas;
    this.context = context;

}

  destroyRow() {
    let fullRows = [];
    this.grid.forEach((row, rowNumber) => {
      if (row.every(val => val !== 0)) {
        fullRows.push(rowNumber);
      }
    });
    if (fullRows.length > 0 ) {
      fullRows.forEach(rowNum => {
        this.grid.splice(rowNum, 1);
        this.grid.unshift(new Array(10).fill(0));
      });
    }
  }

  isGameOver() {
    if (this.grid[0].some(el => el !== 0)) {
      console.log("Game Over");
      this.grid = this.grid.map(row => {
        return row.map(value => 0);
      });
    }
  }


  draw(playedPiece, images) {
    this.context.fillStyle = '#4b1a05';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    Piece.drawPiece(this.grid, {x: 0, y: 0}, this.context, images);
    Piece.drawPiece(playedPiece.form, playedPiece.pos, this.context, images);
  }


  mergePiece(playedPiece) {
    playedPiece.form.forEach((row, y) => {
      row.forEach((val, x) => {

        if (val !== 0) {
          this.grid[y+playedPiece.pos.y][x+playedPiece.pos.x] = val;
        }
      });
    });
  }

  hitBottom(playedPiece) {
    playedPiece.pos.y ++;
    if (this.collide(playedPiece)) {
      playedPiece.pos.y --;
      this.mergePiece(playedPiece);
      playedPiece.pos.y = 0;
      playedPiece = Piece.newPlayedPiece();
    }
    this.destroyRow();
    this.isGameOver();
    return playedPiece;
  }


    collide(playedPiece) {
      const form = playedPiece.form;
      const pos = playedPiece.pos;
      for (let y = 0; y < form.length; y++) {
        for (let x = 0; x < form[y].length; x++) {
          if (form[y][x] !== 0 &&
              (this.grid[y + pos.y] &&
              this.grid[y+pos.y][x+pos.x]) !== 0) {
                return true;
          }
        }
      }
      return false;
    }

    rotate(piece) {
      piece = piece.reverse();
      let result = new Array(piece[0].length).fill(true).map(el => []);

      for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[0].length; j++) {
          result[j].push(piece[i][j]);
        }
      }
      return result;
    }



}

export default Grid;
