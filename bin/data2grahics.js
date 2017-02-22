#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

d3 = Object.assign({},
    d3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-sankey'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);

function intakeSugarDistribution(parrent, config1, config2) {

    // to extend boundary straight line
    Array.prototype.extendArrBoundary = function() {
        var dx = this[1].x - this[0].x;
        var dy = this[1].y - this[0].y;
        this.unshift({
            x: this[0].x - dx,
            y: this[0].y
        });
        this.push({
            x: this[this.length - 1].x + dx,
            y: this[this.length - 1].y
        });
    };


    var xArr1 = config1||{
        "type": "检测值",
        "data": {
            '膳食纤维': 5,
            '低聚果糖': 6.5,
            '低聚异麦芽糖': 4,
            'ß-葡萄糖': 2.5,
            '葡甘露聚糖': 4,
            '抗性麦芽糊精': 3
        }
    };

    var xArr2 = config2||{
        "type": "标准值",
        "data": {
            '膳食纤维': 3.5,
            '低聚果糖': 2.2,
            '低聚异麦芽糖': 3.2,
            'ß-葡萄糖': 6.2,
            '葡甘露聚糖': 2.7,
            '抗性麦芽糊精': 5.2
        }
    };


    // construct basic params
    var labels = Object.keys(xArr1.data);

    var lineData1 = [];
    var lineData2 = [];

    labels.map((e, i) => {
        lineData1.push({
            x: i + 1,
            y: xArr1.data[labels[i]]
        });
        lineData2.push({
            x: i + 1,
            y: xArr2.data[labels[i]]
        });
    });

    lineData1.extendArrBoundary();
    lineData2.extendArrBoundary();

    // define line style
    var line = d3.line()
        .defined(function(d) {
            return d;
        })
        .x(function(d) {
            return x(d.x);
        })
        .y(function(d) {
            return y(d.y);
        })
        .curve(d3.curveBasis);


    // detect svg or canvas
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //创建svg标签   
    svg.setAttribute('width', '1000');
    svg.setAttribute('height', '500');
    parrent.append(svg);

    var svg = d3.select("svg"),
        margin = { top: 20, right: 40, bottom: 50, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var formatNumber = d3.format(".1f");


    // define basic location Axis
    var x = d3.scaleLinear()
        .domain([1 - 0.8, 6 + 0.8])
        .range([0, width]);


    var y = d3.scaleLinear()
        .domain([0, 7])
        .range([height, 0]);

    var xAxis = d3.axisBottom(x)
        .ticks(6)
        .tickSize(5)
        .tickFormat((d) => {
            return labels[d - 1]
        });

    var yAxis = d3.axisRight(y)
        .ticks(6)
        .tickSize(width)
        .tickFormat(function(d) {
            var s = formatNumber(d / 1e6);
            // return d
            // return this.parentNode.nextSibling ? "\xa0" + s : "$" + s + " million";
        });

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(customXAxis);

    g.append("g")
        .call(customYAxis);

    function customXAxis(g) {
        g.call(xAxis);
        g.select(".domain").remove();
    }

    function customYAxis(g) {
        g.call(yAxis);
        g.select(".domain").remove();
        // g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
        g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#ccc");
        g.selectAll(".tick text").attr("x", 4).attr("dy", -4);
    }

    //curve xVertical
    function dataMax(arr1, arr2) {
        var max = JSON.parse(JSON.stringify(arr1));
        max.forEach((e, i, arr) => {
            arr1[i].y > arr2[i].y || (e.y = arr2[i].y);
        });
        return max
    }

    var max = dataMax(lineData1, lineData2);

    max.forEach((e, i, arr) => {
        if (i < 7 && i > 0) {
            g.append('g')
                .datum([{ x: e.x, y: 0 }, { x: e.x, y: e.y }])
                .append('path')
                .attr("class", "line0")
                .attr('stroke-dasharray', '3,3')
                .attr('d', line);
        }
    });


    // curve standard
    var total = [lineData1, lineData2];

    total.forEach((E, I, Arr) => {

        E.map((e, i, arr) => {

            if (i < E.length - 1) {
                let p1 = e,
                    p2 = E[i + 1],
                    vs = 1 - 1 / 4,
                    pMiddle1 = { x: vs * p1.x + (1 - vs) * p2.x, y: p1.y },
                    pMiddle2 = { x: (1 - vs) * p1.x + vs * p2.x, y: p2.y };

                let bezeire = [p1, pMiddle1, pMiddle2, p2];

                svg.datum(bezeire)
                    .append("path")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .attr("class", "line" + I)
                    .attr("d", line);
            }

        });
    });


    //  curve ripple
    var curveRipple = function(Ripple) {
        Ripple.forEach((E, I, Arr) => {

            E.map((e, i, arr) => {

                if (i < E.length - 1) {
                    let p1 = e,
                        p2 = E[i + 1],
                        vs = 3 / 4,
                        pMiddle1 = { x: vs * p1.x + (1 - vs) * p2.x, y: p1.y },
                        pMiddle2 = { x: (1 - vs) * p1.x + vs * p2.x, y: p2.y };

                    let bezeire = [p1, pMiddle1, pMiddle2, p2];

                    svg.datum(bezeire)
                        .append("path")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        .style("opacity", 0.3)
                        .attr("class", "line" + I)
                        .attr("d", line);

                }
            });
        });
    };

    function percent(arr, factor) {
        var newArr = [];
        arr.forEach((e, i, arr) => {
            newArr[i] = {
                x: e.x,
                y: e.y * factor
            };
        });
        return newArr;
    }

    d3.range(0, 1, 0.02).forEach((e, i) => {
        let percent1 = percent(lineData1, e),
            percent2 = percent(lineData2, e);

        let Ripple = [percent1, percent2];
        curveRipple(Ripple);

    });



    //  draw symbol
    svg.selectAll(".dot")
        .data([].concat(lineData1, lineData2))
        .enter().append("circle")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "dot")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5);


   
    // legend
    let y1Destiny = (lineData1.pop());
    let y2Destiny = (lineData2.pop());

    var y1pixel = parseFloat(
        line([y1Destiny])
        .match(/,(\d|\.)+\Z/gi)[0].slice(1, -1)
    );
    var y2pixel = parseFloat(
        line([y2Destiny])
        .match(/,(\d|\.)+\Z/gi)[0].slice(1, -1));

    ['检测值', '标准值'].forEach((e, i) => {

        g.append('text')
            .attr('transform', function(d) {
                return e === '标准值' ?
                    'translate(900,' + (y1pixel + 20) + ')' : 'translate(900,' + (y2pixel + 20) + ')';
            })
            .attr('class','text'+i)
            .text(function(d) {
                return e;
            });
    });


}

