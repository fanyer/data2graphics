d3 = Object.assign({},
    d3,
    require('d3-format'),
    require('d3-sankey'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);

export function intakeStruct(argument) {
    // body...
    const input = {
        'XXX': 0.15,
        '胆固醇': 0.15,
        '饱和脂肪酸': 0.2,
        '不饱和脂肪酸': 0.1,
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
    const data = Object.values(input)

    // judge browser canvas api
    if (!document.querySelector("canvas")) {
        document.body.appendChild(document.createElement("canvas"))
    }

    var canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 800;

    var radius = Math.min(width, height) / 2;


    let width = canvas.width,
        height = canvas.height;
    if (window.devicePixelRatio) {
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.height = height * window.devicePixelRatio;
        canvas.width = width * window.devicePixelRatio;
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    context.translate(width / 2, height / 2)
    context.lineWidth = 1.5
    context.save()




    // draw text & number
    context.restore()
    context.textBaseline = "hanging";
    context.textAlign = "center";
    // context.rotate(Math.PI / 10)

    context.fillStyle = colors[2]
    context.font = "24px Verdana";
    context.fillText("膳食纤维", 0, 0);



    // circles layers
    context.save()

    var radius = [
        d3.range(min, min + d, 10),
        d3.range(min + d, min + 2 * d, 10),
        d3.range(min + 2 * d, min + 3 * d, 10),
        d3.range(min + 3 * d, min + 4 * d + 10, 10)
    ]


    context.globalAlpha = 0.3
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

    var arc = d3.arc()
        .innerRadius(min)
        .context(context);

    context.strokeStyle = 'steelblue'

    context.beginPath()

    arcs.forEach((E, I) => {
        d3.range(min, min + 50 + I * 30, 10).map((e, i) => {
            arc.outerRadius(e)(E)
            context.stroke()
        })
    })

    context.restore()





}
