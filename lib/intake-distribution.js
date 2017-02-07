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
    document.body.append(svg)


    var svg = d3.select("svg"),
        margin = { top: 20, right: 0, bottom: 20, left: 0 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var formatNumber = d3.format(".1f");


    var x = d3.scaleLinear()
        .domain([0,5])
        .range([0,width]);


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
        .ticks(d3.timeYear)
        .tickFormat(function(d) {
            var s = formatNumber(d / 1e6);
            return this.parentNode.nextSibling ? "\xa0" + s : "$" + s + " million";
        });


      d3.csv('/lib/fye.hist.csv', function(data){
        console.log(data)
      })

}


export default intakeDistribution
