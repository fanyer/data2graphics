//require('es5-shim-sham');
require('./basic.css')
import * as d3 from 'd3'

/////////////////////////
// var data = [1, 1, 2, 3, 5, 8, 13];

var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = window.innerHeight*0.7

context.globalAlpha = 1

var width = canvas.width,
    height = canvas.height,
    radius = Math.min(width, height) / 2;

