import D3 from 'd3'
import { baseConf1, baseConf2 } from './default-config/intake-sugar-distribution.config'

var d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);

export function intakeSugarDistribution(parrent, config1, config2) {

    // to extend boundary straight line
    Array.prototype.extendArrBoundary = function() {
        var dx = this[1].x - this[0].x
        var dy = this[1].y - this[0].y
        this.unshift({
            x: this[0].x - dx,
            y: this[0].y
        })
        this.push({
            x: this[this.length - 1].x + dx,
            y: this[this.length - 1].y
        })
    }


    var xArr1 = config1 || baseConf1

    var xArr2 = config2 || baseConf2


    // construct basic params
    var labels = Object.keys(xArr1.data)

    var lineData1 = []
    var lineData2 = []

    labels.map((e, i) => {
        lineData1.push({
            x: i + 1,
            y: xArr1.data[labels[i]]
        })
        lineData2.push({
            x: i + 1,
            y: xArr2.data[labels[i]]
        })
    })

    lineData1.extendArrBoundary()
    lineData2.extendArrBoundary()

    // define line style
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
        .curve(d3.curveBasis)


    // detect svg or canvas
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '1000')
    svg.setAttribute('height', '500')
    parrent.append(svg)

    var svg = d3.select("svg"),
        margin = { top: 20, right: 40, bottom: 50, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var formatNumber = d3.format(".1f");


    // define basic location Axis
    var x = d3.scaleLinear()
        .domain([1 - 0.8, 6 + 0.8])
        .range([0, width]);


    var y = d3.scaleLinear()
        .domain([0, 7])
        .range([height, 0]);

    var xAxis = d3.axisBottom(x)
        .ticks(6)
        .tickSize(5)
        .tickFormat((d) => {
            return labels[d - 1]
        });

    var yAxis = d3.axisRight(y)
        .ticks(6)
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
        // g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
        g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#ccc");
        g.selectAll(".tick text").attr("x", 4).attr("dy", -4);
    }

    //curve xVertical
    function dataMax(arr1, arr2) {
        var max = JSON.parse(JSON.stringify(arr1))
        max.forEach((e, i, arr) => {
            arr1[i].y > arr2[i].y || (e.y = arr2[i].y)
        });
        return max
    }

    var max = dataMax(lineData1, lineData2)

    max.forEach((e, i, arr) => {
        if (i < 7 && i > 0) {
            g.append('g')
                .datum([{ x: e.x, y: 0 }, { x: e.x, y: e.y }])
                .append('path')
                .attr("class", "line0")
                .attr('stroke-dasharray', '3,3')
                .attr('d', line)
        }
    })


    // curve standard
    var total = [lineData1, lineData2]

    total.forEach((E, I, Arr) => {

        E.map((e, i, arr) => {

            if (i < E.length - 1) {
                let p1 = e,
                    p2 = E[i + 1],
                    vs = 1 - 1 / 4,
                    pMiddle1 = { x: vs * p1.x + (1 - vs) * p2.x, y: p1.y },
                    pMiddle2 = { x: (1 - vs) * p1.x + vs * p2.x, y: p2.y }

                let bezeire = [p1, pMiddle1, pMiddle2, p2]

                svg.datum(bezeire)
                    .append("path")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .attr("class", "line" + I)
                    .attr("d", line);
            }

        })
    })


    //  curve ripple
    var curveRipple = function(Ripple) {
        Ripple.forEach((E, I, Arr) => {

            E.map((e, i, arr) => {

                if (i < E.length - 1) {
                    let p1 = e,
                        p2 = E[i + 1],
                        vs = 3 / 4,
                        pMiddle1 = { x: vs * p1.x + (1 - vs) * p2.x, y: p1.y },
                        pMiddle2 = { x: (1 - vs) * p1.x + vs * p2.x, y: p2.y }

                    let bezeire = [p1, pMiddle1, pMiddle2, p2]

                    svg.datum(bezeire)
                        .append("path")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        .style("opacity", 0.3)
                        .attr("class", "line" + I)
                        .attr("d", line);

                }
            })
        })
    }

    function percent(arr, factor) {
        var newArr = []
        arr.forEach((e, i, arr) => {
            newArr[i] = {
                x: e.x,
                y: e.y * factor
            }
        })
        return newArr;
    }

    d3.range(0, 1, 0.02).forEach((e, i) => {
        let percent1 = percent(lineData1, e),
            percent2 = percent(lineData2, e)

        let Ripple = [percent1, percent2]
        curveRipple(Ripple)

    })



    //  draw symbol
    svg.selectAll(".dot")
        .data([].concat(lineData1, lineData2))
        .enter().append("circle")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "dot")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5);



    // legend
    let y1Destiny = (lineData1.pop());
    let y2Destiny = (lineData2.pop());

    var y1pixel = parseFloat(
        line([y1Destiny])
        .match(/,(\d|\.)+\Z/gi)[0].slice(1, -1)
    )
    var y2pixel = parseFloat(
        line([y2Destiny])
        .match(/,(\d|\.)+\Z/gi)[0].slice(1, -1));

    ['检测值', '标准值'].forEach((e, i) => {

        g.append('text')
            .attr('transform', function(d) {
                return e === '标准值' ?
                    'translate(900,' + (y1pixel + 20) + ')' : 'translate(900,' + (y2pixel + 20) + ')';
            })
            .attr('class', 'text' + i)
            .text(function(d) {
                return e;
            });
    })


}
