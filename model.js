"use strict";

import Queue from "./queue.js";

export default class Model {
    constructor(){
        this.model = [];
        this.queue = new Queue();
    }

    direction = null;

    controls = {
        up: false,
        down: false,
        left: false,
        right: false
    }

    writeToCell(row, col, value){
        this.model[row][col] = value;
    }

    readFromCell(row, col){
        return this.model[row][col];
    }

    createModel(gridheight, gridwidth){
        for(let row = 0; row < gridheight; row++){
            const newRow = [];
            for(let col = 0; col < gridwidth; col++){
                newRow[col] = 0;
            }
            this.model[row] = newRow;
        }
    }

    updateModel(value){
        
        for (let i = 0; i < this.queue.size; i++){
            let part = this.queue.get(i);
            this.writeToCell(part.row, part.col, value);
        } 

        /* let part1 = this.queue.get(0);
        let part2 = this.queue.get(1);
        this.writeToCell(part1.row, part1.col, value);
        this.writeToCell(part2.row, part2.col, value); */
 
    }

    checkForDeath(){
        const head = this.queue.getFirst().data;
        for(let i = 1; i < this.queue.size; i++){
            let part = this.queue.get(i);
            if(head.row == part.row && head.col == part.col){
                return true;
            }
        }
        console.log("not death")
        return false;
    }
}