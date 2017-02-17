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

export function estimateFiber(parrent, config) {

    const input = config || {
        '维生素1': 1,
        '维生素2': 1,
        '维生素3': 3,
        '维生素4': 2,
        '维生素5': 1,
        '维生素6': 3,
        '维生素7': 1,
        '维生素8': 2,
        '维生素9': 2,
        '维生素10': 1,
        '维生素11': 1,
        '维生素12': 3,
        '维生素13': 3,
        '维生素14': 1,
        '维生素15': 2,
        '维生素16': 3
    }


    var max = 350,
        min = 110,
        d = (max - min) / 6

    var colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ];

    const labels = Object.keys(input)

    const data = Object.values(input)


    // detect browser canvas api
    if (!document.querySelector("canvas")) {
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










    // label
    context.restore()
    context.strokeStyle = 'salmon'
    context.lineWidth = 4;
    context.fillStyle = 'seagreen'

    context.beginPath()

    context.font = "16px serif";
    labels.forEach((e, i) => {

            context.save()
            context.rotate(Math.PI * 2 / 14 * i)
            context.fillText(e, 0, -380);
            context.restore()

        }
    }
}
