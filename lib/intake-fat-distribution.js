import D3 from 'd3';

var d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-axis'),
    require('d3-selection'),
    require('d3-color'),
    require('d3-scale')
);


export function intakeFatProportion(parrent, config) {

    var max = 350
    var min = 110
    var d = (max - min) / 6

    var radius3 = 250;
    var rippleRadius = 310




    var colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ];


    var input = config || {
        'sature':42,
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
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.globalAlpha = 0.4;

    context.fillStyle = 'black'
    context.font = "144px adad";
    context.fillText(data[0] + ':' + data[1], 0, 0);
    context.restore()


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

    var rippleRadius = 310
    var vertices = [
        [arcs[0].startAngle, rippleRadius],
        [arcs[1].startAngle, rippleRadius]
    ]

    var theta = arcs[0].startAngle - Math.PI;

    //  generate vertical lines
    function vertical(theta, num, radius3) {
        var arr = [];

        arr.push([theta / 2 + Math.PI / 2, 0]);

        [...Array(num)].map((e, i) => {
            arr.push([theta / 2 + Math.PI / 2, radius3 * (i + 1) / num])
            arr.push([theta / 2 + Math.PI / 2, -radius3 * (i + 1) / num])
        });

        return arr
    }

    var verticalArr = vertical(theta, 25, radius3)
    verticalArr.sort((a, b) => (a[1] - b[1]))


    // vertices tangent 1st
    var theta2_1 = Math.acos(radius3 / rippleRadius);
    var theta2_2 = 2 * Math.PI - Math.acos(radius3 / rippleRadius);





    // vertices tangent 1st
    var theta3_1 = Math.PI - (theta2_1 - theta);
    var theta3_2 = theta + theta2_1 + Math.PI;





    //central polygon
    var centralPolygon = [
        [arcs[0].startAngle, rippleRadius],
        [0, 0],
        [arcs[1].startAngle, rippleRadius]
    ]


    var radialLine = d3.radialLine()
        .curve(d3.curveLinear)
        .context(context)

    var radialCurve = d3.radialLine()
        .curve(d3.curveCardinal.tension(0))
        .context(context)

    var line = d3.line()
        .curve(d3.curveLinear)
        .context(context)

    context.beginPath()

    // radialLine(vertices)
    // radialLine(verticalArr)
    radialLine(centralPolygon)

    context.stroke()


    context.save()

    verticalArr.forEach((e, i) => {
        context.strokeStyle = e[1] > 0 ? 'steelblue' : 'seagreen';
        context.globalAlpha = 0.3;

        context.beginPath();

        radialLine([0, 100], [0, 0], [0, 200]);

        // e[1] < 10 && e[1] > -100 ?
        //     radialCurve([vertices[0],
        //         e,
        //         vertices[1]
        //     ]) :
        //     radialCurve([vertices[0],
        //         e,
        //         vertices[1]
        //     ]);

        // radialLine([vertices[0],
        //     [theta2, radius3],
        //     e, [theta3, radius3],
        //     vertices[1]
        // ]);


        // e[1] < 10 && e[1] > -100 ?
        //     radialLine([vertices[0],
        //         e,
        //         vertices[1]
        //     ]) :
        //     radialCurve([vertices[1],
        //         [theta2, radius3], e, [theta3, radius3],
        //         vertices[0]
        //     ]);

        var radius4 = radius3 * Math.abs(i - 25) / 25;

        if (e[1] > 160 || e[1] < -190) {

            // console.log(theta3_2, radius4);
            // console.log(vertices[0]);
            e[1] > 0 ?
                radialCurve([vertices[1],
                    [theta2_1, radius4], e, [theta3_1, radius4],
                    vertices[0]
                ]) :
                radialCurve([vertices[0],
                    [theta3_2, radius4], e, [theta2_2, radius4],
                    vertices[1]
                ]);
        } else {

            radialLine([vertices[0],
                e,
                vertices[1]
            ]);
        }



        context.stroke()
        context.restore()

    })



    context.restore()







    // draw arcs
    context.save()

    var radius3 = 250;

    var arc = d3.arc()
        .innerRadius(0)
        .context(context);

    arcs.forEach((E, I) => {
        context.beginPath()
        context.strokeStyle = I === 0 ? 'seagreen' : 'steelblue';

        arc.outerRadius(radius3)(E)
        context.stroke()

        context.restore()
    })

}








export function intakeFatDeviation(parrent, config) {

    var input = config || {
        '标准值': 0.5,
        'data': {
            '饱和脂肪酸': 0.8739,
            '不饱和脂肪酸': 0.1498,
            '鞘脂类': 0.3483,
            '胆固醇': 0.5705
        }
    }

    const labels = Object.keys(input.data)
    const data = Object.values(input.data)


    // detect svg or canvas
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '1000')
    svg.setAttribute('height', '500')
    parrent.append(svg)

    var svg = d3.select("svg"),
        margin = { top: 20, right: 40, bottom: 50, left: 200 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var formatNumber = d3.format(".2f");

    // define basic location Axis
    var x = d3.scaleLinear()
        .domain([0, 5])
        .range([height, 0]);


    var y = d3.scaleLinear()
        .domain([0, 4 + 0.3])
        .range([0, width]);

    var xAxis = d3.axisLeft(x)
        .ticks(5)
        .tickSize(-width)
        .tickFormat((d) => {
            return labels[d - 1]
        });

    var yAxis = d3.axisBottom(y)
        .ticks(4)
        .tickSize(-height)
        .tickFormat((d, i) => {
            if (i === 2) return '标准值'
            return d * 25
        });

    g.append("g")
        .attr("class", "axis axis--x")
        // .attr("transform", "translate(0,0)")
        .call(customXAxis);

    g.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(0," + (height) + ")")
        .call(customYAxis);


    function customXAxis(g) {
        g.call(xAxis);
        g.select(".domain").remove();
        // g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#fff");
        g.selectAll(".tick text").attr("x", -24).attr("dy", 4);

    }

    function customYAxis(g) {
        g.call(yAxis);
        g.select(".domain").remove();
        g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#ccc");
        g.selectAll(".tick:nth-child(3) line").attr("stroke", "seagreen")
            .attr("stroke-width", "3")
            .attr("opacity", "0.6");
        g.selectAll(".tick:nth-child(3) text").style("font-family", "adad")
            .style("font-size", "20px")
            .style("fill", "seagreen");

        g.selectAll(".tick text").attr("x", 4).attr("dy", 24);
    }



    //  draw bar 
    var barH = 26;

    var bar = g.selectAll("g.bar")
        .data(data)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d, i) {
            return "translate(0," + (x(i + 1)) + ")";
        });

    bar.append("rect")
        .attr("width", function(d) {
            return y(d * 4) ;
        })
        .attr("stroke-width", "3")
        .attr("transform", "")
        .attr("stroke", "steelblue")
        .attr("height", barH);

    bar.append("text")
        .attr("class", "value")
        .attr("x", function(d) {
            return y(d * 4);
        })
        .attr("y", 0)
        .attr("dx", 14)
        .attr("dy", barH * 0.8)
        .style("fill", "#000")
        .style("font-size", "26px")
        .style("font-family", "adad")
        .attr("text-anchor", "start")
        .text(function(d) {
            return d3.format('.2%')(d);
        });

}
