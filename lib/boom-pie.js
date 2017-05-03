import D3 from 'd3'
import { detectCanvas, detectSVG, vPattern3, vPattern1, vPattern4 } from './utils/detect'
import { lineRect3Config, lineRect5Config, vLineRect5Config, vLineRect3Config } from './default-config/boom-pie.config'
/*seagreen   #00ab84*/
/*orange   #e4be6f*/
/*salmon   #cb8d88*/


// 丁酸:529918
// 丙酸:392369
// 乙酸:782862

const colors5 = ['#cb8d88', '#e4be6f', '#00ab84', '#e4be6f', '#cb8d88']


const d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-array'),
    require('d3-sankey'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-axis'),
    require('d3-color'),
    require('d3-scale')
);



export function boomPie(parent, config) {
  let svg=detectSVG(parent)

}
