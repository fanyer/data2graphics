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
    var xArr1 = {
        "type": "检测值",
        "data": {
            '膳食纤维': 5,
            '低聚果糖': 6.5,
            '低聚异麦芽糖': 4,
            'ß-葡萄糖': 2.5,
            '葡甘露聚糖': 4,
            '抗性麦芽糊精': 3
        }
    }

    var xArr2 = {
        "type": "标准值",
        "data": {
            '膳食纤维': 3.5,
            '低聚果糖': 2.2,
            '低聚异麦芽糖': 3.2,
            'ß-葡萄糖': 6.2,
            '葡甘露聚糖': 2.7,
            '抗性麦芽糊精': 5.2
        }
    }

    var labels = Object.keys(xArr2.data)

    var lineData1 = []

    labels.map((e, i) => {
        lineData1.push({
            x: i + 1,
            y: xArr1.data[labels[i]]
        })
    })




    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //创建svg标签   
    svg.setAttribute('width', '1000')
    svg.setAttribute('height', '800')
    parrent.append(svg)

    var svg = d3.select("svg"),
        margin = { top: 20, right: 40, bottom: 20, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var formatNumber = d3.format(".1f");

    var x = d3.scaleLinear()
        .domain([0, 6 + 0.8])
        .range([0, width]);


    var y = d3.scaleLinear()
        .domain([0, 7])
        .range([height, 0]);

    var xAxis = d3.axisBottom(x)
        .ticks(6)
        .tickFormat((d) => {
            return labels[d - 1]
        });

    var yAxis = d3.axisRight(y)
        .tickSize(width)
        .tickFormat(function(d) {
            var s = formatNumber(d / 1e6);
            // return d
                // return this.parentNode.nextSibling ? "\xa0" + s : "$" + s + " million";
        });

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis);

    g.append("g")
        .call(customYAxis);

    function customXAxis(g) {
        g.call(xAxis);
        g.select(".domain").remove();
    }

    function customYAxis(g) {
        g.call(yAxis);
        g.select(".domain").remove();
        g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
        g.selectAll(".tick text").attr("x", 4).attr("dy", -4);
    }




    // curve standard
    var line = d3.line()
        .defined(function(d) {
            return d;
        })
        .x(function(d) {
            return x(d.x);
        })
        .y(function(d) {
            return y(d.y);
        })
        .curve(d3.curveCatmullRom)


 lineData1.push({x:7,y:3})
 lineData1.unshift({x:0,y:5})

console.log(lineData1)
    svg.datum(lineData1)
        .append("path")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        // .style("mix-blend-mode", "darken")
        .attr("class", "line")
        .attr("d", line);

    svg.selectAll(".dot")
        .data(lineData1)
        .enter().append("circle")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "dot")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5);

}
