import D3 from 'd3';

const d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-axis'),
    require('d3-selection'),
    require('d3-color'),
    require('d3-scale')
);

//x,y may depend on the context tranlate origin
const vestConfig = [{
    x: 0,
    y: -310
}, {
    x: -14,
    y: -280
}, {
    x: -21,
    y: -272
}, {
    x: -30,
    y: -264
}, {
    x: -90,
    y: -234
}, {
    x: -110,
    y: -224
}]


export function onion(context, color = ['seagreen', 'steelblue'], vest) {

    let vestData = vest || vestConfig

    const mirrorVestData = vestData.map((e, i) => {
        return {
            x: -e.x,
            y: e.y
        }
    })



    let curve = d3.line()
        .x((d) => (d.x))
        .y((d) => (d.y))
        .curve(d3.curveCatmullRom.alpha(1))
        .context(context);

    // lefthand
    context.save()
    context.lineWidth = 2;
    context.strokeStyle = color[0];
    context.beginPath()

    curve(vestData)
    context.stroke()

    context.restore()






    // righthand
    context.save()
    context.lineWidth = 2;
    context.strokeStyle = color[1];
    context.beginPath()

    curve(mirrorVestData)
    context.stroke()

    context.restore()



    // lefthand erase arc
    context.save()
    // context.lineWidth = 3;
    context.strokeStyle = color[1];
    context.fillStyle = '#fff';
    context.beginPath()

    curve([...vestData, {
        x: 0,
        y: -200
    }])
    context.fill()

    context.restore()



    // righthand erase arc
    context.save()
    // context.lineWidth = 3;
    context.strokeStyle = color[1];
    context.fillStyle = '#fff';
    context.beginPath()

    curve([...mirrorVestData, {
        x: 0,
        y: -200
    }])
    context.fill()

    context.restore()



}

/**
 * [gt6 description]  
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
export function gt6(argument) {
}
