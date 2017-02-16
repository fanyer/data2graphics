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

export function intakeDistribution(parrent) {

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //创建svg标签   
    svg.setAttribute('width', '1000')
    svg.setAttribute('height', '500')
    parrent.append(svg)

    var svg = d3.select("svg"),
        margin = { top: 20, right: 40, bottom: 20, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var formatNumber = d3.format(".1f");


    var lineData = [
        { "x": 10, "y": 10 },
        { "x": 100, "y": 10 },
        { "x": 200, "y": 400 },
        { "x": 300, "y": 400 }
    ];

    //线生成器
    var line = d3.line()
        .x(function(d) {
            return d.x;
        })
        .y(function(d) {
            return d.y;
        })
        .curve(d3.curveBasis);

    //svg容器
    svg.datum(lineData)
        .append("path")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        // .style("mix-blend-mode", "darken")
        .attr("class", "line")
        .attr("d", line);

    svg.selectAll(".dot")
        .data(lineData)
        .enter().append("circle")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "dot")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5);
}
