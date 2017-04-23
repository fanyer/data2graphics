/*!
 * data2grahics.js v1.0.0
 * (c) 2017-2017 Yeer Fan
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3'], factory) :
	(factory((global.data2grahics = global.data2grahics || {}),global.D3));
}(this, (function (exports,D3) { 'use strict';

D3 = 'default' in D3 ? D3['default'] : D3;

var baseConf1 = {
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

var baseConf2 = {
    'type': '标准值',
    'data': {
        '膳食纤维': 3.5,
        '低聚果糖': 2.2,
        '低聚异麦芽糖': 3.2,
        'ß-葡萄糖': 6.2,
        '葡甘露聚糖': 2.7,
        '抗性麦芽糊精': 5.2
    }
};

function clone2(arr) {
  return Object.assign([], arr);
}

var d3 = Object.assign({}, D3, require('d3-shape'), require('d3-format'), require('d3-selection'), require('d3-request'), require('d3-axis'), require('d3-array'), require('d3-drag'), require('d3-color'), require('d3-scale'));

function intakeSugarDistribution(parrent, config1, config2) {

    // to extend boundary straight line  
    // under Policy  ,dirty, 2017.4.20 fanyer 
    Array.prototype.extendArrBoundary = function () {
        var dx = this[1].x - this[0].x;
        var dy = this[1].y - this[0].y;
        this.unshift({
            x: this[0].x - (dx - 0.2),
            y: this[0].y
        });
        this.push({
            x: this[this.length - 1].x + (dx - 0.2),
            y: this[this.length - 1].y
        });
    };

    var xArr1 = config1 || baseConf1;

    var xArr2 = config2 || baseConf2;

    // construct basic params
    var labels = Object.keys(xArr1.data);

    var lineData1 = [];
    var lineData2 = [];

    labels.map(function (e, i) {
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
    var line = d3.line().defined(function (d) {
        return d;
    }).x(function (d) {
        return x(d.x);
    }).y(function (d) {
        return y(d.y);
    }).curve(d3.curveBasis);

    // detect svg or canvas
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '1000');
    svg.setAttribute('height', '500');
    parrent.append(svg);

    var svg = d3.select("svg"),
        margin = { top: 20, right: 100, bottom: 50, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var formatNumber = d3.format(".1f");

    // define basic location Axis
    var x = d3.scaleLinear().domain([1 - 0.8, 6 + 0.8]).range([0, width]);

    var y = d3.scaleLinear().domain([0, 10]).range([height, 0]);

    var xAxis = d3.axisBottom(x).ticks(6).tickSize(5).tickFormat(function (d) {
        return labels[d - 1];
    });

    var yAxis = d3.axisRight(y).ticks(10).tickSize(width).tickFormat(function (d) {
        var s = formatNumber(d / 1e6);
        // return d
        // return this.parentNode.nextSibling ? "\xa0" + s : "$" + s + " million";
    });

    g.append("g").attr("transform", "translate(0," + height + ")").call(customXAxis);

    g.append("g").call(customYAxis);

    function customXAxis(g) {
        g.call(xAxis);
        g.select(".domain").remove();
        g.selectAll(".tick text").attr("x", 4).attr("dy", 24);
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
        max.forEach(function (e, i, arr) {
            arr1[i].y > arr2[i].y || (e.y = arr2[i].y);
        });
        return max;
    }

    var max = dataMax(lineData1, lineData2);

    max.forEach(function (e, i, arr) {
        if (i < 7 && i > 0) {
            g.append('g').datum([{ x: e.x, y: 0 }, { x: e.x, y: e.y }]).append('path').attr("class", "line0").attr('stroke-dasharray', '3,3').attr('d', line);
        }
    });

    // curve standard
    var total = [lineData1, lineData2];

    total.forEach(function (E, I, Arr) {

        E.map(function (e, i, arr) {

            if (i < E.length - 1) {
                var p1 = e,
                    p2 = E[i + 1],
                    vs = 1 - 1 / 4,
                    pMiddle1 = { x: vs * p1.x + (1 - vs) * p2.x, y: p1.y },
                    pMiddle2 = { x: (1 - vs) * p1.x + vs * p2.x, y: p2.y };

                var bezeire = [p1, pMiddle1, pMiddle2, p2];

                svg.datum(bezeire).append("path").attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("class", "line" + I).attr("d", line);
            }
        });
    });

    //  curve ripple
    var curveRipple = function curveRipple(Ripple) {
        Ripple.forEach(function (E, I, Arr) {

            E.map(function (e, i, arr) {

                if (i < E.length - 1) {
                    var p1 = e,
                        p2 = E[i + 1],
                        vs = 3 / 4,
                        pMiddle1 = { x: vs * p1.x + (1 - vs) * p2.x, y: p1.y },
                        pMiddle2 = { x: (1 - vs) * p1.x + vs * p2.x, y: p2.y };

                    var bezeire = [p1, pMiddle1, pMiddle2, p2];

                    svg.datum(bezeire).append("path").attr("transform", "translate(" + margin.left + "," + margin.top + ")").style("opacity", 0.3).attr("class", "line" + I).attr("d", line);
                }
            });
        });
    };

    function percent(arr, factor) {
        var newArr = [];
        arr.forEach(function (e, i, arr) {
            newArr[i] = {
                x: e.x,
                y: e.y * factor
            };
        });
        return newArr;
    }

    d3.range(0, 1, 0.02).forEach(function (e, i) {
        var percent1 = percent(lineData1, e),
            percent2 = percent(lineData2, e);

        var Ripple = [percent1, percent2];
        curveRipple(Ripple);
    });

    //  draw symbol
    function reduce(arr) {
        var newArr = clone2(arr);
        newArr.pop();
        newArr.shift();
        return newArr;
    }

    var dotArr1 = reduce(lineData1);
    var dotArr2 = reduce(lineData2);

    svg.selectAll(".dot").data([].concat(dotArr1, dotArr2)).enter().append("circle").attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("class", "dot").attr("cx", line.x()).attr("cy", line.y()).attr("r", 3.5);

    // legend
    var y1Destiny = lineData1.pop();
    var y2Destiny = lineData2.pop();

    var y1pixel = parseFloat(line([y1Destiny]).match(/,(\d|\.)+\Z/gi)[0].slice(1, -1));
    var y2pixel = parseFloat(line([y2Destiny]).match(/,(\d|\.)+\Z/gi)[0].slice(1, -1));

    ['检测值', '标准值'].forEach(function (e, i) {

        g.append('text').attr('transform', function (d) {
            return e === '标准值' ? 'translate(880,' + (y1pixel + 7) + ')' : 'translate(880,' + (y2pixel + 7) + ')';
        }).attr('class', 'text' + i).text(function (d) {
            return e;
        });
    });
}

var baseConf = {
    'XXX': 0.08,
    '胆固醇': 0.17,
    '饱和脂肪酸': 0.2,
    '不饱和脂肪酸': 0.1,
    'YYY脂肪酸': 0.05,
    '鞘脂类': 0.4
};

var d3$1 = Object.assign({}, D3, require('d3-array'), require('d3-shape'), require('d3-format'), require('d3-request'), require('d3-drag'), require('d3-color'), require('d3-scale'));

function intakeFiberStruct(parrent, config) {

    var input = config || baseConf;

    var max = 350,
        min = 110,
        d = (max - min) / 4;

    var colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

    var labels = Object.keys(input);
    labels.sort(function (a, b) {
        return input[a] - input[b];
    });

    var data = Object.values(input);

    // detect browser canvas api
    if (!parrent.querySelector("canvas")) {
        parrent.appendChild(document.createElement("canvas"));
    }

    var canvas = parrent.querySelector("canvas"),
        context = canvas.getContext("2d");

    canvas.width = 1200;
    canvas.height = 900;

    var width = canvas.width,
        height = canvas.height;
    var radius = Math.min(width, height) / 2;

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

    var radius = [d3$1.range(min, min + d, 10), d3$1.range(min + d, min + 2 * d, 10), d3$1.range(min + 2 * d, min + 3 * d, 10), d3$1.range(min + 3 * d, min + 4 * d + 10, 10)];

    context.globalAlpha = 0.8;
    radius.forEach(function (e, i) {
        context.strokeStyle = 'steelblue';
        radius[i].forEach(function (e2, i2) {
            context.setLineDash([4, 5]);

            var arc = d3$1.arc().outerRadius(e2).innerRadius(0).startAngle(0).endAngle(Math.PI * 2).context(context);

            context.beginPath();
            arc();

            context.stroke();
        });
    });
    context.restore();

    // draw arcs
    context.save();

    var arcs = d3$1.pie()(data);

    arcs.sort(function (a, b) {
        return a.value - b.value;
    });

    var arc = d3$1.arc().innerRadius(min).context(context);

    arcs.forEach(function (E, I) {
        context.beginPath();

        I > 3 ? context.strokeStyle = 'seagreen' : context.strokeStyle = 'steelblue';

        d3$1.range(min, min + 210 - I * 30, 10).map(function (e, i) {
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

    var radialLine = d3$1.radialLine().curve(d3$1.curveLinear).context(context);

    var line = d3$1.line().curve(d3$1.curveLinear).context(context);

    function generateRL(angle) {
        return [[angle, min], [angle, max + 50]];
    }

    function generateXY(angle) {
        var extend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

        // coordiantes convention   RL => XY
        angle = Math.PI / 2 - angle;

        var onOff = (max + 50) * Math.cos(angle) >= 0;

        return [[(max + 50) * Math.cos(angle), -(max + 50) * Math.sin(angle)], [(max + 50) * Math.cos(angle) + (onOff ? extend : -extend), -(max + 50) * Math.sin(angle)]];
    }

    arcs.forEach(function (e, i) {

        context.beginPath();
        var lengendsRL = generateRL(e.startAngle + 0.2);
        var lengendsXY = generateXY(e.startAngle + 0.2, 50);

        radialLine(lengendsRL);
        line(lengendsXY);
        context.stroke();

        context.direction = lengendsXY[1][0] > 0 ? 'ltr' : 'rtl';
        context.fillText(labels[i], lengendsXY[1][0], lengendsXY[1][1]);
    });

    context.restore();
}

var baseConf$1 = {
    "score": 46.7,
    "data": {
        "低聚果糖": {
            "value": 0.4,
            "en": "Fructo-oligosaccharide"
        },
        "低聚异麦芽糖": {
            "value": 0.6,
            "en": "Isomalto-oligosaccharide"
        },
        "𝜷-葡聚糖": {
            "value": 0.3,
            "en": "𝜷-glucan"
        },
        "葡甘露聚糖": {
            "value": 0.2,
            "en": "Glucomammam"
        },
        "抗性麦芽糊精": {
            "value": 0.9,
            "en": "Resistant malyodextrins"
        },
        "氨糖": {
            "value": 0.5,
            "en": "Glucosamine"
        },
        "饱和脂肪酸": {
            "value": 0.3,
            "en": "Saturated fat"
        },
        "不饱和脂肪酸": {
            "value": 0.8,
            "en": "Unsaturated fat"
        },
        "鞘脂类": {
            "value": 0.77,
            "en": "Sphingolipid"
        },
        "胆汁酸": {
            "value": 0.12,
            "en": "Bile acid"
        },
        "胆红素": {
            "value": 0.34,
            "en": "Bilirubin"
        },
        "胆固醇": {
            "value": 0.96,
            "en": "Cholestreol"
        },
        "淀粉": {
            "value": 0.43,
            "en": "Starch"
        },
        "膳食纤维": {
            "value": 0.213,
            "en": "Dietary fiber"
        }
    }
};

function bend(ctx, text, r) {
    ctx.save();
    if (r >= -370) {
        ctx.font = "10px adad";
        ctx.rotate(-0.015 * text.length / 2 - 0.02);
    } else {
        ctx.rotate(-0.04 * text.length / 2 - 0.02);
    }

    for (var i = 0; i < text.length; i++) {
        ctx.rotate(r >= -370 ? 0.018 : 0.04);
        ctx.fillText(text[i], 0, r);
    }

    ctx.restore();
}

var d3$2 = Object.assign({}, D3, require('d3-format'), require('d3-request'), require('d3-array'), require('d3-drag'), require('d3-color'), require('d3-shape'), require('d3-scale'));

function scoreLevel() {
    var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var config = arguments[1];

    /**
     * [function description]
     * @param  {[type]} factor [description]
     * @return {[type]}        [description]
     */
    Array.prototype.scale = function (factor, config) {
        var newArr = [];
        this.forEach(function (e, i, arr) {
            newArr[i] = [e[0], min + (e[1] - min) * factor];
        });
        return newArr;
    };

    var input = config || baseConf$1;

    var max = 350;
    var min = 150;
    var colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

    var labels = Object.keys(input.data);
    var values = Object.values(input.data).map(function (e, i) {
        return e.value;
    });

    // detect browser canvas api
    if (parent.querySelector("canvas") === null) {
        var canvas = document.createElement("canvas");
        parent.appendChild(canvas);
    }

    var context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 900;

    var width = canvas.width,
        height = canvas.height,
        radius = Math.min(width, height) / 2;

    context.translate(width / 2, height / 2 + 30);

    context.save();

    // draw text & number
    context.save();
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
    context.save();
    // context.rotate(-Math.PI / 10)

    var radius = [];
    radius.push(d3$2.range(150, 200, 10));
    radius.push(d3$2.range(200, 250 + 10, 10));
    radius.push(d3$2.range(250, 300 + 10, 10));
    radius.push(d3$2.range(300, 350 + 10, 10));

    context.globalAlpha = 0.3;
    radius.forEach(function (e, i) {
        context.strokeStyle = colors[i];
        radius[i].forEach(function (e2, i2) {
            i2 > 4 || i2 < 1 ? context.setLineDash([10, 0]) : context.setLineDash([2, 4]);

            var arc = d3$2.arc().outerRadius(e2).innerRadius(0).startAngle(0)
            // .padAngel(1)
            .endAngle(Math.PI * 2).context(context);

            context.beginPath();
            arc();

            context.stroke();
        });
    });
    // context.rotate(Math.PI/7)
    context.restore();

    // first cicle layer  to be optimised later 2017.4.20
    context.save();
    context.strokeStyle = 'seagreen';
    context.globalAlpha = 0.7;
    context.setLineDash([4, 0]);

    context.beginPath();
    d3$2.arc().outerRadius(140).innerRadius(0).startAngle(0).endAngle(Math.PI * 2).context(context)();

    context.stroke();
    context.restore();

    // draw curve
    context.save();
    var curveLineData = [];
    var axisLineData = [];
    var pi = Math.PI;
    context.globalAlpha = 0.9;

    values.map(function (e, i) {
        var r = d3$2.scaleLinear().domain([0, 1]).range([min, max]);

        var point = [2 * pi / labels.length * i, r(e)];

        curveLineData.push(point);
    });

    var radial = d3$2.radialLine().curve(d3$2.curveCatmullRomClosed.alpha(0.9)).context(context);

    context.setLineDash([5, 0]);
    // context.shadowBlur = 1;
    context.strokeStyle = "seagreen";
    context.shadowColor = "seagreen";
    context.beginPath();
    radial(curveLineData);
    context.stroke();
    // context.rotate(Math.PI / 2)
    context.restore();

    // draw internal bundle curve
    context.save();
    context.strokeStyle = "seagreen";

    context.beginPath();
    context.globalAlpha = 0.3;
    d3$2.range(0, 1, 0.04).forEach(function (e, i) {
        radial(curveLineData.scale(e));
    });
    context.stroke();
    context.restore();

    // draw a axis line
    context.save();
    context.beginPath();
    context.lineWidth = 2;
    var bundaryPoints = [];

    context.strokeStyle = 'salmon';
    context.lineWidth = 1;

    var innerborder = axisLineData;
    var outerborder = axisLineData.map(function (e) {
        return e.scale(2.33);
    });

    var axis = d3$2.radialLine().context(context);

    d3$2.range(0, 2 * Math.PI, 2 * pi / labels.length).forEach(function (e, i) {
        var r = d3$2.scaleLinear().domain([0, 1]).range([min, max]);
        var startPoint = [2 * pi / labels.length * i, r(0)];
        var endPoint = [2 * pi / labels.length * i, r(1)];
        axis([startPoint, endPoint]);
    });
    context.stroke();
    context.restore();

    // draw points
    context.save();
    context.strokeStyle = 'seagreen';
    context.lineWidth = 2;
    context.fillStyle = 'seagreen';

    var points = d3$2.symbol().size(20).context(context);

    context.beginPath();
    curveLineData.forEach(function (d, i) {
        context.save();
        context.translate(d[1] * Math.sin(d[0]), -d[1] * Math.cos(d[0]));
        points();
        context.restore();
    });

    context.stroke();
    context.fill();
    context.restore();

    // context.rotate(pi / 2)

    // label
    context.save();
    context.strokeStyle = 'salmon';
    context.lineWidth = 4;
    context.textAlign = 'center';
    context.fillStyle = 'seagreen';

    context.beginPath();

    context.font = "16px adad";
    labels.forEach(function (e, i) {

        context.save();

        // if (i === 0||i===1) {
        context.rotate(pi * 2 / labels.length * i);
        // context.fillText(e, 0, -400);
        bend(context, e, -400);

        // context.fillText(input.data[e].en, 0, -370);
        bend(context, input.data[e].en, -370);
        // }

        context.restore();
    });

    context.restore();
}

