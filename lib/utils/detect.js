import D3 from 'd3'

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


export function filter(svg) {
    var filter = svg.append('defs')
        .append('filter')
        .attr('id', 'blur')
        .append('feGaussianBlur')
        .attr('stdDeviation', 5);

    return filter
}


export function detectSVG(parent, id) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '1000')
    svg.setAttribute('height', '500')
    svg.id = id
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
