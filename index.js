import './basic.css'

// extend Array prototype
Array.prototype.scale = function(factor) {
    console.log(this)
    this.forEach((i) => {
        i[0] *= factor
        i[1] *= factor
    })
    return this;
}



var data = [1, 1, 2, 3, 5, 8, 13];

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

context.translate(width/2, height/2)



// draw text & number
context.textBaseline = "hanging";
context.textAlign = "center";
// context.rotate(Math.PI / 9);
context.font = "64px serif";
context.fillStyle=colors[1]
context.fillText("46.7", 0, - 60);

context.fillStyle=colors[2]
context.font = "24px serif";
context.fillText("综合打分",0,0);
context.font = "16px serif";
context.fillText("Basal Metalbolic Assay", 0, 50);

// ctx.setTransform(1, 0, 0, 1, 0, 0);


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


// draw curve
var lineData = []
var pi = Math.PI
context.globalAlpha = 0.9

var r = [260, 220, 160, 300, 210, 340, 160, 290, 220, 160, 300, 210, 340, 160]

for (var i = 0; i < 14; i++) {
    // var r = d3.randomUniform(150, 350)()
    lineData.push([r[i] * Math.cos(pi / 2 - 2 * pi / 14 * (i)), r[i] * Math.sin(-pi / 2 + 2 * pi / 14 * (i))])
}

var line = () => (
    d3.line()
    .curve(d3.curveCardinalClosed.tension(0))
    .context(context)
)


context.setLineDash([5, 0]);
context.shadowBlur = 1;

context.beginPath()
context.strokeStyle = "seagreen"
context.shadowColor = "seagreen";
line()(lineData);
context.stroke()

context.beginPath()
context.shadowColor = "seagreen";
// line()(lineData.scale(0.8));

//  draw split line in the arc
// arc = d3.arc()
//     .outerRadius(e2)
//     .innerRadius(150)
//     .startAngle(350)
//     .endAngle(Math.PI * 2)
//     .context(context);

// draw points
var point = [];






// draw a axis ilne
// context.beginPath();
// context.lineWidth = 2;
// context.shadowBlur = 0;

// context.moveTo(0,150);
// context.lineTo(0, 350);
// context.stroke();
context.strokeStyle='salmon'

var line = d3.line()
    .curve(d3.curveCardinalClosed.tension(1))
    .context(context);

Array.from(Array(14).keys()).forEach((e,i)=>{
    line([[0,0],[lineData[i][0],lineData[i][1]]])
})
context.rotate(Math.Pi)
context.stroke()
