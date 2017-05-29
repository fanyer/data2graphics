import D3 from 'd3'
import { detectSVG } from './utils/detect'
import { intakeFatProportionConfig as pieConfig } from './default-config/intake-fat-distribution.config'


const d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);

export function pie(parent, config) {
    const input = config || pieConfig;

    const data = Object.values(input);
    const labels = Object.keys(input)

    var color = d3.scaleLinear()
        .domain([0, labels.length])
        .range(["seagreen", "steelblue"]);



    // detect browser canvas api
    if (!parent.querySelector("canvas")) {
        var canvas = document.createElement("canvas")
        parent.appendChild(canvas)
    }

    var context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 800;

    var width = canvas.width,
        height = canvas.height,
        radius = Math.min(width, height) / 2;

    context.translate(width / 2, height / 2)

    // context.transform(1,1,0,1,0,0)

    context.save()


    var arcs = d3.pie()(data)




    context.save()
    context.globalAlpha = 0.6

    var arc = d3.arc()
        .innerRadius(0)
        .context(context);

    arcs.forEach((E, I) => {
        context.beginPath()
        context.fillStyle = color(I);
        context.strokeStyle = color(I);
        arc.outerRadius(250)(E)
        context.stroke()
        context.fill()

    })
    context.restore()




    // legends


    const max = 250,
        min = 110,
        d = (max - min) / 4

    context.save()
    context.strokeStyle = 'salmon'
    context.fillStyle = 'salmon'
    context.font = "24px Verdana";
    context.textBaseline = "middle";

    var radialLine = d3.radialLine()
        .curve(d3.curveLinear)
        .context(context);

    var line = d3.line()
        .curve(d3.curveLinear)
        .context(context);

    function generateRL(angle) {
        return [
            [angle, min],
            [angle, max + 50]
        ]
    }

    function generateXY(angle, extend=10) {
        // coordiantes convention   RL => XY
        angle = Math.PI / 2 - angle

        var onOff = (max + 50) * Math.cos(angle) >= 0

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


        context.direction = lengendsXY[1][0] > 0 ? 'ltr' : 'rtl';
        context.fillText(labels[i], lengendsXY[1][0], lengendsXY[1][1])

    })


    context.restore()



}
