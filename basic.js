// import './basic.css'
// import {intakeFatProportion} from './lib/intake-fat-distribution'
import { metabolism } from './lib/metabolism'
import { curveGraph } from './lib/guide-goodness'
import { scoreLevel } from './lib/score-level'
import estimateAntibiotics from './lib/estimate-antibiotics'

var oDiv1 = document.querySelector('#div1');




var config = {
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
    gap: [8,7] //gap is the x value of central orange range's start & end, and start must lower than end
}



// estimateAntibiotics.init(oDiv1,config)
    // metabolism(oDiv1)
    scoreLevel(oDiv1,{
    'score': 46.7,
    'data': {
        '低聚果糖': 0.9,
        '低聚异麦芽糖': 0.6,
        '𝜷-葡聚糖': 0.3,
        '葡甘露聚糖': 0.2,
        '抗性麦芽糊精': 0.9,
        '氨糖': 0.5,
        '饱和脂肪酸': 0.3,
        '不饱和脂肪酸': 0.8,
        '鞘脂类': 0.77,
        '胆汁酸': 0.12,
        '胆红素': 0.34,
        '胆固醇': 0.96,
        '淀粉': 0.43,
        '膳食纤维': 0.213
    }
})
    // curveGraph(oDiv1)
