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

export function estimateAntibiotics(parent, config) {

    var input = config || baseConf;

    detectSVG(parent)

    var svg = d3.select('#' + parent.id + ' svg'),
        margin = { top: 20, right: 40, bottom: 50, left: 40 },
        width = +svg.attr('width') - margin.left - margin.right,
        height = +svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var centerDiv=parent.appendChild('div');

    console.log($(centerDiv))



}