var intakeFatProportionConfig = {
    'sature': 42,
    'unsature': 58
};

var intakeFatDeviationConfig = {
    'standard': 0.5,
    'data': {
        '饱和脂肪酸': 0.8739,
        '不饱和脂肪酸': 0.1498,
        '鞘脂类': 0.3483,
        '胆固醇': 0.5705
    }
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var d3$4 = Object.assign({}, D3, require('d3-shape'), require('d3-format'), require('d3-axis'), require('d3-selection'), require('d3-color'), require('d3-scale'));

//x,y may depend on the context tranlate origin
var vestConfig = [{
    x: 0,
    y: -310
}, {
    x: -14,
    y: -280
}, {
    x: -21,
    y: -272
}, {
    x: -30,
    y: -264
}, {
    x: -90,
    y: -234
}, {
    x: -110,
    y: -224
}];

function onion(context) {
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['seagreen', 'steelblue'];
    var vest = arguments[2];


    var vestData = vest || vestConfig;

    var mirrorVestData = vestData.map(function (e, i) {
        return {
            x: -e.x,
            y: e.y
        };
    });

    var curve = d3$4.line().x(function (d) {
        return d.x;
    }).y(function (d) {
        return d.y;
    }).curve(d3$4.curveCatmullRom.alpha(1)).context(context);

    // lefthand
    context.save();
    context.lineWidth = 2;
    context.strokeStyle = color[0];
    context.beginPath();

    curve(vestData);
    context.stroke();

    context.restore();

    // righthand
    context.save();
    context.lineWidth = 2;
    context.strokeStyle = color[1];
    context.beginPath();

    curve(mirrorVestData);
    context.stroke();

    context.restore();

    // lefthand erase arc
    context.save();
    // context.lineWidth = 3;
    context.strokeStyle = color[1];
    context.fillStyle = '#fff';
    context.beginPath();

    curve([].concat(toConsumableArray(vestData), [{
        x: 0,
        y: -200
    }]));
    context.fill();

    context.restore();

    // righthand erase arc
    context.save();
    // context.lineWidth = 3;
    context.strokeStyle = color[1];
    context.fillStyle = '#fff';
    context.beginPath();

    curve([].concat(toConsumableArray(mirrorVestData), [{
        x: -50,
        y: -190
    }]));
    context.fill();

    context.restore();
}

// gt 6     vs >=6
function onionGt6(context) {
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['seagreen', 'steelblue'];
    var arr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['left', 'right'];
    var vest = arguments[3];


    var vestData = vest || vestConfig;

    var mirrorVestData = vestData.map(function (e, i) {
        return {
            x: -e.x,
            y: e.y
        };
    });

    var curve = d3$4.line().x(function (d) {
        return d.x;
    }).y(function (d) {
        return d.y;
    }).curve(d3$4.curveCatmullRom.alpha(1)).context(context);

    // lefthand
    function lefthand() {
        context.save();
        context.lineWidth = 2;
        context.strokeStyle = color[0];
        context.beginPath();

        curve(vestData);
        context.stroke();

        context.restore();
    }

    // righthand
    function righthand() {
        context.save();
        context.lineWidth = 2;
        context.strokeStyle = color[1];
        context.beginPath();

        curve(mirrorVestData);
        context.stroke();

        context.restore();
    }

    arr.length === 2 && lefthand() && righthand();
    if (arr.length === 1) {
        arr[0] == 'left' ? lefthand() : righthand();
    }

    // lefthand()
    // righthand()


    // lefthand erase arc
    context.save();
    // context.lineWidth = 3;
    context.strokeStyle = color[1];
    context.fillStyle = '#fff';
    context.beginPath();

    curve([].concat(toConsumableArray(vestData), [{
        x: 0,
        y: -200
    }]));
    context.fill();

    context.restore();

    // righthand erase arc
    context.save();
    // context.lineWidth = 3;
    context.strokeStyle = color[1];
    context.fillStyle = '#fff';
    context.beginPath();

    curve([].concat(toConsumableArray(mirrorVestData), [{
        x: 0,
        y: -200
    }]));
    context.fill();

    context.restore();
}

/**
 * [gt6 description]  
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */

var p0 = [0, 310];
var p2 = [Math.PI, 310];

function gt6(context) {
    var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [p0, p2];
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'seagreen';
    var gt6 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return function () {

        var curve = d3$4.radialLine().curve(d3$4.curveCatmullRom.alpha(0.7)).context(context);

        var p0 = arr[0];
        var p2 = arr[1];

        //value 250 is the radius3 in intake-fat-proportion
        var p1 = void 0;
        if (gt6) {
            p1 = [(p0[0] + p2[0]) / 2, 250 + 2];
        } else {
            p1 = [(0 + p2[0]) / 2, 250 + 2];
        }

        arr.splice(1, 0, p1);
        console.log(arr);

        context.save();
        // context.lineWidth = 3;
        context.strokeStyle = color;
        context.fillStyle = '#fff';
        context.beginPath();

        curve(arr);

        context.fill();
        context.stroke();

        context.restore();
    }();
}

var d3$3 = Object.assign({}, D3, require('d3-shape'), require('d3-format'), require('d3-axis'), require('d3-selection'), require('d3-color'), require('d3-scale'));

function intakeFatProportion(parrent, config) {
    // max is the most outside
    // max-25 is the second
    // 310 is the 3rd
    // radius3 is the 4th
    var max = 350;
    var min = 110;
    var d = (max - min) / 6;

    var radius3 = 250;
    var rippleRadius = 310;

    var colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

    var input = config || intakeFatProportionConfig;

    var data = Object.values(input);

    var vsTmp = data[1] / data[0];
    // let vs = (vsTmp >= 1 ? vsTmp : 1 / vsTmp);
    var vs = vsTmp;

    /**
     * detect browser canvas api
     * @param  {[type]} !parrent.querySelector('canvas') [description]
     * @return {[type]}                                  [description]
     */
    if (!parrent.querySelector('canvas')) {
        var canvas = document.createElement('canvas');
        parrent.appendChild(canvas);
    }

    var context = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 800;

    var width = canvas.width,
        height = canvas.height,
        radius = Math.min(width, height) / 2;

    context.translate(width / 2, height / 2);

    // context.transform(1,1,0,1,0,0)

    context.save();

    var arcs = [{
        'data': data[0],
        'endAngle': Math.PI * 2,
        'startAngle': Math.PI * 2 * (data[1] / (data[0] + data[1])),
        'index': 0,
        'value': data[0]
    }, {
        'data': data[1],
        'startAngle': 0,
        'endAngle': Math.PI * 2 * (data[1] / (data[0] + data[1])),
        'index': 1,
        'value': data[1]
    }];

    /**
     * two circles layers most outside
     */
    context.save();
    context.setLineDash([4, 0]);
    context.globalAlpha = 0.7;

    var circle = d3$3.arc().startAngle(0).endAngle(2 * Math.PI).innerRadius(0).context(context);

    var radius = [max - 25, max];
    radius.forEach(function (E, I) {
        context.lineWidth = I === 0 ? 2 : 10;
        if (I === 1) {
            context.setLineDash([4, 0]);
        }

        var arc = d3$3.arc().innerRadius(E).outerRadius(E).padAngle(0.02).context(context);

        arcs.forEach(function (e, i) {
            if (I === 0) {

                if (i === 0) {
                    context.setLineDash([5, 10]);
                } else {
                    context.setLineDash([5, 10]);
                    // context.setLineDash([5 * vs, 10 * vs])
                }
            }

            context.save();
            context.strokeStyle = i === 0 ? 'seagreen' : 'steelblue';

            context.beginPath();
            arc(e);
            context.stroke();

            context.restore();
        });
    });
    context.restore();

    /**
     * draw two circle attached
     */
    context.save();
    var cornerRadius = 8;
    context.lineWidth = 15;

    context.fillStyle = '#fff';
    arcs.forEach(function (d, i) {
        context.beginPath();
        context.strokeStyle = i === 1 ? 'seagreen' : 'steelblue';

        corner(d.endAngle + 0.025, max, -1);
        context.stroke();
        context.fill();
    });

    // move corner circle
    function corner(angle, radius, sign) {
        context.save();
        context.translate(sign * cornerRadius * Math.cos(angle) + Math.sqrt(radius * radius - cornerRadius * cornerRadius) * Math.sin(angle), sign * cornerRadius * Math.sin(angle) - Math.sqrt(radius * radius - cornerRadius * cornerRadius) * Math.cos(angle));
        circle.outerRadius(cornerRadius - 1.5)();
        context.restore();
    }

    context.restore();

    /**
     * draw arcs
     */
    context.save();

    var radius3 = 250;

    var arc = d3$3.arc().innerRadius(0).context(context);

    arcs.forEach(function (E, I) {
        context.beginPath();
        context.strokeStyle = I === 0 ? 'seagreen' : 'steelblue';

        arc.outerRadius(radius3)(E);
        context.stroke();
    });

    context.restore();

    /**
     * draw onion curve   =>  two sharp corner
     */

    var twoSharpPoint = [[Math.PI * 2, 310], [arcs[0].startAngle, 310]];

    // console.log(twoSharpPoint)

    if (vs < 1 / 6) {

        context.save();
        context.beginPath();

        onionGt6(context, ['seagreen', 'steelblue'], ['left']);
        context.restore();

        context.save();
        context.rotate(arcs[1].endAngle);
        onionGt6(context, ['steelblue', 'seagreen'], ['right']);

        context.restore();

        gt6(context, twoSharpPoint, 'steelblue', false);
    } else if (vs > 6) {

        context.save();
        context.beginPath();

        onionGt6(context, ['seagreen', 'steelblue'], ['right']);
        context.restore();

        context.save();
        context.rotate(arcs[1].endAngle);
        onionGt6(context, ['steelblue', 'seagreen'], ['left']);

        context.restore();

        gt6(context, twoSharpPoint, 'seagreen', true);
    } else {

        context.save();
        context.beginPath();

        onion(context, ['seagreen', 'steelblue']);
        context.restore();

        context.save();
        context.rotate(arcs[1].endAngle);
        // console.log(arcs[0].startAngle)
        onion(context, ['steelblue', 'seagreen']);
        context.restore();
    }

    /**
     * vertices and Interval ripple lines
     */
    context.save();
    context.strokeStyle = '#2aa198';
    context.lineWidth = 2;

    var rippleRadius = 310;
    var vertices = [[arcs[0].startAngle, rippleRadius], [arcs[1].startAngle, rippleRadius]];

    var theta = arcs[0].startAngle - Math.PI;

    //  generate vertical lines
    function vertical(theta, num, radius3) {
        var arr = [];

        arr.push([theta / 2 + Math.PI / 2, 0]);

        [].concat(toConsumableArray(Array(num))).map(function (e, i) {
            arr.push([theta / 2 + Math.PI / 2, radius3 * (i + 1) / num]);
            arr.push([theta / 2 + Math.PI / 2, -radius3 * (i + 1) / num]);
        });

        return arr;
    }

    var verticalArr = vertical(theta, 25, radius3);
    // verticalArr.sort((a, b) => (a[1] - b[1]))


    // vertices tangent 1st
    var theta2_1 = Math.acos(radius3 / rippleRadius);
    var theta2_2 = 2 * Math.PI - Math.acos(radius3 / rippleRadius);

    // vertices tangent 1st
    var theta3_1 = Math.PI - (theta2_1 - theta);
    var theta3_2 = theta + theta2_1 + Math.PI;

    //central polygon
    var centralPolygon = [[arcs[0].endAngle, rippleRadius], [0, 0], [arcs[1].endAngle, rippleRadius]];

    var radialLine = d3$3.radialLine().curve(d3$3.curveLinear).context(context);

    var radialCurve = d3$3.radialLine().curve(d3$3.curveCatmullRom.alpha(0.5)).context(context);

    var line = d3$3.line().curve(d3$3.curveLinear).context(context);

    context.beginPath();

    // radialLine(vertices)
    // radialLine(verticalArr)
    radialLine(centralPolygon);

    context.stroke();

    context.save();

    verticalArr.forEach(function (e, i) {
        // context.save()

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
            e[1] > 0 ? radialCurve([vertices[1], [theta2_1, radius4], e, [theta3_1, radius4], vertices[0]]) : radialCurve([vertices[0], [theta3_2, radius4], e, [theta2_2, radius4], vertices[1]]);
        } else {

            radialLine([vertices[0], e, vertices[1]]);
        }

        // context.stroke()
        // context.restore()
    });

    context.restore();

    /**
     * draw text & number
     */
    context.save();
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.globalAlpha = 0.4;

    context.fillStyle = 'black';
    context.font = '144px adad';
    context.fillText(data[0] + ':' + data[1], 0, 0);
    context.restore();
}

