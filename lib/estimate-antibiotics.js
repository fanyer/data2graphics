import D3 from 'd3'
import { detectSVG } from './utils/detect'
import baseConf from './estimate-default-config'

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
    this.aa = 1212;
}



/**
 * @param  {[type]}
 * @param  {[type]}
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
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    var centerDiv = document.createElement('div');
    parent.appendChild(centerDiv);


    $(centerDiv).css({
        'width': '1000',
        'height': '100',
        'background': 'steelblue',
        'border-radius': '16px'
    })


    console.log($(centerDiv));

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
