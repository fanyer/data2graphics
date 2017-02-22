import D3 from 'd3'


var d3 = Object.assign({},
    D3,
    require('d3-format'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);

export function intakeFiberStruct(parrent, config) {

    const input = config || {
        'XXX': 0.08,
        '胆固醇': 0.17,
        '饱和脂肪酸': 0.2,
        '不饱和脂肪酸': 0.1,
        'YYY脂肪酸': 0.05,
        '鞘脂类': 0.4
    }


    var max = 350,
        min = 110,
        d = (max - min) / 4

    var colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ];

    const labels = Object.keys(input)
    labels.sort((a, b) => (input[a] - input[b]))

    const data = Object.values(input)



    // detect browser canvas api
    if (!parrent.querySelector("canvas")) {
        parrent.appendChild(document.createElement("canvas"))
    }

    var canvas = parrent.querySelector("canvas"),
        context = canvas.getContext("2d");

    canvas.width = 1200;
    canvas.height = 900;

    var radius = Math.min(width, height) / 2;


    let width = canvas.width,
        height = canvas.height;
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

    context.fillStyle = colors[2]
    context.font = "24px Verdana";
    context.fillText("膳食纤维", 0, 0);
    context.restore()



    // circles layers
    context.save()

    var radius = [
        d3.range(min, min + d, 10),
        d3.range(min + d, min + 2 * d, 10),
        d3.range(min + 2 * d, min + 3 * d, 10),
        d3.range(min + 3 * d, min + 4 * d + 10, 10)
    ]

    context.globalAlpha = 0.8
    radius.forEach((e, i) => {
        context.strokeStyle = 'steelblue';
        radius[i].forEach(function(e2, i2) {
            context.setLineDash([4, 5])

            let arc = d3.arc()
                .outerRadius(e2)
                .innerRadius(0)
                .startAngle(0)
                .endAngle(Math.PI * 2)
                .context(context);

            context.beginPath()
            arc()

            context.stroke();

        })
    })
    context.restore()


    // draw arcs
    context.save()

    var arcs = d3.pie()(data)

    arcs.sort((a, b) => {
        return a.value - b.value
    })

    var arc = d3.arc()
        .innerRadius(min)
        .context(context);

    arcs.forEach((E, I) => {
        context.beginPath()

        I > 3 ?
            context.strokeStyle = 'seagreen' : context.strokeStyle = 'steelblue';

        d3.range(min, min + 210 - I * 30, 10).map((e, i) => {
            arc.outerRadius(e)(E)
            context.stroke()
        })

        context.restore()
    })




    // legends
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

    function generateXY(angle, extend) {
        // coordiantes convention   RL => XY
        angle = Math.PI / 2 - angle

        var extend = arguments[1] || 10
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

        context.direction = lengendsXY[1][0] > 0 ? 'ltr' : 'rtl'
        context.fillText(labels[i], lengendsXY[1][0], lengendsXY[1][1])

    })


    context.restore()


}
