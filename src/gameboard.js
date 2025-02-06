class GameBoard{
    constructor(){
        this.board = Array(10).fill(null).map(() => Array(10).fill(null));
        this.missedShots = [];
        this.allHits = [];
        this.allShips = [];
    }
    placeShip(ship, x, y, isVertical){
        if(!this.#isPlacementValid(x, y, ship.length, isVertical)){
            return false;
        }
        for(let i=0; i<ship.length; i++){
            isVertical ? 
                this.board[x+i][y] = ship:
                this.board[x][y+i] = ship;
        }

        this.allShips.push(ship);
        return true;
    }

    #isPlacementValid(x, y, length, isVertical) {
        // Check if ship is out of bounds
        if(isVertical){
            if(x + length > 10){
                return false;
            }
        }else{
            if(y + length > 10){
                return false;
            }
        }

        //check if ship's space is already occupied
        for(let i=0; i<length; i++){
            if(isVertical){
                if(this.board[x+i][y] !== null){
                    return false;
                }
            }else{
                if(this.board[x][y+i] !== null){
                    return false;
                }
            }
        }
        
        //todo : check if any adjacent spaces are occupied

        return true;
    }

    receiveAttack(x, y){
        const alreadyAttacked = this.allHits.find(([hitX, hitY]) => hitX === x && hitY === y) ||
            this.missedShots.find(([missX, missY]) => missX === x && missY === y);

        if(x < 0 || x > 9 || y < 0 || y > 9 || alreadyAttacked){
            throw new Error('Invalid attack coordinates');
        }
        if(this.board[x][y] === null){
            this.missedShots.push([x, y]);
        }else{
            //call ships hit function
            this.board[x][y].hit();
            this.allHits.push([x, y]);

            if (this.board[x][y].isSunk) {
                console.log('Ship has been sunk!');
            }
        }
    }
    
    allSunk(){
        return this.allShips.every(ship => ship.isSunk);
    }
    
}
exports.GameBoard = GameBoard;