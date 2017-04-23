import { linkGraphConfig } from '../../lib/default-config/guide-goodness.config'
import { sql } from '../../lib/utils/sql'


//  right rect #b5d8e1

export function parse(rawData) {
    let input = rawData.left;

    let nodes = input.map((e, i) => {
        linkGraphConfig.nodes[i].color = e.color;
        linkGraphConfig.links
    })

    let links=[]
    input.map((e, i) => {

        let linksFinded = sql(linkGraphConfig.links).Query('@source==' + i)

        console.log(linksFinded)

    })

    // return 0;
    return linkGraphConfig
}



// a  21,22
// b1   18,21,23
// b2  16,21,20,23,25
// b3  25,21,20
// b5  16,17,21,22,23
// b6  17, 22,24


// b7  19,20,21,22,24
// b9  21
// b12  18,21,23,22,24
// C  18,20,19,21
// 胡萝卜 19,20,21,23,26
// E  16,20,21
// 牛磺酸         18,17,19,20,21,24,,25,26
// 辅酶Q   19,21,17  20
// 异黄酮   21,23,  20,18,16
// K    21,24,22,20,19




//异黄酮
// source  14
