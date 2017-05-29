export const curveGraphConfig = {
    'standard': {
        'min': -25,
        '过低': [-20,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6],
        '偏低': [-12,-10,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6],
        '正常': [0,8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6],
        '偏高': [5,0,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6],
        '过高': [20,4,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6],
        'max': 25
    },
    'data': {
        '维生素A': 16,
        '维生素B1': 19,
        '维生素B2': -14,
        '维生素B3': -5,
        '维生素B5': -8,
        '维生素B6': 13,
        '维生素B7': 6,
        '维生素B9': -20,
        '维生素B12': 9,
        '维生素C': -16,
        '胡萝卜素': -18,
        '维生素E': -7,
        '牛磺酸': 2,
        '辅酶Q': -7,
        '异黄酮': -21,
        '维生素K': -7
    }
};



export const linkGraphConfig = {
    "nodes": [{
        "name": "维生素A"
    }, {
        "name": "维生素B1"
    }, {
        "name": "维生素B2"
    }, {
        "name": "维生素B3"
    }, {
        "name": "维生素B5"
    }, {
        "name": "维生素B6"
    }, {
        "name": "维生素B7"
    }, {
        "name": "维生素B9"
    }, {
        "name": "维生素B12"
    }, {
        "name": "维生素C"
    }, {
        "name": "胡萝卜素"
    }, {
        "name": "维生素E"
    }, {
        "name": "牛磺酸"
    }, {
        "name": "辅酶Q"
    }, {
        "name": "异黄酮"
    }, {
        "name": "维生素K"
    }, {
        "name": "家畜类"
    }, {
        "name": "蔬菜类"
    }, {
        "name": "豆类"
    }, {
        "name": "家禽类"
    }, {
        "name": "水果类"
    }, {
        "name": "坚果类"
    }, {
        "name": "发酵食物类"
    }, {
        "name": "脏器类"
    }, {
        "name": "谷物类"
    }, {
        "name": "奶蛋类"
    }],
    "links": [{
        "source": 0,
        "target": 22 - 1,
        "value": 5
    }, {

        "source": 1,
        "target": 18,
        "value": 5
    }, {

        "source": 1,
        "target": 23 - 1,
        "value": 5
    }, {
        "source": 2,
        "target": 16,
        "value": 5
    }, {
        "source": 2,
        "target": 20 - 1,
        "value": 5
    }, {

        "source": 2,
        "target": 25 - 1,
        "value": 5
    }, {
        "source": 2,
        "target": 23 - 1,
        "value": 5
    }, {
        "source": 3,
        "target": 25 - 1,
        "value": 5
    }, {
        "source": 3,
        "target": 20 - 1,
        "value": 5
    }, {

        "source": 4,
        "target": 16,
        "value": 5
    }, {

        "source": 4,
        "target": 17,
        "value": 5
    }, {
        "source": 4,
        "target": 22 - 1,
        "value": 5
    }, {
        "source": 4,
        "target": 23 - 1,
        "value": 5
    }, {

        "source": 5,
        "target": 17,
        "value": 5
    }, {
        "source": 5,
        "target": 24 - 1,
        "value": 5
    }, {
        "source": 5,
        "target": 22 - 1,
        "value": 5
    }, {
        "source": 6,
        "target": 20,
        "value": 5
    }, {
        "source": 6,
        "target": 19,
        "value": 5
    }, {

        "source": 6,
        "target": 22 - 1,
        "value": 5
    }, {
        "source": 6,
        "target": 24 - 1,
        "value": 5
    }, {
        "source": 7,
        "target": 17,
        "value": 5
    }, {
        "source": 7,
        "target": 18,
        "value": 5
    }, {
        "source": 7,
        "target": 20,
        "value": 5
    }, {

        "source": 7,
        "target": 24 - 1,
        "value": 5
    }, {
        "source": 8,
        "target": 20,
        "value": 5
    }, {

        "source": 8,
        "target": 22 - 1,
        "value": 5
    }, {
        "source": 8,
        "target": 23 - 1,
        "value": 5
    }, {
        "source": 8,
        "target": 24 - 1,
        "value": 5
    }, {
        "source": 9,
        "target": 18,
        "value": 5
    }, {
        "source": 9,
        "target": 19,
        "value": 5
    }, {
        "source": 9,
        "target": 20,
        "value": 5
    }, {

        "source": 10,
        "target": 19,
        "value": 5
    }, {
        "source": 10,
        "target": 20,
        "value": 5
    }, {


        "source": 10,
        "target": 23 - 1,
        "value": 5
    }, {
        "source": 10,
        "target": 26 - 1,
        "value": 5
    }, {
        "source": 11,
        "target": 16,
        "value": 5
    }, {
        "source": 11,
        "target": 20,
        "value": 5
    }, {
        "source": 12,
        "target": 17,
        "value": 5
    }, {
        "source": 12,
        "target": 18,
        "value": 5
    }, {
        "source": 12,
        "target": 19,
        "value": 5
    }, {
        "source": 12,
        "target": 20,
        "value": 5
    }, {
        "source": 12,
        "target": 22 - 1,
        "value": 5
    }, {
        "source": 12,
        "target": 24 - 1,
        "value": 5
    }, {
        "source": 12,
        "target": 25 - 1,
        "value": 5
    }, {
        "source": 12,
        "target": 26 - 1,
        "value": 5
    }, {
        "source": 13,
        "target": 17,
        "value": 5
    }, {
        "source": 13,
        "target": 19,
        "value": 5
    }, {
        "source": 13,
        "target": 20,
        "value": 5
    }, {


        //     "source": 14,
        //     "target": 16,
        //     "value": 5
        // }, {
        //     "source": 14,
        //     "target": 18,
        //     "value": 5
        // }, {
        //     "source": 14,
        //     "target": 20,
        //     "value": 5
        // }, {
        "source": 14,
        "target": 25,
        "value": 5
    }, {
        "source": 15,
        "target": 19,
        "value": 5
    }, {
        "source": 15,
        "target": 20 - 1,
        "value": 5
    }, {


        "source": 15,
        "target": 22 - 1,
        "value": 5
    }, {
        "source": 15,
        "target": 24 - 1,
        "value": 5
    }]
}
