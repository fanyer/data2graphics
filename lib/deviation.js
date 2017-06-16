import D3 from 'd3';
import { deviationConfig } from './default-config/deviation.config'
import { detectCanvas } from './utils/detect'
import { onion, gt6, onionGt6 } from './utils/shape'



const d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-axis'),
    require('d3-selection'),
    require('d3-color'),
    require('d3-scale')
);



export function deviation(parrent, config) {

    const input = config || deviationConfig

    const labels = Object.keys(input.data)
    const data = Object.values(input.data)


    // detect svg or canvas
    let svgNS = 'http://www.w3.org/2000/svg';
    let svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '1000')
    svg.setAttribute('height', '500')
    parrent.append(svg)

    svg = d3.select('svg');
    let margin = { top: 20, right: 40, bottom: 50, left: 200 },
        width = +svg.attr('width') - margin.left - margin.right,
        height = +svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let formatNumber = d3.format('.2f');

    // define basic location Axis
    let x = d3.scaleLinear()
        .domain([0, 5])
        .range([height, 0]);


    let y = d3.scaleLinear()
        .domain([0, 4 + 0.3])
        .range([0, width]);

    let xAxis = d3.axisLeft(x)
        .ticks(5)
        .tickSize(-width)
        .tickFormat((d) => {
            return labels[d - 1]
        });

    let yAxis = d3.axisBottom(y)
        .ticks(4)
        .tickSize(-height)
        .tickFormat((d, i) => {
            if (i === 2) return '标准值'
            return d * 25
        });

    g.append('g')
        .attr('class', 'axis axis--x')
        // .attr('transform', 'translate(0,0)')
        .call(customXAxis);

    g.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', 'translate(0,' + (height) + ')')
        .call(customYAxis);


    function customXAxis(g) {
        g.call(xAxis);
        g.select('.domain').remove();
        g.selectAll('.tick:not(:first-of-type) line').attr('stroke', '#fff');
        g.selectAll('.tick text').attr('x', -24).attr('dy', 4);

    }

    function customYAxis(g) {
        g.call(yAxis);
        g.select('.domain').remove();
        g.selectAll('.tick:not(:first-of-type) line').attr('stroke', '#ccc');
        g.selectAll('.tick:nth-child(3) line').attr('stroke', 'seagreen')
            .attr('stroke-width', '3')
            .attr('opacity', '0.6');
        g.selectAll('.tick:nth-child(3) text').style('font-family', 'adad')
            .style('font-size', '20px')
            .style('fill', 'seagreen');

        g.selectAll('.tick text').attr('x', 4).attr('dy', 24);
    }



    //  draw bar 
    let barH = 26;

    let bar = g.selectAll('g.bar')
        .data(data)
        .enter().append('g')
        .attr('class', 'bar')
        .attr('transform', function(d, i) {
            return 'translate(0,' + (x(i + 1) - barH / 2) + ')';
        });

    let barLine1 = d3.line()
        .defined((d) => (d))
        .x((d) => {
            return d[0]
        })
        .y((d) => (d[1]))
        .curve(d3.curveLinear);

    let barLine2 = d3.line()
        .defined((d) => (d))
        .x((d) => {
            return d[1]
        })
        .y((d) => (d[0]))
        .curve(d3.curveLinear);

    let rect = bar.append('rect')
        .attr('width', function(d) {
            return y(d * 4) + barH / 2;
        })
        .attr('stroke-width', '3')
        .attr('rx', barH / 2)
        .attr('ry', barH / 2)
        .attr('transform', 'translate(' + (-barH / 2) + ',0)')
        .attr('stroke', 'steelblue')
        .attr('height', barH);

    bar.attr('clip-path', (e, i) => ('url(#clip-' + i + ')'))

    let clippath = bar.append('clipPath')
        .attr('id', (d, i) => {
            return 'clip-' + i
        })
        .append('rect')
        .attr('width', '1000')
        .attr('transform', 'translate(0,-5)')
        .attr('height', '40');


    // bar.append('g').data([
    //         [
    //             [100, 10],
    //             [200, 21]
    //         ],
    //         [
    //             [100, 20],
    //             [200, 21]
    //         ],
    //         [
    //             [100, 30],
    //             [200, 31]
    //         ],
    //         [
    //             [100, 40],
    //             [200, 41]
    //         ]

    //     ])
    //     .append('path')
    //     .attr('stroke', 'steelblue')
    //     .attr('d', barLine1);

    // bar.append('g').data([
    //         [
    //             [100, 10],
    //             [200, 21]
    //         ],
    //         [
    //             [100, 20],
    //             [200, 21]
    //         ],
    //         [
    //             [100, 30],
    //             [200, 31]
    //         ],
    //         [
    //             [100, 40],
    //             [200, 41]
    //         ]

    //     ])
    //     .append('path')
    //     .attr('stroke', 'steelblue')
    //     .attr('d', barLine2);




    bar.append('text')
        .attr('class', 'value')
        .attr('x', function(d) {
            return y(d * 4);
        })
        .attr('y', 13)
        .attr('dx', 14)
        .attr('dy', barH * 0.3)
        .style('fill', '#000')
        .style('font-size', '26px')
        .style('font-family', 'adad')
        .attr('text-anchor', 'start')
        .text(function(d) {
            return d3.format('.2%')(d);
        });

}
