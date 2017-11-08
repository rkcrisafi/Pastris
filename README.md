## Sample JS Project Proposal: Pastris

### Background

Pastris is a tile-matching puzzle video game.  A random number of pieces in shapes of letters ("L", "J", "O", "T", "S", "Z", "I") fall down one by one until they hit bottom or fall onto other piece. Each piece can be rotated by 90 degrees. The aim of the game is creating horizontal line of ten units with no gaps. That's when the line gets destroyed, and all the blocks above will fall.


### Functionality & MVP  

With Pastris, users will be able to:

- [ ] Start, pause, and reset the game
- [ ] Rotate pieces and move them left and right
- [ ] Accelerate the speed of the pieces

In addition, this project will include:

- [ ] The rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game field and nav links to the Github and my LinkedIn. Game controls will include New Game, Pause, Stop, and Reset buttons as well as Score and Time elapsed displays. On the right, there will be a window where user can see a piece that will come next.


## MainScreen
[[/images/pastry.png]]

### Architecture and Technologies

**NB**: one of the main things you should be researching and deciding upon while you write this proposal is what technologies you plan to use.  Identify and create a plan of attack for the major technical challenges in your project.

This project will be implemented with  `JavaScript` for the game logic using `HTML 5 Canvas` for rendering.

### Implementation Timeline

**Day 1**: Create board and all the pieces

**Day 2**: Rendering rotatable pieces

**Day 3**: Work on landing pieces, movement logic and destroying the rows

**Day 4**: Install the controls for the user to interact with the game. Style the frontend.
