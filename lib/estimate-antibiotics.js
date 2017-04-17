import D3 from 'd3'
import { detectSVG, pattern } from './utils/detect'
import { mergeJSON, mergeArr } from './utils/merge'
import { clone } from './utils/clone'
import baseConf from './estimate-default-config'
import { sql } from './utils/sql'


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


function handleConfig(baseCfg, diyCfg) {
    return {
        'top': mergeArr(baseCfg.top, diyCfg.top),
        'bottom': mergeArr(baseCfg.bottom, diyCfg.bottom),
        'gap': diyCfg.gap
    }
}


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
    let input=config||baseConf;


    detectSVG(parent);


    let svg = d3.select('#' + parent.id + ' svg'),
        margin = { top: 50, right: 600, bottom: 50, left: 630 };

    svg.attr('width', 2700)
        .attr('height', 1200);

    let width = svg.attr('width') - margin.left - margin.right,
        height = svg.attr('height') - margin.top - margin.bottom,
        gTop = svg.append('g')
        .attr('class', 'gTop')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'),
        gBottom = svg.append('g')
        .attr('class', 'gBottom')
        .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')');


    // // here set tag pattern
    // let gapArr = [
    //     (input.gap[0] + 7) * 40 / 15,
    //     (input.gap[1] + 7) * 40 / 15
    // ];

    // pattern(svg, [Math.floor(gapArr[0]), Math.floor(gapArr[1])]);
    pattern(svg, [75,90]);


    $(parent)
        .append($('<div/>', {
            id: 'centerDiv',
            class: 'centerDiv'
        }));

    const centerDivWidth = parseFloat($('#centerDiv').css('width'));

    $('#' + parent.id + ' #centerDiv')
        .append($('<div/>', {
            id: 'div1',
            class: 'div1'
        }))
        .append($('<div/>', {
            id: 'div2',
            class: 'div2'
        }))
        .append($('<div/>', {
            id: 'div3',
            class: 'div3'
        }));

    // let bias=0;


    $('#centerDiv #div1').css({
        'width': 50 * (input.gap[0] + 7)
    });
    $('#centerDiv #div2').css({
        'width': 50 * (input.gap[1] - input.gap[0] + 1) - 10,
        'border-radius': () => {
            let str = '';

            (input.gap[0] === -7) && (str = '20px 0 0 20px');
            (input.gap[1] === 7) && (str = '0 20px 20px 0');
            return str;
        }
    });
    $('#centerDiv #div3').css({
        'width': 50 * (7 - input.gap[1])
    });


    (input.gap[0] < -7) && (centerDivOne('salmon'));
    (input.gap[0] > 7) && (centerDivOne('seagreen'));
    (input.gap[0] <= -7) && (input.gap[1] >= 7) && (centerDivOne('orange'));

    function centerDivOne(color) {
        $('#centerDiv').html('').css({
            'width': 770,
            'background-color': color,
            'border-radius': '20px 20px 20px 20px'
        });

    }



    const maskHeight = 578;





    input.top.map((e, i) => {
        // let color = (e.x < input.gap[0] ?
        //     'seagreen' :
        //     (e.x <= input.gap[1] ?
        //         'orange' :
        //         'salmon'));

        copy15('top', e.direction, e.color, e.x, e.y)
    })


    input.bottom.map((e, i) => {
        // let color = (e.x < input.gap[0] ?
        //     'seagreen' :
        //     (e.x <= input.gap[1] ?
        //         'orange' :
        //         'salmon'));

        copy15('bottom', e.direction, e.color, e.x, e.y)
    })





    /**
     * [clippath description] to mask
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


    /**
     * [locate description] sql to locate
     * @param  {[type]} x        [description]
     * @param  {[type]} vertical [description] true means top
     * @return {[type]}          [description]
     */
    function locate(x, vertical) {
        var testArr = input[(vertical === true ? 'top' : 'bottom')];
        var match = sql(testArr).Query('@x==' + x);

        return match[0]
    }





    function basicCurve(arr, postion = 'top', direction = 'left', color = 'steelblue', dx = 0, dy = 0) {

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


        // this  line cause not pure
        let vertical = (postion === 'top' ? true : false);
        let key = locate(dx, vertical).tag;
        let data = locate(dx, vertical).data;


        if (direction === 'left' && postion === 'top') {

            gChild.attr('transform', 'translate(' + (-width / 2 + 40 / 2 + dx * 50 + 1) + ',' + (maskHeight - 140 - dy * 50) + ')');

            // this  line cause not pure
            curveTag(50, 542 - dy * 50, key, data, color);

        } else if (direction === 'right' && postion === 'top') {

            gChild.attr('transform', 'translate(' + (width + width / 2 - 40 / 2 + dx * 50) + ',' + (maskHeight - 140 - dy * 50) + ')');

            curveTag(2200, 542 - dy * 50, key, data, color);

        } else if (direction === 'left' && postion === 'bottom') {

            let x = -width / 2 + 40 / 2 + dx * 50 + 1;
            let y = maskHeight - 390 + dy * 50 - 560;

            gChild.style('transform-origin', '0 500px')
            gChild.style('transform', 'translate(' + (x) + 'px,' + (y) + 'px) scaleY(-1)')

            curveTag(50, 592 + dy * 50, key, data, color);

        } else if (direction === 'right' && postion === 'bottom') {

            let x = width + width / 2 - 40 / 2 + dx * 50 + 1;
            let y = maskHeight - 390 + dy * 50 - 560;



            gChild.style('transform-origin', '0 500px')
            gChild.style('transform', 'translate(' + (x) + 'px,' + (y) + 'px) scaleY(-1)')


            curveTag(2200, 592 + dy * 50, key, data, color);
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
        .text('抗生素抗性基因综合评价');

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
        value: input.gap[0] + 7
    }, {
        color: 'orange',
        text: '谨慎用药',
        pos: 0,
        value: input.gap[1] - input.gap[0] + 1
    }, {
        color: 'salmon',
        text: '警惕用药',
        pos: 1,
        value: 7 - input.gap[1]
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
        .attr('fill', 'none')
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
    function curveTag(x = 200, y = 100, text = {}, data = {}, color = 'seagreen') {
        var gTag = svg.append('g')
            .attr('transform', 'translate(' + x + ',' + y + ')');


        gTag.append('rect')
            .attr('width', 400)
            .attr('height', 22)
            .attr('rx', 15)
            .attr('fill', 'url(#pattern1)')
            .attr('ry', '50%')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1);

        gTag.append('text')
            .text('中间值: ' + data.median)
            .style('fill', color)
            .attr('stroke-width', 2)
            .attr('x', 130)
            .attr('dx', 20)
            .attr('y', 35)
            .attr('text-anchor', 'start')
            .attr('alignment-baseline', 'hanging');


        gTag.append('text')
            .text('▼ ' + data.absolute)
            .style('fill', color)
            .attr('stroke-width', 2)
            .attr('x', data.rank * 400 - 28)
            .attr('dx', 20)
            .attr('y', 0)
            .attr('dy', -4)
            .attr('text-anchor', 'start')
            .attr('alignment-baseline', 'baseline');




        let textAlign = (x < 1000 ? 400 : -150);
        gTag.append('text')
            .text(text.cn)
            .style('fill', color)
            .attr('stroke-width', 2)
            .attr('x', textAlign)
            .attr('dx', 20)
            .attr('y', 15)
            .attr('text-anchor', 'start')
            .attr('alignment-baseline', 'middle');

        gTag.append('text')
            .text(text.en)
            .style('fill', color)
            .attr('stroke-width', 2)
            .attr('x', textAlign)
            .attr('dx', 20)
            .attr('dy', 20)
            .attr('y', 15)
            .attr('text-anchor', 'start')
            .attr('alignment-baseline', 'middle');

        // rank tag
        let rankAlign = (x < 1000 ? 600 : -350);
        gTag.append('text')
            .text('人群排名: ' + d3.format('.2%')(data.rank))
            .style('fill', color)
            .attr('stroke-width', 2)
            .attr('x', rankAlign)
            .attr('dx', 20)
            .attr('y', 15)
            .attr('text-anchor', 'start')
            .attr('alignment-baseline', 'middle');

        let rankRectAlign = (x < 1000 ? 580 : -150);

        gTag.append('rect')
            .style('fill', color)
            .attr('x', rankRectAlign)
            .attr('y', -4)
            .attr('width', 3)
            .attr('height', 39);


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
    topLeft: topLeft,
    topRight: topRight,
    bottomRight: bottomRight,
    bottomLeft: bottomLeft,
    index: ''
}

var estimateAntibiotics = (new EstimateAntibiotics);





export default estimateAntibiotics;
