var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70)
    .padAngle(0.03)
    .context(context);

var pie = d3.pie();

var arcs = pie(data);
console.log(arcs)

context.translate(width / 2, height / 2);

context.globalAlpha = 0.5;


context.beginPath();
arc(arcs[1]);
context.fillStyle = colors[1];
context.fill();

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
context.stroke();