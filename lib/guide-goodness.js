import D3 from 'd3'
import { vBezeireArr, bezeire } from './bezeire'
import { detectSVG } from './utils/detect'
import { addOpacity, hex2rgba } from './utils/color'
import { curveGraphConfig, linkGraphConfig } from './default-config/guide-goodness.config'


const d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-array'),
    require('d3-format'),
    require('d3-sankey'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-axis'),
    require('d3-color'),
    require('d3-scale')
);


export function curveGraph(parent, config) {

    let input = config || curveGraphConfig

    const axisLabels = Object.keys(input.standard)
    const labels = Object.keys(input.data)
    const data = Object.values(input.data)

    const standardValues = Object.values(input.standard).slice(1, 6)


    // detect svg or canvas
    let svg = detectSVG(parent, 'svg-'+parent.id)

    svg.setAttribute('width', '500')
    svg.setAttribute('height', '1700')

    let margin = {
        top: 150,
        right: 40,
        bottom: 150,
        left: 200
    };

    svg = d3.select('#' + parent.id + ' svg')
    let width = +svg.attr('width') - margin.left - margin.right,
        height = +svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let formatNumber = d3.format('.2f');

    let filter = svg.append("defs")
        .append("filter")
        .attr("id", "blur")
        .append("feGaussianBlur")
        .attr("stdDeviation", 1);


    // value mapping
    let pointCurve = d3.scaleLinear()
        .domain([-25, 25])
        .range([0.5, 5.5]);

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
        .curve(d3.curveBasis);

    // define basic location Axis
    let x = d3.scaleLinear()
        .domain([1 - 0.5, 5 + 0.5])
        .range([0, width]);


    let y = d3.scaleLinear()
        .domain([0 - 0.5, 15 + 0.5])
        .range([0, height]);

    let xAxis = d3.axisTop(x)
        .ticks(5)
        .tickSize(-height)
        .tickFormat((d, i) => {
            return axisLabels[d]
        });

    let yAxis = d3.axisLeft(y)
        .ticks(15)
        .tickSize(-width)
        .tickFormat((d, i) => {
            // if (i === 2) return '标准值'
            return labels[i]
        });

    let gTickX = d3.scaleLinear()
        .domain([-25, 25])
        .range([0, 260]);

    g.append('g')
        .attr('class', 'axis axis--x')
        // .attr('transform', 'translate(0,0)')
        .call(customXAxis);

    g.append('g')
        .attr('class', 'axis axis--y')
        .call(customYAxis);


    //  for shisan's self customed standard line    2017.4.26  fanyer




    function customXAxis(g) {
        g.call(xAxis);
        g.select('.domain').remove();
        g.selectAll('.tick').remove();
        // g.selectAll('.tick:not(:first-of-type) line').attr('stroke', '#fff');
        // text color
        g.selectAll('.tick text').attr('x', 0).attr('dy', -4);


        g.selectAll('.tick:nth-child(4n+1) text').style('font-family', 'adad')
            .style('font-size', '20px')
            .style('fill', '#cb8d88');

        g.selectAll('.tick:nth-child(2n) text').style('font-family', 'adad')
            .style('font-size', '20px')
            .style('fill', '#e4be6f');

        g.selectAll('.tick:nth-child(3) text').style('font-family', 'adad')
            .style('font-size', '20px')
            .style('fill', '#00ab84');

        // line color
        g.selectAll('.tick:nth-child(4n+1) line')
            .attr('stroke', '#cb8d88')
            .attr('stroke-width', '3');
        g.selectAll('.tick:nth-child(2n) line')
            .attr('stroke-width', '2')
            .attr('stroke', '#e4be6f');
        g.selectAll('.tick:nth-child(3) line')
            .attr('stroke-width', '3')
            .attr('stroke', '#00ab84');


        // cloneSelection(g, text, 1)

        let colors = ['#cb8d88', '#e4be6f', '#00ab84', '#e4be6f', '#cb8d88']
        let texts = Object.keys(input.standard).slice(1, 6)

        let startArr = [-20, -10, 0, 10, 20]

        colors.map((e, i) => {

            // 5 standad curve
            let lineData = [];

            standardValues[i].map((e, i) => {
                lineData.push({
                    x: pointCurve(e),
                    y: i
                })
            })

            lineData.unshift({
                x: pointCurve(startArr[i]),
                y: -1
            });

            lineData.push({
                    x: pointCurve(startArr[i]),
                    y: 16
                })
                // standardLine(g, e, standardValues[i], texts[i])
            generalStandardLine(g, vBezeireArr(lineData, 1 / 4), e, texts[i], startArr[i]);


        })




    }






    function standardLine(g, color, pos, text) {
        console.log(gTickX(pos))
        let tickX = g.append('g')
            .attr('class', 'tickX')
            .attr('transform', 'translate(' + (gTickX(pos)) + ',0)')
            .attr('opacity', 1);

        tickX.append('line')
            .attr('stroke', color)
            .attr('stroke-width', 2)
            .attr('x1', 0.5)
            .attr('x2', 0.5)
            .attr('y2', 1400);

        tickX.append('text')
            .attr('fill', color)
            .attr('x', 0)
            .attr('y', -3)
            .attr('dy', -4)
            .attr('font-family', 'adad')
            .attr('font-size', '20px')
            .style('fill', color)
            .text(text);

        tickX.append('text')
            .attr('fill', color)
            .attr('x', 0)
            .attr('y', 1400)
            .attr('dy', 24)
            .attr('font-family', 'adad')
            .attr('font-size', '20px')
            .style('fill', color)
            .text(text)


    }



    function generalStandardLine(g, arr, color = 'seagreen', text, pos) {
        // console.log(line)
        let gStandard = g.append('g')
            .attr('class', 'gStandard');

        gStandard.selectAll('.generalStandardLine').data(arr)
            .enter()
            .append('path')
            .attr("class", "generalStandardLine")
            .style("stroke", addOpacity(hex2rgba(color), 0.5))
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr('d', line);

        gStandard.append('text')
            .attr('fill', color)
            .attr('x', gTickX(pos))
            .attr('y', -50)
            .attr('dy', -4)
            .attr('font-family', 'adad')
            .attr('font-size', '20px')
            .style('fill', color)
            .text(text);

        gStandard.append('text')
            .attr('fill', color)
            .attr('x', gTickX(pos))
            .attr('y', 1450)
            .attr('dy', 24)
            .attr('font-family', 'adad')
            .attr('font-size', '20px')
            .style('fill', color)
            .text(text)

    }


    function customYAxis(g) {
        g.call(yAxis);
        g.select('.domain').remove();
        g.selectAll('.tick text').remove();
        g.selectAll('.tick line').attr('stroke', '#00ab84')
            .attr('stroke-width', '3')
            .attr('opacity', '0.6');
        g.selectAll('.tick:not(:first-of-type) line').attr('stroke', '#00ab84');
        g.selectAll('.tick:nth-child(1) line').attr('stroke', '#00ab84')
            .attr('stroke-width', '1')
            .attr('opacity', '0.6');
        g.selectAll('.tick:last-child line').attr('stroke', '#00ab84')
            .attr('stroke-width', '1')
            .attr('opacity', '0.6');


    }


    function cloneSelection(appendTo, toCopy, times) {
        toCopy.each(function() {
            for (let i = 0; i < times; i++) {
                let clone = svg.node().appendChild(this.cloneNode(true));
                // console.log(clone);
                d3.select(clone).attr("class", "clone");
            }
        });
        return appendTo.selectAll('.clone');
    }






    // curve  indicator
    let lineData = [];

    data.map((e, i) => {
        lineData.push({
            x: pointCurve(e),
            y: i
        })
    })

    lineData.unshift({
        x: pointCurve(data[0]),
        y: -1
    });

    lineData.push({
        x: pointCurve(data[15]),
        y: 16
    })


    let lineDataBezeire = vBezeireArr(lineData, 1 / 4);


    g.selectAll('.line').data(lineDataBezeire)
        .enter()
        .append('path')
        .attr("class", "line")
        .style("stroke", "#00ab84")
        .attr("stroke-width", 3)
        .attr("fill", "none")
        // .attr("filter", "url(#blur)")
        .attr('d', line);



    // ripple
    // recursive Ripple percent, this will modify obj itself
    function percent(obj, factor) {

        for (let i in obj) {

            if (obj[i].constructor === Array) {
                percent(obj[i], factor)
            } else if (obj[i].constructor === Object) {
                percent(obj[i], factor)
            } else if (obj[i].constructor === Number) {
                i === 'x' && (obj[i] = (obj[i] - 0.5) * factor + 0.5);
            }

        }

        return obj
    }

    // recursive Ripple minus, this will modify obj itself
    function minus(obj, num) {

        for (let i in obj) {

            if (obj[i].constructor === Array) {
                minus(obj[i], num)
            } else if (obj[i].constructor === Object) {

                minus(obj[i], num)
            } else if (obj[i].constructor === Number) {
                i === 'x' && (obj[i] = num - obj[i]);
            }
        }

        return obj

    }


    function ripple(g, direction, dataArr) {
        g.append('g').selectAll(direction, ).data(dataArr)
            .enter()
            .append('path')
            .attr("class", direction)
            .attr("opacity", 0.15)
            .attr("stroke", (d) => (direction === 'left' ? 'salmon' : 'seagreen'))
            .attr("stroke-width", 1)
            .attr("fill", "none")
            .attr('d', line);
    }


    d3.range(0, 1, 0.04).forEach((e, i) => {

        let rippleRight = vBezeireArr(minus(percent(minus(JSON.parse(JSON.stringify(lineData)), 6), e), 6), 1 / 4),
            rippleLeft = vBezeireArr(percent(JSON.parse(JSON.stringify(lineData)), e), 1 / 4);


        ripple(g, 'left', rippleLeft)
        ripple(g, 'right', rippleRight)
    })



}







