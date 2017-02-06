const d3 = Object.assign({},
    require('d3-format'),
    require('d3-sankey'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);

var intakeDistribution = () => {
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


    var x = d3.scaleTime()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var line = d3.line()
        .x(function(d) {
            return x(d.date); })
        .y(function(d) {
            return y(d.close); })
        .curve(d3.curveStep)
        .context(context);


}


export default intakeDistribution
