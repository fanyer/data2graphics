//require('es5-shim-sham');
require('./basic.css')
import * as d3 from 'd3'

/////////////////////////
// var data = [1, 1, 2, 3, 5, 8, 13];

// var canvas = document.querySelector("canvas"),
//     context = canvas.getContext("2d");

// canvas.width = window.innerWidth
// canvas.height = window.innerHeight

// context.globalAlpha = 0.2

// var width = canvas.width,
//     height = canvas.height,
//     radius = Math.min(width, height) / 2;

// context.translate(width / 2, height / 2)

// var colors = [
//     "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
//     "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
// ];

// var innerRadius = 100,
//     outerRadius = 300

// // context.beginPath();
// // context.rect(0,100, 100, 50)
// // context.fillStyle = colors[1];
// // context.fill();


// // draw a arc
// var arc = d3.arc()
//     .innerRadius(innerRadius)
//     .outerRadius(outerRadius)
//     .startAngle(0)
//     .endAngle(Math.PI * 2)
//     .context(context);



// context.beginPath();
// arc()
// context.fillStyle = colors[1];
// context.fill();
// context.setLineDash([5, 5]);
// context.strokeStyle = colors[2];
// context.stroke();

// ///////////////radial
// var lineData = []
// var pi = Math.PI

// for (var i = 0; i < 200; i++) {
//   var r = d3.randomUniform(120, 270)()
//   lineData.push([r*Math.cos(2*pi/200*(i+1)),r*Math.sin(2*pi/200*(i+1))])
// }


// var radial=d3.line()
//   // .curve(d3.curveBasisClosed)
//   .context(context);

// context.setLineDash([5, 0]);
// context.beginPath()
// radial(lineData)
// context.strokeStyle = '#000'
// context.stroke()


/////////////////
var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = canvas.width - margin.left - margin.right,
    height = canvas.height - margin.top - margin.bottom;

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleTime()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var line = d3.line()
    .x(function(d) {
        return x(d.date); })
    .y(function(d) {
        return y(d.close); })
    .curve(d3.curveStep)    .context(context);

context.translate(margin.left, margin.top);

d3.tsv("data.tsv", function(d) {
    d.date = parseTime(d.date);
    d.close = +d.close;
    return d;
}, function(error, data) {
    if (error) throw error;

    x.domain(d3.extent(data, function(d) {
        return d.date; }));
    y.domain(d3.extent(data, function(d) {
        return d.close; }));

    xAxis();
    yAxis();

    context.beginPath();
    line(data);
    context.lineWidth = 1.5;
    context.strokeStyle = "steelblue";
    context.stroke();
});

function xAxis() {
    var tickCount = 10,
        tickSize = 6,
        ticks = x.ticks(tickCount),
        tickFormat = x.tickFormat();

    context.beginPath();
    ticks.forEach(function(d) {
        context.moveTo(x(d), height);
        context.lineTo(x(d), height + tickSize);
    });
    context.strokeStyle = "black";
    context.stroke();

    context.textAlign = "center";
    context.textBaseline = "top";
    ticks.forEach(function(d) {
        context.fillText(tickFormat(d), x(d), height + tickSize);
    });
}

function yAxis() {
    var tickCount = 10,
        tickSize = 6,
        tickPadding = 3,
        ticks = y.ticks(tickCount),
        tickFormat = y.tickFormat(tickCount);

    context.beginPath();
    ticks.forEach(function(d) {
        context.moveTo(0, y(d));
        context.lineTo(-6, y(d));
    });
    context.strokeStyle = "black";
    context.stroke();

    context.beginPath();
    context.moveTo(-tickSize, 0);
    context.lineTo(0.5, 0);
    context.lineTo(0.5, height);
    context.lineTo(-tickSize, height);
    context.strokeStyle = "black";
    context.stroke();

    context.textAlign = "right";
    context.textBaseline = "middle";
    ticks.forEach(function(d) {
        context.fillText(tickFormat(d), -tickSize - tickPadding, y(d));
    });

    context.save();
    context.rotate(-Math.PI / 2);
    context.textAlign = "right";
    context.textBaseline = "top";
    context.font = "bold 10px sans-serif";
    context.fillText("Price (US$)", -10, 10);
    context.restore();
}





