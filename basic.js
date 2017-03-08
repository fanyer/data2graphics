// import './basic.css'
// import {intakeFatProportion} from './lib/intake-fat-distribution'
import {estimateAntibiotics} from './lib/estimate-antibiotics'

var oDiv1= document.querySelector('#div1')

// var config ={
//   'sature': 14,
//   'unsature': 86
// }

estimateAntibiotics(oDiv1)

// intakeFatProportion(oDiv1)