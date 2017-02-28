import D3 from 'd3'

d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-sankey'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);


export function curveGraph(parent, config) {
    var input = config || {
        'standard': {
          '过低'：-20,
          '偏低'：-10,
          '正常'：0,
          '偏高'：10,
          '过高'：20,
        },

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
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '1000')
    svg.setAttribute('height', '500')
    parrent.append(svg)

    var svg = d3.select('svg'),
        margin = { top: 20, right: 40, bottom: 50, left: 200 },
        width = +svg.attr('width') - margin.left - margin.right,
        height = +svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var formatNumber = d3.format('.2f');

}



export function linkGraph(parent, config) {


}
