import D3 from 'd3'
import { detectSVG, vPattern3, vPattern1 ,vPattern4} from './utils/detect'
import { lineRect3Config, lineRect5Config, vLineRect5Config,vLineRect3Config } from './default-config/line-rect.config'
import { bend } from './utils/filter'
import { hex2rgba, addOpacity } from './utils/color'

/*seagreen   #00ab84*/
/*orange   #e4be6f*/
/*salmon   #cb8d88*/

// color in this file should be hex

const colors3 = ['#cb8d88', '#e4be6f', '#00ab84']
    // const colors3 = ['#00ab84', '#e4be6f', '#cb8d88']
const colors5 = ['#cb8d88', '#e4be6f', '#00ab84', '#e4be6f', '#cb8d88']



const d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-array'),
    require('d3-color'),
    require('d3-scale')
);


export function lineRect3(parent, config) {

    let input = config || lineRect3Config;

    input = input.map((e, i) => {
        return toValue(e)
    })

    input = [input[0], input[1] - input[0], 1 - input[1]]

    detectSVG(parent);



    let svg = d3.select('#' + parent.id + ' svg'),
        margin = { top: 50, right: 60, bottom: 150, left: 130 };

    svg.attr('width', 50)

    let width = svg.attr('width') - margin.left - margin.right,
        height = svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let formatNumber = d3.format('.2%');

    vPattern3(svg, 10, 50, '#cb8d88');
    vPattern3(svg, 10, 50, '#e4be6f');
    vPattern3(svg, 10, 50, '#00ab84');




    let accumulate = input.map((e, i) => {
        return e * 400
    })



    // console.log(sum(accumulate,3))
    // console.log(accumulate)

    colors3.map((e, i) => {
        let y = sum(accumulate, 2 - i)
        let height = input[2 - i] * 400
        singleRect(svg, e, y, height)
    })


    svg.attr('height', sum(accumulate, 3))


}


export function lineRect5(parent, config) {
    let input = config || lineRect5Config;

    input = input.map((e, i) => {
        return toValue(e)
    })

    let input2 = colors5.map((e, i) => {
        if (i === 4) {
            return 1 - input[i - 1]
        } else if (i === 0) {
            return input[i]
        } else {
            return input[i] - input[i - 1]
        }

    })



    detectSVG(parent);



    let svg = d3.select('#' + parent.id + ' svg'),
        margin = { top: 50, right: 60, bottom: 150, left: 130 };

    svg.attr('width', 50);

    let width = svg.attr('width') - margin.left - margin.right,
        height = svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let formatNumber = d3.format('.2%');

    vPattern3(svg, 10, 50, '#cb8d88');
    vPattern3(svg, 10, 50, '#e4be6f');
    vPattern3(svg, 10, 50, '#00ab84');



    let accumulate = input2.map((e, i) => {
        return e * 400
    })


    let heightFn = (a) => {
        return a * 400
    }
    let y = (i) => {
        return sum(accumulate, i)
    }


    singleRect(svg, '#cb8d88', y(0), heightFn(input2[0]))
    singleRect(svg, '#e4be6f', y(1), heightFn(input2[1]))

    singleRect(svg, '#cb8d88', y(4), heightFn(input2[4]))
    singleRect(svg, '#e4be6f', y(3), heightFn(input2[3]))

    singleRect(svg, '#00ab84', y(2), heightFn(input2[2]))
    svg.attr('height', sum(accumulate, 5))


}


export function vLineRect5(parent, config) {

    let input = config || vLineRect5Config;



    let input2 = input.map((e, i) => {
        return e * 100
    })

    detectSVG(parent);

    console.log(input2)


    let svg = d3.select('#' + parent.id + ' svg'),
        margin = { top: 10, right: 10, bottom: 10, left: 10 };

    svg.attr('width', 500);

    let width = svg.attr('width') - margin.left - margin.right,
        height = svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let formatNumber = d3.format('.2%');

    vPattern4(svg, input2,parent.id);

    g.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 400)
        .attr('height', 30)
        .attr('stroke-width', 4)
        .attr('stroke', '#ccc')
        .attr('rx', 15)
        .attr('ry', 15)
        .attr('fill', 'url(#vpattern-vLineRect5-'+(parent.id)+')')

}

export function vLineRect3(parent,config) {
    let input = config || vLineRect3Config;

    vLineRect5(parent,[0,0,...input])
}


function singleRect(svg, color, y, height) {
    svg.append('rect')
        .attr('fill', () => {
            return 'url(#vpattern-' + color +')'
        })
        .attr('x', 0)
        .attr('y', y)
        .attr('width', 50)
        .attr('height', height)
        .attr('stroke', color)
}


function toValue(a) {
    return a * 0.96 + 0.02
}

function sum(arr, i) {
    return arr.slice(0, i).reduce((accumulate, current) => {
        return accumulate + current
    }, 0)
}
