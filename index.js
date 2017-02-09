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


export function index(parrent) {

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '1000')
    svg.setAttribute('height', '800')

    parrent.append(svg)

    var svg = d3.select("svg"),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv('/lib/fye.hist.csv', function(err, data) {
        if (err) throw err

        var bins = data

        var x = d3.scaleLinear()
            .domain([-5, 5])
            .rangeRound([0, width]);

        var y = d3.scaleLinear()
            .domain([0, d3.max(bins, function(d) {
                return d3.format('.10f')(d.density);
            })])
            .range([height, 0]);

        var bar = g.selectAll(".bar")
            .data(bins)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) {
                return "translate(" + x(d.start) + "," + y(d.density) + ")";
            });

        bar.append("rect")
            .attr("x", 0)
            .attr("width", x(bins[0].end) - x(bins[0].start) - 1)
            .attr("height", function(d) {
                return height - y(d.density);
            });

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", 6)
            .attr("x", (x(bins[0].end) - x(bins[0].start)) / 2)
            .attr("text-anchor", "middle")
            .text(function(d) {
                return d.density;
            });

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)); 
        g.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0,0)")
            .call(d3.axisLeft(y));


    })
}