function intakeFatDeviation(parrent, config) {

    var input = config || intakeFatDeviationConfig;

    var labels = Object.keys(input.data);
    var data = Object.values(input.data);

    // detect svg or canvas
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '1000');
    svg.setAttribute('height', '500');
    parrent.append(svg);

    var svg = d3$3.select('svg'),
        margin = { top: 20, right: 40, bottom: 50, left: 200 },
        width = +svg.attr('width') - margin.left - margin.right,
        height = +svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var formatNumber = d3$3.format('.2f');

    // define basic location Axis
    var x = d3$3.scaleLinear().domain([0, 5]).range([height, 0]);

    var y = d3$3.scaleLinear().domain([0, 4 + 0.3]).range([0, width]);

    var xAxis = d3$3.axisLeft(x).ticks(5).tickSize(-width).tickFormat(function (d) {
        return labels[d - 1];
    });

    var yAxis = d3$3.axisBottom(y).ticks(4).tickSize(-height).tickFormat(function (d, i) {
        if (i === 2) return '标准值';
        return d * 25;
    });

    g.append('g').attr('class', 'axis axis--x')
    // .attr('transform', 'translate(0,0)')
    .call(customXAxis);

    g.append('g').attr('class', 'axis axis--y').attr('transform', 'translate(0,' + height + ')').call(customYAxis);

    function customXAxis(g) {
        g.call(xAxis);
        g.select('.domain').remove();
        g.selectAll('.tick:not(:first-of-type) line').attr('stroke', '#fff');
        g.selectAll('.tick text').attr('x', -24).attr('dy', 4);
    }

    function customYAxis(g) {
        g.call(yAxis);
        g.select('.domain').remove();
        g.selectAll('.tick:not(:first-of-type) line').attr('stroke', '#ccc');
        g.selectAll('.tick:nth-child(3) line').attr('stroke', 'seagreen').attr('stroke-width', '3').attr('opacity', '0.6');
        g.selectAll('.tick:nth-child(3) text').style('font-family', 'adad').style('font-size', '20px').style('fill', 'seagreen');

        g.selectAll('.tick text').attr('x', 4).attr('dy', 24);
    }

    //  draw bar 
    var barH = 26;

    var bar = g.selectAll('g.bar').data(data).enter().append('g').attr('class', 'bar').attr('transform', function (d, i) {
        return 'translate(0,' + (x(i + 1) - barH / 2) + ')';
    });

    var barLine1 = d3$3.line().defined(function (d) {
        return d;
    }).x(function (d) {
        return d[0];
    }).y(function (d) {
        return d[1];
    }).curve(d3$3.curveLinear);

    var barLine2 = d3$3.line().defined(function (d) {
        return d;
    }).x(function (d) {
        return d[1];
    }).y(function (d) {
        return d[0];
    }).curve(d3$3.curveLinear);

    var rect = bar.append('rect').attr('width', function (d) {
        return y(d * 4) + barH / 2;
    }).attr('stroke-width', '3').attr('rx', barH / 2).attr('ry', barH / 2).attr('transform', 'translate(' + -barH / 2 + ',0)').attr('stroke', 'steelblue').attr('height', barH);

    bar.attr('clip-path', function (e, i) {
        return 'url(#clip-' + i + ')';
    });

    var clippath = bar.append('clipPath').attr('id', function (d, i) {
        return 'clip-' + i;
    }).append('rect').attr('width', '1000').attr('transform', 'translate(0,-5)').attr('height', '40');

    // bar.append('g').data([
    //         [
    //             [100, 10],
    //             [200, 21]
    //         ],
    //         [
    //             [100, 20],
    //             [200, 21]
    //         ],
    //         [
    //             [100, 30],
    //             [200, 31]
    //         ],
    //         [
    //             [100, 40],
    //             [200, 41]
    //         ]

    //     ])
    //     .append('path')
    //     .attr('stroke', 'steelblue')
    //     .attr('d', barLine1);

    // bar.append('g').data([
    //         [
    //             [100, 10],
    //             [200, 21]
    //         ],
    //         [
    //             [100, 20],
    //             [200, 21]
    //         ],
    //         [
    //             [100, 30],
    //             [200, 31]
    //         ],
    //         [
    //             [100, 40],
    //             [200, 41]
    //         ]

    //     ])
    //     .append('path')
    //     .attr('stroke', 'steelblue')
    //     .attr('d', barLine2);


    bar.append('text').attr('class', 'value').attr('x', function (d) {
        return y(d * 4);
    }).attr('y', 13).attr('dx', 14).attr('dy', barH * 0.3).style('fill', '#000').style('font-size', '26px').style('font-family', 'adad').attr('text-anchor', 'start').text(function (d) {
        return d3$3.format('.2%')(d);
    });
}

