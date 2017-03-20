import D3 from 'd3'
import range from 'd3-array'

d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
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
        .selectAll('.stop').data(range(0, 1, 1 / percent).concat([1]))
        .enert()
        .append('stop')
        .attr('offset', (d, i) => ())

    return filter
}


export function linearGradient(svg, percent = 40) {
    var filter = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'GradientRepeat')
        .selectAll('.stop').data(range(0, 1, 1 / percent).concat([1]))
        .enert()
        .append('stop')
        .attr('offset', (d, i) => ())

    return filter
}

export function fill(svg) {
    var filter = svg.append('defs')
        .append('filter')
        .attr('id', 'blur')
        .append('feGaussianBlur')
        .attr('stdDeviation', 5);

    return filter
}


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
