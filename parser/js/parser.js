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
        let rank = input[e][3];
        let median = input[e][1];
        let absolute = input[e][2];

        let color = (rank < 75 ?
            "seagreen" : (rank < 90 ?
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
            "color": color
        }
    });

    // form output.bottom
    let bottom = bottomIndex.map((e, i) => {

        let cn = input[e][0];
        let en = input[e][4];
        let rank = input[e][3];
        let median = input[e][1];
        let absolute = input[e][2];

        let color = (rank < 75 ?
            "seagreen" : (rank < 90 ?
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
            "color": color
        }
    });



    return output = {
        "top": top,
        "bottom": bottom
    };
}
