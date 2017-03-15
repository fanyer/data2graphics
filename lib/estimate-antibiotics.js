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
        margin = { top: 50, right: 40, bottom: 50, left: 40 };

    svg.attr('width', 1500)
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


    // $('#' + parent.id + ' #centerDiv')
    //     .append($('<div/>', {
    //         id: 'div2',
    //         class: 'div2'
    //     }))
    //     .append($('<div/>', {
    //         id: 'div3',
    //         class: 'div3'
    //     }));

    const centerDivWidth = parseFloat($('#centerDiv').css('width'));


    const maskHeight = 578;



    

    baseConf.top.map((e,i)=>{
      let color= (e.x>=5?'orange':'seagreen')

      copy15('top',e.direction,color,e.x,e.y)
    })


    baseConf.bottom.map((e,i)=>{
      let color= (e.x>=5?'orange':'seagreen')

      copy15('bottom',e.direction,color,e.x,e.y)
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
        .attr('transform', (d, i) => ('translate(0,' + (525 * i-20) + ')'))
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
            gChild.attr('transform', 'translate(' + (-width / 2 + 40 / 2 + dx * 50+1) + ',' + (maskHeight - 140 - dy * 50) + ')');
        } else if (direction === 'right' && postion === 'top') {
            gChild.attr('transform', 'translate(' + (width + width / 2 - 40 / 2 + dx * 50) + ',' + (maskHeight - 140 - dy * 50) + ')');
        } else if (direction === 'left' && postion === 'bottom') {

            let x = -width / 2 + 40 / 2 + dx * 50+1;
            let y = maskHeight - 390 + dy * 50-520;

            gChild.style('transform-origin', '0 500px')
            gChild.style('transform', 'translate(' + (x) + 'px,' + (y) + 'px) scaleY(-1)')


        } else if (direction === 'right' && postion === 'bottom') {

            let x = width + width / 2 - 40 / 2 + dx * 50+1;
            let y = maskHeight - 390 + dy * 50-520;



            gChild.style('transform-origin', '0 500px')
            gChild.style('transform', 'translate(' + (x) + 'px,' + (y) + 'px) scaleY(-1)')

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
            offset: 0+1,
            strokeWidth: 1
        }, {
            offset: 4+1,
            strokeWidth: 1
        }, {
            offset: 8+1,
            strokeWidth: 1
        }, {
            offset: 12+1,
            strokeWidth: 1
        }, {
            offset: 16+1,
            strokeWidth: 1
        }, {
            offset: 20+1,
            strokeWidth: 1
        }, {
            offset: 24+1,
            strokeWidth: 1
        }, {
            offset: 28+1,
            strokeWidth: 1
        }, {
            offset: 32+1,
            strokeWidth: 1
        }, {
            offset: 36+1,
            strokeWidth: 1

        }], pos, direction, color, dx, dy);
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
