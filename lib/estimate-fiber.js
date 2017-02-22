import D3 from 'd3'


var d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);

export function estimateFiber(parrent, config) {

    const input = config || {
        '维生素1': 3,
        '维生素2': 1,
        '维生素3': 1,
        '维生素4': 2,
        '维生素5': 3,
        '维生素6': 2,
        '维生素7': 3,
        '维生素8': 2,
        '维生素9': 1,
        '维生素10': 3,
        '维生素11': 1,
        '维生素12': 1,
        '维生素13': 3,
        '维生素14': 2,
        '维生素15': 1,
        '维生素16': 2
    }


    var max = 470,
        min = 110,
        d = (max - min) / 6

    var colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ];

    const labels = Object.keys(input)
    const data = Object.values(input)


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



    // draw text & number
    context.textBaseline = "hanging";
    context.textAlign = "center";

    context.fillStyle = colors[2]
    context.font = "24px adad";
    context.fillText("膳食纤维", 0, 0);
    context.restore()



    // circles layers
    context.save()
    context.strokeStyle = 'seagreen';
    context.setLineDash([4, 5])

    var radius = d3.range(min, min + 4 * d + 10, 20)

    radius.forEach((e, i) => {
        let arc = d3.arc()
            .outerRadius(e)
            .innerRadius(0)
            .startAngle(0)
            .endAngle(Math.PI * 2)
            .context(context);

        context.beginPath()
        arc()

        context.stroke();

    })


    // draw arcs
    context.save()

    var arcs = d3.pie()(Array.from({ length: 16 }, e => 1))

    arcs.sort((a, b) => {
        return a.startAngle - b.startAngle
    })

    var arc = d3.arc()
        .innerRadius(min)
        .context(context);

    function switchStrokeColor(a) {
        switch (a) {
            case 1:
                return "steelblue";
            case 2:
                return "seagreen";
            case 3:
                return "salmon";
            default:
                return "seagreen";
        }
    }

    function InMax(a) {
        switch (a) {
            case 1:
                return min + 80;
            case 2:
                return min + 180;
            case 3:
                return min + 250;
            default:
                return min + 180;
        }
    }


    arcs.forEach((E, I) => {
        context.beginPath()

        context.strokeStyle = switchStrokeColor(data[I])

        let inMax = InMax(data[I])

        d3.range(min, inMax, 10).map((e, i) => {

            context.setLineDash([10, 0])
            arc.outerRadius(e)(E)
            context.stroke()

        })


        context.restore()
    })




    // label
    context.save()
    context.strokeStyle = 'salmon'
    context.lineWidth = 4;
    context.fillStyle = 'seagreen'

    context.beginPath()

    context.font = "16px adad";
    labels.forEach((e, i) => {

        context.save()
        context.rotate(Math.PI * 2 / 16 * i + Math.PI * 2 / 64)
        context.fillText(e, 0, -380);
        context.restore()

    })
    context.restore()


}
