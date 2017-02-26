var data = [1, 1, 2, 3, 5, 8, 13];

var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = window.innerHeight


var width = canvas.width,
    height = canvas.height,
    radius = Math.min(width, height) / 2;

context.translate(width / 2, height / 2)

var colors = [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
    "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];

var innerRadius = 100,
    outerRadius = 300

// context.beginPath();
// context.rect(0,100, 100, 50)
// context.fillStyle = colors[1];
// context.fill();


// draw a arc
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
context.setLineDash([5, 5]);
context.strokeStyle = colors[2];
context.stroke();

///////////////radial
var lineData = []
var pi = Math.PI

for (var i = 0; i < 200; i++) {
  var r = d3.randomUniform(120, 270)()
  lineData.push([r*Math.cos(2*pi/200*(i+1)),r*Math.sin(2*pi/200*(i+1))])
}


var radial=d3.line()
  // .curve(d3.curveBasisClosed)
  .context(context);

context.setLineDash([5, 0]);
context.beginPath()
radial(lineData)
context.strokeStyle = '#000'
context.stroke()