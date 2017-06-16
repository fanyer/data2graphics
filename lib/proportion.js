import D3 from 'd3';
import { proportionConfig } from './default-config/proportion.config'
import { detectCanvas } from './utils/detect'
import { onion, gt6, onionGt6 } from './utils/shape'



const d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-axis'),
    require('d3-selection'),
    require('d3-color'),
    require('d3-scale')
);


export function proportion(parent, config) {
    // max is the most outside
    // max-25 is the second
    // 310 is the 3rd
    // radius3 is the 4th
    const max = 350
    const min = 110
    const d = (max - min) / 6

    const radius3 = 250;
    const rippleRadius = 310




    const colors = [
        '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
        '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
    ];


    const input = config || proportionConfig;


    const data = Object.values(input.data)

    let vsTmp = data[1] / data[0];
    // let vs = (vsTmp >= 1 ? vsTmp : 1 / vsTmp);
    let vs = vsTmp;



    /**
     * detect browser canvas api
     * @param  {[type]} !parrent.querySelector('canvas') [description]
     * @return {[type]}                                  [description]
     */
    let canvas=detectCanvas(parent)

    const context = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 800;

    let width = canvas.width,
        height = canvas.height,
        radius5 = Math.min(width, height) / 2;

    context.translate(width / 2, height / 2)

    // context.transform(1,1,0,1,0,0)

    context.save()


    const arcs = [{
        'data': data[0],
        'endAngle': Math.PI * 2,
        'startAngle': Math.PI * 2 * (data[1] / (data[0] + data[1])),
        'index': 0,
        'value': data[0]
    }, {
        'data': data[1],
        'startAngle': 0,
        'endAngle': Math.PI * 2 * (data[1] / (data[0] + data[1])),
        'index': 1,
        'value': data[1]
    }]





    /**
     * two circles layers most outside
     */
    context.save()
    context.setLineDash([4, 0])
    context.globalAlpha = 0.7



    const circle = d3.arc()
        .startAngle(0)
        .endAngle(2 * Math.PI)
        .innerRadius(0)
        .context(context);


    const radius4 = [max - 25, max]
    radius4.forEach((E, I) => {
        context.lineWidth = I === 0 ? 2 : 10;
        if (I === 1) {
            context.setLineDash([4, 0])
        }


        let arc = d3.arc()
            .innerRadius(E)
            .outerRadius(E)
            .padAngle(0.02)
            .context(context);


        arcs.forEach((e, i) => {
            if (I === 0) {

                if (i === 0) {
                    context.setLineDash([5, 10])
                } else {
                    context.setLineDash([5, 10])
                        // context.setLineDash([5 * vs, 10 * vs])

                }

            }


            context.save()
            context.strokeStyle = i === 0 ? 'seagreen' : 'steelblue';

            context.beginPath()
            arc(e)
            context.stroke();

            context.restore()
        })
    })
    context.restore()


    /**
     * draw two circle attached
     */
    context.save()
    const cornerRadius = 8
    context.lineWidth = 15


    context.fillStyle = '#fff';
    arcs.forEach(function(d, i) {
        context.beginPath();
        context.strokeStyle = i === 1 ? 'seagreen' : 'steelblue';

        corner(d.endAngle + 0.025, max, -1);
        context.stroke();
        context.fill();

    });

    // move corner circle
    function corner(angle, radius, sign) {
        context.save();
        context.translate(
            sign * cornerRadius * Math.cos(angle) + Math.sqrt(radius * radius - cornerRadius * cornerRadius) * Math.sin(angle),
            sign * cornerRadius * Math.sin(angle) - Math.sqrt(radius * radius - cornerRadius * cornerRadius) * Math.cos(angle)
        );
        circle.outerRadius(cornerRadius - 1.5)();
        context.restore();
    }

    context.restore()





    /**
     * draw arcs
     */
    context.save()


    const arc = d3.arc()
        .innerRadius(0)
        .context(context);

    arcs.forEach((E, I) => {
        context.beginPath()
        context.strokeStyle = I === 0 ? 'seagreen' : 'steelblue';

        arc.outerRadius(radius3)(E)
        context.stroke()

    })

    context.restore()


    /**
     * draw onion curve   =>  two sharp corner
     */


    let twoSharpPoint = [
        [Math.PI * 2, 310],
        [arcs[0].startAngle, 310]
    ]


    // console.log(twoSharpPoint)

    if (vs < 1 / 6) {


        context.save()
        context.beginPath()

        onionGt6(context, ['seagreen', 'steelblue'], ['left'])
        context.restore()

        context.save()
        context.rotate(arcs[1].endAngle)
        onionGt6(context, ['steelblue', 'seagreen'], ['right'])


        context.restore()

        gt6(context, twoSharpPoint,'steelblue',false)

    } else if (vs > 6) {

        context.save()
        context.beginPath()

        onionGt6(context, ['seagreen', 'steelblue'], ['right'])
        context.restore()

        context.save()
        context.rotate(arcs[1].endAngle)
        onionGt6(context, ['steelblue', 'seagreen'], ['left'])


        context.restore()

        gt6(context, twoSharpPoint,'seagreen',true)
    } else {


        context.save()
        context.beginPath()

        onion(context, ['seagreen', 'steelblue'])
        context.restore()

        context.save()
        context.rotate(arcs[1].endAngle)
            // console.log(arcs[0].startAngle)
        onion(context, ['steelblue', 'seagreen'])
        context.restore()


    }




    /**
     * vertices and Interval ripple lines
     */
    context.save()
    context.strokeStyle = '#2aa198'
    context.lineWidth = 2

    // const rippleRadius = 310
    const vertices = [
        [arcs[0].startAngle, rippleRadius],
        [arcs[1].startAngle, rippleRadius]
    ]

    const theta = arcs[0].startAngle - Math.PI;

    //  generate vertical lines
    function vertical(theta, num, radius3) {
        let arr = [];

        arr.push([theta / 2 + Math.PI / 2, 0]);

        [...Array(num)].map((e, i) => {
            arr.push([theta / 2 + Math.PI / 2, radius3 * (i + 1) / num])
            arr.push([theta / 2 + Math.PI / 2, -radius3 * (i + 1) / num])
        });

        return arr
    }

    let verticalArr = vertical(theta, 25, radius3)
        // verticalArr.sort((a, b) => (a[1] - b[1]))


    // vertices tangent 1st
    let theta2_1 = Math.acos(radius3 / rippleRadius);
    let theta2_2 = 2 * Math.PI - Math.acos(radius3 / rippleRadius);





    // vertices tangent 1st
    let theta3_1 = Math.PI - (theta2_1 - theta);
    let theta3_2 = theta + theta2_1 + Math.PI;





    //central polygon
    let centralPolygon = [
        [arcs[0].endAngle, rippleRadius],
        [0, 0],
        [arcs[1].endAngle, rippleRadius]
    ]


    let radialLine = d3.radialLine()
        .curve(d3.curveLinear)
        .context(context)

    let radialCurve = d3.radialLine()
        .curve(d3.curveCatmullRom.alpha(0.5))
        .context(context)

    let line = d3.line()
        .curve(d3.curveLinear)
        .context(context)

    context.beginPath()

    // radialLine(vertices)
    // radialLine(verticalArr)
    radialLine(centralPolygon)

    context.stroke()



    context.save()

    verticalArr.forEach((e, i) => {
        // context.save()

        context.strokeStyle = e[1] > 0 ? 'steelblue' : 'seagreen';
        context.globalAlpha = 0.3;

        context.beginPath();

        radialLine([0, 100], [0, 0], [0, 200]);

        // e[1] < 10 && e[1] > -100 ?
        //     radialCurve([vertices[0],
        //         e,
        //         vertices[1]
        //     ]) :
        //     radialCurve([vertices[0],
        //         e,
        //         vertices[1]
        //     ]);

        // radialLine([vertices[0],
        //     [theta2, radius3],
        //     e, [theta3, radius3],
        //     vertices[1]
        // ]);


        // e[1] < 10 && e[1] > -100 ?
        //     radialLine([vertices[0],
        //         e,
        //         vertices[1]
        //     ]) :
        //     radialCurve([vertices[1],
        //         [theta2, radius3], e, [theta3, radius3],
        //         vertices[0]
        //     ]);

        let radius4 = radius3 * Math.abs(i - 25) / 25;

        if (e[1] > 160 || e[1] < -190) {

            // console.log(theta3_2, radius4);
            // console.log(vertices[0]);
            e[1] > 0 ?
                radialCurve([vertices[1],
                    [theta2_1, radius4], e, [theta3_1, radius4],
                    vertices[0]
                ]) :
                radialCurve([vertices[0],
                    [theta3_2, radius4], e, [theta2_2, radius4],
                    vertices[1]
                ]);
        } else {

            radialLine([vertices[0],
                e,
                vertices[1]
            ]);
        }



        // context.stroke()
        // context.restore()

    })



    context.restore()



    /**
     * draw text & number
     */
    context.save()
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.globalAlpha = 0.4;

    context.fillStyle = 'black'
    context.font = '144px adad';
    if (input.text) {
    context.fillText(input.text, 0, 0);

    } else {
    context.fillText(data[0] + ':' + data[1], 0, 0);
        
    }
    context.restore()






}




