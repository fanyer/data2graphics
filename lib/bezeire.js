import D3 from 'd3'

var d3 = Object.assign({},
    D3,
    require('d3-shape'),
    require('d3-format'),
    require('d3-sankey'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-axis'),
    require('d3-color'),
    require('d3-scale')
);


// factor   1/n
export function bezeire(p1, p2, factor) {

    var vs = 1 - factor,
        pMiddle1 = {
            x: vs * p1.x + (1 - vs) * p2.x,
            y: vs * p1.y + (1 - vs) * p2.y
        },
        pMiddle2 = {
            x: (1 - vs) * p1.x + vs * p2.x,
            y: (1 - vs) * p1.y + vs * p2.y
        };

    return [p1, pMiddle1, pMiddle2, p2];

}

// factor   1/n
export function vBezeireArr(Arr, factor) {
    var arr = []

    Arr.forEach((e, i) => {
        if (i === Arr.length - 1) return;

        let p1 = e,
            p2 = Arr[i + 1],
            vs = 1 - factor,
            pMiddle1 = { x: p1.x, y: p1.y * vs + p2.y * factor },
            pMiddle2 = { x: p2.x, y: p2.y * vs + p1.y * factor }

        arr.push([p1, pMiddle1, pMiddle2, p2])

    })

    return arr

}

//  for polar coordinate system
export function bezeireArc() {


}
