
// var svg = d3.select("svg"),


// var width = window.innerWidth,
//     height = window.innerHeight * 0.7,
//     radius = Math.min(width, height) / 2;

// svg.attr({
//     width: width,
//     height: height
// })

// svg.datum(d3.range(40)).enter().append('g')
var w = window.innerWidth,
    h = window.innerHeight;

var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h);

// svg.append("rect")
//     .attr("width", w)
//     .attr("height", h);
var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

svg.append("g").selectAll("circle")
    .data(d3.range(35,60))
    // .data([25])
  .enter().append("circle")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
    // .attr("transform", "rotate(-10," + w / 2 + "," + h / 2 + ")" )
    .attr("stroke-dasharray", "5%")                                        
    // .attr("stroke-dashoffset", "15")                                        
    .attr("r", function(d) { return d * 5; });

svg.append("g").selectAll("circle")
    .data(d3.range(25,35))
  .enter().append("circle")
    .attr("stroke-dasharray", "10")                                        
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
    .attr("class", "salmon")                                        
    .attr("r", function(d) { return d * 5; });
