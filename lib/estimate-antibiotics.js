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
        margin = { top: 0, right: 40, bottom: 50, left: 40 };

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



    // var topPath1 = copy15('top', 'salmon');
    // topPath1.attr('transform', 'translate(-1150,0)')


    // var topPath2 = copy15('top');
    // topPath2.attr('transform', 'translate(-1100,-120)')

    // var topPath3 = copy15('top');
    // topPath3.style('transform-origin', '750px 435px');
    // topPath3.style('transform', 'scaleX(-1) translate(-215px,-180px)');


    // var topPath4 = copy15('top');
    // topPath4.style('transform-origin', '750px 435px');
    // topPath4.style('transform', 'translate(270px,-60px) scaleX(-1)');


    // var topPath5 = copy15('top', 'seagreen');
    // topPath5.style('transform-origin', '750px 435px');
    // topPath5.style('transform', 'translate(350px,180px) scaleX(-1)');

    // var topPath6 = copy15('top', 'seagreen');
    // topPath6.style('transform-origin', '750px 435px');
    // topPath6.style('transform', 'translate(-620px,240px)');

    // var topPath7 = copy15('top', 'seagreen');
    // topPath7.style('transform-origin', '750px 435px');
    // topPath7.style('transform', 'translate(700px,60px) scaleX(-1)');

    // var topPath8 = copy15('top', 'seagreen');
    // topPath8.style('transform-origin', '750px 435px');
    // topPath8.style('transform', 'translate(-330px,120px)');








    // var bottomPath1 = copy15('bottom', 'cyan');
    // bottomPath1.style('transform-origin', '750px 435px');
    // bottomPath1.style('transform', 'translate(-270px,-100px) scaleY(-1)');


    // var bottomPath2 = copy15('bottom', 'seagreen');
    // bottomPath2.style('transform-origin', '750px 435px');
    // bottomPath2.style('transform', 'translate(-210px,-40px) scaleY(-1)');

    // var bottomPath4 = copy15('top', 'salmon');
    var bottomPath3 = copy15('top', 'black');
    // bottomPath3.style('transform', 'translate(100,0)');


    // var bottomPath3 = copy15('bottom', 'seagreen');
    // bottomPath3.style('transform-origin', '750px 435px');
    // bottomPath3.style('transform', 'translate(-330px,120px)');




    // var unit4 = copy15('bottom');
    // unit4.style('transform-origin', '400px 435px');
    // unit4.style('transform', 'scaleY(-1) translateY(-100px)');


    /**
     * [clippath description]
     * @type {[type]}
     */
    var clippath = svg.selectAll('.clippath')
        .data([1, 2]).enter().append('clipPath')
        .attr('id', (d, i) => {
            return 'clip-' + i
        })
        .append('rect')
        .attr('width', '1420')
        .attr('class', 'clippath')
        .attr('transform', (d, i) => ('translate(0,' + (465 * i) + ')'))
        .attr('height', '535');





    function basicCurve(arr, postion, color, dx, dy) {
        let r=100

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
                `L `+(width-r)+' ' + (100 + d.offset) +
                `A ` + (r - d.offset) + ' ' + (r - d.offset) + ` 0 0 1 ` + (width - d.offset) + ` 200
                    L ` + (width - d.offset) + ` `+(height)))
            .style('stroke', color)
            .attr('class', 'basicCurve')
            .attr('stroke-width', (d) => (d.strokeWidth))
            .attr('fill', 'none');

        gChild.attr('transform','translate('+(-width/2+40/2)+',0)');

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
