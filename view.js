"use strict";

export default class View {
    constructor(controller){
        this.controller = controller;

    }

    gridheight = 0;
    gridwidth = 0;

    setSize(height, width){
        this.gridheight = height;
        this.gridwidth = width;
    }

    displayBoard(model){
        const cells = document.querySelectorAll("#grid .cell");
        for (let row = 0; row < this.gridheight; row++) {
          for (let col = 0; col < this.gridwidth; col++) {
            const index = row * this.gridwidth + col;
      
            switch (model.readFromCell(row, col)) {
              case 0:
                cells[index].classList.remove("player", "goal");
                break;
              case 1: // Note: doesn't remove goal if previously set
                cells[index].classList.add("player");
                cells[index].classList.remove("goal");
                break;
              case 2: // Note: doesn't remove player if previously set
                cells[index].classList.add("goal");
                break;
            }
          }
        }
    }

    createView(){
        const board = document.querySelector("#grid");
        board.style.setProperty("--GRID_WIDTH", this.gridwidth);
        for(let row = 0; row < this.gridheight; row++){
            for(let col = 0; col < this.gridwidth; col++){
                const cell = document.createElement("div");
                cell.classList.add("cell");
                board.appendChild(cell);
            }
        }
        
    
    }
}