/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grid_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(2);




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

    this.field = new __WEBPACK_IMPORTED_MODULE_0__grid_js__["a" /* default */](10, 21, this.context, this.canvas);
    this.playedPiece = __WEBPACK_IMPORTED_MODULE_1__piece_js__["a" /* default */].newPlayedPiece();
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


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

    drawPiece: (piece, move, context, images) => {
      piece.forEach((row, y) => {
        row.forEach((val, x) => {
          if (val !== 0) {
            context.drawImage(images[val-1], blockSize*(x+move.x), blockSize*(y+move.y), blockSize, blockSize);
            // context.fillRect(blockSize * (x + move.x), blockSize * (y + move.y), blockSize, blockSize);
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

/* harmony default export */ __webpack_exports__["a"] = (Piece);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece_js__ = __webpack_require__(2);


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

    __WEBPACK_IMPORTED_MODULE_0__piece_js__["a" /* default */].drawPiece(this.grid, {x: 0, y: 0}, this.context, images);
    __WEBPACK_IMPORTED_MODULE_0__piece_js__["a" /* default */].drawPiece(playedPiece.form, playedPiece.pos, this.context, images);
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
      playedPiece = __WEBPACK_IMPORTED_MODULE_0__piece_js__["a" /* default */].newPlayedPiece();
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

/* harmony default export */ __webpack_exports__["a"] = (Grid);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map