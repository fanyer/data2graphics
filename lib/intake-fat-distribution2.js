d3 = Object.assign({},
    d3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);


export function intakeFatProportion(parrent, config) {

    var max = 350
    var min = 110
    var d = (max - min) / 6


    var colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ];


    var input = config || {
        'sature': 42,
        'unsature': 58
    }

    var data = Object.values(input)


    // detect browser canvas api
    if (!parrent.querySelector("canvas")) {
        var canvas = document.createElement("canvas")
        parrent.appendChild(canvas)
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


    // draw text & number
    // context.textBaseline = "hanging";
    // context.textAlign = "center";

    // context.fillStyle = colors[2]
    // context.font = "24px adad";
    // context.fillText("膳食纤维", 0, 0);
    // context.restore()


    // circles layers
    context.save()
    context.setLineDash([4, 0])
    context.globalAlpha = 0.7



    var circle = d3.arc()
        .startAngle(0)
        .endAngle(2 * Math.PI)
        .innerRadius(0)
        .context(context);

    var radius = [max - 25, max]

    radius.forEach((E, I) => {
        context.lineWidth = I === 0 ? 2 : 10;
        context.setLineDash(I === 0 ? [4, 10] : [4, 0])


        let arc = d3.arc()
            .innerRadius(E)
            .outerRadius(E)
            .padAngle(0.02)
            .context(context);


        arcs.forEach((e, i) => {
            context.save()
            context.strokeStyle = i === 0 ? 'seagreen' : 'steelblue';

            context.beginPath()
            arc(e)
            context.stroke();

            context.restore()
        })
    })


    // draw two circle attached
    var cornerRadius = 8
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






    // vertices and Interval ripple lines
    context.save()
    context.strokeStyle = 'steelblue'
    context.lineWidth = 2

    var diameter = 310
    var vertices = [
        [arcs[0].startAngle, diameter],
        [arcs[1].startAngle, diameter]
    ]

    var theta = arcs[0].startAngle - Math.PI

    var vertical = [

    ]

    var oneLine = [
        [arcs[0].startAngle, diameter],
        [0, 0]
    ]
    var twoLine = [
        [arcs[1].startAngle, diameter],
        [0, 0]
    ]

    var radialLine = d3.radialLine()
        .curve(d3.curveLinear)
        .context(context)

    var line = d3.line()
        .curve(d3.curveLinear)
        .context(context)

    context.beginPath()
    radialLine(vertices)
    radialLine(oneLine)
    radialLine(twoLine)
    context.stroke()






    // draw arcs
    context.save()

    var arc = d3.arc()
        .innerRadius(0)
        .context(context);

    arcs.forEach((E, I) => {
        context.beginPath()
        context.strokeStyle = I === 0 ? 'seagreen' : 'steelblue';

        arc.outerRadius(280)(E)
        context.stroke()

        context.restore()
    })


}


export function intakeFatDeviation(parrent, config) {

    // detect browser canvas api
    if (!parrent.querySelector("canvas")) {
        var canvas = document.createElement("canvas")
        parrent.appendChild(canvas)
    }

    var context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 800;

    var width = canvas.width,
        height = canvas.height,
        radius = Math.min(width, height) / 2;

    context.translate(width / 2, height / 2)

    context.save()
}
