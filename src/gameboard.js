class GameBoard{
    constructor(){
        this.board = Array(10).fill(null).map(() => Array(10).fill(null));
        this.missedShots = [];
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
        if(this.board[x][y] === null){
            this.missedShots.push([x, y]);
        }else{
            //call ships hit function
            this.board[x][y].hit();
        }
    }
    
    allSunk(){
        return this.allShips.every(ship => ship.isSunk);
    }
    
}
exports.GameBoard = GameBoard;