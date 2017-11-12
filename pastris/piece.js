const pieceColors = ["#2df2f0", "#0000f0", "#eea006", "#f0f409", "#2ef604", "#9c00f0", "#ed0005"];
const blockSize = 20;

const letterShapes = "IJLOSTZ";


const Piece = {

    buildPiece: (letter) => {
      if (letter === "I") {
        return [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0]
        ];
      } else if (letter === "J") {
        return [
          [0, 2, 0],
          [0, 2, 0],
          [2, 2, 0]
        ];
      } else if (letter === "L") {
        return [
          [0, 3, 0],
          [0, 3, 0],
          [0, 3, 3]
        ];
      } else if (letter === "O") {
        return [
          [4, 4],
          [4, 4]
        ];
      } else if (letter === "S") {
        return [
          [0, 0, 0],
          [0, 5, 5],
          [5, 5, 0]
        ];
      } else if (letter === "T") {
        return [
          [0, 0, 0],
          [6, 6, 6],
          [0, 6, 0]
        ];
      } else if (letter === "Z") {
        return [
          [0, 0, 0],
          [7, 7, 0],
          [0, 7, 7]
        ];
      }
    },

    drawPiece: (piece, move, context) => {
      piece.forEach((row, y) => {
        row.forEach((val, x) => {
          if (val !== 0) {
            context.fillStyle = pieceColors[val-1];
            context.fillRect(blockSize * (x + move.x), blockSize * (y + move.y), blockSize, blockSize);
          }
        });
      });
    },


    newPlayedPiece: () => {
        return {
          pos: {x: 3, y: 0},
          form: Piece.buildPiece(letterShapes[Math.floor(Math.random() * 7)])
        };
    }


};

export default Piece;
