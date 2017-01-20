import './basic.css'
import * as d3 from 'd3'

var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");


var width = window.innerWidth,
    height = window.innerHeight * 0.7,
    radius = Math.min(width, height) / 2;

console.log(d3.range(20))
canvas.width = width;
canvas.height = height;

context.globalAlpha = 1
context.translate(width/2,height/2)

var arc = d3.arc()
.outerRadius(radius)
.innerRadius(radius*2)
.startAngle(0)
    .endAngle(Math.PI * 2)
.context(context);

context.beginPath();
arc()

context.strokeStyle = '#000'
context.stroke()
