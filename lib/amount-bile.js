import D3 from 'd3'
import { detectSVG, hPattern, vPattern2 } from './utils/detect'
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

    // var formatNumber = d3.format('.2%');

    hPattern(svg, 50, 500, '#66c9b2');
    hPattern(svg, 50, 500, '#f0938f')


    // define basic location Axis
    var x = d3.scaleLinear()
        .domain([0, 2])
        .range([0, width]);


    var y = d3.scaleLinear()
        .domain([0, 9])
        .range([0, height]);

    var yAxis = d3.axisLeft(y)
        .ticks(9)
        .tickSize(-width)
        .tickFormat((d) => {
            // return 10-d
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
        g.selectAll('.tick line').attr('stroke-width', 2)

        g.selectAll('.tick text').attr('x', -24).attr('dy', 4);
        g.selectAll('.tick line').attr('stroke', '#ccc');
        g.select('.tick:last-child line').attr('stroke-width', 6);
    };

    // console.log(y(input.bileAcid))
    let barWidth = 300;


    g.append('rect')
        .attr('class', 'bar')
        .attr('fill', 'url(#hpattern-#f0938f)')
        .attr('stroke-width', 8)
        .attr('stroke', '#f0938f')
        .attr('width', barWidth)
        .attr('height', y(input.cholesterol))
        .attr('transform', function() {
            return 'translate(' + (x(1) - barWidth / 2) + ',' + y(9 - input.cholesterol - input.bileAcid) + ')';
        });

    g.append('rect')
        .attr('class', 'bar')
        .attr('fill', 'url(#hpattern-#66c9b2)')
        .attr('stroke-width', 8)
        .attr('stroke', '#66c9b2')
        .attr('width', barWidth)
        .attr('height', y(input.bileAcid))
        .attr('transform', function() {
            return 'translate(' + (x(1) - barWidth / 2) + ',' + y(9 - input.bileAcid) + ')';
        });

    g.append('line')
        .attr('class', 'normLine')
        .attr('stroke-width', 6)
        .attr('x1', 0)
        .attr('y1', ()=>(y(9 - input.bileAcid)))
        .attr('x2', 810)
        .attr('y2', ()=>(y(9 - input.bileAcid)))
        .attr('stroke-dasharray', '20,8')
        .attr('stroke', 'orange')
        .attr('transform', () => {
            // return 'translate(100,50)'
        });

    g.append('text')
        .attr('class', 'text')
        .attr('x', () => {
            return 0
        })
        .attr('y', () => {
            return y(9 - input.bileAcid)+26
        })
        .style('fill', '#686868')
        .style('font-family', 'adad')
        .style('font-size', '26px')
        .attr('text-anchor', 'start')
        .text(() => {
            return '正常水平'
        })


    function generateLegend(config) {
        let legend = g.append('g')
            .attr('class', 'lengend')



        legend.append('rect')
            .attr('x', config.x)
            .attr('y', config.y)
            .attr('width', 30)
            .attr('height', 30)
            .attr('alignment-baseline','baseline')
            .attr('fill', config.color);


        legend.append('text')
            .attr('x', config.x+30+10)
            .attr('y', config.y+30-7)
            .attr('alignment-baseline','baseline')
            .style('font-size', '24px')
            .text(config.text)

    }

    let legendConfig1 = {
        x: 100,
        y: 22,
        color: '#66c9b2',
        text: '胆汁酸'
    }
    let legendConfig2 = {
        x: 600,
        y: 22,
        color: '#f0938f',
        text: '胆固醇'
    }

    generateLegend(legendConfig1)
    generateLegend(legendConfig2)




}
