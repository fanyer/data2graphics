import D3 from 'd3'
import { detectCanvas, vPattern3, vPattern1, vPattern4 } from './utils/detect'
import { lineRect3Config, lineRect5Config, vLineRect5Config, vLineRect3Config } from './default-config/line-rect.config'
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

    input = input.map((e, i) => {
        return e * 400
    })

    input2 = input2.map((e, i) => {
        return e * 400
    })


    let canvas = detectCanvas(parent)

    let context = canvas.getContext('2d');
    canvas.width = 50;
    canvas.height = 400;

    let width = canvas.width,
        height = canvas.height

    // context.translate(200, height / 2 )
    // context.translate(width / 2, height / 2 )

    // console.log(width)
    // console.log(height)

    context.save()


    context.save()


    // colors5.map((e, i) => {

    //     context.save()
    //     context.beginPath()
    //     context.translate(0, [0,...input][i])

    //     individualRect(context, e, input2[i])

    //     context.restore()
    // })

    // console.log(input)
    // console.log(input2)

    curveIndiviadualRect(context, 0, input, input2)
    curveIndiviadualRect(context, 1, input, input2)
    curveIndiviadualRect(context, 4, input, input2)
    curveIndiviadualRect(context, 3, input, input2)
    curveIndiviadualRect(context, 2, input, input2)


    context.restore()


};

export function lineRect3(parent, config) {
    let input = config || lineRect3Config;

    input = [0, 0, ...input]


    lineRect5(parent, input)


}

export function vLineRect5(parent, config) {
    let input = config || vLineRect5Config;

    let canvas = detectCanvas(parent)
    let context = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 40;

    let width = canvas.width,
        height = canvas.height

    // context.translate(200, height / 2 )
    // context.translate(width / 2, height / 2 )

    // console.log(width)
    // console.log(height)

    context.save()

    roundedRect(context, 2, 2, 400, 30, 15,'steelblue','salmon');

}

export function vLineRect3(parent, config) {
    let input = config || lineRect5Config;

    input = [0, 0, ...input]


    vLineRect5(parent, input)


}

function curveIndiviadualRect(context, i, input, input2) {
    context.save()
    context.beginPath()
    context.translate(0, [0, ...input][i])

    individualRect(context, colors5[i], input2[i])

    context.restore()
}

function individualRect(context, color, height) {

    d3.range(5, 50, 5).map((e, i) => {

        singleRect(context, color, e, 0, 5, height)

    })

}


function singleRect(context, color, x, y, width, height) {
    context.save()
    context.strokeStyle = color
    context.lineWidth = 2

    context.beginPath()
    context.strokeRect(x, y, width, height)

    context.restore()
}



function toValue(a) {
    if (a === 0) return 0
    return a * 0.96 + 0.02
}

function sum(arr, i) {
    return arr.slice(0, i).reduce((accumulate, current) => {
        return accumulate + current
    }, 0)
}


// A utility function to draw a rectangle with rounded corners.
function roundedRect(ctx, x, y, width, height, radius, strokeColor, fillColor) {
    ctx.save()
    ctx.strokeStyle = strokeColor
    ctx.fillStyle = fillColor
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.stroke();
    ctx.fill('evenodd');
    ctx.restore()
}