var d3$6 = Object.assign({}, D3, require('d3-shape'), require('d3-format'), require('d3-sankey'), require('d3-selection'), require('d3-request'), require('d3-axis'), require('d3-color'), require('d3-scale'));

// factor   1/n


// factor   1/n
function vBezeireArr(Arr, factor) {
    var arr = [];

    Arr.forEach(function (e, i) {
        if (i === Arr.length - 1) return;

        var p1 = e,
            p2 = Arr[i + 1],
            vs = 1 - factor,
            pMiddle1 = { x: p1.x, y: p1.y * vs + p2.y * factor },
            pMiddle2 = { x: p2.x, y: p2.y * vs + p1.y * factor };

        arr.push([p1, pMiddle1, pMiddle2, p2]);
    });

    return arr;
}

//  for polar coordinate system

var curveGraphConfig = {
    'standard': {
        'min': -25,
        '过低': -20,
        '偏低': -10,
        '正常': 0,
        '偏高': 10,
        '过高': 20,
        'max': 25
    },

    'data': {
        '维生素A': 16,
        '维生素B1': 19,
        '维生素B2': -14,
        '维生素B3': -5,
        '维生素B5': -8,
        '维生素B6': 13,
        '维生素B7': 6,
        '维生素B9': -20,
        '维生素B12': 9,
        '维生素C': -16,
        '胡萝卜素': -18,
        '维生素E': -7,
        '牛磺酸': 2,
        '辅酶Q': -7,
        '异黄酮': -21,
        '维生素K': -7
    }
};

var linkGraphConfig = {
    "nodes": [{
        "name": "维生素A"
    }, {
        "name": "维生素B1"
    }, {
        "name": "维生素B2"
    }, {
        "name": "维生素B3"
    }, {
        "name": "维生素B5"
    }, {
        "name": "维生素B6"
    }, {
        "name": "维生素B7"
    }, {
        "name": "维生素B9"
    }, {
        "name": "维生素B12"
    }, {
        "name": "维生素C"
    }, {
        "name": "胡萝卜素"
    }, {
        "name": "维生素E"
    }, {
        "name": "牛磺酸"
    }, {
        "name": "辅酶Q"
    }, {
        "name": "异黄酮"
    }, {
        "name": "维生素K"
    }, {
        "name": "家畜类"
    }, {
        "name": "蔬菜类"
    }, {
        "name": "豆类"
    }, {
        "name": "家禽类"
    }, {
        "name": "水果类"
    }, {
        "name": "人体肠道自主合成"
    }, {
        "name": "坚果类"
    }, {
        "name": "发酵食物类"
    }, {
        "name": "脏器类"
    }, {
        "name": "谷物类"
    }, {
        "name": "奶蛋类"
    }],
    "links": [{
        "source": 0,
        "target": 16,
        "color": "cyan",
        "value": 5
    }, {
        "source": 0,
        "target": 17,
        "color": "cyan",
        "value": 5
    }, {
        "source": 0,
        "target": 21,
        "color": "cyan",
        "value": 5
    }, {
        "source": 1,
        "target": 17,
        "color": "khaki",
        "value": 5
    }, {
        "source": 1,
        "target": 18,
        "color": "khaki",
        "value": 5
    }, {
        "source": 1,
        "target": 21,
        "color": "khaki",
        "value": 5
    }, {
        "source": 2,
        "target": 18,
        "color": "steelblue",
        "value": 5
    }, {
        "source": 2,
        "color": "steelblue",
        "target": 19,
        "value": 5
    }, {
        "source": 2,
        "target": 21,
        "color": "steelblue",
        "value": 5
    }, {
        "source": 3,
        "color": "salmon",
        "target": 19,
        "value": 5
    }, {
        "source": 3,
        "color": "salmon",
        "target": 20,
        "value": 5
    }, {
        "source": 3,
        "target": 21,
        "color": "salmon",
        "value": 5
    }, {
        "color": "orange",
        "source": 4,
        "target": 20,
        "value": 5
    }, {
        "source": 4,
        "target": 21,
        "color": "orange",
        "value": 5
    }, {
        "source": 4,
        "target": 22,
        "value": 5
    }, {
        "source": 5,
        "target": 21,
        "color": "steelblue",
        "value": 5
    }, {
        "source": 5,
        "target": 22,
        "value": 5
    }, {
        "source": 5,
        "target": 23,
        "value": 5
    }, {
        "source": 6,
        "target": 21,
        "color": "steelblue",
        "value": 5
    }, {
        "source": 6,
        "target": 23,
        "value": 5
    }, {
        "source": 6,
        "target": 24,
        "value": 5
    }, {
        "source": 7,
        "target": 21,
        "color": "steelblue",
        "value": 5
    }, {
        "source": 7,
        "target": 24,
        "value": 5
    }, {
        "source": 7,
        "target": 25,
        "value": 5
    }, {
        "source": 8,
        "target": 21,
        "color": "steelblue",
        "value": 5
    }, {
        "source": 8,
        "target": 25,
        "value": 5
    }, {
        "source": 8,
        "target": 17,
        "value": 5
    }, {
        "source": 9,
        "target": 18,
        "value": 5
    }, {
        "source": 9,
        "target": 21,
        "color": "steelblue",
        "value": 5
    }, {
        "source": 9,
        "target": 22,
        "value": 5
    }, {
        "source": 10,
        "target": 17,
        "value": 5
    }, {
        "source": 10,
        "target": 19,
        "value": 5
    }, {
        "source": 10,
        "target": 23,
        "value": 5
    }, {
        "source": 11,
        "target": 23,
        "value": 5
    }, {
        "source": 11,
        "target": 18,
        "value": 5
    }, {
        "source": 11,
        "target": 19,
        "value": 5
    }, {
        "source": 12,
        "target": 22,
        "value": 5
    }, {
        "source": 12,
        "target": 20,
        "value": 5
    }, {
        "source": 12,
        "target": 21,
        "color": "steelblue",
        "value": 5
    }, {
        "source": 13,
        "target": 21,
        "color": "steelblue",
        "value": 5
    }, {
        "source": 13,
        "target": 22,
        "value": 5
    }, {
        "source": 13,
        "target": 19,
        "value": 5
    }, {
        "source": 14,
        "target": 23,
        "value": 5
    }, {
        "source": 14,
        "target": 20,
        "value": 5
    }, {
        "source": 14,
        "target": 21,
        "color": "steelblue",
        "value": 5
    }, {
        "source": 15,
        "target": 25,
        "value": 5
    }, {
        "source": 15,
        "target": 26,
        "value": 5
    }, {
        "source": 15,
        "target": 17,
        "value": 5
    }]
};

var d3$5 = Object.assign({}, D3, require('d3-shape'), require('d3-array'), require('d3-format'), require('d3-sankey'), require('d3-selection'), require('d3-request'), require('d3-axis'), require('d3-color'), require('d3-scale'));

