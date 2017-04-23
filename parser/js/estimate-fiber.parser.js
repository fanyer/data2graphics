const d3 = Object.assign({},
    D3,
    require('d3-format'),
    require('d3-array'),
    require('d3-scale')
);

let f = d3.scaleLinear()
    .domain([])
    .range(p[])

export function parse(rawData) {

  return f(rawData)
}
