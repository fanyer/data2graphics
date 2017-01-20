var data = [1, 1, 2, 3, 5, 8, 13];

var colors = [
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];


var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

canvas.width=1000;
canvas.height=800;


var width = canvas.width,
    height = canvas.height,
    radius = Math.min(width, height) / 2;

var radius= d3.range(100,300,10)



context.translate(width / 2, height / 2);

context.beginPath();
console.log(radius)
context.setLineDash([5,5])

radius.forEach(function (i) {
    var arc = d3.arc()
    .outerRadius(i)
    .innerRadius(0)
    .startAngle(0)
    .endAngle(Math.PI*2)
    .context(context);
    arc()
})



context.strokeStyle = colors[2];
context.stroke();