function curveGraph(parent, config) {

    var input = config || curveGraphConfig;

    var axisLabels = Object.keys(input.standard);
    var labels = Object.keys(input.data);
    var data = Object.values(input.data);

    // detect svg or canvas
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '500');
    svg.setAttribute('height', '1500');
    parent.append(svg);

    var margin = {
        top: 50,
        right: 40,
        bottom: 50,
        left: 200
    };

    var svg = d3$5.select('svg'),
        width = +svg.attr('width') - margin.left - margin.right,
        height = +svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var formatNumber = d3$5.format('.2f');

    var filter = svg.append("defs").append("filter").attr("id", "blur").append("feGaussianBlur").attr("stdDeviation", 1);

    // define basic location Axis
    var x = d3$5.scaleLinear().domain([1 - 0.5, 5 + 0.5]).range([0, width]);

    var y = d3$5.scaleLinear().domain([0 - 0.5, 15 + 0.5]).range([0, height]);

    var xAxis = d3$5.axisTop(x).ticks(5).tickSize(-height).tickFormat(function (d, i) {
        return axisLabels[d];
    });

    var yAxis = d3$5.axisLeft(y).ticks(15).tickSize(-width).tickFormat(function (d, i) {
        // if (i === 2) return '标准值'
        return labels[i];
    });

    g.append('g').attr('class', 'axis axis--x')
    // .attr('transform', 'translate(0,0)')
    .call(customXAxis);

    g.append('g').attr('class', 'axis axis--y').call(customYAxis);

    function customXAxis(g) {
        g.call(xAxis);
        g.select('.domain').remove();
        // g.selectAll('.tick:not(:first-of-type) line').attr('stroke', '#fff');
        // text color
        g.selectAll('.tick text').attr('x', 0).attr('dy', -4);
        g.selectAll('.tick:nth-child(4n+1) text').style('font-family', 'adad').style('font-size', '20px').style('fill', 'chocolate');
        g.selectAll('.tick:nth-child(2n) text').style('font-family', 'adad').style('font-size', '20px').style('fill', '#f0c36d');
        g.selectAll('.tick:nth-child(3) text').style('font-family', 'adad').style('font-size', '20px').style('fill', 'seagreen');
        // line color
        g.selectAll('.tick:nth-child(4n+1) line').attr('stroke', 'chocolate').attr('stroke-width', '3');
        g.selectAll('.tick:nth-child(2n) line').attr('stroke-width', '2').attr('stroke', '#f0c36d');
        g.selectAll('.tick:nth-child(3) line').attr('stroke-width', '3').attr('stroke', 'seagreen');

        var text = g.selectAll('.tick text');
        console.log(g);
        console.log(text);

        cloneSelection(g, text, 1);
    }

    function customYAxis(g) {
        g.call(yAxis);
        g.select('.domain').remove();
        g.selectAll('.tick text').remove();
        g.selectAll('.tick line').attr('stroke', 'seagreen').attr('stroke-width', '3').attr('opacity', '0.6');
        g.selectAll('.tick:not(:first-of-type) line').attr('stroke', 'seagreen');
        g.selectAll('.tick:nth-child(1) line').attr('stroke', 'seagreen').attr('stroke-width', '1').attr('opacity', '0.6');
        g.selectAll('.tick:last-child line').attr('stroke', 'seagreen').attr('stroke-width', '1').attr('opacity', '0.6');
    }

    function cloneSelection(appendTo, toCopy, times) {
        toCopy.each(function () {
            for (var i = 0; i < times; i++) {
                var clone = svg.node().appendChild(this.cloneNode(true));
                console.log(clone);
                d3$5.select(clone).attr("class", "clone");
            }
        });
        return appendTo.selectAll('.clone');
    }

    var line = d3$5.line().defined(function (d) {
        return d;
    }).x(function (d) {
        return x(d.x);
    }).y(function (d) {
        return y(d.y);
    }).curve(d3$5.curveBasis);

    // value mapping
    var pointCurve = d3$5.scaleLinear().domain([-25, 25]).range([0.5, 5.5]);

    var lineData = [];

    data.map(function (e, i) {
        lineData.push({
            x: pointCurve(e),
            y: i
        });
    });

    lineData.unshift({
        x: pointCurve(data[0]),
        y: -0.5
    });

    lineData.push({
        x: pointCurve(data[15]),
        y: 15.5
    });

    var lineDataBezeire = vBezeireArr(lineData, 1 / 4);

    g.selectAll('.line').data(lineDataBezeire).enter().append('path').attr("class", "line").style("stroke", "seagreen").attr("stroke-width", 3).attr("fill", "none")
    // .attr("filter", "url(#blur)")
    .attr('d', line);

    // ripple
    // recursive Ripple percent, this will modify obj itself
    function percent(obj, factor) {

        for (var i in obj) {

            if (obj[i].constructor === Array) {
                percent(obj[i], factor);
            } else if (obj[i].constructor === Object) {
                percent(obj[i], factor);
            } else if (obj[i].constructor === Number) {
                i === 'x' && (obj[i] = (obj[i] - 0.5) * factor + 0.5);
            }
        }

        return obj;
    }

    // recursive Ripple minus, this will modify obj itself
    function minus(obj, num) {

        for (var i in obj) {

            if (obj[i].constructor === Array) {
                minus(obj[i], num);
            } else if (obj[i].constructor === Object) {

                minus(obj[i], num);
            } else if (obj[i].constructor === Number) {
                i === 'x' && (obj[i] = num - obj[i]);
            }
        }

        return obj;
    }

    function ripple(g, direction, dataArr) {
        g.append('g').selectAll(direction).data(dataArr).enter().append('path').attr("class", direction).attr("opacity", 0.15).attr("stroke", function (d) {
            return direction === 'left' ? 'salmon' : 'seagreen';
        }).attr("stroke-width", 1).attr("fill", "none").attr('d', line);
    }

    d3$5.range(0, 1, 0.04).forEach(function (e, i) {

        var rippleRight = vBezeireArr(minus(percent(minus(JSON.parse(JSON.stringify(lineData)), 6), e), 6), 1 / 4),
            rippleLeft = vBezeireArr(percent(JSON.parse(JSON.stringify(lineData)), e), 1 / 4);

        ripple(g, 'left', rippleLeft);
        ripple(g, 'right', rippleRight);
    });
}

function linkGraph(parent, config) {

    var margin = {
        top: 20,
        right: 100,
        bottom: 20,
        left: 100
    };

    var input = config || linkGraphConfig;

    var margin = {
        top: 20,
        right: 100,
        bottom: 20,
        left: 100
    };

    var formatNumber = d3$5.format(',.0f'),
        format = function format(d) {
        return formatNumber(d) + ' TWh';
    },
        color = d3$5.scaleOrdinal(d3$5.schemeCategory20);

    // detect svg or canvas
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '800');
    svg.setAttribute('id', 'curveGraph');
    svg.setAttribute('height', '1500');

    parent.append(svg);

    var svg = d3$5.select('svg#curveGraph'),
        width = +svg.attr('width') - margin.left - margin.right - 100,
        height = +svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var formatNumber = d3$5.format('.2f');

    var sankey = d3$5.sankey().nodeWidth(3).nodePadding(40).size([width, height]);

    var path = sankey.link();

    sankey.nodes(input.nodes).links(input.links).layout(1000);

    console.log(input.nodes[16]);
    Array.from(Array(47).keys()).forEach(function (e, i) {
        // console.log(input.links[i])
    });

    var y = d3$5.scaleLinear().domain([0, 9]).range([300, 900]);

    var node = g.append('g').selectAll('.node').data(input.nodes).enter().append('g').attr('class', 'node').attr('transform', function (d, i) {
        if (d.x === 0) {
            return 'translate(' + d.x + ',' + d.y + ')';
        } else {
            var seperation = 0;

            if (i > 21) {
                seperation = 60;
            }
            return 'translate(' + d.x + ',' + (d.y = y(i - 16) + seperation) + ')';
        }
    });
    // .attr('transform', function(d, i) {
    //     return 'translate(' + d.x + ',' + (d.y) + ')';
    // });


    node.append('rect').attr('height', function (d) {
        return d.dy;
    }).attr('width', sankey.nodeWidth()).style('fill', function (d) {
        return d.color = color(d.name.replace(/ .*/, ''));
    })
    // .style('stroke', function(d) {
    //     return d3.rgb(d.color).darker(2);
    // })
    .append('title').text(function (d) {
        return d.name + '\n' + format(d.value);
    });

    // node.append('text')
    //     // .attr('x', -6)
    //     .attr('y', function(d) {
    //         return d.dy / 2;
    //     })
    //     .attr('dy', '.35em')
    //     .attr('dx', (d, i) => (i > 15 ? '2em' : '-2em'))
    //     .attr('text-anchor', (d, i) => {
    //         return i > 15 ? 'start' : 'end'
    //     })
    //     .attr('transform', null)
    //     .text(function(d) {
    //         return d.name;
    //     })
    //     .filter(function(d) {
    //         return d.x < width / 2;
    //     })
    //     .attr('x', 6 + sankey.nodeWidth());


    //  link
    var link = g.append('g').selectAll('.link').data(input.links).enter().append('path').attr('class', 'link').style('fill', 'none').attr('d', path).style('stroke', function (d) {
        return d.color || 'salmon';
    }).style('stroke-width', function (d) {
        return Math.max(1, 3);
        // return Math.max(1, d.dy);
    }).sort(function (a, b) {
        return b.dy - a.dy;
    });

    link.append('title').text(function (d) {
        return d.source.name + ' → ' + d.target.name + '\n' + format(d.value);
    });

    
}

var baseConf$2 = {
    '维生素a': 3,
    '维生素b': 1,
    '维生素c': 1,
    '维生素d': 2,
    '维生素e': 3,
    '维生素f': 2,
    '维生素g': 3,
    '维生素h': 2,
    '维生素i': 1,
    '维生素j': 3,
    '维生素k': 1,
    '维生素l': 1,
    '维生素m': 3,
    '维生素n': 2,
    '维生素o': 1,
    '维生素p': 2
};

function hex2rgba(hex) {
    var c = void 0;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [c >> 16 & 255, c >> 8 & 255, c & 255].join(',') + ',1)';
    }
    throw new Error('Bad Hex');
}

