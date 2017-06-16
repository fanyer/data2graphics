import D3 from 'd3'
import { detectCanvas } from './utils/detect'
import baseConf from './default-config/arc-line.config'
import { smooth, bend } from './utils/filter'

//  seagreen   #00ab84
//  orange   #e4be6f
//  salmon   #cb8d88

let d3 = Object.assign({},
    D3,
    require('d3-format'),
    require('d3-request'),
    require('d3-array'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-shape'),
    require('d3-scale')
);

export function arcLine(parent = document, config) {
    /**
     * [function description]
     * @param  {[type]} factor [description]
     * @return {[type]}        [description]
     */
    Array.prototype.scale = function(factor, config) {
        let newArr = []
        this.forEach((e, i, arr) => {
            newArr[i] = [e[0], min + (e[1] - min) * factor]
        })
        return newArr;
    }


    let input = config || baseConf;


    let max = 350
    let min = 150

    const labels = Object.keys(input.data)
    const values = Object.values(input.data).map((e, i) => (e.value))



    // detect browser canvas api
    let canvas=detectCanvas(parent)
    let context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 900;

    let width = canvas.width,
        height = canvas.height,
        radius = Math.min(width, height) / 2;

    context.translate(width / 2, height / 2 + 30)

    context.save()


    // draw text & number
    context.save()
    context.textBaseline = "hanging";
    context.textAlign = "center";


    context.fillStyle = '#e4be6f';
    context.font = "64px adad";
    context.fillText(input.score, 0, -80);

    context.fillStyle = '#00ab84';
    context.font = "24px adad";
    context.fillText("综合打分", 0, 0);

    context.font = "16px adad";
    context.fillText("Basal Metalbolic Assay", 0, 50);

    context.restore()


    // circles layers
    context.save()
    let colors = ['#cb8d88', '#e4be6f', '#00ab84', '#e4be6f', '#cb8d88']
        // context.rotate(-Math.PI / 10)

    let radiusLayer = [];
    let d = 4.2;
    radiusLayer.push(d3.range(150, 150 + 4 * d, d))
    radiusLayer.push(d3.range(150 + 5 * d, 150 + 5 * d + 7 * d, d))
    radiusLayer.push(d3.range(150 + 13 * d, 150 + 13 * d + 21 * d, d))
    radiusLayer.push(d3.range(150 + 35 * d, 150 + 35 * d + 7 * d, d))
    radiusLayer.push(d3.range(150 + 43 * d, 150 + 43 * d + 5 * d, d))

    let radiusLayerSolid = [
        150,
        150 + 4 * d,
        150 + 12 * d,
        150 + 34 * d,
        150 + 42 * d,
        150 + 48 * d
    ];



    context.globalAlpha = 0.3
    radiusLayer.forEach((e, i) => {
        context.strokeStyle = colors[i];
        radiusLayer[i].forEach(function(e2, i2) {
            // i2 > 4 || i2 < 1 ?
            // context.setLineDash([10, 0]) :
            context.setLineDash([4, 4])

            let arc = d3.arc()
                .outerRadius(e2)
                .innerRadius(0)
                .startAngle(0)
                // .padAngel(1)
                .endAngle(Math.PI * 2)
                .context(context);

            context.beginPath()
            arc()

            context.stroke();

        })
    });

    context.globalAlpha = 1

    radiusLayerSolid.forEach((e, i) => {
            context.strokeStyle = colors[i];

            context.setLineDash([10, 0])

            let arc = d3.arc()
                .outerRadius(e)
                .innerRadius(0)
                .startAngle(0)
                // .padAngel(1)
                .endAngle(Math.PI * 2)
                .context(context);

            context.beginPath()
            arc()

            context.stroke();

        })
        // context.rotate(Math.PI/7)
    context.restore()

    // first cicle layer  to be optimised later 2017.4.20
    context.save()
    context.strokeStyle = '#00ab84';
    context.globalAlpha = 0.7;
    context.setLineDash([4, 0])

    context.beginPath()
    d3.arc()
        .outerRadius(140)
        .innerRadius(0)
        .startAngle(0)
        .endAngle(Math.PI * 2)
        .context(context)();

    context.stroke();
    context.restore()




    // draw curve
    context.save()
    let curveLineData = []
    let axisLineData = []
    let pi = Math.PI
    context.globalAlpha = 0.9

    values.map((e, i) => {
        let r = d3.scaleLinear()
            .domain([0, 1])
            .range([min, max])

        let point = [2 * pi / labels.length * i, r(e)]

        curveLineData.push(point)

    })


    let radial = d3.radialLine()
        .curve(d3.curveCatmullRomClosed.alpha(0.9))
        .context(context)

    context.setLineDash([5, 0]);
    // context.shadowBlur = 1;
    context.strokeStyle = "#00ab84"
    context.shadowColor = "#00ab84"
    context.beginPath()
    radial(curveLineData);
    context.stroke();
    // context.rotate(Math.PI / 2)
    context.restore()



    // draw internal bundle curve
    context.save()
    context.strokeStyle = "#00ab84"

    context.beginPath()
    context.globalAlpha = 0.3
    d3.range(0, 1, 0.04).forEach((e, i) => {
        radial(curveLineData.scale(e));
    })
    context.stroke()
    context.restore()




    // draw a axis line
    context.save()
    context.beginPath()
    context.lineWidth = 2
    let bundaryPoints = []


    context.strokeStyle = 'salmon'
    context.lineWidth = 1;

    let innerborder = axisLineData
    let outerborder = axisLineData.map((e) => (e.scale(2.33)))

    let axis = d3.radialLine()
        .context(context);

    d3.range(0, 2 * Math.PI, 2 * pi / labels.length).forEach((e, i) => {
        let r = d3.scaleLinear()
            .domain([0, 1])
            .range([min, max])
        let startPoint = [2 * pi / labels.length * i, r(0)]
        let endPoint = [2 * pi / labels.length * i, r(1)]
        axis([startPoint, endPoint])
    })
    context.stroke()
    context.restore()



    // draw points
    context.save()
    context.strokeStyle = '#00ab84'
    context.lineWidth = 2;
    context.fillStyle = '#00ab84'

    let points = d3.symbol()
        .size(20)
        .context(context);


    context.beginPath()
    curveLineData.forEach((d, i) => {
        context.save();
        context.translate(d[1] * Math.sin(d[0]), -d[1] * Math.cos(d[0]));
        points()
        context.restore();
    })

    context.stroke()
    context.fill()
    context.restore()

    // context.rotate(pi / 2)

    // label
    context.save()
    context.strokeStyle = 'salmon'
    context.lineWidth = 4;
    context.textAlign = 'center';
    context.fillStyle = '#00ab84'

    context.beginPath()


    context.font = "16px adad";
    labels.forEach((e, i) => {

        context.save()

        // if (i === 0||i===1) {
        context.rotate(pi * 2 / labels.length * i)
            // context.fillText(e, 0, -400);
        bend(context, e, -390, false)

        // context.fillText(input.data[e].en, 0, -370);
        bend(context, input.data[e].en, -370, true)
            // }

        context.restore()

    })

    context.restore()


}
