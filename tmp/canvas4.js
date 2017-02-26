



var data = [1, 1, 2, 3, 5, 8, 13];

var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

var width = canvas.width,
    height = canvas.height,
    radius = Math.min(width, height) / 2;

var colors = [
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];

var outerRadius = radius - 10,
    innerRadius = radius - 70,
    cornerRadius = 12;

var arc = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius)
    .cornerRadius(cornerRadius)
    .context(context);

var circle = d3.arc()
    .startAngle(0)
    .endAngle(2 * Math.PI)
    .innerRadius(0)
    .context(context);

var pie = d3.pie();

var arcs = pie(data);

context.translate(width / 2, height / 2);

context.globalAlpha = 0.5;
arcs.forEach(function(d, i) {
  context.beginPath();
  arc(d);
  context.fillStyle = colors[i];
  context.fill();
});

context.globalAlpha = 1;
context.beginPath();
arcs.forEach(arc);
context.lineWidth = 1.5;
context.strokeStyle = "#fff";
context.stroke();

context.beginPath();
arcs.forEach(function(d) {
  corner(d.startAngle, outerRadius - cornerRadius, +1);
  corner(  d.endAngle, outerRadius - cornerRadius, -1);
  corner(  d.endAngle, innerRadius + cornerRadius, -1);
  corner(d.startAngle, innerRadius + cornerRadius, +1);
});
context.strokeStyle = "#000";
context.stroke();

function corner(angle, radius, sign) {
  context.save();
  context.translate(
    sign * cornerRadius * Math.cos(angle) + Math.sqrt(radius * radius - cornerRadius * cornerRadius) * Math.sin(angle),
    sign * cornerRadius * Math.sin(angle) - Math.sqrt(radius * radius - cornerRadius * cornerRadius) * Math.cos(angle)
  );
  circle.outerRadius(cornerRadius - 1.5)();
  context.restore();
}