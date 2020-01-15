/*   author:fanyer
 *   mail: iofanyer@gmail.com
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 
 
// import './basic.css'
import { trendCompare } from './lib/trend-compare'
import { pieStruct } from './lib/pie-struct'
import { pieSpiral } from './lib/pie-spiral'
import { proportion } from './lib/proportion'
import { deviation } from './lib/deviation'
import { metabolism } from './lib/metabolism'
import { curveGraph } from './lib/curve-graph'
import { linkGraph } from './lib/link-graph'
import { arcLine } from './lib/arc-line'
import { amountHistogram } from './lib/amount-histogram'
import { lineRect3, lineRect5, vLineRect5, vLineRect3 } from './lib/line-rect3'
// import { pie } from './lib/pie'
import { boomPie } from './lib/boom-pie'
// import {antibioticsParse} from 'parser4data'
// import {linkParse} from 'parser4data'
import subwayRoutes from './lib/subway-routes'

// import canvg from "canvg";



// console.log(rawLinkConfig)
// console.log(linkParse(rawLinkConfig))

Object.values = x =>
    Object.keys(x).reduce((y, z) =>
        y.push(x[z]) && y, []);






var oDiv1 = document.querySelector('#div1');
var oDiv2 = document.querySelector('#div2');
var oDiv3 = document.querySelector('#div3');
var oDiv4 = document.querySelector('#div4');
var oDiv5 = document.querySelector('#div5');
var oDiv6 = document.querySelector('#div6');
var oDiv7 = document.querySelector('#div7');
var oDiv8 = document.querySelector('#div8');
var oDiv9 = document.querySelector('#div9');
var oDiv10 = document.querySelector('#div10');
var oDiv11 = document.querySelector('#div11');



curveGraph(oDiv1);
linkGraph(oDiv2);
trendCompare(oDiv3);
proportion(oDiv4);
deviation(oDiv6)
arcLine(oDiv7);
subwayRoutes.init(oDiv11)

// pieSpiral(oDiv5);
// pieStruct(oDiv6);
// metabolism(oDiv5);
// scoreLevel(oDiv8);
// amountHistogram(oDiv9);
// boomPie(oDiv10);





// intakeSugarDistribution(oDiv1)

// intakeFiberStruct(oDiv1, {
//     'text': 'aaaa',
//    'data': {
//         '哒哒哒': {
//             'value': 0.08,
//             'color': 'seagreen'
//         },
//         '胆固醇': {
//             'value': 0.17,
//             'color': 'steelblue'
//         },
//         '饱和脂肪酸': {
//             'value': 0.2,
//             'color': 'salmon'
//         },
//         '不饱和脂肪酸': {
//             'value': 0.1,
//             'color': 'steelblue'
//         },
//         '谁谁脂肪酸': {
//             'value': 0.05,
//             'color': 'steelblue'
//         },
//         '鞘脂类': {
//             'value': 0.4,
//             'color': 'steelblue'
//         }
//     }
// });
// intakeFatProportion(oDiv2,{
//      'data': {
//         'sature': 78,
//         'unsature': 22
//     }
// })

let config3 = {
    text: 'dadad阿达达',
    data: {
        '维生素a': {
            'en': 'adaeda',
            'value': 20
        },
        '维生素b': {
            'en': '',
            'value': 25
        },
        '维生素c': {
            'en': '',
            'value': 92
        },
        '维生素d': {
            'en': '',
            'value': 78
        },
        '维生素e': {
            'en': '',
            'value': 43
        },
        '维生素f': {
            'en': '',
            'value': 96
        },
        '维生素g': {
            'en': '',
            'value': 32
        },
        '维生素h': {
            'en': '',
            'value': 79
        },
        '维生素i': {
            'en': '',
            'value': 82
        },
        '维生素j': {
            'en': '',
            'value': 45
        },
        '维生素k': {
            'en': '',
            'value': 53
        },
        '维生素l': {
            'en': '',
            'value': 98
        },
        '维生素m': {
            'en': '',
            'value': 92
        },
        '维生素n': {
            'en': '',
            'value': 48
        },
        '维生素o': {
            'en': '',
            'value': 84
        },
        '维生素p': {
            'en': '',
            'value': 92
        }
    }
}

//shiasn's input
let config4 = {
        '维生素a': {
            'en': '',
            'value': 20
        },
        '维生素b': {
            'en': '',
            'value': 25
        },
        '维生素c': {
            'en': '',
            'value': 92
        },
        '维生素d': {
            'en': '',
            'value': 78
        },
        '维生素e': {
            'en': '',
            'value': 43
        },
        '维生素f': {
            'en': '',
            'value': 96
        },
        '维生素g': {
            'en': '',
            'value': 32
        },
        '维生素h': {
            'en': '',
            'value': 79
        },
        '维生素i': {
            'en': '',
            'value': 82
        },
        '维生素j': {
            'en': '',
            'value': 45
        },
        '维生素k': {
            'en': '',
            'value': 53
        },
        '维生素l': {
            'en': '',
            'value': 98
        },
        '维生素m': {
            'en': '',
            'value': 92
        },
        '维生素n': {
            'en': '',
            'value': 48
        },
        '维生素o': {
            'en': '',
            'value': 84
        },
        '维生素p': {
            'en': '',
            'value': 92
        }
    }
    // estimateFiber(oDiv3, config3);
    // pie(oDiv1, {
    //     'sature': 1,
    //     'adad': 2,
    //     'nini': 5,
    //     'unsature': 3
    // })



let config = {
    top: [{
        x: -7,
        y: 5,
        color: '',
        tag: {
            cn: '头孢菌素类',
            en: 'Cephalosporins'
        },
        data: {
            rank: 0.2807,
            median: 117.4241,
            absolute: 59.31948
        },
        direction: 'left'
    }, {
        x: -6,
        y: 7,
        color: '',
        tag: {
            cn: '青霉素',
            en: 'Penicillins'
        },
        data: {
            rank: 0.2506,
            median: 128.4729,
            absolute: 61.05134
        },
        direction: 'left'
    }, {
        x: -5,
        y: 8,
        color: '',
        tag: {
            cn: '林可酰胺类',
            en: 'Lincosamides'
        },
        data: {
            rank: 0.606,
            median: 383.8253,
            absolute: 441.8302
        },
        direction: 'right'
    }, {
        x: -4,
        y: 6,
        color: '',
        tag: {
            cn: '利福霉素类',
            en: 'Rifampins'
        },
        data: {
            rank: 0.0012,
            median: 0,

            absolute: 0
        },
        direction: 'right'
    }, {
        x: -3,
        y: 2,
        color: '',
        tag: {
            cn: '多粘霉素类',
            en: 'Polymyxins'
        },
        data: {
            rank: 0.4012,
            median: 4.52788140,
            absolute: 2.895497
        },
        direction: 'right'
    }, {
        x: 1,
        y: 1,
        color: '',
        tag: {
            cn: '碳青霉烯类',
            en: 'Carbapenems'
        },
        data: {
            rank: 0.0012,
            median: 0,
            absolute: 0
        },
        direction: 'left'
    }, {
        x: 2,
        y: 4,
        color: '',
        tag: {
            cn: '糖肽类',
            en: 'Glycopeptides'
        },
        data: {
            rank: 0.5807,
            median: 1.63446,
            absolute: 2.246455
        },
        direction: 'right'
    }, {
        x: 5,
        y: 3,
        color: '',
        tag: {
            cn: '氨基糖苷类',
            en: 'Aminoglycosides'
        },
        data: {
            rank: 0.7506,
            median: 41.34121,
            absolute: 71.78424
        },
        direction: 'left'
    }],
    bottom: [{
        x: -2,
        y: 1,
        color: '',
        tag: {
            cn: 'β-内酰胺',
            en: 'β-lactam'
        },
        data: {
            rank: 0.7265,
            median: 0.08101419,
            absolute: 0.6476569
        },
        direction: 'left'
    }, {
        x: -1,
        y: 3,
        color: '',
        tag: {
            cn: '四环类素',
            en: 'Tetracyclines'
        },
        data: {
            rank: 0.5771,
            median: 362.3124,
            absolute: 385.8537
        },
        direction: 'left'
    }, {
        x: 0,
        y: 4,
        color: '',
        tag: {
            cn: '磷霉素类',
            en: 'Fosfomycins'
        },
        data: {
            rank: 0.6590,
            median: 0.3104377,
            absolute: 1.35659
        },
        direction: 'right'
    }, {
        x: 3,
        y: 5,
        color: '',
        tag: {
            cn: '氯霉素类',
            en: 'Chloramphenicois'
        },
        data: {
            rank: 0.0012,
            median: 362.3124,
            absolute: 385.8537
        },
        direction: 'left'
    }, {
        x: 4,
        y: 6,
        color: 'seagreen',
        tag: {
            cn: '大环内酯类',
            en: 'Macrolides'
        },
        data: {
            rank: 0.4843,
            median: 354.3231,
            absolute: 359.5278
        },
        direction: 'right'
    }, {
        x: 6,
        y: 7,
        color: 'orange',
        tag: {
            cn: '磺胺类',
            en: 'Sulfonamides'
        },
        data: {
            rank: 0.8795,
            median: 34.39402,
            absolute: 116.4283
        },
        direction: 'left'
    }, {
        x: 7,
        y: 2,
        color: 'orange',
        tag: {
            cn: '奎诺酮类',
            en: 'Quinolones'
        },
        data: {
            rank: 0.8036,
            median: 0,
            absolute: 0.8209219
        },
        direction: 'right'
    }],
    gap: [5, 7] //gap is the x value of central orange range's start & end, and start must lower than end
};

let config2 = {
    "score": 46.7,
    "data": {
        "低聚果糖": {
            "value": 0.4,
            "en": "Fructo-oligosaccharide"
        },
        "低聚异麦芽糖": {
            "value": 0.6,
            "en": "Isomalto-oligosaccharide"
        },
        "\u03B2-葡聚糖": {
            "value": 0.3,
            "en": "\u03B2-glucan"
        },

        "氨糖": {
            "value": 0.5,
            "en": "Glucosamine"
        },
        "饱和脂肪酸": {
            "value": 0.3,
            "en": "Saturated fat"
        },
        "不饱和脂肪酸": {
            "value": 0.8,
            "en": "Unsaturated fat"
        },
        "鞘脂类": {
            "value": 0.77,
            "en": "Sphingolipid"
        },
        "胆汁酸": {
            "value": 0.12,
            "en": "Bile acid"
        },
        "胆红素": {
            "value": 0.34,
            "en": "Bilirubin"
        },
        "胆固醇": {
            "value": 0.96,
            "en": "Cholestreol"
        },
        "淀粉": {
            "value": 0.43,
            "en": "Starch"
        },
        "膳食纤维": {
            "value": 0.213,
            "en": "Dietary fiber"
        }
    }
};

// estimateAntibiotics.init(oDiv1)
// estimateAntibiotics.init(oDiv1, parse2(rawConfig))

// boomPie(oDiv1)

// oDiv1.style.transform='scale(0.5)'
// console.log(oDiv1.style.transform)
// metabolism(oDiv3)
// metabolism(oDiv1, rawMetaConfig)
// scoreLevel(oDiv2, config2)
// curveGraph(oDiv1)

// linkGraph(oDiv3,linkParse(rawLinkConfig))
// linkGraph(oDiv3)
// amountHistogram(oDiv3, {
	// "normal":7,
	// "data":{
 //        "bileAcid": 9.4,
 //        "cholesterol": 0.4
 //    }})
// console.log(parse(rawConfig))

// lineRect5(oDiv3)
// lineRect3(oDiv3)
// lineRect5(oDiv2,[0.1,0.2,0.3,0.6])
// lineRect3(oDiv3)
// vLineRect5(oDiv2,[0.0392, 0.1649, 0.8371999999999999, 0.9608])
// vLineRect5(oDiv1,[0.1,0.2,0.3,0.4])
// vLineRect5(oDiv3)
// vLineRect3(oDiv3)
// vLineRect5(oDiv2,[0.1,0.2,0.3,0.8])
// lineRect3(oDiv3)

// console.log(html2canvas)

// html2canvas(document.body).then(function(canvas) {
//     document.body.appendChild(canvas);
// });
// 
// 

// var pdf = new jsPDF('p', 'pt', 'letter');
// var canvas = pdf.canvas;

// console.log(pdf.canvas)

// canvas.width = 27000;
// canvas.height = 700;

// console.log(1212)

// html2canvas(document.body, {
//     canvas: canvas,
//     onrendered: function(canvas) {
//         var iframe = document.createElement('iframe');
//         iframe.setAttribute('style', 'position:fixed;right:0; top:0; bottom:0; height:100%; width:500px');
//         document.body.appendChild(iframe);
//         // iframe.src = pdf.output('datauristring');

//         //var div = document.createElement('pre');
//         //div.innerText=pdf.output();
//         //document.body.appendChild(div);
//     }
// });






// var makePdf = function() {
//     var pdf = new jsPDF('p', 'pt', 'a2');
//     // console.log(pdf)
//     var c = pdf.canvas;
//     c.width = 1000;
//     c.height = 700;
//     var ctx = c.getContext('2d');
//     ctx.ignoreClearRect = true;
//     ctx.fillStyle = '#ffffff';
//     ctx.globalAlpha = 0.5;
//     ctx.fillRect(0, 0, 1000, 700);
//     //load a svg snippet in the canvas with id = 'drawingArea'
//     // console.log(document.querySelector('#svg-div3').outerHTML);
//     // console.log( canvg(c, document.getElementById('#svg1'))
//     canvg(c, document.querySelector('#div3 svg').outerHTML, {
//         ignoreMouse: true,
//         ignoreAnimation: true,
//         ignoreDimensions: true
//     });

//     pdf.addPage()
//     pdf.setDrawColor()
//     return pdf;
// }

// var iframe = document.createElement('iframe');
// iframe.setAttribute('style', 'position:fixed;right:0; top:0; bottom:0; height:100%; width:800px');
// document.body.appendChild(iframe);

// iframe.setAttribute('src', makePdf().output('dataurlstring'));
// // document.getElementById('#div3').innerText = makePdf().output();