// basic location coordination is polar

d3 = Object.assign({},
    d3,
    require('d3-format'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);

function intakeFiberStruct(parrent, config) {

    const input = config || {
        'XXX': 0.08,
        '胆固醇': 0.17,
        '饱和脂肪酸': 0.2,
        '不饱和脂肪酸': 0.1,
        'YYY脂肪酸': 0.05,
        '鞘脂类': 0.4
    };


    var max = 350,
        min = 110,
        d = (max - min) / 4;

    var colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ];

    const labels = Object.keys(input);
    labels.sort((a, b) => (input[a] - input[b]));

    const data = Object.values(input);



    // detect browser canvas api
    if (!parrent.querySelector("canvas")) {
        parrent.appendChild(document.createElement("canvas"));
    }

    var canvas = parrent.querySelector("canvas"),
        context = canvas.getContext("2d");

    canvas.width = 1200;
    canvas.height = 900;

    var radius = Math.min(width, height) / 2;


    let width = canvas.width,
        height = canvas.height;
    if (window.devicePixelRatio) {
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.height = height * window.devicePixelRatio * 2;
        canvas.width = width * window.devicePixelRatio * 2;
        context.scale(window.devicePixelRatio * 2, window.devicePixelRatio * 2);
    }

    context.translate(width / 2, height / 2);
    context.lineWidth = 1.5;
    context.save();




    // draw text & number
    context.textBaseline = "hanging";
    context.textAlign = "center";

    context.fillStyle = colors[2];
    context.font = "24px Verdana";
    context.fillText("膳食纤维", 0, 0);
    context.restore();



    // circles layers
    context.save();

    var radius = [
        d3.range(min, min + d, 10),
        d3.range(min + d, min + 2 * d, 10),
        d3.range(min + 2 * d, min + 3 * d, 10),
        d3.range(min + 3 * d, min + 4 * d + 10, 10)
    ];

    context.globalAlpha = 0.8;
    radius.forEach((e, i) => {
        context.strokeStyle = 'steelblue';
        radius[i].forEach(function(e2, i2) {
            context.setLineDash([4, 5]);

            let arc = d3.arc()
                .outerRadius(e2)
                .innerRadius(0)
                .startAngle(0)
                .endAngle(Math.PI * 2)
                .context(context);

            context.beginPath();
            arc();

            context.stroke();

        });
    });
    context.restore();


    // draw arcs
    context.save();

    var arcs = d3.pie()(data);

    arcs.sort((a, b) => {
        return a.value - b.value
    });

    var arc = d3.arc()
        .innerRadius(min)
        .context(context);

    arcs.forEach((E, I) => {
        context.beginPath();

        I > 3 ?
            context.strokeStyle = 'seagreen' : context.strokeStyle = 'steelblue';

        d3.range(min, min + 210 - I * 30, 10).map((e, i) => {
            arc.outerRadius(e)(E);
            context.stroke();
        });

        context.restore();
    });




    // legends
    context.save();
    context.strokeStyle = 'salmon';
    context.fillStyle = 'salmon';
    context.font = "24px Verdana";
    context.textBaseline = "middle";

    var radialLine = d3.radialLine()
        .curve(d3.curveLinear)
        .context(context);

    var line = d3.line()
        .curve(d3.curveLinear)
        .context(context);

    function generateRL(angle) {
        return [
            [angle, min],
            [angle, max + 50]
        ]
    }

    function generateXY(angle, extend) {
        // coordiantes convention   RL => XY
        angle = Math.PI / 2 - angle;

        var extend = arguments[1] || 10;
        var onOff = (max + 50) * Math.cos(angle) >= 0;

        return [
            [(max + 50) * Math.cos(angle), -(max + 50) * Math.sin(angle)],
            [(max + 50) * Math.cos(angle) +
                (onOff ? extend : -extend), -(max + 50) * Math.sin(angle)
            ]
        ]
    }


    arcs.forEach((e, i) => {

        context.beginPath();
        let lengendsRL = generateRL(e.startAngle + 0.2);
        let lengendsXY = generateXY(e.startAngle + 0.2, 50);

        radialLine(lengendsRL);
        line(lengendsXY);
        context.stroke();

        context.direction = lengendsXY[1][0] > 0 ? 'ltr' : 'rtl';
        context.fillText(labels[i], lengendsXY[1][0], lengendsXY[1][1]);

    });


    context.restore();


}

