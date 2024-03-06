"use strict";

import Model from "./model.js";
import View from "./view.js";

export default class Controller {
    constructor(){
        this.model = new Model();
        this.view = new View(this);
    }

    startGame(){
        document.addEventListener("keydown", this.keyDown.bind(this));
        //document.addEventListener("keyup", this.keyUp.bind(this));
        let payload = {row: this.height/2-1, col: this.width/2-1};
        
        this.model.queue.addFirst(payload);
        console.log(this.model.queue)
        this.generateGoal();
        this.tick();
    }

    numTicks = 0;
    dead = false;
    tick(){
        this.numTicks++;
        
        const run = setTimeout(this.tick.bind(this), 100)
        

        console.log("updating model at tick" + this.numTicks)
        console.log("queue size: " + this.model.queue.size)
        this.model.updateModel(0)

        if(this.model.controls.left){
            this.model.direction = "left";
        } else if(this.model.controls.right){
            this.model.direction = "right";
        } else if(this.model.controls.up){
            this.model.direction = "up";
        } else if(this.model.controls.down){
            this.model.direction = "down";
        }

        const head = this.model.queue.getFirst().data;

        const payload = {
            row: head.row,
            col: head.col
        }
        

        
        switch(this.model.direction){
            case "left":
                payload.col--;
                if(payload.col < 0){
                    payload.col = this.width - 1;
                }
                break;
            case "right":
                payload.col++;
                if(payload.col >= this.width){
                    payload.col = 0;
                }
                break;
            case "up":
                payload.row--;
                if(payload.row < 0){
                    payload.row = this.height - 1;
                }
                break;
            case "down":
                payload.row++;
                if(payload.row >= this.height){
                    payload.row = 0;
                }
                break;
        }

        this.model.queue.addFirst(payload);
        

        if(this.model.readFromCell(payload.row, payload.col) === 2){
            this.goalEaten = true;
            this.model.writeToCell(payload.row, payload.col, 0);
        } else {
            this.model.queue.removeLast();
        }
        

        if(this.goalEaten){
            this.timer++;
            if(this.timer === 3){
                this.goalEaten = false;
                this.generateGoal();
                this.timer = 0;
            }
        }
        if (this.model.checkForDeath()){
            console.log("You died!")
            clearTimeout(run);
            return;
        }
        this.model.updateModel(1);
        this.updateView();
    }

    timer = 0;
    goalEaten = false;

    previusDirection = null;
    keyDown(event){
        if(this.model.direction === "left" && event.key === "ArrowRight" || this.model.direction === "right" && event.key === "ArrowLeft" || this.model.direction === "up" && event.key === "ArrowDown" || this.model.direction === "down" && event.key === "ArrowUp"){
            return;
        } else {
        this.model.controls.left = false;
        this.model.controls.right = false;
        this.model.controls.up = false;
        this.model.controls.down = false;

        if(event.key === "ArrowLeft") {
            this.model.controls.left = true;
          } else if(event.key === "ArrowRight") {
            this.model.controls.right = true;
          } else if(event.key === "ArrowUp") {
            this.model.controls.up = true;
          } else if(event.key === "ArrowDown") {
            this.model.controls.down = true;
          }  
        }
    }

    keyUp(event){
        if(event.key === "ArrowLeft") {
            this.model.controls.left = false;
          } else if(event.key === "ArrowRight") {
            this.model.controls.right = false;
          } else if(event.key === "ArrowUp") {
            this.model.controls.up = false;
          } else if(event.key === "ArrowDown") {
            this.model.controls.down = false;
          }
    }

    setGrid(height, width){
        this.model.createModel(height, width);
        this.view.setSize(height, width);
        this.view.createView();
        this.height = height;
        this.width = width;
    }

    height = 0;
    width = 0;

    updateView(){
        this.view.displayBoard(this.model);
    }

    generateGoal(){
        let row = Math.floor(Math.random() * this.height);
        let col = Math.floor(Math.random() * this.width);
        while(this.model.readFromCell(row, col) !== 0){
            row = Math.floor(Math.random() * this.height);
            col = Math.floor(Math.random() * this.width);
        }
        this.model.writeToCell(row, col, 2);
    }
    
    
}