function colorNameToHex(color) {
    var colors = {
        "aliceblue": "#f0f8ff",
        "antiquewhite": "#faebd7",
        "aqua": "#00ffff",
        "aquamarine": "#7fffd4",
        "azure": "#f0ffff",
        "beige": "#f5f5dc",
        "bisque": "#ffe4c4",
        "black": "#000000",
        "blanchedalmond": "#ffebcd",
        "blue": "#0000ff",
        "blueviolet": "#8a2be2",
        "brown": "#a52a2a",
        "burlywood": "#deb887",
        "cadetblue": "#5f9ea0",
        "chartreuse": "#7fff00",
        "chocolate": "#d2691e",
        "coral": "#ff7f50",
        "cornflowerblue": "#6495ed",
        "cornsilk": "#fff8dc",
        "crimson": "#dc143c",
        "cyan": "#00ffff",
        "darkblue": "#00008b",
        "darkcyan": "#008b8b",
        "darkgoldenrod": "#b8860b",
        "darkgray": "#a9a9a9",
        "darkgreen": "#006400",
        "darkkhaki": "#bdb76b",
        "darkmagenta": "#8b008b",
        "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00",
        "darkorchid": "#9932cc",
        "darkred": "#8b0000",
        "darksalmon": "#e9967a",
        "darkseagreen": "#8fbc8f",
        "darkslateblue": "#483d8b",
        "darkslategray": "#2f4f4f",
        "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3",
        "deeppink": "#ff1493",
        "deepskyblue": "#00bfff",
        "dimgray": "#696969",
        "dodgerblue": "#1e90ff",
        "firebrick": "#b22222",
        "floralwhite": "#fffaf0",
        "forestgreen": "#228b22",
        "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc",
        "ghostwhite": "#f8f8ff",
        "gold": "#ffd700",
        "goldenrod": "#daa520",
        "gray": "#808080",
        "green": "#008000",
        "greenyellow": "#adff2f",
        "honeydew": "#f0fff0",
        "hotpink": "#ff69b4",
        "indianred ": "#cd5c5c",
        "indigo": "#4b0082",
        "ivory": "#fffff0",
        "khaki": "#f0e68c",
        "lavender": "#e6e6fa",
        "lavenderblush": "#fff0f5",
        "lawngreen": "#7cfc00",
        "lemonchiffon": "#fffacd",
        "lightblue": "#add8e6",
        "lightcoral": "#f08080",
        "lightcyan": "#e0ffff",
        "lightgoldenrodyellow": "#fafad2",
        "lightgrey": "#d3d3d3",
        "lightgreen": "#90ee90",
        "lightpink": "#ffb6c1",
        "lightsalmon": "#ffa07a",
        "lightseagreen": "#20b2aa",
        "lightskyblue": "#87cefa",
        "lightslategray": "#778899",
        "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0",
        "lime": "#00ff00",
        "limegreen": "#32cd32",
        "linen": "#faf0e6",
        "magenta": "#ff00ff",
        "maroon": "#800000",
        "mediumaquamarine": "#66cdaa",
        "mediumblue": "#0000cd",
        "mediumorchid": "#ba55d3",
        "mediumpurple": "#9370d8",
        "mediumseagreen": "#3cb371",
        "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a",
        "mediumturquoise": "#48d1cc",
        "mediumvioletred": "#c71585",
        "midnightblue": "#191970",
        "mintcream": "#f5fffa",
        "mistyrose": "#ffe4e1",
        "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead",
        "navy": "#000080",
        "oldlace": "#fdf5e6",
        "olive": "#808000",
        "olivedrab": "#6b8e23",
        "orange": "#ffa500",
        "orangered": "#ff4500",
        "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa",
        "palegreen": "#98fb98",
        "paleturquoise": "#afeeee",
        "palevioletred": "#d87093",
        "papayawhip": "#ffefd5",
        "peachpuff": "#ffdab9",
        "peru": "#cd853f",
        "pink": "#ffc0cb",
        "plum": "#dda0dd",
        "powderblue": "#b0e0e6",
        "purple": "#800080",
        "rebeccapurple": "#663399",
        "red": "#ff0000",
        "rosybrown": "#bc8f8f",
        "royalblue": "#4169e1",
        "saddlebrown": "#8b4513",
        "salmon": "#fa8072",
        "sandybrown": "#f4a460",
        "seagreen": "#2e8b57",
        "seashell": "#fff5ee",
        "sienna": "#a0522d",
        "silver": "#c0c0c0",
        "skyblue": "#87ceeb",
        "slateblue": "#6a5acd",
        "slategray": "#708090",
        "snow": "#fffafa",
        "springgreen": "#00ff7f",
        "steelblue": "#4682b4",
        "tan": "#d2b48c",
        "teal": "#008080",
        "thistle": "#d8bfd8",
        "tomato": "#ff6347",
        "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3",
        "white": "#ffffff",
        "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00",
        "yellowgreen": "#9acd32"
    };

    if (typeof colors[color.toLowerCase()] != 'undefined') return colors[color.toLowerCase()];

    return false;
}

function name2rgba(colorName) {
    var hex = colorNameToHex(colorName);
    return hex2rgba(hex);
}

// to be optimized 2017.4.20 fanyer
function addOpacity() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgba(250,128,114,1)';
    var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;

    return str.replace(/[^,]+(?=\))/, alpha.toString());
}

var d3$7 = Object.assign({}, D3, require('d3-shape'), require('d3-format'), require('d3-selection'), require('d3-request'), require('d3-drag'), require('d3-array'), require('d3-color'), require('d3-scale'));

function estimateFiber(parent, config) {

    var input = config || baseConf$2;

    var max = 470,
        min = 110,
        d = (max - min) / 6;

    var colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

    var labels = Object.keys(input);
    var data = Object.values(input);

    // detect browser canvas api
    if (parent.querySelector("canvas") === null) {
        var canvas = document.createElement("canvas");
        parent.appendChild(canvas);
    }

    var context = canvas.getContext("2d");

    canvas.width = 1100;
    canvas.height = 900;

    var width = canvas.width,
        height = canvas.height,
        radius = Math.min(width, height) / 2;

    if (window.devicePixelRatio) {
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.height = height * window.devicePixelRatio * 2;
        canvas.width = width * window.devicePixelRatio * 2;
        context.scale(window.devicePixelRatio * 2, window.devicePixelRatio * 2);
    }

    context.translate(width / 2 + 1, height / 2);

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

    var radius = d3$7.range(min, min + 4 * d + 30, 20);

    radius.forEach(function (e, i) {
        var arc = d3$7.arc().outerRadius(e).innerRadius(0).startAngle(0).endAngle(Math.PI * 2).context(context);

        context.beginPath();
        arc();

        context.stroke();
    });
    context.restore();

    // first cicle layer  to be optimised later 2017.4.20
    context.save();
    context.strokeStyle = 'seagreen';
    context.globalAlpha = 0.7;
    context.setLineDash([4, 0]);

    context.beginPath();
    d3$7.arc().outerRadius(min - 10).innerRadius(0).startAngle(0).endAngle(Math.PI * 2).context(context)();

    context.stroke();
    context.restore();

    // draw arcs
    context.save();
    var arcs = d3$7.pie()(Array.from({ length: 16 }, function (e) {
        return 1;
    }));

    arcs.sort(function (a, b) {
        return a.startAngle - b.startAngle;
    });

    var arc = d3$7.arc().context(context);

    function switchStrokeColor(a) {

        if (a < 75) {
            return 'seagreen';
        } else if (a > 90) {
            return 'salmon';
        } else {
            return 'orange';
        }
    }

    var rHeight = d3$7.scaleLinear().domain([0, 100]).range([min, min + 250]);

    function InMax(a) {
        // switch (a) {
        //     case 1:
        //         return min + 80;
        //     case 2:
        //         return min + 180;
        //     case 3:
        //         return min + 250;
        //     default:
        //         // return min + 180;
        //         return min + 10;
        // }
        return rHeight(a);
    }

    arcs.forEach(function (E, I) {

        // context.strokeStyle = 'rgba(250,128,114,0.05)';
        context.fillStyle = "rgba(255,255,255,1)";
        // context.fillStyle = "rgba(250,128,114,0)";

        var inMax = InMax(data[I]);

        d3$7.range(min, inMax, 6).sort(function (a, b) {
            return b - a;
        }).map(function (e, i, arr) {

            context.save();
            context.beginPath();

            context.setLineDash([10, 0]);
            var strokeColor = switchStrokeColor(data[I]);
            context.strokeStyle = i === 0 ? addOpacity(name2rgba(strokeColor), 1) : addOpacity(name2rgba(strokeColor), 0.5);

            if (i === 0) {
                context.lineWidth = 2;
                arc.outerRadius(e).innerRadius(min)(E);
            } else {
                console.log(context.strokeStyle);
                context.lineWidth = 1;

                // (i===10)&&(arc.outerRadius(e).innerRadius(e)(E));
                arc.outerRadius(e).innerRadius(e)(E);
                // (I === 1) && (i === 10) && (arc.outerRadius(e).innerRadius(min)(E));
                // (I === 1) && (i === 1) && (arc.outerRadius(e).innerRadius(min)(E));
            }

            // (i === 0) && (console.log(arc.outerRadius(e)(E)));
            // (I === 1) && (i === 1) && (console.log(arc.outerRadius(e)(E).split('Z')[0]));
            context.stroke();

            i === 0 && context.fill();
            context.restore();
        });
    });
    context.restore();

    // label
    context.save();
    context.strokeStyle = 'salmon';
    context.lineWidth = 4;
    context.fillStyle = 'seagreen';

    context.beginPath();

    context.font = "16px adad";
    labels.forEach(function (e, i) {

        context.save();
        // 0.03 is for delusion
        context.rotate(Math.PI * 2 / labels.length * i + Math.PI / labels.length - 0.02);
        bend(context, e, -400);

        context.restore();
    });
    context.restore();
}

var d3$9 = Object.assign({}, D3, require('d3-shape'), require('d3-format'), require('d3-array'), require('d3-sankey'), require('d3-selection'), require('d3-request'), require('d3-axis'), require('d3-color'), require('d3-scale'));



// for amount-bile


// for estimate-antibotics
function vPattern1(svg) {
    var inter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [30, 35];
    var percent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 400;

    var ptn = svg.append('defs').append('pattern').attr('id', 'vpattern1').attr('x', '0').attr('y', '0').attr('width', '1').attr('height', '1').selectAll('rect').data(d3$9.range(0, 1, 1 / percent)).enter().append('rect').attr('width', 1).attr('height', 30).attr('x', function (d, i) {
        return d * width;
    }).attr('y', 0).attr('fill', function (d, i) {
        var color = 'orange';
        i < inter[0] && (color = 'seagreen');
        i > inter[1] && (color = 'salmon');
        return color;
    });

    return ptn;
}

//for the professional




// pure w3c svg namespace
function detectSVG(parent, id) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    id && (svg.id = id);

    parent.append(svg);

    return svg;
}

