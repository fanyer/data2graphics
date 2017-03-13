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
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


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



    var unit =copy15();
    unit.attr('transform', 'translate(400,0)')


    var unit2 =copy15();
    unit2.attr('transform', 'translate(200,40)')


    // var clippath = unit.append('clipPath')
    //     .attr('id', (d, i) => {
    //         return 'clip-' + i
    //     })
    //     .append('rect')
    //     .attr('height', '40');





    function basicCurve(arr) {
        let g = svg.append('g')
            .attr('class', 'pathContainer')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        g.selectAll('.basicCurve').data(arr)
            .enter()
            .append('path')
            .attr('d', (d, i) => (
                `M0 ` + (100 + d.offset) +
                `L 500 ` + (100 + d.offset) +
                `A ` + (100 - d.offset) + ' ' + (100 - d.offset) + ` 0 0 1 ` + (600 - d.offset) + ` 200
                    L ` + (600 - d.offset) + ` 600`))
            .style('stroke', 'seagreen')
            .attr('class', 'basicCurve')
            .attr('stroke-width', (d) => (d.strokeWidth))
            .attr('fill', 'none');

        return g;

    }


    function copy15() {
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
        }]);
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
