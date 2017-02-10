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

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //创建svg标签   
    svg.setAttribute('width', '1000')
    svg.setAttribute('height', '800')
    parrent.append(svg)

    var svg = d3.select("svg"),
        margin = { top: 20, right: 0, bottom: 20, left: 0 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // var x = d3.scaleLinear()
    //     .domain([0, 5])
    //     .range([0, width]);


    // var y = d3.scaleLinear()
    //     .range([height, 0]);



    // var line = d3.line()
    //     .x(function(d) {
    //         return x(d.date);
    //     })
    //     .y(function(d) {
    //         return y(d.close);
    //     })
    //     .curve(d3.curveStep)


    // function customYAxis(g) {
    //     g.call(yAxis);
    //     g.select(".domain").remove();
    //     g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
    //     g.selectAll(".tick text").attr("x", 4).attr("dy", -4);
    // }

    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));


    var formatNumber = d3.format(".1f");

    var x = d3.scaleTime()
        .domain([new Date(2010, 7, 1), new Date(2012, 7, 1)])
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([0, 2e6])
        .range([height, 0]);

    var xAxis = d3.axisBottom(x)
        .tickSize()
        .tickFormat((d)=>{
          console.log(d)
        });

    var yAxis = d3.axisRight(y)
        .tickSize(width)
        .tickFormat(function(d) {
            var s = formatNumber(d / 1e6);
            console.log("\xa0" + s)
            return this.parentNode.nextSibling ? "\xa0" + s : "$" + s + " million";
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


}
