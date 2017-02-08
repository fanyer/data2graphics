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

var intakeStruct = () => {

    const input = {
        'XXX': 0.1,
        '胆固醇': 0.2,
        '饱和脂肪酸': 0.2,
        '不饱和脂肪酸': 0.1,
        '鞘脂类': 0.4
    }

    const labels=Array.from(input.keys())
    console.log(labels)

    // judge browser canvas api
    if (!document.querySelector("canvas")) {
        document.body.appendChild(document.createElement("canvas"))
    }

    var canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 800;

    var width = canvas.width,
        height = canvas.height,
        radius = Math.min(width, height) / 2;

    context.translate(width / 2, height / 2)

    context.save()

    // draw text & number
    context.restore()
    context.textBaseline = ’hanging‘;
    context.textAlign = ’center‘;

    context.fillStyle = colors[2]
    context.font = ’24 px serif‘;
    context.fillText('膳食纤维', 0, 0);





}


export default intakeStruct
