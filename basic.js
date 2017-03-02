import './basic.css'
// import {intakeFatProportion} from './lib/intake-fat-distribution'
import {sankey} from './lib/sankey'

var oDiv1= document.querySelector('#div1')

// var config ={
//   'sature': 14,
//   'unsature': 86
// }

sankey(oDiv1)

// intakeFatProportion(oDiv1)