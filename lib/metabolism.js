import D3 from 'd3'
// import canvg from 'canvg'
import { detectSVG, detectCanvas, vPattern2 } from './utils/detect'
import { clone } from './utils/clone'
import baseConf from './default-config/metabolism.config'

/*seagreen   #00ab84*/
/*orange   #e4be6f*/
/*salmon   #cb8d88*/

const colors5 = ['#cb8d88', '#e4be6f', '#00ab84', '#e4be6f', '#cb8d88']


const d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-array'),
    require('d3-random'),
    require('d3-axis'),
    require('d3-scale')
);

export function metabolism(parent, config) {

    let input = config || baseConf;

    let svg = detectSVG(parent);
    let canvas = detectCanvas(parent);



    svg = d3.select('#' + parent.id + ' svg');
    let margin = { top: 100, right: 60, bottom: 150, left: 130 };

    svg.attr('width', 1000)
        .attr('height', 800);

    let width = svg.attr('width') - margin.left - margin.right,
        height = svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let formatNumber = d3.format('.2%');



    vPattern2(svg, 4, 27, '#cb8d88');
    vPattern2(svg, 4, 27, '#e4be6f');
    vPattern2(svg, 4, 27, '#00ab84');


    let yArr = input.data.map((e, i) => (e.y));




    // define basic location Axis
    const x = d3.scaleLinear()
        .domain([
            d3.min(
                input.data.map((e, i) => (e.x[0]))
            ),
            d3.max(
                input.data.map((e, i) => (e.x[1]))
            )
        ])
        .range([0, width]);


    const y = d3.scaleLinear()
        .domain([0, d3.max(yArr)])
        .range([height, 0]);

    const yAxis = d3.axisLeft(y)
        .ticks(4)
        .tickSize(4)
        .tickFormat((d) => {
            return formatNumber(d)
        });

    const xAxis = d3.axisBottom(x)
        .ticks(5)
        .tickSize(4)
        .tickFormat((d, i) => {
            return d
        });

    g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(30,' + (height + 110) + ')')
        .call(customXAxis);

    g.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', 'translate(0,50)')
        .call(customYAxis);


    function customXAxis(g) {
        g.call(xAxis);
        g.selectAll('.tick text')
            .attr('font-family', 'adad')
            .attr('x', 4).attr('dy', 24)
            .attr('font-size', () => {
                if (input.axisFontSize) {
                    return input.axisFontSize
                }
                return 22
            });

    }

    function customYAxis(g) {
        g.call(yAxis);
        g.selectAll('.tick text')
            .attr('font-family', 'adad')
            .attr('x', -24).attr('dy', 4)
            .attr('font-size', () => {
                if (input.axisFontSize) {
                    return input.axisFontSize
                }
                return 22
            });

    }









    var bar = g.selectAll(".bar")
        .data(input.data)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) {
            return "translate(" + (x(d.x[0]) - 70) + "," + (y(d.y) + 50) + ")";
        });

    bar.append("rect")
        .attr("x", 100)
        .attr('fill', (e, i) => {
            let color = '#cb8d88';

            ((e.x[0] < input.gap[0]) && (color = '#cb8d88')) ||
            ((e.x[0] < input.gap[1]) && (color = '#e4be6f')) ||
            ((e.x[0] < input.gap[2]) && (color = '#00ab84')) ||
            ((e.x[0] < input.gap[3]) && (color = '#e4be6f'));

            return 'url(#vpattern-' + color + ')'
        })
        // .attr('stroke-width', 1)
        .attr("width", x(input.data[0].x[1]) - x(input.data[0].x[0]) - 4)
        .attr("height", function(d) {
            return height - y(d.y);
        });


    // curve
    // let data = d3.range(80000).map(d3.randomNormal(22000, 2000));

    // var line = d3.line()
    //     .defined(function(d) {
    //         return d;
    //     })
    //     .x(function(d) {
    //         return x((d.x0 + d.x1) / 2);
    //     })
    //     .y(function(d) {
    //         return y(d.length / data.length / 2.5);
    //     })
    //     .curve(d3.curveBasis);



    // var bins = d3.histogram()
    //     .domain(x.domain())
    //     .thresholds(x.ticks(20))
    //     (data);




    // g.append("path")
    //     .datum(bins)
    //     .attr("class", "line")
    //     .attr('fill', 'none')
    //     .attr('stroke-width', 2)
    //     .attr("d", line);



    let data = input.data.map((e, i) => {
        return {
            x: (e.x[1] + e.x[0]) / 2,
            y: e.y
        }
    })



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
        .curve(d3.curveBasis);




    g.append("path")
        .datum(data)
        .attr('transform', 'translate(30,50)')
        .attr("class", "line")
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr("d", line);


    // bottom color rect bar
    let bottomRectGap = [
        [input.data[0].x[0], input.gap[0]],
        [input.gap[0], input.gap[1]],
        [input.gap[1], input.gap[2]],
        [input.gap[2], input.gap[3]],
        [input.gap[3], input.data[input.data.length - 1].x[1]]
    ]

    let bandWidth = x(input.data[0].x[1]) - x(input.data[0].x[0])

    g.selectAll('rect.bottomRect')
        .data(bottomRectGap).enter()
        .append('rect')
        .attr('transform', 'translate(' + (30 + bandWidth / 2) + ',0)')
        .attr('x', (d, i) => {
            return x(d[0])
        })
        .attr('y', (d, i) => {
            return 620
        })
        .attr('width', (d, i) => {
            return x(d[1]) - x(d[0])
        })
        .attr('height', 20)
        .attr('fill', (d, i) => {
            let color = '#cb8d88';

            (i === 0) && (color = '#cb8d88');
            (i === 1) && (color = '#e4be6f');
            (i === 2) && (color = '#00ab84');
            (i === 3) && (color = '#e4be6f');

            return color

        });
    // average
    legend('average', input.average, g, 40, true, 'steelblue')


    // let three=[]

    // indicators
    if (x(input.indicator.value) - x(input.average.value) < 0) {
        legend('indicator', input.indicator, g, 0, false)

    } else {
        legend('indicator', input.indicator, g, 0, true)

    }



    function legend(type, obj, g, bias = 0, onOff = true, meanColor) {

        let oLegend = g.append('g')
            .attr('transform', 'translate(' + (30 + x(obj.value) + 0 / 2) + ',0)');

        let color = '#cb8d88';

        (obj.value < input.gap[0]) && (color = colors5[0]) ||
        (obj.value < input.gap[1]) && (color = colors5[1]) ||
        (obj.value < input.gap[2]) && (color = colors5[2]) ||
        (obj.value < input.gap[3]) && (color = colors5[3]) ||
        (obj.value < input.gap[4]) && (color = colors5[4]);

        oLegend.append('rect')
            .attr('x', 0)
            .attr('y', 0 - bias)
            .attr('width', 3)
            .attr('height', 600 + bias)
            .attr('fill', () => {
                return meanColor ? meanColor : color
            });
        oLegend.append('text')
            .attr('text-anchor', () => {
                return onOff ? 'start' : 'end'

            })
            .attr('x', () => {
                return onOff ? 4 : -4
            })
            .attr('y', 0 - bias)
            .attr('font-family', 'adad')
            .attr('font-size', 24)
            .style('fill', () => {
                return meanColor ? meanColor : color
            })
            .text(obj.text.cn)

    }



    // from http://bl.ocks.org/mbostock/4349187
    // Sample from a normal distribution with mean 0, stddev 1.
    function normal() {
        var x = 0,
            y = 0,
            rds, c;
        do {
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
            rds = x * x + y * y;
        } while (rds == 0 || rds > 1);
        c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
        return x * c; // throw away extra sample y * c
    }

    //taken from Jason Davies science library
    // https://github.com/jasondavies/science.js/
    function gaussian(x) {
        var gaussianConstant = 1 / Math.sqrt(2 * Math.PI),
            mean = 0,
            sigma = 1;

        x = (x - mean) / sigma;
        return gaussianConstant * Math.exp(-.5 * x * x) / sigma;
    };


    // color bar
    function genColorBar(argument) {
        // body...
    }
    let oSvg = document.querySelector('#' + parent.id + ' svg')


    // canvg(canvas, document.querySelector('#' + parent.id + ' svg').outerHTML)
    // parent.removeChild(oSvg)

}