function scoreLevel(parrent, config) {
    /**
     * [function description]
     * @param  {[type]} factor [description]
     * @return {[type]}        [description]
     */
    Array.prototype.scale = function(factor, config) {
        var newArr = [];
        this.forEach((e, i, arr) => {
            newArr[i] = [e[0], min + (e[1] - min) * factor];
        });
        return newArr;
    };


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
    };


    var max = 350;
    var min = 150;
    var colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ];

    const labels = Object.keys(input.data);
    const values = Object.values(input.data);



    // detect browser canvas api
    if (!document.querySelector("canvas")) {
        var canvas = document.createElement("canvas");
        parrent.appendChild(canvas);
    }

    var context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 800;

    var width = canvas.width,
        height = canvas.height,
        radius = Math.min(width, height) / 2;

    context.translate(width / 2, height / 2);

    context.save();


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

    context.restore();


    // circles layers
    context.restore();
        // context.rotate(-Math.PI / 10)

    var radius = [];
    radius.push(d3.range(150, 200, 10));
    radius.push(d3.range(200, 250 + 10, 10));
    radius.push(d3.range(250, 300 + 10, 10));
    radius.push(d3.range(300, 350 + 10, 10));


    context.globalAlpha = 0.3;
    radius.forEach((e, i) => {
            context.strokeStyle = colors[i];
            radius[i].forEach(function(e2, i2) {
                i2 > 4 || i2 < 1 ?
                    context.setLineDash([10, 0]) :
                    context.setLineDash([2, 4]);

                let arc = d3.arc()
                    .outerRadius(e2)
                    .innerRadius(0)
                    .startAngle(0)
                    // .padAngel(1)
                    .endAngle(Math.PI * 2)
                    .context(context);

                context.beginPath();
                arc();

                context.stroke();

            });
        });
        // context.rotate(Math.PI/7)


    // draw curve
    context.restore();
    var curveLineData = [];
    var axisLineData = [];
    var pi = Math.PI;
    context.globalAlpha = 0.9;

    values.map((e, i) => {
        let r = d3.scaleLinear()
            .domain([0, 1])
            .range([min, max]);

        let point = [pi / 7 * i, r(e)];

        curveLineData.push(point);

    });


    var radial = d3.radialLine()
        .curve(d3.curveCardinalClosed.tension(0.3))
        .context(context);

    context.setLineDash([5, 0]);
    // context.shadowBlur = 1;
    context.beginPath();
    context.strokeStyle = "seagreen";
    context.shadowColor = "seagreen";
    radial(curveLineData);
    // context.rotate(Math.PI / 2)



    // draw internal bundle curve
    d3.range(0, 1, 0.02).forEach((e, i) => {
        radial(curveLineData.scale(e));
    });
    context.stroke();



    // draw a axis line
    context.restore();
    context.beginPath();
    context.lineWidth = 2;
    context.restore();
    let bundaryPoints = [];


    context.strokeStyle = 'salmon';
    context.lineWidth = 1;

    var innerborder = axisLineData;
    var outerborder = axisLineData.map((e) => (e.scale(2.33)));

    var axis = d3.radialLine()
        .context(context);

    d3.range(0, 2 * Math.PI, Math.PI / 7).forEach((e, i) => {
        let r = d3.scaleLinear()
            .domain([0, 1])
            .range([min, max]);
        let startPoint = [pi / 7 * i, r(0)];
        let endPoint = [pi / 7 * i, r(1)];
        axis([startPoint, endPoint]);
    });
    context.stroke();


    // draw points
    context.save();
    context.strokeStyle = 'salmon';
    context.lineWidth = 4;
    context.fillStyle = '#ccc';

    var points = d3.symbol()
        .size(20)
        .context(context);


    context.beginPath();
    curveLineData.forEach((d, i) => {
        context.save();
        context.translate(d[1] * Math.sin(d[0]), -d[1] * Math.cos(d[0]));
        points();
        context.restore();
    });

    context.stroke();
    context.fill();
        // context.rotate(pi / 2)

    // label
    context.restore();
    context.strokeStyle = 'salmon';
    context.lineWidth = 4;
    context.fillStyle = 'seagreen';

    context.beginPath();

    context.font = "16px adad";
    labels.forEach((e, i) => {

        context.save();
        context.rotate(Math.PI * 2 / 14 * i);
        context.fillText(e, 0, -380);
        context.restore();

    });

    context.save();







}

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