// this will decrease flexible
// for Shisan to use only

var baseConf$3 = {
    top: [{
        x: -7,
        y: 5,
        color: 'seagreen',
        tag: {
            cn: '头孢菌素类',
            en: 'Cephalosporins'
        },
        data: {
            rank: 0.2807,
            median: 117.4241,
            absolute: 59.31948
        },
        direction: 'left'
    }, {
        x: -6,
        y: 7,
        color: 'seagreen',
        tag: {
            cn: '青霉素',
            en: 'Penicillins'
        },
        data: {
            rank: 0.2506,
            median: 128.4729,
            absolute: 61.05134
        },
        direction: 'left'
    }, {
        x: -5,
        y: 8,
        color: 'seagreen',
        tag: {
            cn: '林可酰胺类',
            en: 'Lincosamides'
        },
        data: {
            rank: 0.606,
            median: 383.8253,
            absolute: 441.8302
        },
        direction: 'right'
    }, {
        x: -4,
        y: 6,
        color: 'seagreen',
        tag: {
            cn: '利福霉素类',
            en: 'Rifampins'
        },
        data: {
            rank: 0.0012,
            median: 0,
            absolute: 0
        },
        direction: 'right'
    }, {
        x: -3,
        y: 2,
        color: 'seagreen',
        tag: {
            cn: '多粘霉素类',
            en: 'Polymyxins'
        },
        data: {
            rank: 0.4012,
            median: 4.52788140,
            absolute: 2.895497
        },
        direction: 'right'
    }, {
        x: 1,
        y: 1,
        color: 'orange',
        tag: {
            cn: '碳青霉烯类',
            en: 'Carbapenems'
        },
        data: {
            rank: 0.0012,
            median: 0,
            absolute: 0
        },
        direction: 'left'
    }, {
        x: 2,
        y: 4,
        color: 'orange',
        tag: {
            cn: '糖肽类',
            en: 'Glycopeptides'
        },
        data: {
            rank: 0.5807,
            median: 1.63446,
            absolute: 2.246455
        },
        direction: 'right'
    }, {
        x: 5,
        y: 3,
        color: 'salmon',
        tag: {
            cn: '氨基糖苷类',
            en: 'Aminoglycosides'
        },
        data: {
            rank: 0.7506,
            median: 41.34121,
            absolute: 71.78424
        },
        direction: 'left'
    }],
    bottom: [{
        x: -2,
        y: 1,
        color: 'seagreen',
        tag: {
            cn: 'β-内酰胺',
            en: 'β-lactam'
        },
        data: {
            rank: 0.7265,
            median: 0.08101419,
            absolute: 0.6476569
        },
        direction: 'left'
    }, {
        x: -1,
        y: 3,
        color: 'seagreen',
        tag: {
            cn: '四环类素',
            en: 'Tetracyclines'
        },
        data: {
            rank: 0.5771,
            median: 362.3124,
            absolute: 385.8537
        },
        direction: 'left'
    }, {
        x: 0,
        y: 4,
        color: 'orange',
        tag: {
            cn: '磷霉素类',
            en: 'Fosfomycins'
        },
        data: {
            rank: 0.6590,
            median: 0.3104377,
            absolute: 1.35659
        },
        direction: 'right'
    }, {
        x: 3,
        y: 5,
        color: 'orange',
        tag: {
            cn: '氯霉素类',
            en: 'Chloramphenicois'
        },
        data: {
            rank: 0.0012,
            median: 362.3124,
            absolute: 385.8537
        },
        direction: 'left'
    }, {
        x: 4,
        y: 6,
        color: 'orange',
        tag: {
            cn: '大环内酯类',
            en: 'Macrolides'
        },
        data: {
            rank: 0.4843,
            median: 354.3231,
            absolute: 359.5278
        },
        direction: 'right'
    }, {
        x: 6,
        y: 7,
        color: 'salmon',
        tag: {
            cn: '磺胺类',
            en: 'Sulfonamides'
        },
        data: {
            rank: 0.8795,
            median: 34.39402,
            absolute: 116.4283
        },
        direction: 'left'
    }, {
        x: 7,
        y: 2,
        color: 'salmon',
        tag: {
            cn: '奎诺酮类',
            en: 'Quinolones'
        },
        data: {
            rank: 0.8036,
            median: 0,
            absolute: 0.8209219
        },
        direction: 'right'
    }],
    gap: [0, 4] //gap is the x value of central orange range's start & end, and start must lower than end
};

// usual basic function
var index$1 = function index(s, find) {
    return s.indexOf(find) + 1;
};

// for fast query
var _cache = {};

// extend operator
var _alias = [/@/g, "_e.", /AND/gi, "&&", /OR/gi, "||", /<>/g, "!=", /NOT/gi, "!", /([^=<>])=([^=]|$)/g, '$1==$2'];

var _rQuote = /""/g;
var _rQuoteTemp = /!~/g;

// compile
var _complite = function _complite(code) {
    return eval("0," + code);
};

// convert operator to standard js symbols
var _interpret = function _interpret(exp) {
    exp = exp.replace(_rQuote, "!~");
    var arr = exp.split('"');
    var i,
        n = arr.length;
    var k = _alias.length;

    for (var i = 0; i < n; i += 2) {
        var s = arr[i];
        for (var j = 0; j < k; j += 2) {
            if (index$1(s, _alias[j]) > -1) {
                s = s.replace(_alias[j], _alias[j + 1]);
            }
        }
        arr[i] = s;
    }

    for (var i = 1; i < n; i += 2) {
        arr[i] = arr[i].replace(_rQuoteTemp, '\\"');
    }
    return arr.join('"');
};

// define template function
var _templ = function (_list) {
    var _ret = [];
    var _i = -1;

    for (var _k in _list) {
        var _e = _list[_k];
        if (_e != SQL.prototype[_k]) {
            if ($C) {
                _ret[++_i] = _e;
            }
        }
    }
    return _ret;
}.toString();

// extend Query method
var Query = function Query(exp) {
    if (!exp) {
        return [];
    }

    var fn = _cache[exp];

    try {
        if (!fn) {
            var code = _interpret(exp);
            code = _templ.replace("$C", code);
            fn = _cache[exp] = _complite(code);
        }
        return fn(this.data);
    } catch (e) {
        return [];
    }
};

function SQL(data) {
    this.type = 'SQL';
    this.data = data;
}

function sql(data) {
    return new SQL(data);
}

SQL.prototype = {
    constructor: SQL,
    Query: Query
};

var d3$8 = Object.assign({}, D3, require('d3-shape'), require('d3-format'), require('d3-selection'), require('d3-request'), require('d3-drag'), require('d3-color'), require('d3-scale'));

function EstimateAntibiotics() {
    this.type = 'EstimateAntibiotics';
}

/**
 * @param  {Dom}
 * @param  {Json}
 * @return {[type]}
 */
