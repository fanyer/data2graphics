import D3 from 'd3'
import baseConf from './default-config/intake-fiber-struct.config'

//  seagreen   #00ab84
//  orange   #e4be6f
//  salmon   #cb8d88


const d3 = Object.assign({},
    D3,
    require('d3-array'),
    require('d3-shape'),
    require('d3-format'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);

export function pieStruct(parrent, config) {

    const input = config || baseConf


    let max = 350,
        min = 110,
        d = (max - min) / 4



    const labels = Object.keys(input.data)
    labels.sort((a, b) => (input.data[a].value - input.data[b].value))

    const data = Object.values(input.data).map((e, i) => (e))
    data.sort((a, b) => (a.value - b.value))

    const values = data.map((e, i) => (e.value))
        // console.log(data)
    const colors = data.map((e, i) => (e.color))



    // detect browser canvas api
    if (!parrent.querySelector("canvas")) {
        parrent.appendChild(document.createElement("canvas"))
    }

    let canvas = parrent.querySelector("canvas"),
        context = canvas.getContext("2d");

    canvas.width = 1200;
    canvas.height = 900;


    let width = canvas.width,
        height = canvas.height;
    let radius4 = Math.min(width, height) / 2;

    if (window.devicePixelRatio) {
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.height = height * window.devicePixelRatio * 2;
        canvas.width = width * window.devicePixelRatio * 2;
        context.scale(window.devicePixelRatio * 2, window.devicePixelRatio * 2);
    }


    context.translate(width / 2, height / 2)
    context.lineWidth = 1.5
    context.save()




    // draw text & number
    context.textBaseline = "hanging";
    context.textAlign = "center";

    context.fillStyle = '#00ab84'
    context.font = "24px adad";
    context.fillText(input.text, 0, -10);
    context.restore()



    // circles layers
    context.save()

    let radius = [
        d3.range(min - 10, min + d, 10),
        d3.range(min + d, min + 2 * d, 10),
        d3.range(min + 2 * d, min + 3 * d, 10),
        d3.range(min + 3 * d, min + 4 * d + 10, 10)
    ]

    context.globalAlpha = 0.8
    radius.forEach((e, i) => {
        context.strokeStyle = 'steelblue';
        radius[i].forEach(function(e2, i2) {
            context.save()

            if (e2 === min - 10) {
                context.setLineDash([4, 0])
                context.strokeStyle = '#00ab84';

            } else {
                context.setLineDash([4, 5])
            }

            let arc = d3.arc()
                .outerRadius(e2)
                .innerRadius(0)
                .startAngle(0)
                .endAngle(Math.PI * 2)
                .context(context);

            context.beginPath()
            arc()

            context.stroke();
            context.restore()

        })
    })
    context.restore()


    // draw arcs
    context.save()

    let arcs = d3.pie()(values)

    arcs.sort((a, b) => {
        return a - b
    })

    let arc = d3.arc()
        .innerRadius(min)
        .context(context);

    arcs.forEach((E, I) => {
        context.save()

        context.beginPath()

        // if (E.data < 0.75) {
        //     context.strokeStyle = '#00ab84'
        // } else if (E.data > 0.9) {
        //     context.strokeStyle = 'salmon'
        // } else {
        //     context.strokeStyle = 'orange'
        // }
        context.strokeStyle = colors[I];



        d3.range(min, min + 210 - 0 * 30, 10).map((e, i) => {
            arc.outerRadius(e)(E)
            context.stroke()
        })

        context.restore()
    })
    context.restore()




    // legends
    context.save()
    context.strokeStyle = '#0ab38d'
    context.fillStyle = '#0ab38d'
    context.font = "24px adad";
    context.textBaseline = "middle";

    let radialLine = d3.radialLine()
        .curve(d3.curveLinear)
        .context(context);

    let line = d3.line()
        .curve(d3.curveLinear)
        .context(context);

    function generateRL(angle) {
        return [
            [angle, min],
            [angle, max + 50]
        ]
    }

    function generateXY(angle, extend = 10) {
        // coordiantes convention   RL => XY
        angle = Math.PI / 2 - angle

        let onOff = (max + 50) * Math.cos(angle) >= 0

        return [
            [(max + 50) * Math.cos(angle), -(max + 50) * Math.sin(angle)],
            [(max + 50) * Math.cos(angle) +
                (onOff ? extend : -extend), -(max + 50) * Math.sin(angle)
            ]
        ]
    }


    arcs.forEach((e, i) => {

        context.beginPath()
        let lengendsRL = generateRL(e.startAngle + 0.2)
        let lengendsXY = generateXY(e.startAngle + 0.2, 50)

        radialLine(lengendsRL)
        line(lengendsXY)
        context.stroke()

        // context.direction = lengendsXY[1][0] > 0 ? 'ltr' : 'rtl'
        let text=labels[i];

        if (lengendsXY[1][0] >= 0) {
            context.fillText(text, lengendsXY[1][0], lengendsXY[1][1])

        } else {
            // console.log(lengendsXY[1][0])
            context.fillText(text, lengendsXY[1][0]-text.length*24, lengendsXY[1][1])

        }


    })


    context.restore()


}
