import D3 from 'd3'

d3 = Object.assign({},
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

    var arr = [p1, pMiddle1, pMiddle2, p2];

    return arr

}

// factor   1/n
export function bezeireArr(Arr, factor) {

    var vs = 1 - factor,
        pMiddle1 = {
            x: vs * p1.x + (1 - vs) * p2.x,
            y: vs * p1.y + (1 - vs) * p2.y
        },
        pMiddle2 = {
            x: (1 - vs) * p1.x + vs * p2.x,
            y: (1 - vs) * p1.y + vs * p2.y
        };

    var arr = [p1, pMiddle1, pMiddle2, p2];

    return arr

}
