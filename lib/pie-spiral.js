/*   author:fanyer
 *   mail: iofanyer@gmail.com
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */


import D3 from 'd3'
import baseConf from './default-config/pie-spiral.config'
import { bend } from './utils/filter'
import { detectCanvas } from './utils/detect'
import { hex2rgba, addOpacity } from './utils/color'
/*seagreen   #00ab84*/
/*orange   #e4be6f*/
/*salmon   #cb8d88*/

// color in this file should be hex



const d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-selection'),
    require('d3-drag'),
    require('d3-array'),
    require('d3-color'),
    require('d3-scale')
);

export function pieSpiral(parent, config) {

    const input = config || baseConf


    const max = 470,
        min = 110,
        d = (max - min) / 6

 
    const labels = Object.keys(input.data)
    const data = Object.values(input.data).map((e, i) => (e.value))


    // detect browser canvas api
   let canvas=detectCanvas(parent)

    const context = canvas.getContext("2d");

    canvas.width = 1100;
    canvas.height = 900;

    let width = canvas.width,
        height = canvas.height,
        radius5 = Math.min(width, height) / 2;

    if (window.devicePixelRatio) {
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.height = height * window.devicePixelRatio * 2;
        canvas.width = width * window.devicePixelRatio * 2;
        context.scale(window.devicePixelRatio * 2, window.devicePixelRatio * 2);
    }

    context.translate(width / 2 + 1, height / 2)

    context.save()



    // draw text & number
    context.textBaseline = "hanging";
    context.textAlign = "center";

    context.fillStyle = "#00ab84"
    context.font = "24px adad";
    context.fillText(input.text, 0, -10);
    context.restore()



    // circles layers
    context.save()
    context.strokeStyle = '#00ab84';
    context.setLineDash([4, 5])

    let radius = d3.range(min, min + 4 * d + 30, 20)

    radius.forEach((e, i) => {
        let arc = d3.arc()
            .outerRadius(e)
            .innerRadius(0)
            .startAngle(0)
            .endAngle(Math.PI * 2)
            .context(context);

        context.beginPath()
        arc()

        context.stroke();

    })
    context.restore()

    // first cicle layer  to be optimised later 2017.4.20
    context.save()
    context.strokeStyle = '#00ab84';
    context.globalAlpha = 0.7;
    context.setLineDash([4, 0])

    context.beginPath()
    d3.arc()
        .outerRadius(min - 10)
        .innerRadius(0)
        .startAngle(0)
        .endAngle(Math.PI * 2)
        .context(context)();

    context.stroke();
    context.restore()



    // draw arcs
    context.save()
    let arcs = d3.pie()(Array.from({ length: 16 }, e => 1))

    arcs.sort((a, b) => {
        return a.startAngle - b.startAngle
    })

    const arc = d3.arc()
        .context(context);

    function switchStrokeColor(a) {

        if (a < 50) {
            return '#00ab84'
        } else if (a > 75) {
            return '#cb8d88'
        } else {
            return '#e4be6f'
        }

    }

    let rHeight = d3.scaleLinear()
        .domain([0, 100])
        .range([min, min + 250])

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
        return rHeight(a)
    }


    arcs.forEach((E, I) => {


        // context.strokeStyle = 'rgba(250,128,114,0.05)';
        context.fillStyle = "rgba(255,255,255,1)";
        // context.fillStyle = "rgba(250,128,114,0)";

        let inMax = InMax(data[I])

        d3.range(min, inMax, 6).sort((a, b) => (b - a)).map((e, i, arr) => {

            context.save()
            context.beginPath()

            context.setLineDash([10, 0]);
            let strokeColor = switchStrokeColor(data[I]);
            context.strokeStyle = (i === 0 ? addOpacity(hex2rgba(strokeColor), 1) : addOpacity(hex2rgba(strokeColor), 0.5));


            if (i === 0) {
                context.lineWidth = 2;
                arc.outerRadius(e).innerRadius(min)(E);
            } else {
                context.lineWidth = 1;

                // (i===10)&&(arc.outerRadius(e).innerRadius(e)(E));
                arc.outerRadius(e).innerRadius(e)(E);
                // (I === 1) && (i === 10) && (arc.outerRadius(e).innerRadius(min)(E));
                // (I === 1) && (i === 1) && (arc.outerRadius(e).innerRadius(min)(E));
            }

            // (i === 0) && (console.log(arc.outerRadius(e)(E)));
            // (I === 1) && (i === 1) && (console.log(arc.outerRadius(e)(E).split('Z')[0]));
            context.stroke();

            (i === 0) && (context.fill())
            context.restore()


        })


    })
    context.restore();





    // label
    context.save()
    context.strokeStyle = '#cb8d88'
    context.lineWidth = 4;
    context.fillStyle = '#00ab84'

    context.beginPath()

    context.font = "16px adad";
    labels.forEach((e, i) => {

        context.save()
            // 0.03 is for delusion
        context.rotate(Math.PI * 2 / labels.length * i + Math.PI / labels.length - 0.02)
        bend(context, e, -410, false)
            // console.log(input.data[e].en)
        bend(context, input.data[e].en, -390, true)

        context.restore()

    })
    context.restore()


}
