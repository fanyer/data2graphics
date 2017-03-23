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
        deviation: 1,
        mean: 0,
        data: [{
            x: [14000, 14500],
            y: 0.3
        }, {
            x: [14500, 15000],
            y: 0.35
        }, {
            x: [15000, 15500],
            y: 0.4
        }, {
            x: [15500, 16000],
            y: 0.45
        }, {
            x: [16000, 16500],
            y: 0.5
        }, {
            x: [16500, 17000],
            y: 0.55
        }, {
            x: [17000, 17500],
            y: 0.6
        }, {
            x: [17500, 18000],
            y: 0.65
        }, {
            x: [18000, 18500],
            y: 0.7
        }, {
            x: [18500, 19000],
            y: 0.75
        }, {
            x: [19000, 19500],
            y: 0.5
        }, {
            x: [19500, 20000],
            y: 0.5


        }]
    };

    detectSVG(oDom)
}
