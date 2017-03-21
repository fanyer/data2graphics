import D3 from 'd3'
import { detectSVG, pattern } from './utils/detect'
import { clone } from './utils/clone'


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

export function metabolism(oDom, config) {

    let input = config || {

    }
}
