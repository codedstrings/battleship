class GameBoard{
    constructor(){
        this.board = Array(10).fill(null).map(() => Array(10).fill(null));
        this.missedShots = [];
    }
    placeShip(ship, x, y, isVertical){
        if(isVertical){
            for(let i=0; i<ship.length; i++){
                if(this.#isPlacementValid(x+i, y)) {
                    this.board[x+i][y] = ship;
                } else {
                    return false;
                }
            }
        }else{
            for(let i=0; i<ship.length; i++){
                if(this.#isPlacementValid(x, y+i)) {
                    this.board[x][y+i] = ship;
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    #isPlacementValid(x, y) {
        return x >= 0 && x < 10 && y >= 0 && y < 10 && this.board[x][y] === null;
    }
}
exports.GameBoard = GameBoard;