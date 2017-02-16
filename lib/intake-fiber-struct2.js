d3 = Object.assign({},
    d3,
    require('d3-format'),
    require('d3-sankey'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);

export function intakeStruct(parrent) {
    // body...
    const input = {
        'XXX': 0.15,
        '胆固醇': 0.15,
        '饱和脂肪酸': 0.2,
        '不饱和脂肪酸': 0.1,
        '鞘脂类': 0.4
    }

    var max = 350,
        min = 110,
        d = (max - min) / 4


    var colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ];

    const labels = Object.keys(input)
    const data = Object.values(input)

    // detect svg or canvas
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //创建svg标签   
    svg.setAttribute('width', '1000')
    svg.setAttribute('height', '800')
    parrent.append(svg)

    var svg = d3.select("svg"),
        margin = { top: 20, right: 40, bottom: 50, left: 40 },
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
    var line = d3.line()
        .x(function(d) {
            return d.x;
        })
        .y(function(d) {
            return d.y;
        })
        .curve(d3.curveBasis);



    svg.append('circle')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "dot")
        .attr("cx", 100)
        .attr("cy", 100)
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.5)
        .attr("r", 35);

    svg.innerHTML='<circle cx="100" cy="100" r="100"/>'


    console.log(line.x())








}