//////////////

// var line = d3.line()
//     .curve(d3.curveBasis)
//     .context(context);


// context.beginPath();
// line([[0, 100], [100, 300], [200, 100]]);
// // console.log(line([[0,1],[200,200]]))
// context.fillStyle = colors[1];
// context.stroke();



//////////////
// var arc = d3.arc()
//     .outerRadius(radius - 10)
//     .innerRadius(radius - 70)
//     .padAngle(0.03)
//     .context(context);

// var pie = d3.pie();

// var arcs = pie(data);
// console.log(arcs)

// context.translate(width / 2, height / 2);

// context.globalAlpha = 0.5;


// context.beginPath();
// arc(arcs[1]);
// context.fillStyle = colors[1];
// context.fill();

// arcs.forEach(function(d, i) {
//   context.beginPath();
//   arc(d);
//   context.fillStyle = colors[i];
//   context.fill();
// });

// context.globalAlpha = 1;
// context.beginPath();
// arcs.forEach(arc);
// context.lineWidth = 1.5;
// context.stroke();




/***2*/

// var arc = d3.arc()
//     .innerRadius(0)
//     .outerRadius(100)
//     .startAngle(0)
//     .endAngle(Math.PI / 2)
//     .context(context);;

// context.beginPath();
// arc();
// context.fillStyle = colors[2];
// context.fill();  


/***3*/

// var data = [
//   {date: new Date(2007, 3, 24), value: 93.24},
//   {date: new Date(2007, 3, 25), value: 95.35},
//   {date: new Date(2007, 3, 26), value: 98.84},
//   {date: new Date(2007, 3, 27), value: 99.92},
//   {date: new Date(2007, 3, 30), value: 99.80},
//   {date: new Date(2007, 4,  1), value: 99.47}
// ];

// var line = d3.line()
//     .x(function(d) { return x(d.date); })
//     .y(function(d) { return y(d.value); })
//     .curve(d3.curveStep)
//     .context(context);;


// context.beginPath();
// line(data[1]);
// context.fillStyle = colors[2];
// context.fill();  



// var data = [1, 1, 2, 3, 5, 8, 13];

// var canvas = document.querySelector("canvas"),
//     context = canvas.getContext("2d");

// var width = canvas.width,
//     height = canvas.height,
//     radius = Math.min(width, height) / 2;

// var colors = [
//   "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
//   "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
// ];

// var outerRadius = radius - 10,
//     innerRadius = radius - 70,
//     cornerRadius = 12;

// var arc = d3.arc()
//     .outerRadius(outerRadius)
//     .innerRadius(innerRadius)
//     .cornerRadius(cornerRadius)
//     .context(context);

// var circle = d3.arc()
//     .startAngle(0)
//     .endAngle(2 * Math.PI)
//     .innerRadius(0)
//     .context(context);

// var pie = d3.pie();

// var arcs = pie(data);

// context.translate(width / 2, height / 2);

// context.globalAlpha = 0.5;
// arcs.forEach(function(d, i) {
//   context.beginPath();
//   arc(d);
//   context.fillStyle = colors[i];
//   context.fill();
// });

// context.globalAlpha = 1;
// context.beginPath();
// arcs.forEach(arc);
// context.lineWidth = 1.5;
// context.strokeStyle = "#fff";
// context.stroke();

// context.beginPath();
// arcs.forEach(function(d) {
//   corner(d.startAngle, outerRadius - cornerRadius, +1);
//   corner(  d.endAngle, outerRadius - cornerRadius, -1);
//   corner(  d.endAngle, innerRadius + cornerRadius, -1);
//   corner(d.startAngle, innerRadius + cornerRadius, +1);
// });
// context.strokeStyle = "#000";
// context.stroke();

// function corner(angle, radius, sign) {
//   context.save();
//   context.translate(
//     sign * cornerRadius * Math.cos(angle) + Math.sqrt(radius * radius - cornerRadius * cornerRadius) * Math.sin(angle),
//     sign * cornerRadius * Math.sin(angle) - Math.sqrt(radius * radius - cornerRadius * cornerRadius) * Math.cos(angle)
//   );
//   circle.outerRadius(cornerRadius - 1.5)();
//   context.restore();
// }
