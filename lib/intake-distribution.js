
d3 = Object.assign({},
    d3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-sankey'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);


var intakeDistribution = () => {

    var svg = document.createElement("svg");
    // svg.setAttribute("width")=1000
    // svg.setAttribute(height)=800
    svg.width = 1000;
    svg.height = 800
    document.body.append(svg)


    var svg = d3.select("svg"),
        margin = { top: 20, right: 0, bottom: 20, left: 0 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    var x = d3.scaleTime()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);



    var line = d3.line()
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d.close);
        })
        .curve(d3.curveStep)


    var xAxis = d3.axisBottom(x)
        .ticks(d3.timeYear);

    var yAxis = d3.axisRight(y)
        .tickSize(width)
        .tickFormat(function(d) {
            var s = formatNumber(d / 1e6);
            return this.parentNode.nextSibling ? "\xa0" + s : "$" + s + " million";
        });




}


export default intakeDistribution
