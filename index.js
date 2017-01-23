import './basic.css'

/**
 * [function description]
 * @param  {[type]} factor [description]
 * @return {[type]}        [description]
 */
Array.prototype.scale = function(factor) {
        var newArr = []
        this.forEach((e, i, arr) => {
            newArr[i] = [e[0], min + (e[1] - min) * factor]
        })
        return newArr;
    }
    // Array.prototype.scale = function(factor) {
    //     var newArr = []
    //     this.forEach((e, i, arr) => {
    //         if (typeof e === "number") {
    //             newArr[i] = e * factor
    //         }
    //     })
    //     return newArr;
    // }




var colors = [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
    "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];


var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 800;

var width = canvas.width,
    height = canvas.height,
    radius = Math.min(width, height) / 2;

context.translate(width / 2, height / 2)



// draw text & number
context.textBaseline = "hanging";
context.textAlign = "center";

var txt = d3.randomUniform(30, 50)().toFixed(1)
context.font = "64px serif";
context.fillStyle = colors[1]
context.fillText(txt, 0, -60);

context.fillStyle = colors[2]
context.font = "24px serif";
context.fillText("综合打分", 0, 0);
context.font = "16px serif";
context.fillText("Basal Metalbolic Assay", 0, 50);
context.restore()




// circles layers
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

            var arc = d3.arc()
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
var curveLineData = []
var axisLineData = []
var pi = Math.PI
context.globalAlpha = 0.9

var max = 350
var min = 150


for (var i = 0; i < 14; i++) {
    let r = d3.scaleLinear()
        .domain([0, 1])
        .range([min, max])

    let factor = d3.randomUniform(0, 1)()
    let point = [pi / 7 * i, r(factor)]

    curveLineData.push(point)
}

var radial = d3.radialLine()
    .curve(d3.curveCardinalClosed.tension(0.3))
    .context(context)

console.log(curveLineData)

context.setLineDash([5, 0]);
// context.shadowBlur = 1;
context.beginPath()
context.strokeStyle = "seagreen"
context.shadowColor = "seagreen"
radial(curveLineData);

d3.range(0, 1, 0.02).forEach((i) => {
    radial(curveLineData.scale(i));
})
context.stroke()





// draw a axis line
context.beginPath();
context.lineWidth = 2;
context.restore()
let bundaryPoints = []


context.strokeStyle = 'salmon'
context.lineWidth = 1;

var innerborder = axisLineData
var outerborder = axisLineData.map((e) => (e.scale(2.33)))

var axis = d3.radialLine()
    .context(context);

d3.range(0,2*Math.PI,Math.PI/7).forEach((e,i)=>{
    let r = d3.scaleLinear()
        .domain([0, 1])
        .range([min, max])
    let startPoint = [pi / 7 * i, r(0)]
    let endPoint = [pi / 7 * i, r(1)]
    axis([startPoint, endPoint])
})



context.stroke()



// draw points
context.strokeStyle = 'salmon'
context.lineWidth = 4;
context.fillStyle = '#ccc'

var points = d3.symbol()
    .size(20)
    .context(context);

context.beginPath()
curveLineData.forEach((d, i) => {
    console.log(d)
    context.save();
    context.translate(d[1] * Math.sin(d[0]), -d[1] * Math.cos(d[0]));
    points()
    context.restore();
})

context.stroke()
context.fill()
