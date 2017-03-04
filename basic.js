import './basic.css'
// import {intakeFatProportion} from './lib/intake-fat-distribution'
import {curveGraph} from './lib/guide-goodness'

var oDiv1= document.querySelector('#div1')

// var config ={
//   'sature': 14,
//   'unsature': 86
// }

curveGraph(oDiv1)

// intakeFatProportion(oDiv1)