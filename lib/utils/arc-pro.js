import D3 from 'd3'


const d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-array'),
    require('d3-format'),
    require('d3-axis'),
    require('d3-scale')
);



export function customArc(context, x = 500, y = 500, start, end, r = 100, n = 10) {
    context.save()
    context.fillStyle = 'steelblue'

    d3.range(start, end, (end - start) / n).map((e, i) => {
        context.beginPath()
        let pX = x + r * Math.cos(e);
        let pY = y + r * Math.sin(e);

// console.log(pX)
        context.arc(pX, pY, 2, 0, Math.PI * 2, true)

        context.fill()

    })


    context.restore()
}


export function customDashCircle(context,r = 100, n = 50, x, y) {
    customArc(context, 0, 0, 0, Math.PI * 2, r, n)


}
