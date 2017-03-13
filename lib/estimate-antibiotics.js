import D3 from 'd3'
import { detectSVG } from './utils/detect'
import { clone } from './utils/clone'
import baseConf from './estimate-default-config'
import { basicCurve } from './estimate-antibiotics/'

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


function EstimateAntibiotics() {
    this.type = 'EstimateAntibiotics';
}



/**
 * @param  {Dom}
 * @param  {Json}
 * @return {[type]}
 */
function init(parent, config) {
    var input = config || baseConf;

    detectSVG(parent);


    var svg = d3.select('#' + parent.id + ' svg'),
        margin = { top: 20, right: 40, bottom: 50, left: 40 };

    svg.attr('width', 1500)
        .attr('height', 1000);

    var width = svg.attr('width') - margin.left - margin.right,
        height = svg.attr('height') - margin.top - margin.bottom,
        gTop = svg.append('g')
        .attr('class', 'gTop')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'),
        gBottom = svg.append('g')
        .attr('class', 'gBottom')
        .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')');


    $(parent)
        .append($('<div/>', {
            id: 'centerDiv',
            class: 'centerDiv'
        }));


    $('#' + parent.id + ' #centerDiv')
        .append($('<div/>', {
            id: 'div2',
            class: 'div2'
        }))
        .append($('<div/>', {
            id: 'div3',
            class: 'div3'
        }));



    var unit1 = copy15('top', 'salmon');
    unit1.attr('transform', 'translate(-800,0)')


    var unit2 = copy15('top');
    unit2.attr('transform', 'translate(-500,60)')

    var unit3 = copy15('top');
    unit3.style('transform-origin', '750px 435px');
    unit3.style('transform', 'scaleX(-1) translate(-900px,120px)');

    // var unit4 = copy15('bottom');
    // unit4.style('transform-origin', '400px 435px');
    // unit4.style('transform', 'scaleY(-1) translateY(-100px)');

    var unit5 = copy15('top');
    unit5.style('transform-origin', '750px 435px');

    unit5.style('transform', 'translate(400px,200px) scaleX(-1)');






    var clippath = svg.selectAll('.clippath')
        .data([1, 2]).enter().append('clipPath')
        .attr('id', (d, i) => {
            return 'clip-' + i
        })
        .append('rect')
        .attr('width', '1300')
        .attr('class', 'clippath')
        .attr('transform', 'translate(100,' + (-margin.top) + ')')
        .attr('height', '535');





    function basicCurve(arr, postion, color) {

        let num = (postion === 'top' ? 0 : 1)
        let Container = (postion === 'top' ? gTop : gBottom);

        let gChild = Container
            .attr('clip-path', 'url(#clip-' + num + ')')
            .append('g')
            .attr('class', 'pathContainer');

        gChild.selectAll('.basicCurve')
            .data(arr)
            .enter()
            .append('path')
            .attr('d', (d, i) => (
                `M0 ` + (100 + d.offset) +
                `L 1300 ` + (100 + d.offset) +
                `A ` + (100 - d.offset) + ' ' + (100 - d.offset) + ` 0 0 1 ` + (1400 - d.offset) + ` 200
                    L ` + (1400 - d.offset) + ` 600`))
            .style('stroke', color)
            .attr('class', 'basicCurve')
            .attr('stroke-width', (d) => (d.strokeWidth))
            .attr('fill', 'none');


        return gChild;

    }


    function copy15(pos, color) {
        return basicCurve([{
            offset: 0,
            strokeWidth: 1
        }, {
            offset: 4,
            strokeWidth: 1
        }, {
            offset: 8,
            strokeWidth: 1
        }, {
            offset: 12,
            strokeWidth: 1
        }, {
            offset: 16,
            strokeWidth: 1
        }, {
            offset: 20,
            strokeWidth: 1
        }, {
            offset: 24,
            strokeWidth: 1
        }, {
            offset: 28,
            strokeWidth: 1
        }, {
            offset: 32,
            strokeWidth: 1
        }, {
            offset: 36,
            strokeWidth: 1

        }], pos, color);
    }


}


function topLeft(argument) {
    // body...
}



function topRight(argument) {
    // body...
}


function bottomRight(argument) {
    // body...
}

function bottomLeft(argument) {
    // body...
}



function index(argument) {
    // body...
}

EstimateAntibiotics.prototype = {
    constructor: estimateAntibiotics,
    init: init,
    topLeft: '',
    topRight: '',
    bottomRight: '',
    bottomLeft: '',
    index: ''
}

var estimateAntibiotics = (new EstimateAntibiotics);





export default estimateAntibiotics;
