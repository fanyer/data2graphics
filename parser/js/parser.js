/**
 * [parse description]
 * @param  {[type]} input [an Array]
 *                        like
 *                        
 * @return {[type]}       [description]
 */
import configTpl from '../../lib/default-config/estimate-antibiotics.config'

export function parse(input) {
    let output = {};


    input.sort((a, b) => {
        return a[3] - b[3];
    });


    // calculate top Index & bottom Index
    let allSet = new Set(Array.from(Array(15).keys()));
    let topIndex = [0, 1, 2, 3, 4, 8, 9, 12];

    let topSet = new Set(topIndex);
    let bottomSet = new Set([...allSet].filter(x => !topSet.has(x)));

    let bottomIndex = Array.from(bottomSet);


    // form output.top
    let top = topIndex.map((e, i) => {

        let cn = input[e][0];
        let en = input[e][4];
        let rank = input[e][3] / 100;
        let median = input[e][1];
        let absolute = input[e][2];

        let color = (rank < 0.75 ?
            "seagreen" : (rank < 0.9 ?
                "orange" : "salmon"));

        return {
            "x": configTpl.top[i].x,
            "y": configTpl.top[i].y,
            "tag": {
                "cn": cn,
                "en": en
            },
            "data": {
                "rank": rank,
                "median": median,
                "absolute": absolute
            },
            "color": color,
            "direction": configTpl.top[i].direction
        }
    });

    // form output.bottom
    let bottom = bottomIndex.map((e, i) => {

        let cn = input[e][0];
        let en = input[e][4];
        let rank = input[e][3] / 100;
        let median = input[e][1];
        let absolute = input[e][2];

        let color = (rank < 0.75 ?
            "seagreen" : (rank < 0.9 ?
                "orange" : "salmon"));

        return {
            "x": configTpl.bottom[i].x,
            "y": configTpl.bottom[i].y,
            "tag": {
                "cn": cn,
                "en": en
            },
            "data": {
                "rank": rank,
                "median": median,
                "absolute": absolute
            },
            "color": color,
            "direction": configTpl.bottom[i].direction
        }
    });




    // calculate the gap
    let gap = [];
    console.log(gap)

    output = {
        "top": top,
        "bottom": bottom,
        "gap": [0, 4]
    };

    return output;
}

const standard=[75,90];


// arr should be ascended, here is ascended input
function firstGreen(arr) {
    if (arr[0][3] >= standard[0]) {
        console.info('no green!\n');
        return false;
    }

    return [0, true];

}

function firstOrange(arr) {
    if (true) {}
}

function firstRed(arr) {
    if (arr[arr.length - 1][3] <= standard[1]) {
        console.info('no red!\n');
        return false;
    }

    for (var i = 0; i < arr.length; i++) {
      arr[i]
    }

}
