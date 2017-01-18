//require('es5-shim-sham');
require('./basic.css')
import * as d3 from 'd3'
import {scaleRadial} from './d3-scale-radial'
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    innerRadius = 180,
    outerRadius = Math.min(width, height) / 2 - 6,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var x = d3.scaleBand()
    .range([0, 2 * Math.PI])
    .align(0);

var y = scaleRadial()
    .range([innerRadius, outerRadius]);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

d3.csv("data.csv", function(d, i, columns) {
  for (var i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}, function(error, data) {
  if (error) throw error;

  data.sort(function(a, b) { return b[data.columns[1]] / b.total - a[data.columns[1]] / a.total; });
  x.domain(data.map(function(d) { return d.State; }));
  z.domain(data.columns.slice(1));

  g.append("g")
    .selectAll("g")
    .data(d3.stack()
        .keys(data.columns.slice(1))
        .offset(d3.stackOffsetExpand)
        (data))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("path")
    .data(function(d) { return d; })
    .enter().append("path")
      .attr("d", d3.arc()
          .innerRadius(function(d) { return y(d[0]); })
          .outerRadius(function(d) { return y(d[1]); })
          .startAngle(function(d) { return x(d.data.State); })
          .endAngle(function(d) { return x(d.data.State) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius));

  var label = g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) { return "rotate(" + ((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)"; });

  label.append("line")
      .attr("x2", -5)
      .attr("stroke", "#000");

  label.append("text")
      .attr("transform", function(d) { return (x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,16)" : "rotate(-90)translate(0,-9)"; })
      .text(function(d) { return d.State; });

  var yAxis = g.append("g")
      .attr("text-anchor", "middle");

  var yTick = yAxis
    .selectAll("g")
    .data(y.ticks(5).slice(1))
    .enter().append("g");

  yTick.append("circle")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("r", y);

  yTick.append("text")
      .attr("y", function(d) { return -y(d); })
      .attr("dy", "0.35em")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 5)
      .attr("stroke-linejoin", "round")
      .text(y.tickFormat(5, "%"));

  yTick.append("text")
      .attr("y", function(d) { return -y(d); })
      .attr("dy", "0.35em")
      .text(y.tickFormat(5, "%"));

  var legend = g.append("g")
    .selectAll("g")
    .data(data.columns.slice(1).reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(-40," + (i - (data.columns.length - 1) / 2) * 20 + ")"; });

  legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", z);

  legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .text(function(d) { return d; });
});




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

// var innerRadius = 150,
//     outerRadius = 300

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
