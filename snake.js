"use strict";

import Controller from "./controller.js";

window.addEventListener("load", start);

function start(){
    let controller = new Controller();
    controller.setGrid(20, 30);
    controller.startGame();
}

