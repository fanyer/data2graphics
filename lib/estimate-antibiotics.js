import D3 from 'd3'
import { detectSVG } from './utils/detect'
import { clone } from './utils/clone'
import baseConf from './estimate-default-config'
import { basicCurve } from './estimate-antibiotics/'

var d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);


function EstimateAntibiotics() {
    this.type = 'EstimateAntibiotics';
}



/**
 * @param  {Dom}
 * @param  {Json}
 * @return {[type]}
 */
function init(parent, config) {
    let input = config || baseConf;


    detectSVG(parent);


    let svg = d3.select('#' + parent.id + ' svg'),
        margin = { top: 50, right: 500, bottom: 50, left: 500 };

    svg.attr('width', 2500)
        .attr('height', 1200);

    let width = svg.attr('width') - margin.left - margin.right,
        height = svg.attr('height') - margin.top - margin.bottom,
        gTop = svg.append('g')
        .attr('class', 'gTop')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'),
        gBottom = svg.append('g')
        .attr('class', 'gBottom')
        .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')');


    $(parent)
        .append($('<div/>', {
            id: 'centerDiv',
            class: 'centerDiv'
        }));


    $('#' + parent.id + ' #centerDiv')
        .append($('<div/>', {
            id: 'div2',
            class: 'div2'
        }))
        .append($('<div/>', {
            id: 'div3',
            class: 'div3'
        }));

    const centerDivWidth = parseFloat($('#centerDiv').css('width'));


    const maskHeight = 578;





    baseConf.top.map((e, i) => {
        let color = (e.x < baseConf.gap[0] ?
            'seagreen' :
            (e.x <= baseConf.gap[1] ?
                'orange' :
                'salmon'));

        copy15('top', e.direction, color, e.x, e.y)
    })


    baseConf.bottom.map((e, i) => {
        let color = (e.x < baseConf.gap[0] ?
            'seagreen' :
            (e.x <= baseConf.gap[1] ?
                'orange' :
                'salmon'));

        copy15('bottom', e.direction, color, e.x, e.y)
    })





    /**
     * [clippath description]
     * @type {[type]}
     */
    var clippath = svg.selectAll('.clippath')
        .data([1, 2]).enter().append('clipPath')
        .attr('id', (d, i) => {
            return 'clip-' + i
        })
        .append('rect')
        .attr('width', '1420')
        .attr('class', 'clippath')
        .attr('transform', (d, i) => ('translate(0,' + (525 * i - 20) + ')'))
        .attr('height', maskHeight);





    function basicCurve(arr, postion = 'top', direction, color = 'steelblue', dx = 0, dy = 0) {

        let r = 100

        let dir = (direction === 'left' ? 1 : -1)

        let num = (postion === 'top' ? 0 : 1)

        let Container = (postion === 'top' ? gTop : gBottom);

        let gChild = Container
            .attr('clip-path', 'url(#clip-' + num + ')')
            .append('g')
            .attr('class', 'pathContainer');

        gChild.selectAll('.basicCurve')
            .data(arr)
            .enter()
            .append('path')
            .attr('d', (d, i) => (
                `M0 ` + (margin.top + d.offset) +
                `L ` + (width - r) * dir + ' ' + (margin.top + d.offset) +
                `A ` + (r - d.offset) + ' ' + (r - d.offset) + ' 0 0 ' + (dir === 1 ? 1 : 0) + '' + (width - d.offset) * dir + ` ` + (margin.top + r) + `
                    L ` + (width - d.offset) * dir + ` ` + (height)))
            .style('stroke', color)
            .attr('class', 'basicCurve')
            .attr('stroke-width', (d) => (d.strokeWidth))
            .attr('fill', 'none');

        if (direction === 'left' && postion === 'top') {

            gChild.attr('transform', 'translate(' + (-width / 2 + 40 / 2 + dx * 50 + 1) + ',' + (maskHeight - 140 - dy * 50) + ')');
            curveTag(50, 142 + dy * 50);

        } else if (direction === 'right' && postion === 'top') {

            gChild.attr('transform', 'translate(' + (width + width / 2 - 40 / 2 + dx * 50) + ',' + (maskHeight - 140 - dy * 50) + ')');
            curveTag(2000, 42 + dy * 50);

        } else if (direction === 'left' && postion === 'bottom') {

            let x = -width / 2 + 40 / 2 + dx * 50 + 1;
            let y = maskHeight - 390 + dy * 50 - 560;

            gChild.style('transform-origin', '0 500px')
            gChild.style('transform', 'translate(' + (x) + 'px,' + (y) + 'px) scaleY(-1)')

            curveTag(50, 592 + dy * 50);

        } else if (direction === 'right' && postion === 'bottom') {

            let x = width + width / 2 - 40 / 2 + dx * 50 + 1;
            let y = maskHeight - 390 + dy * 50 - 560;



            gChild.style('transform-origin', '0 500px')
            gChild.style('transform', 'translate(' + (x) + 'px,' + (y) + 'px) scaleY(-1)')


            curveTag(2000, 592 + dy * 50);
        }





        return gChild;

    }


    /**
     * [copy15 description]  15 bio parameters
     * @param  {[type]} pos   [description]
     * @param  {[type]} color [description]
     * @param  {[type]} dx    [description]
     * @param  {[type]} dy    [description]
     * @return {[type]}       [description]
     */
    function copy15(pos, direction, color, dx, dy) {
        return basicCurve([{
            offset: 0 + 1,
            strokeWidth: 1
        }, {
            offset: 4 + 1,
            strokeWidth: 1
        }, {
            offset: 8 + 1,
            strokeWidth: 1
        }, {
            offset: 12 + 1,
            strokeWidth: 1
        }, {
            offset: 16 + 1,
            strokeWidth: 1
        }, {
            offset: 20 + 1,
            strokeWidth: 1
        }, {
            offset: 24 + 1,
            strokeWidth: 1
        }, {
            offset: 28 + 1,
            strokeWidth: 1
        }, {
            offset: 32 + 1,
            strokeWidth: 1
        }, {
            offset: 36 + 1,
            strokeWidth: 1

        }], pos, direction, color, dx, dy);
    }






    // text title
    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('x', '50%')
        .attr('y', '41%')
        .style('fill', 'seagreen')
        .style('font-size', '36')
        .attr('font-family', 'adad')
        .text('抗性基因综合评价');

    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('x', '50%')
        .attr('y', '44%')
        .style('fill', 'seagreen')
        .style('font-size', '24')
        .attr('font-family', 'Verdana')
        .text('Evaluation of Antibiotics Intake');

    // text
    let centralText = [{
        color: 'seagreen',
        text: '推荐用药',
        pos: -1,
        value: baseConf.gap[0] + 7
    }, {
        color: 'orange',
        text: '谨慎用药',
        pos: 0,
        value: baseConf.gap[1] - baseConf.gap[0] + 1
    }, {
        color: 'salmon',
        text: '警惕用药',
        pos: 1,
        value: 7 - baseConf.gap[1]
    }]

    svg.selectAll('.centralText').data(centralText)
        .enter()
        .append('g')
        .attr('class', 'centralText')
        .attr('transform', (d, i) => ('translate(' + (width / 2 + margin.left - 75 + d.pos * 270) + ',630)'))
        .append('rect')
        .attr('width', 150)
        .attr('height', 50)
        .attr('opacity', 0.6)
        .attr('rx', 25)
        .attr('stroke-width', 3)
        .style('stroke', (d, i) => (d.color));

    svg.selectAll('g.centralText')
        .append('text')
        .text((d, i) => (d.text))
        .attr('x', 75)
        .attr('y', 35)
        .attr('text-anchor', 'middle')
        .attr('stroke-width', 0.5)
        .style('fill', (d, i) => (d.color))
        .style('font-size', '25px');

    svg.selectAll('g.centralText')
        .append('text')
        .text((d, i) => (d.value))
        .attr('x', 75)
        .attr('y', 80)
        .attr('text-anchor', 'middle')
        .attr('stroke-width', 0.5)
        .style('fill', (d, i) => (d.color))
        .style('font-size', '25px');


    // tag at both sides
    function curveTag(x = 200, y = 100) {
        return svg.append('g').append('rect')
            .attr('transform', 'translate(' + x + ',' + y + ')')
            .attr('width', 400)
            .attr('height', 30)
            .attr('rx', 20)
            .attr('ry', '50%')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 3);
    }




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



function index(argument) {
    // body...
}

EstimateAntibiotics.prototype = {
    constructor: estimateAntibiotics,
    init: init,
    topLeft: '',
    topRight: '',
    bottomRight: '',
    bottomLeft: '',
    index: ''
}

var estimateAntibiotics = (new EstimateAntibiotics);





export default estimateAntibiotics;
