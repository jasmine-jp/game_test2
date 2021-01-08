"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = __importDefault(require("./manager"));
window.onload = function () {
    manager_1.default.start({
        width: 1100,
        height: 575,
        canvas: document.getElementById("canvas")
    });
};
