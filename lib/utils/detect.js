import D3 from 'd3'

var d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-array'),
    require('d3-sankey'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-axis'),
    require('d3-color'),
    require('d3-scale')
);


export function linearGradient(svg, percent = 40) {
    var filter = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'GradientRepeat')
        .selectAll('.stop').data(d3.range(0, 1, 1 / percent).concat([1]))
        .enter()
        .append('stop')
        .attr('offset', (d, i) => (d));

    return filter
}

// for general
export function hPattern(svg,color='steelblue',percent = 20, height = 500) {


    let ptn = svg.append('defs')
        .append('pattern')
        .attr('id', 'hpattern-'+color)
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', '600')
        .attr('height', height)
        .selectAll('rect').data(d3.range(0, 1, 1 / percent))
        .enter()
        .append('rect')
        .attr('width', 600)
        .attr('height', 10)
        .attr('y', (d, i) => (d * height))
        .attr('x', 0)
        .attr('fill', color);

    return ptn
};

// for estimate-antibotics
export function vPattern1(svg, inter = [30, 35], percent = 100, width = 400) {
    var ptn = svg.append('defs')
        .append('pattern')
        .attr('id', 'vpattern1')
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', '1')
        .attr('height', '1')
        .selectAll('rect').data(d3.range(0, 1, 1 / percent))
        .enter()
        .append('rect')
        .attr('width', 1)
        .attr('height', 30)
        .attr('x', (d, i) => (d * width))
        .attr('y', 0)
        .attr('fill', (d, i) => {
            let color = 'orange';
            (i < inter[0]) && (color = 'seagreen');
            (i > inter[1]) && (color = 'salmon');
            return color
        });

    return ptn
}


//for the professional
export function vPattern2(svg, percent = 40, width = 27, color = 'steelblue') {
    var ptn = svg.append('defs')
        .append('pattern')
        .attr('id', 'vpattern-' + color)
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', '1')
        .attr('height', '1');

    ptn.append('rect')
        .attr('width', width)
        .attr('fill', color)
        .attr('height', 2);

    ptn.selectAll('rect').data(d3.range(0, 1, 1 / percent).concat(0))
        .enter()
        .append('rect')
        .attr('width', 1)
        .attr('height', 1000)
       
        .attr('x', (d, i) => (d * width + 1))
        .attr('y', 0)
        .attr('fill', (d, i) => {
            return color
        });

    return ptn
}

export function fill(svg) {
    var filter = svg.append('defs')
        .append('filter')
        .attr('id', 'blur')
        .append('feGaussianBlur')
        .attr('stdDeviation', 5);

    return filter
}

// pure w3c svg namespace
export function detectSVG(parent, id) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    (id) && (svg.id = id)

    parent.append(svg)

    return svg
}



export function detectCanvas(parent) {
    // detect browser canvas api
    if (!parent.querySelector('canvas')) {
        var canvas = document.createElement('canvas')
        parent.appendChild(canvas)
    }

    var context = canvas.getContext('2d');
}