function intakeFatProportion(parrent, config) {

    var max = 350;
    var min = 110;
    var d = (max - min) / 6;


    var colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ];


    var input = config || {
        'sature': 42,
        'unsature': 58
    };

    var data = Object.values(input);


    // detect browser canvas api
    if (!parrent.querySelector("canvas")) {
        var canvas = document.createElement("canvas");
        parrent.appendChild(canvas);
    }

    var context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 800;

    var width = canvas.width,
        height = canvas.height,
        radius = Math.min(width, height) / 2;

    context.translate(width / 2, height / 2);

    context.save();

    var arcs = d3.pie()(data);


    // draw text & number
    context.textBaseline = "hanging";
    context.textAlign = "center";

    context.fillStyle = colors[2];
    context.font = "24px adad";
    context.fillText("膳食纤维", 0, 0);
    context.restore();


    // circles layers
    context.save();
    context.setLineDash([4, 0]);
    context.globalAlpha = 0.7;



    var circle = d3.arc()
        .startAngle(0)
        .endAngle(2 * Math.PI)
        .innerRadius(0)
        .context(context);

    var radius = [max - 25, max];

    radius.forEach((E, I) => {
        context.lineWidth = I === 0 ? 2 : 10;
        context.setLineDash(I === 0 ? [4, 10] : [4, 0]);


        let arc = d3.arc()
            .innerRadius(E)
            .outerRadius(E)
            .padAngle(0.02)
            .context(context);


        arcs.forEach((e, i) => {
            context.save();
            context.strokeStyle = i === 0 ? 'seagreen' : 'steelblue';

            context.beginPath();
            arc(e);
            context.stroke();

            context.restore();
        });
    });


    // draw two circle attached
    var cornerRadius = 8;
    context.lineWidth = 15;


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

    context.restore();




    // draw arcs
    context.save();
        // arcs.sort((a,b)=>(a.startAngle-b.startAngle))

    var arc = d3.arc()
        .innerRadius(min)
        .context(context);

    arcs.forEach((E, I) => {
        context.beginPath();

        context.strokeStyle = I === 0 ? 'seagreen' : 'steelblue';

        d3.range(min, min + 210 - I * 30, 10).map((e, i) => {
            arc.outerRadius(e)(E);
            context.stroke();
        });

        context.restore();
    });


}