function init(parent, config) {

    // let input = config ? handleConfig(baseConf, config) : baseConf;
    var input = config || baseConf$3;

    detectSVG(parent);

    var svg = d3$8.select('#' + parent.id + ' svg'),
        margin = { top: 50, right: 600, bottom: 50, left: 630 };

    svg.attr('width', 2700).attr('height', 1200);

    var width = svg.attr('width') - margin.left - margin.right,
        height = svg.attr('height') - margin.top - margin.bottom,
        gTop = svg.append('g').attr('class', 'gTop').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'),
        gBottom = svg.append('g').attr('class', 'gBottom').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // // here set tag vPattern1
    // let gapArr = [
    //     (input.gap[0] + 7) * 40 / 15,
    //     (input.gap[1] + 7) * 40 / 15
    // ];

    // vPattern1(svg, [Math.floor(gapArr[0]), Math.floor(gapArr[1])]);
    vPattern1(svg, [75, 90]);

    // $(parent)
    //     .append($('<div/>', {
    //         id: 'centerDiv',
    //         class: 'centerDiv'
    //     }));

    // const centerDivWidth = parseFloat($('#centerDiv').css('width'));

    // $('#' + parent.id + ' #centerDiv')
    //     .append($('<div/>', {
    //         id: 'div1',
    //         class: 'div1'
    //     }))
    //     .append($('<div/>', {
    //         id: 'div2',
    //         class: 'div2'
    //     }))
    //     .append($('<div/>', {
    //         id: 'div3',
    //         class: 'div3'
    //     }));

    // // let bias=0;


    // $('#centerDiv #div1').css({
    //     'width': 50 * (input.gap[0] + 7)
    // });
    // $('#centerDiv #div2').css({
    //     'width': 50 * (input.gap[1] - input.gap[0] + 1) - 10,
    //     'border-radius': () => {
    //         let str = '';

    //         (input.gap[0] === -7) && (str = '20px 0 0 20px');
    //         (input.gap[1] === 7) && (str = '0 20px 20px 0');
    //         return str;
    //     }
    // });
    // $('#centerDiv #div3').css({
    //     'width': 50 * (7 - input.gap[1])
    // });


    // (input.gap[0] < -7) && (centerDivOne('salmon'));
    // (input.gap[0] > 7) && (centerDivOne('seagreen'));
    // (input.gap[0] <= -7) && (input.gap[1] >= 7) && (centerDivOne('orange'));

    // function centerDivOne(color) {
    //     $('#centerDiv').html('').css({
    //         'width': 744,
    //         'background-color': color
    //         // 'border-radius': '20px 20px 20px 20px'
    //     });

    // }


    var maskHeight = 578;

    // console.log(input.bottom[6])
    // console.log(baseConf.bottom[6])


    input.top.map(function (e, i) {
        // let color = (e.x < input.gap[0] ?
        //     'seagreen' :
        //     (e.x <= input.gap[1] ?
        //         'orange' :
        //         'salmon'));

        copy15('top', e.direction, e.color, e.x, e.y);
    });

    input.bottom.map(function (e, i) {
        // let color = (e.x < input.gap[0] ?
        //     'seagreen' :
        //     (e.x <= input.gap[1] ?
        //         'orange' :
        //         'salmon'));

        copy15('bottom', e.direction, e.color, e.x, e.y);
    });

    /**
     * [clippath description] to mask
     * @type {[type]}
     */
    var clippath = svg.selectAll('.clippath').data([1, 2]).enter().append('clipPath').attr('id', function (d, i) {
        return 'clip-' + i;
    }).append('rect').attr('width', '1420').attr('class', 'clippath').attr('transform', function (d, i) {
        return 'translate(0,' + (540 * i - 20) + ')';
    }).attr('height', maskHeight);

    /**
     * [locate description] sql to locate
     * @param  {[type]} x        [description]
     * @param  {[type]} vertical [description] true means top
     * @return {[type]}          [description]
     */
    function locate(x, vertical) {
        var testArr = input[vertical === true ? 'top' : 'bottom'];
        var match = sql(testArr).Query('@x==' + x);

        return match[0];
    }

    function basicCurve(arr) {
        var postion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
        var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';
        var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'steelblue';
        var dx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        var dy = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
        var base = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1.3;


        var r = 100;

        var dir = direction === 'left' ? 1 : -1;

        var num = postion === 'top' ? 0 : 1;

        var Container = postion === 'top' ? gTop : gBottom;

        var gChild = Container.attr('clip-path', 'url(#clip-' + num + ')').append('g').attr('class', 'pathContainer');

        gChild.selectAll('.basicCurve').data(arr).enter().append('path').attr('d', function (d, i) {
            return 'M0 ' + (margin.top + d.offset) + 'L ' + (width - r) * dir + ' ' + (margin.top + d.offset) + 'A ' + (r - d.offset) + ' ' + (r - d.offset) + ' 0 0 ' + (dir === 1 ? 1 : 0) + '' + (width - d.offset) * dir + ' ' + (margin.top + r) + '\n                    L ' + (width - d.offset) * dir + ' ' + height;
        }).style('stroke', color).style('stroke-opacity', 0.5).attr('class', 'basicCurve').attr('stroke-width', function (d) {
            return d.strokeWidth;
        }).attr('fill', 'none');

        // this  line cause not pure
        var vertical = postion === 'top' ? true : false;
        var key = locate(dx, vertical).tag;
        var data = locate(dx, vertical).data;

        // crossroads offset
        var allX = 100;
        var allY = 0;

        if (direction === 'left' && postion === 'top') {

            gChild.attr('transform', 'translate(' + (-width / 2 + 40 / 2 + dx * (31 * base) - 100 + allX) + ',' + (maskHeight - 140 - dy * 50) + ')');

            // this  line cause not pure
            curveTag(50, 542 - dy * 50, key, data, color);
        } else if (direction === 'right' && postion === 'top') {

            gChild.attr('transform', 'translate(' + (width + width / 2 - 40 / 2 + dx * (31 * base) - 97 + allX) + ',' + (maskHeight - 140 - dy * 50) + ')');

            curveTag(2200, 542 - dy * 50, key, data, color);
        } else if (direction === 'left' && postion === 'bottom') {

            var x = -width / 2 + 40 / 2 + dx * (31 * base) - 100 + allX;
            var y = maskHeight - 390 + dy * 50 - 540;

            gChild.style('transform-origin', '0 500px');
            gChild.style('transform', 'translate(' + x + 'px,' + y + 'px) scaleY(-1)');

            curveTag(50, 615 + dy * 50, key, data, color);
        } else if (direction === 'right' && postion === 'bottom') {

            var _x7 = width + width / 2 - 40 / 2 + dx * (31 * base) - 97 + allX;
            var _y = maskHeight - 390 + dy * 50 - 540;

            gChild.style('transform-origin', '0 500px');
            gChild.style('transform', 'translate(' + _x7 + 'px,' + _y + 'px) scaleY(-1)');

            curveTag(2200, 615 + dy * 50, key, data, color);
        }

        return gChild;
    }

    //Boss's policy


    /**
     * [copy15 description]  15 bio parameters
     * @param  {[type]} pos   [description]
     * @param  {[type]} color [description]
     * @param  {[type]} dx    [description]
     * @param  {[type]} dy    [description]
     * @return {[type]}       [description]
     */
    function copy15(pos, direction, color, dx, dy) {
        var base = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1.3;

        return basicCurve([{
            offset: 0 + 1,
            strokeWidth: base
        }, {
            offset: 3 * base + 1,
            strokeWidth: base
        }, {
            offset: 6 * base + 1,
            strokeWidth: base
        }, {
            offset: 9 * base + 1,
            strokeWidth: base
        }, {
            offset: 12 * base + 1,
            strokeWidth: base
        }, {
            offset: 15 * base + 1,
            strokeWidth: base
        }, {
            offset: 18 * base + 1,
            strokeWidth: base
        }, {
            offset: 21 * base + 1,
            strokeWidth: base
        }, {
            offset: 24 * base + 1,
            strokeWidth: base
        }, {
            offset: 27 * base + 1,
            strokeWidth: base

        }], pos, direction, color, dx, dy);
    }

    // text title
    svg.append('text').attr('text-anchor', 'middle').attr('x', '50.6%').attr('y', '41%').style('fill', 'seagreen').attr('font-size', '36px').attr('font-weight', '400').attr('font-family', 'adad').text('抗生素抗性基因综合评价');

    svg.append('text').attr('text-anchor', 'middle').attr('x', '50.6%').attr('y', '44%').style('fill', 'seagreen').style('font-size', '24').attr('font-family', 'Verdana').text('Evaluation of Antibiotics Intake');

    // text
    var centralText = [{
        color: 'seagreen',
        text: '推荐用药',
        pos: -0.8,
        value: input.gap[0] + 7
    }, {
        color: 'orange',
        text: '谨慎用药',
        pos: 0,
        value: input.gap[1] - input.gap[0] + 1
    }, {
        color: 'salmon',
        text: '警惕用药',
        pos: 0.8,
        value: 7 - input.gap[1]
    }];

    svg.selectAll('.centralText').data(centralText).enter().append('g').attr('class', 'centralText').attr('transform', function (d, i) {
        return 'translate(' + (width / 2 + margin.left - 75 + d.pos * 270) + ',630)';
    }).append('rect').attr('width', 150).attr('height', 50).attr('opacity', 0.6).attr('rx', 25).attr('stroke-width', 3).attr('fill', 'none').style('stroke', function (d, i) {
        return d.color;
    });

    svg.selectAll('g.centralText').append('text').text(function (d, i) {
        return d.text;
    }).attr('x', 75).attr('y', 35).attr('text-anchor', 'middle').attr('stroke-width', 0.5).style('fill', function (d, i) {
        return d.color;
    }).style('font-size', '25px');

    svg.selectAll('g.centralText').append('text').text(function (d, i) {
        return d.value;
    }).attr('x', 75).attr('y', 80).attr('text-anchor', 'middle').attr('stroke-width', 0.5).style('fill', function (d, i) {
        return d.color;
    }).style('font-size', '25px');

    // tag at both sides
    function curveTag() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'seagreen';

        var gTag = svg.append('g').attr('transform', 'translate(' + x + ',' + y + ')');

        gTag.append('rect').attr('width', 400).attr('height', 22).attr('rx', 15).attr('fill', 'url(#vpattern1)').attr('ry', '50%').attr('stroke', 'steelblue').attr('stroke-width', 1);

        gTag.append('text').text('中间值: ' + data.median).style('fill', color).attr('stroke-width', 2).attr('x', 130).attr('dx', 20).attr('y', 35).attr('text-anchor', 'start').attr('alignment-baseline', 'hanging');

        gTag.append('text').text('▼ ' + data.absolute).style('fill', color).attr('stroke-width', 2).attr('x', data.rank * 400 - 28).attr('dx', 20).attr('y', 0).attr('dy', -4).attr('text-anchor', 'start').attr('alignment-baseline', 'baseline');

        var textAlign = x < 1000 ? 400 : -150;
        gTag.append('text').text(text.cn).style('fill', color).attr('stroke-width', 2).attr('x', textAlign).attr('dx', 20).attr('y', 15).attr('text-anchor', 'start').attr('alignment-baseline', 'middle');

        gTag.append('text').text(text.en).style('fill', color).attr('stroke-width', 2).attr('x', textAlign).attr('dx', 20).attr('dy', 20).attr('y', 15).attr('text-anchor', 'start').attr('alignment-baseline', 'middle');

        // rank tag
        var rankAlign = x < 1000 ? 600 : -350;
        gTag.append('text').text('人群排名: ' + d3$8.format('.2%')(data.rank)).style('fill', color).attr('stroke-width', 2).attr('x', rankAlign).attr('dx', 20).attr('y', 20).attr('text-anchor', 'start').attr('alignment-baseline', 'middle');

        var rankRectAlign = x < 1000 ? 580 : -150;

        gTag.append('rect').style('fill', color).attr('x', rankRectAlign).attr('y', -4).attr('width', 3).attr('height', 39);
    }

    // for centralColorRect
    function centralColorRect() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [7, 5, 3];
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.3;

        var color = ['seagreen', 'orange', 'salmon'];

        config.map(function (e, i) {
            e === 0 && color.slice(i, 1);
        });

        svg.selectAll('.centralRect').data(config).enter().append('rect').attr('class', 'centralRect').attr('x', function (d, i) {
            if (i === 0) {
                return 1065;
            }
            if (i === 1) return 1065 + config[i - 1] * (31 * base);
            if (i === 2) return 1065 + (15 - config[i]) * (31 * base);
        }).attr('y', 570).attr('width', function (d, i) {
            return d * (31 * base) - 3;
        }).attr('height', 40).attr('fill-opacity', 0.5).attr('fill', function (d, i) {
            // if(i===0) return color[i]
            return color[i];
            // return 'rgba(255,255,255,0)'
        });
        svg.append('rect').attr('width', 800).attr('x', 1000).attr('y', 566).attr('height', 4).attr('fill', '#fff');
        svg.append('rect').attr('width', 800).attr('x', 1000).attr('y', 610).attr('height', 4).attr('fill', '#fff');
    }

    centralColorRect();
}

function topLeft(argument) {
    // body...
}

function topRight(argument) {
    // body...
}

function bottomRight(argument) {
    // body...
}

function bottomLeft(argument) {
    // body...
}

EstimateAntibiotics.prototype = {
    constructor: estimateAntibiotics,
    init: init,
    topLeft: topLeft,
    topRight: topRight,
    bottomRight: bottomRight,
    bottomLeft: bottomLeft,
    index: ''
};

var estimateAntibiotics = new EstimateAntibiotics();

exports.estimateAntibiotics = estimateAntibiotics;
exports.intakeSugarDistribution = intakeSugarDistribution;
exports.intakeFiberStruct = intakeFiberStruct;
exports.scoreLevel = scoreLevel;
exports.intakeFatProportion = intakeFatProportion;
exports.intakeFatDeviation = intakeFatDeviation;
exports.curveGraph = curveGraph;
exports.linkGraph = linkGraph;
exports.estimateFiber = estimateFiber;

Object.defineProperty(exports, '__esModule', { value: true });

})));
