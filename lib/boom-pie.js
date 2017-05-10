import D3 from 'd3'
import { detectCanvas, detectSVG, vPattern3, vPattern1, vPattern4 } from './utils/detect'
import { customDashCircle, customArc } from './utils/arc-pro'
import boomPieConfig from './default-config/boom-pie.config'
/*seagreen   #00ab84*/
/*orange   #e4be6f*/
/*salmon   #cb8d88*/


// 丁酸:529918
// 乙酸:782862
// 丙酸:392369



// after fanyer correct
// 丙酸:392369
// 丁酸:782862
// 乙酸:529918

// const angleArr = [529918, 392369, 782862]

/**
 *                      丁  乙  丙
 * @type {Array}
 */
const angleArr = [782862, 529918, 392369]


const colors3 = ['#cb8d88', '#00ab84', '#e4be6f']


const d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-array'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-axis'),
    require('d3-color'),
    require('d3-scale')
);



export function boomPie(parent, config) {
    let format = d3.format(".2f");

    const input = config || boomPieConfig;
    let data = Object.values(input.data.map((e, i) => (e.value)));


    let a, b, c;
    [a, b, c] = [...data]
    data = [b, c, a];


    let factor = angleArr.map((e, i, arr) => (format(e / sum(arr))))




    let canvas = detectCanvas(parent)

    const context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 1000;

    let width = canvas.width,
        height = canvas.height;

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
        x: -15,
        y: 20
    }, {
        x: -15,
        y: -20
    }, {
        x: 25,
        y: 0
    }]




    let maskBias = angleArr.map((e, i, arr) => (e / sum(arr) * Math.PI * 2))

    let maskBiasElement1,
        maskBiasElement2,
        maskBiasElement3;

    [maskBiasElement1, maskBiasElement2, maskBiasElement3] = maskBias

    maskBias = [0, maskBiasElement1, -maskBiasElement3];



    /**
     * enhanced ripple 
     */
    context.save()
    arcs.forEach((E, I) => {
        context.save()
        context.beginPath()


        d3.range(0, 1, 0.1).concat(1).map((e, i) => {
            // customArc(context, 0, 0, E.startAngle, E.endAngle, 400 * e, 200 * e * factor[I])
            customDashCircle(context, 400 * e, 200 * e)
        })


        context.restore()

    })
    context.restore()


    //  curve ripple
    context.save()
        // arcs.forEach((E, I) => {
        //     context.strokeStyle = 'steelblue'
        //     context.fillStyle = '#fff'

    //     d3.range(0, 1, 0.1).map((e, i) => {
    //         context.save()
    //         context.beginPath()

    //         let factor = format(angleArr[I] / sum(angleArr));

    //         // console.log(factor)

    //         context.setLineDash([5, 10])

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





    /** 
     * curve data params 
     * curve order is different
     */

    context.save()
    arcs.forEach((E, I) => {
        context.strokeStyle = colors3[I]
        context.fillStyle = '#fff'

        // if (I === 0) {

        d3.range(0, 1, 0.04).concat(1).reverse().map((e, i) => {
                context.save()
                context.beginPath()


                // context.translate(200,40)
                // context.translate(bias[I].x, bias[I].y)

                // context.lineWidth = 3 ;
                context.lineWidth = i === 0 ? 5 : 1;


                arc.outerRadius(400 * e * data[I])(E);
                // (e<data[I])&&(arc.outerRadius(400 * e )(E));

                (i === 0) && (context.fill());

                // (i===0)&&(context.strokeStyle='#fff');
                context.stroke()
                context.restore()

            })
            // }




    })


    context.restore()


    /**
     * mask line bilateral
     */
    context.save()

    maskBias.map((e, i) => {
        context.fillStyle = '#fff'


        // if (i === 0) {

        context.save()

        context.lineWidth = 5

        /**
         * right
         */
        context.save()
        context.strokeStyle = colors3[i]

        context.beginPath()

        // 21 generated from mask
        context.rotate(e)
        context.moveTo(21, 0)

        context.lineTo(21, -400 * data[i])
        context.stroke()
        context.restore()



        /**
         * left
         */
        context.save()
        context.strokeStyle = colors3[i - 1] || colors3[2]

        context.beginPath()

        // -21 generated from mask
        context.rotate(e)
        context.moveTo(-21, 0)

        let strech = data[i - 1] || data[2]
            // if(i===0){
            //     strech=data[2]
            // }

        context.lineTo(-21, -400 * strech)
        context.stroke()
        context.restore()





        context.restore()
            // }
    })



    context.restore()














    /**
     * curve standard
     */
    context.save()
    arcs.forEach((E, I) => {
        context.strokeStyle = 'steelblue'
        context.fillStyle = '#fff'

        context.save()
        context.beginPath()

        context.setLineDash([5, 0])

        // context.translate(200,40)
        // context.translate(bias[I].x, bias[I].y)

        context.lineWidth = 5;


        arcRipple
            .outerRadius(400 * input.standard)
            .innerRadius(400 * input.standard)
            (E)
            // context.fill()
        context.stroke()
        context.restore()




    })
    context.restore()



    /**
     * mask
     */
    context.save()
    context.strokeStyle = '#fff'
    context.lineWidth = 40


    maskBias.map((e, i) => {
        context.save()
        context.beginPath()


        context.rotate(e)
        context.moveTo(0, 0)
        context.lineTo(0, -500)
        context.stroke()


        context.restore()
    })


    context.restore()




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



    canvas.style.transform = 'rotate(' + (angleArr[2] / sum(angleArr) * 360) + 'deg)'



    // legend
    context.save()
    context.rotate(-angleArr[2] / sum(angleArr) * Math.PI * 2)



    let reOrderTextArr = ['乙酸', '丙酸', '丁酸'];

    ['#00ab84', '#e4be6f', '#cb8d88'].map((e, i) => {
        context.save()
        context.strokeStyle = e
        context.font = '30px adad'
        context.lineWidth = 3
        context.beginPath()

        context.fillText(reOrderTextArr[i], -200 + 200 * i, 453);
        context.strokeRect(-240 + 200 * i, 430, 30, 30)
        context.restore()

    })

    context.restore()


}

function sum(arr) {
    return arr.reduce((accu, current) => (accu + current))
}