export function linkGraph(parent, config) {


    const input = config || linkGraphConfig;


    let margin = {
        top: 20,
        right: 100,
        bottom: 20,
        left: 100
    };

    let format = function(d) {
            return formatNumber(d) + ' TWh';
        },
        color = d3.scaleOrdinal(d3.schemeCategory20);


    // detect svg or canvas
    let svg =detectSVG(parent,'svg-'+parent.id)

    svg.setAttribute('width', '800')
    svg.setAttribute('height', '1500')


    svg = d3.select('#' + parent.id + ' svg');
    let width = +svg.attr('width') - margin.left - margin.right - 100,
        height = +svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    let formatNumber = d3.format('.2f');


    let sankey = d3.sankey()
        .nodeWidth(3)
        .nodePadding(40)
        .size([width, height]);

    let path = sankey.link();



    sankey
        .nodes(input.nodes)
        .links(input.links)
        .layout(1000);



    // console.log(input.nodes[16])
    // Array.from(Array(47).keys()).forEach((e, i) => {
    //     // console.log(input.links[i])
    // })



    let yL = d3.scaleLinear()
        .domain([0, 15])
        .range([0, 1264]);

    let yR = d3.scaleLinear()
        .domain([0, 9])
        .range([632 - 300, 632 + 300]);

    // console.log(input.nodes)


    let node = g.append('g').selectAll('.node')
        .data(input.nodes)
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', function(d, i) {
            if (d.x === 0) {
                return 'translate(' + d.x + ',' + (d.y = yL(i)) + ')';
            } else {
                let seperation = 0;
                // console.log(seperation)

                // if (i > 16) {
                //     seperation = 30
                // }
                return 'translate(' + d.x + ',' + (d.y = yR(i - 16) + seperation) + ')';
            }
        });
    // .attr('transform', function(d, i) {
    //     return 'translate(' + d.x + ',' + (d.y) + ')';
    // });




    node.append('rect')
        .attr('height', function(d, i) {
            if (i < 16) {
                return d.dy;
            } else {
                return d.dy;
            }
        })
        .attr('width', sankey.nodeWidth())
        .style('fill', function(d) {
            // return d.color = color(d.name.replace(/ .*/, ''));
            return d.color || '#b5d8e1';
        })
        // .style('stroke', function(d) {
        //     return d3.rgb(d.color).darker(2);
        // })
        .append('title')
        .text(function(d) {
            return d.name + '\n' + format(d.value);
        });

    // node.append('text')
    //     // .attr('x', -6)
    //     .attr('y', function(d) {
    //         return d.dy / 2;
    //     })
    //     .attr('dy', '.35em')
    //     .attr('dx', (d, i) => (i > 15 ? '2em' : '-2em'))
    //     .attr('text-anchor', (d, i) => {
    //         return i > 15 ? 'start' : 'end'
    //     })
    //     .attr('transform', null)
    //     .text(function(d) {
    //         return d.name;
    //     })
    //     .filter(function(d) {
    //         return d.x < width / 2;
    //     })
    //     .attr('x', 6 + sankey.nodeWidth());



    //  link
    let link = g.append('g').selectAll('.link')
        .data(input.links)
        .enter().append('path')
        .attr('class', 'link')
        .style('fill', 'none')
        .attr('d', path)
        .attr('stroke-width', (d, i) => {
            return d.strokeWidth
        })
        .style('stroke', (d) => {
            return d.color || 'salmon'
        })
        // .style('stroke-width', function(d) {
        //     return Math.max(1, 3);
        //     // return Math.max(1, d.dy);
        // })
        .sort(function(a, b) {
            return b.dy - a.dy;
        });

    link.append('title')
        .text(function(d) {
            return d.source.name + ' → ' + d.target.name + '\n' + format(d.value);
        });



    function dragmove(d) {
        console.log(d3.event)
            // d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
            // sankey.relayout();
            // link.attr("d", path);
    }



}
