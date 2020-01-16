// import './basic.css'
import { metabolism, trendCompare, deviation } from '../lib/'

// import { trendCompare } from './lib/trend-compare'
// import { pieStruct } from './lib/pie-struct'
// import { pieSpiral } from './lib/pie-spiral'
// import { proportion } from './lib/proportion'
// import { deviation } from './lib/deviation'
// import { metabolism } from './lib/metabolism'
// import { curveGraph } from './lib/curve-graph'
// import { linkGraph } from './lib/link-graph'
// import { arcLine } from './lib/arc-line'
// import { amountHistogram } from './lib/amount-histogram'
// import { lineRect3, lineRect5, vLineRect5, vLineRect3 } from './lib/line-rect3'






var oDiv3 = document.querySelector('#div3');
var oDiv4 = document.querySelector('#div4');
var oDiv5 = document.querySelector('#div5');


deviation(oDiv3);
trendCompare(oDiv4);
metabolism(oDiv5);
// scoreLevel(oDiv8);
// amountHistogram(oDiv9);
// boomPie(oDiv10);

