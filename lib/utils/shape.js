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
        x: -50,
        y: -190
    }])
    context.fill()

    context.restore()



}


// gt 6     vs >=6
export function onionGt6(context, color = ['seagreen', 'steelblue'], arr = ['left', 'right'], vest) {

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
    function lefthand() {
        context.save()
        context.lineWidth = 2;
        context.strokeStyle = color[0];
        context.beginPath()

        curve(vestData)
        context.stroke()

        context.restore()

    }



    // righthand
    function righthand() {
        context.save()
        context.lineWidth = 2;
        context.strokeStyle = color[1];
        context.beginPath()

        curve(mirrorVestData)
        context.stroke()

        context.restore()
    }

    (arr.length === 2) && (lefthand()) && (righthand())
    if (arr.length === 1) {
        arr[0] == 'left' ? lefthand() : righthand();
    }

    // lefthand()
    // righthand()


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
    context.fill();
    console.log(12)

    context.restore()



    // righthand erase arc
    context.save()
        // context.lineWidth = 3;
    context.strokeStyle = color[1];
    context.fillStyle = '#fff';
    context.beginPath()

    curve([...mirrorVestData,{
      x:0,
      y:-200
    }])
    context.fill()

    context.restore()



}

/**
 * [gt6 description]  
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */

const p0 = [0, 310]
const p2 = [Math.PI, 310]

export function gt6(context, arr = [p0, p2], color = 'seagreen') {

    let curve = d3.radialLine()
        .curve(d3.curveCatmullRom.alpha(0.7))
        .context(context)

    let p0 = arr[0] 
    let p2 = arr[1] 

    //value 250 is the radius3 in intake-fat-proportion
    let p1 = [
        (p0[0] + p2[0]) / 2 , 250+2
    ]


    arr.splice(1, 0, p1)
    console.log(arr)

    context.save()
        // context.lineWidth = 3;
    context.strokeStyle = color;
    context.fillStyle = '#fff';
    context.beginPath()

    curve(arr)

    context.fill()
    context.stroke()

    context.restore()



}
