import D3 from 'd3'
import { detectSVG, pattern } from './utils/detect'
import { clone } from './utils/clone'
import baseConf from './default-config/metabolism.config'


var d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-random'),
    require('d3-axis'),
    require('d3-scale')
);

export function metabolism(parent, config) {

    let input = config || baseConf;
    detectSVG(parent);



    let svg = d3.select('#' + parent.id + ' svg'),
        margin = { top: 50, right: 60, bottom: 150, left: 60 };

    svg.attr('width', 1000)
        .attr('height', 800);

    let width = svg.attr('width') - margin.left - margin.right,
        height = svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var formatNumber = d3.format('.2f');


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
        .curve(d3.curveBasis);



    // define basic location Axis
    var x = d3.scaleLinear()
        .domain([0, 5])
        .range([height, 0]);


    var y = d3.scaleLinear()
        .domain([0, 4])
        .range([0, width]);

    var xAxis = d3.axisLeft(x)
        .ticks(5)
        .tickSize(4)
        .tickFormat((d) => {
            return d
        });

    var yAxis = d3.axisBottom(y)
        .ticks(4)
        .tickSize(4)
        .tickFormat((d, i) => {
            return d * 25
        });

    g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,0)')
        .call(customXAxis);

    g.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', 'translate(30,' + (height + 30) + ')')
        .call(customYAxis);


    function customXAxis(g) {
        g.call(xAxis);
        g.selectAll('.tick text').attr('x', -24).attr('dy', 4);

    }

    function customYAxis(g) {
        g.call(yAxis);
        g.selectAll('.tick text').attr('x', 4).attr('dy', 24);
    }



    // curve
    let data = [];
    g.datum(data).enter()
        .append('path')
        .attr('d', (d) => (d));






}
