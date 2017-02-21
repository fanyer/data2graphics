export function scoreLevel(parrent, config) {
    /**
     * [function description]
     * @param  {[type]} factor [description]
     * @return {[type]}        [description]
     */
    Array.prototype.scale = function(factor, config) {
        var newArr = []
        this.forEach((e, i, arr) => {
            newArr[i] = [e[0], min + (e[1] - min) * factor]
        })
        return newArr;
    }


    var input = config || {
        'score': 46.7,
        'data': {
            '低聚果糖': 0.4,
            '低聚异麦芽糖': 0.6,
            '𝜷-葡聚糖': 0.3,
            '葡甘露聚糖': 0.2,
            '抗性麦芽糊精': 0.9,
            '氨糖': 0.5,
            '饱和脂肪酸': 0.3,
            '不饱和脂肪酸': 0.8,
            '鞘脂类': 0.77,
            '胆汁酸': 0.12,
            '胆红素': 0.34,
            '胆固醇': 0.96,
            '淀粉': 0.43,
            '膳食纤维': 0.213
        }
    }


    var max = 350
    var min = 150
    var colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ];

    const labels = Object.keys(input.data)
    const values = Object.values(input.data)



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


    // draw text & number
    context.textBaseline = "hanging";
    context.textAlign = "center";


    context.fillStyle = colors[1];
    context.font = "64px adad";
    context.fillText(input.score, 0, -80);

    context.fillStyle = colors[2];
    context.font = "24px adad";
    context.fillText("综合打分", 0, 0);

    context.font = "16px adad";
    context.fillText("Basal Metalbolic Assay", 0, 50);

    context.restore()


    // circles layers
    context.restore()
        // context.rotate(-Math.PI / 10)

    var radius = []
    radius.push(d3.range(150, 200, 10))
    radius.push(d3.range(200, 250 + 10, 10))
    radius.push(d3.range(250, 300 + 10, 10))
    radius.push(d3.range(300, 350 + 10, 10))


    context.globalAlpha = 0.3
    radius.forEach((e, i) => {
            context.strokeStyle = colors[i];
            radius[i].forEach(function(e2, i2) {
                i2 > 4 || i2 < 1 ?
                    context.setLineDash([10, 0]) :
                    context.setLineDash([2, 4])

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
        })
        // context.rotate(Math.PI/7)


    // draw curve
    context.restore()
    var curveLineData = []
    var axisLineData = []
    var pi = Math.PI
    context.globalAlpha = 0.9

    values.map((e, i) => {
        let r = d3.scaleLinear()
            .domain([0, 1])
            .range([min, max])

        let point = [pi / 7 * i, r(e)]

        curveLineData.push(point)

    })


    var radial = d3.radialLine()
        .curve(d3.curveCardinalClosed.tension(0.3))
        .context(context)

    context.setLineDash([5, 0]);
    // context.shadowBlur = 1;
    context.beginPath()
    context.strokeStyle = "seagreen"
    context.shadowColor = "seagreen"
    radial(curveLineData);
    // context.rotate(Math.PI / 2)



    // draw internal bundle curve
    d3.range(0, 1, 0.02).forEach((e, i) => {
        radial(curveLineData.scale(e));
    })
    context.stroke()



    // draw a axis line
    context.restore()
    context.beginPath()
    context.lineWidth = 2
    context.restore()
    let bundaryPoints = []


    context.strokeStyle = 'salmon'
    context.lineWidth = 1;

    var innerborder = axisLineData
    var outerborder = axisLineData.map((e) => (e.scale(2.33)))

    var axis = d3.radialLine()
        .context(context);

    d3.range(0, 2 * Math.PI, Math.PI / 7).forEach((e, i) => {
        let r = d3.scaleLinear()
            .domain([0, 1])
            .range([min, max])
        let startPoint = [pi / 7 * i, r(0)]
        let endPoint = [pi / 7 * i, r(1)]
        axis([startPoint, endPoint])
    })
    context.stroke()


    // draw points
    context.save()
    context.strokeStyle = 'salmon'
    context.lineWidth = 4;
    context.fillStyle = '#ccc'

    var points = d3.symbol()
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
        // context.rotate(pi / 2)

    // label
    context.restore()
    context.strokeStyle = 'salmon'
    context.lineWidth = 4;
    context.fillStyle = 'seagreen'

    context.beginPath()

    context.font = "16px adad";
    labels.forEach((e, i) => {

        context.save()
        context.rotate(Math.PI * 2 / 14 * i)
        context.fillText(e, 0, -380);
        context.restore()

    })

    context.save()







}
