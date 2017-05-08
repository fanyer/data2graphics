import D3 from 'd3'
import { detectCanvas, detectSVG, vPattern3, vPattern1, vPattern4 } from './utils/detect'
import { customDashCircle } from './utils/arc-pro'
import boomPieConfig from './default-config/boom-pie.config'
/*seagreen   #00ab84*/
/*orange   #e4be6f*/
/*salmon   #cb8d88*/


// 丁酸:529918
// 乙酸:782862
// 丙酸:392369

const angleArr = [529918, 392369, 782862]

const colors3 = ['#00ab84', '#e4be6f', '#cb8d88', ]


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

    const input = config || boomPieConfig;
    let data = Object.values(input.data.map((e, i) => (e.value)));


    let a, b, c;
    [a, b, c] = [...data]
    data = [c, a, b]





    let canvas = detectCanvas(parent)

    const context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 1000;

    let width = canvas.width,
        height = canvas.height;

    let format = d3.format(".2f");
    context.translate(width / 2, height / 2)


    let arcs = d3.pie()
        (angleArr);


    // context.rotate(-arcs[0].endAngle)

    context.save()



    let arc = d3.arc()
        .innerRadius(0)
        .padRadius(0)
        .context(context);

    let arcRipple = d3.arc()
        .padRadius(0)
        .context(context);


    let bias = [{
        x: -30,
        y: 40
    }, {
        x: -30,
        y: -40
    }, {
        x: 50,
        y: 0
    }]




    //  curve ripple
    context.save()
    // arcs.forEach((E, I) => {
    //     context.strokeStyle = 'steelblue'
    //     context.fillStyle = '#fff'

    //     d3.range(0, 1, 0.1).map((e, i) => {
    //         context.save()
    //         context.beginPath()

    //         let factor=format(angleArr[I]/sum(angleArr));

    //         // console.log(factor)

    //         context.setLineDash([10, 10])

    //         // context.translate(200,40)
    //         // context.translate(bias[I].x, bias[I].y)

    //         context.lineWidth = 3;


    //         arcRipple
    //             .outerRadius(400 * e)
    //             .innerRadius(400 * e)
    //             (E)
    //             // context.fill()
    //         context.stroke()
    //         context.restore()

    //     })



    // })


    context.restore()





    // curve data params
    //  curve order is different
    // context.save()
    // arcs.forEach((E, I) => {
    //     context.strokeStyle = colors3[I]
    //     context.fillStyle = '#fff'

    //     d3.range(0, 1, 0.05).reverse().map((e, i) => {
    //         context.save()
    //         context.beginPath()


    //         // context.translate(200,40)
    //         // context.translate(bias[I].x, bias[I].y)

    //         context.lineWidth = i === 0 ? 3 : 1;


    //         arc.outerRadius(400 * e * data[I])(E);

    //         (i === 0) && (context.fill())
    //         context.stroke()
    //         context.restore()

    //     })



    // })


    // context.restore()




    // //  curve standard
    // context.save()
    // arcs.forEach((E, I) => {
    //     context.strokeStyle = 'steelblue'
    //     context.fillStyle = '#fff'

    //         context.save()
    //         context.beginPath()

    //         context.setLineDash([5, 0])

    //         // context.translate(200,40)
    //         // context.translate(bias[I].x, bias[I].y)

    //         context.lineWidth = 3;


    //         arcRipple
    //             .outerRadius(400 * input.standard)
    //             .innerRadius(400 * input.standard)
    //             (E)
    //             // context.fill()
    //         context.stroke()
    //         context.restore()




    // })


    // context.restore()





    // context.save()
    // context.lineWidth = 5
    // context.globalAlpha = 0.2

    // arcs.forEach((e, i) => {
    //     // if (i === 0) {

    //     context.save()
    //     context.beginPath()

    //     context.strokeStyle = colors5[i]
    //     context.fillStyle = '#fff'

    //     // context.translate(200,40)
    //     // context.translate(bias[i].x, bias[i].y)
    //     arc.outerRadius(300)(e)


    //     context.fill()
    //     context.stroke()
    //     context.restore()

    //     // }
    // })


    // context.restore()



    context.save()
customDashCircle(context)

    context.restore()


}

function sum(arr) {
    return arr.reduce((accu,current)=>(accu+current))
}
