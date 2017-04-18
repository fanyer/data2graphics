import D3 from 'd3'
import { detectSVG, hPattern,vPattern2 } from './utils/detect'
import baseConf from './default-config/amount-bile.config'

const d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-axis'),
    require('d3-scale')
);


export function amountBile(parent, config) {

    const input = config || baseConf;
    detectSVG(parent);

    let svg = d3.select('#' + parent.id + ' svg'),
        margin = { top: 50, right: 60, bottom: 150, left: 130 };

    svg.attr('width', 1000)
        .attr('height', 800);

    let width = svg.attr('width') - margin.left - margin.right,
        height = svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var formatNumber = d3.format('.2%');

    hPattern(svg,'steelblue');
    hPattern(svg,'orange')

    vPattern2(svg,40,400);
    vPattern2(svg,40,400)

    // define basic location Axis
    var x = d3.scaleLinear()
        .domain([0, 2])
        .range([0, width]);


    var y = d3.scaleLinear()
        .domain([0, 10])
        .range([0, height]);

    var yAxis = d3.axisLeft(y)
        .ticks(10)
        .tickSize(-width)
        .tickFormat((d) => {
            return 10-d
        });

    var xAxis = d3.axisBottom(x)
        .ticks(1)
        .tickSize(4)
        .tickFormat((d, i) => {
            // return d
        });

    g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + (height) + ')')
        .call(customXAxis);

    g.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', 'translate(0,0)')
        .call(customYAxis);


    function customXAxis(g) {
        g.call(xAxis);
        g.selectAll('.tick text').attr('x', 4).attr('dy', 24);

    }

    function customYAxis(g) {
        g.call(yAxis);
        g.selectAll('.domain').remove();
        g.selectAll('.tick text').attr('x', -24).attr('dy', 4);
        g.selectAll('.tick line').attr('stroke', '#ccc');
    };

    // console.log(y(input.bileAcid))
    let barWidth = 200;
    g.append('rect')
        .attr('class', 'bar')
        .attr('fill', 'url(#hpattern-steelblue)')
        .attr('width', barWidth)
        .attr('height', y(input.bileAcid))
        .attr('transform', function() {
            return 'translate(' + (x(1) - barWidth / 2) + ',' + y(10 - input.bileAcid) + ')';
        });

    g.append('rect')
        .attr('class', 'bar')
        .attr('fill', 'url(#hpattern-orange)')
        .attr('width', barWidth)
        .attr('height', y(input.cholesterol))
        .attr('transform', function() {
            return 'translate(' + (x(1) - barWidth / 2) + ',' + y(10 - input.cholesterol - input.bileAcid) + ')';
        });




}
