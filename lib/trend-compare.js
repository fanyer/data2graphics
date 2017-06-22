import D3 from 'd3'
// import canvg from 'canvg'
import { detectSVG, detectCanvas, hPattern, vPattern2 } from './utils/detect'
import { baseConf1, baseConf2 } from './default-config/trend-compare.config'
import { clone2 } from './utils/clone'
import { addOpacity, hex2rgba } from './utils/color'



const d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-axis'),
    require('d3-array'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);

export function trendCompare(parent, config1, config2) {

    // to extend boundary straight line  
    // under Policy  ,dirty, 2017.4.20 fanyer 
    Array.prototype.extendArrBoundary = function() {
        let dx = this[1].x - this[0].x
        let dy = this[1].y - this[0].y
        this.unshift({
            x: this[0].x - (dx - 0.2),
            y: this[0].y
        })
        this.push({
            x: this[this.length - 1].x + (dx - 0.2),
            y: this[this.length - 1].y
        })
    }


    let xArr1 = config1 || baseConf1

    let xArr2 = config2 || baseConf2

    if (xArr1.cnFontSize !== xArr2.cnFontSize || xArr1.enFontSize !== xArr2.enFontSize) {
        throw new Error("fontsizes in two configs aren't unanimous!")
    }

    // construct basic params
    let labels = Object.keys(xArr1.data)
    let enLabels = labels.map((e, i) => {
        return xArr1.data[e].en
    })


    let lineData1 = []
    let lineData2 = []

    labels.map((e, i) => {
        lineData1.push({
            x: i + 1,
            y: xArr1.data[labels[i]].value
        })
        lineData2.push({
            x: i + 1,
            y: xArr2.data[labels[i]].value
        })
    })

    lineData1.extendArrBoundary()
    lineData2.extendArrBoundary()

    // define line style
    let line = d3.line()
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

    let svg = detectSVG(parent)
    let canvas = detectCanvas(parent);

    svg.setAttribute('width', '1000')
    svg.setAttribute('height', '500')

    svg = d3.select("#" + parent.id + " svg");
    let margin = { top: 20, right: 100, bottom: 80, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let formatNumber = d3.format(".1f");


    // define basic location Axis
    let x = d3.scaleLinear()
        .domain([1 - 0.8, 6 + 0.8])
        .range([0, width]);


    let y = d3.scaleLinear()
        .domain([0, 10])
        .range([height, 0]);

    let xAxis = d3.axisBottom(x)
        .ticks(6)
        .tickSize(0)
        .tickFormat((d) => {
            return labels[d - 1]
        });

    let yAxis = d3.axisRight(y)
        .ticks(10)
        .tickSize(width)
        .tickFormat(function(d) {
            let s = formatNumber(d / 1e6);
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
        g.selectAll(".tick text")
            .attr("font-size", xArr1.cnFontSize)
            .attr("x", 0)
            .attr("dy", 24);
        g.selectAll(".tick")
            .append('text')
            .attr('font-size', xArr1.enFontSize)
            .attr('class', 'en')
            .attr("x", 0)
            .attr('dy', (d, i) => {
                return 54
            })
            .text((d, i) => {
                return enLabels[i]
            })

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
        let max = JSON.parse(JSON.stringify(arr1))
        max.forEach((e, i, arr) => {
            arr1[i].y > arr2[i].y || (e.y = arr2[i].y)
        });
        return max
    }

    let max = dataMax(lineData1, lineData2)

    max.forEach((e, i, arr) => {
        if (i < 7 && i > 0) {
            g.append('g')
                .datum([{ x: e.x, y: 0 }, { x: e.x, y: e.y }])
                .append('path')
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr('stroke-dasharray', '3,3')
                .attr('d', line)
        }
    })


    // curve standard
    let total = [lineData1, lineData2]

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
                    .attr("fill", "none")
                    .attr("stroke", (d) => (
                        I === 0 ? 'steelblue' : 'seagreen'
                    ))
                    .attr("stroke-width", 1.5)
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    // .attr("class", "line" + I)
                    .attr("d", line);
            }

        })
    })


    //  curve ripple
    let curveRipple = function(Ripple) {
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
                        .attr("fill", "none")
                        .attr("stroke", (d, i) => (
                            I === 0 ? 'steelblue' : 'seagreen'
                        ))
                        .attr("stroke-width", 1.5)
                        // .attr("class", "line" + I)
                        .attr("d", line);

                }
            })
        })
    }

    function percent(arr, factor) {
        let newArr = []
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
    function reduce(arr) {
        let newArr = clone2(arr)
        newArr.pop()
        newArr.shift()
        return newArr
    }


    let dotArr1 = reduce(lineData1)
    let dotArr2 = reduce(lineData2)

    svg.selectAll(".dot")
        .data([].concat(dotArr1, dotArr2))
        .enter().append("circle")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        // .attr("class", "dot")
        .attr("fill", "white")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5);





    // legend
    let y1Destiny = (lineData1.pop());
    let y2Destiny = (lineData2.pop());

    /**
     * y1pixel is for  标准值
     */
    let y1pixel = parseFloat(
        line([y1Destiny])
        .match(/,(\d|\.)+\Z/gi)[0].slice(1, -1)
    )

    /**
     * y2pixel is for  检测值
     */
    let y2pixel = parseFloat(
        line([y2Destiny])
        .match(/,(\d|\.)+\Z/gi)[0].slice(1, -1));


    ['检测值', '标准值'].forEach((e, i) => {

        g.append('text')
            .attr('transform', function(d) {
                let bias;
                let misdistance = Math.abs(y2pixel - y1pixel);
                // console.log(misdistance);
                // if (y1pixel - y2pixel < 60 && y1pixel > y2pixel) {
                //     bias = -16
                // } else if (y1pixel - y2pixel > -60 && y1pixel < y2pixel) {
                //     bias = 16
                // } else {
                //     bias = 16
                // }

                if (y1pixel < y2pixel) {
                    bias = 20
                } else {
                    bias = -20
                }

                return e === '标准值' ?
                    'translate(880,' + (y2pixel + bias) + ')' : 'translate(880,' + (y1pixel - bias) + ')';
            })
            .attr('class', 'text' + i)
            .attr('alignment-baseline', 'middle')
            .attr('font-size', xArr1.cnFontSize)
            .text(function(d) {
                return e;
            });
    })


    /**
     * stroke color
     * rgba(73,130,180,0.6)
     * rgba(46,139,87,0.6)
     */


    svg.selectAll('.rightExtendLine').data(['rgba(73,130,180,0.6)', 'rgba(46,139,87,0.6)'])
        .enter().append('rect')
        .attr('class', 'rightExtendLine')
        .attr('x', 900)
        .attr('y', (d, i) => {
            return [y1pixel, y2pixel][i] + 19.3
        })
        .attr('width', 100)
        .attr('height', 1.5)
        .attr('fill', (d, i) => {
            // console.log(d)
            return d
        })

    let oSvg = document.querySelector('#' + parent.id + ' svg')

    // console.log(document.querySelector('#' + parent.id + ' svg').outerHTML)
    // canvg(canvas, document.querySelector('#' + parent.id + ' svg').outerHTML)
    // parent.removeChild(oSvg)



}
