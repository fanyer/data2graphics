///////////////////////
var data = [1, 1, 2, 3, 5, 8, 13];

var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = window.innerHeight

context.globalAlpha = 0.2

var width = canvas.width,
    height = canvas.height,
    radius = Math.min(width, height) / 2;

context.translate(width / 2, height / 2)

var colors = [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
    "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];

var innerRadius = 150,
    outerRadius = 300

var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0)
    .endAngle(Math.PI * 2)
    .context(context);



context.beginPath();
arc()
context.fillStyle = colors[1];
context.fill();