function intakeFatDeviation(parrent, config) {

    // detect browser canvas api
    if (!parrent.querySelector("canvas")) {
        var canvas = document.createElement("canvas");
        parrent.appendChild(canvas);
    }

    var context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 800;

    var width = canvas.width,
        height = canvas.height,
        radius = Math.min(width, height) / 2;

    context.translate(width / 2, height / 2);

    context.save();
}

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

function estimateFiber(parrent, config) {

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
    };


    var max = 470,
        min = 110,
        d = (max - min) / 6;

    var colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ];

    const labels = Object.keys(input);
    const data = Object.values(input);


    // detect browser canvas api
    if (!parrent.querySelector("canvas")) {
        var canvas = document.createElement("canvas");
        parrent.appendChild(canvas);
    }

    var context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 800;

    var width = canvas.width,
        height = canvas.height,
        radius = Math.min(width, height) / 2;

    context.translate(width / 2, height / 2);

    context.save();



    // draw text & number
    context.textBaseline = "hanging";
    context.textAlign = "center";

    context.fillStyle = colors[2];
    context.font = "24px adad";
    context.fillText("膳食纤维", 0, 0);
    context.restore();



    // circles layers
    context.save();
    context.strokeStyle = 'seagreen';
    context.setLineDash([4, 5]);

    var radius = d3.range(min, min + 4 * d + 10, 20);

    radius.forEach((e, i) => {
        let arc = d3.arc()
            .outerRadius(e)
            .innerRadius(0)
            .startAngle(0)
            .endAngle(Math.PI * 2)
            .context(context);

        context.beginPath();
        arc();

        context.stroke();

    });


    // draw arcs
    context.save();

    var arcs = d3.pie()(Array.from({ length: 16 }, e => 1));

    arcs.sort((a, b) => {
        return a.startAngle - b.startAngle
    });

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
        context.beginPath();

        context.strokeStyle = switchStrokeColor(data[I]);

        let inMax = InMax(data[I]);

        d3.range(min, inMax, 10).map((e, i) => {

            context.setLineDash([10, 0]);
            arc.outerRadius(e)(E);
            context.stroke();

        });


        context.restore();
    });




    // label
    context.save();
    context.strokeStyle = 'salmon';
    context.lineWidth = 4;
    context.fillStyle = 'seagreen';

    context.beginPath();

    context.font = "16px adad";
    labels.forEach((e, i) => {

        context.save();
        context.rotate(Math.PI * 2 / 16 * i + Math.PI * 2 / 64);
        context.fillText(e, 0, -380);
        context.restore();

    });
    context.restore();


}

// export * from './lib/estimate-sugar'

exports.intakeSugarDistribution = intakeSugarDistribution;
exports.intakeFiberStruct = intakeFiberStruct;
exports.scoreLevel = scoreLevel;
exports.intakeFatProportion = intakeFatProportion;
exports.intakeFatDeviation = intakeFatDeviation;
exports.estimateFiber = estimateFiber;
