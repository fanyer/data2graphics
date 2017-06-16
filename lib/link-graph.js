import D3 from 'd3'
import canvg from 'canvg'
import { vBezeireArr, bezeire } from './bezeire'
import { detectSVG, detectCanvas } from './utils/detect'
import { addOpacity, hex2rgba } from './utils/color'
import {  linkGraphConfig } from './default-config/guide-goodness.config'




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
    // let canvas = detectCanvas(parent)

    let svg = detectSVG(parent, 'svg-' + parent.id)

    svg.setAttribute('width', '800')
    svg.setAttribute('height', '1500')


    svg = d3.select('#' + parent.id + ' svg');
    let width = +svg.attr('width') - margin.left - margin.right - 100,
        height = +svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    let formatNumber = d3.format('.2f');
    svg.attr('viewBox',input.viewBox);


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
        // .attr('class', 'link')
        .attr('stroke-opacity', .2)
        .attr('fill', 'none')
        .attr('d', path)
        .attr('stroke-width', (d, i) => {
            return d.strokeWidth
        })
        .attr('stroke', (d) => {
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
        // console.log(d3.event)
        // d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
        // sankey.relayout();
        // link.attr("d", path);
    }

    let oSvg = document.querySelector('#' + parent.id + ' svg')

    // let context = canvas.getContext('2d');


    // context.globalAlpha = 0.4
    // canvg(canvas, document.querySelector('#' + parent.id + ' svg').outerHTML)
    // parent.removeChild(oSvg)



}
