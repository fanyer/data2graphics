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
            '过低'： - 20,
            '偏低'： - 10,
            '正常'：
            0,
            '偏高'：
            10,
            '过高'：
            20,
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

    const leftLabels = [
        '维生素A',
        '维生素B1',
        '维生素B2',
        '维生素B3',
        '维生素B5',
        '维生素B6',
        '维生素B7',
        '维生素B9',
        '维生素B12',
        '维生素C',
        '胡萝卜素',
        '维生素E',
        '牛磺酸',
        '辅酶Q',
        '异黄酮',
        '维生素K'
    ]
    const rightLabels = [
        '家畜类',
        '蔬菜类',
        '豆类',
        '家禽类',
        '水果类',
        '人体肠道自主合成',
        '坚果类',
        '发酵食物类',
        '脏器类',
        '谷物类',
        '奶蛋类'
    ]



    var margin = {
        top: 20,
        right: 100,
        bottom: 20,
        left: 100
    };

    var formatNumber = d3.format(',.0f'),
        format = function(d) {
            return formatNumber(d) + ' TWh';
        },
        color = d3.scaleOrdinal(d3.schemeCategory20);


    // detect svg or canvas
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '1200')
    svg.setAttribute('id', 'curveGraph')
    svg.setAttribute('height', '1000')

    parent.append(svg)

    var svg = d3.select('svg#curveGraph'),
        width = +svg.attr('width') - margin.left - margin.right - 100,
        height = +svg.attr('height') - margin.top - margin.bottom,
        g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    var formatNumber = d3.format('.2f');


    var sankey = d3.sankey()
        .nodeWidth(15)
        .nodePadding(25)
        .size([width, height]);

    var path = sankey.link();


    d3.json('lib/energy2.json', function(energy) {

        sankey
            .nodes(energy.nodes)
            .links(energy.links)
            .layout(1000);



        console.log(energy.nodes[18])
        Array.from(Array(47).keys()).forEach((e, i) => {
            // console.log(energy.links[i])
        })


        var link = g.append('g').selectAll('.link')
            .data(energy.links)
            .enter().append('path')
            .attr('class', 'link')
            .attr('d', path)
            .style('stroke', (d) => {
                return d.color || 'salmon'
            })
            .style('stroke-width', function(d) {
                // console.log(Math.max(1, d.dy))
                return Math.max(1, 2);
                // return Math.max(1, d.dy);
            })
            .sort(function(a, b) {
                return b.dy - a.dy;
            });


        link.append('title')
            .text(function(d) {

                return d.source.name + ' → ' + d.target.name + '\n' + format(d.value);
            });



        var y = d3.scaleLinear()
            .domain([0, 9])
            .range([300, 800]);


        var node = g.append('g').selectAll('.node')
            .data(energy.nodes)
            .enter().append('g')
            .attr('class', 'node')
            .attr('transform', function(d,i) {
                if (d.x === 0) {
                    return 'translate(' + d.x + ',' + (d.y) + ')';
                } else {
                    return 'translate(' + d.x + ',' + y(i-15) + ')';
                }
            })
            // .call(d3.drag()
            //     .subject(function(d) {
            //         console.log(d)
            //         return d;
            //     })
            //     .on('start', function() {
            //         this.parentNode.appendChild(this);
            //     })
            //     .on('drag', dragmove)
            // );

        node.append('rect')
            .attr('height', function(d) {
                return d.dy;
            })
            .attr('width', sankey.nodeWidth())
            .style('fill', function(d) {
                return d.color = color(d.name.replace(/ .*/, ''));
            })
            .style('stroke', function(d) {
                return d3.rgb(d.color).darker(2);
            })
            .append('title')
            .text(function(d) {
                return d.name + '\n' + format(d.value);
            });

        node.append('text')
            .attr('x', -6)
            .attr('y', function(d) {
                return d.dy / 2;
            })
            .attr('dy', '.35em')
            .attr('dx', '1.35em')
            .attr('text-anchor', (d, i) => {
                return i > 15 ? 'start' : 'end'
            })
            .attr('transform', null)
            .text(function(d) {
                return d.name;
            })
            .filter(function(d) {
                return d.x < width / 2;
            })
            .attr('x', 6 + sankey.nodeWidth())
            .attr('text-anchor', 'start');

        function dragmove(d) {
            console.log(d3.event)
                // d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
                // sankey.relayout();
                // link.attr("d", path);
        }
    });

}