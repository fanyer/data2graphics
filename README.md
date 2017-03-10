## Reports' Graphics API Referrence

this library outputs graphics with interfaces as below
* intakeSugarDistribution
* intakeFiberStruct
* scoreLevel
* intakeFatDsitribution
  * intakeFatProportion
  * intakeFatDeviation
* guideGoodness
  * curveGraph
  * linkGraph
* estimateFiber
* estimateAntibiotics
  * init
  * topLeft
  * topRight
  * bottomRight
  * bottomLeft
  * index


****

#### Notifications
1. This library aims at making it purely free to transfer between data and graphics . The most common json struct is `config`, whose keys and values can be mostly customed.

2. For regular graphics ,the most is draw in svg based on Cartesian coordinate system; For irregular graphics or more geometrical, the most  is draw in canvas based on Polar coordinate system.


****

### Specs Over Configuration
1. Each graphic vue component shall be independent, for example, one ancestor dom node with one svg/canvas.

2. To be specific, `oDom` should have an `id` for the best.

****

#### intakeSugarDistribution()
after import this function , you can call it as below:
```
intakeDistribution(oDom, config1, config2)

//oDom is a dom object

//config1 example
{
  'type': '检测值',
  'data': {
      '膳食纤维': 5,
      '低聚果糖': 6.5,
      '低聚异麦芽糖': 4,
      'ß-葡萄糖': 2.5,
      '葡甘露聚糖': 4,
      '抗性麦芽糊精': 3
   }
}
//config2 example
{
   'type': '标准值',
   'data': {
       '膳食纤维': 3.5,
       '低聚果糖': 2.2,
       '低聚异麦芽糖': 3.2,
       'ß-葡萄糖': 6.2,
       '葡甘露聚糖': 2.7,
       '抗性麦芽糊精': 5.2
   }
 }

```
It will render as below:

<img src="./docs/intake-sugar-distribution.png"  width='500'>


#### intakeFiberStruct()
```
intakeFiberStruct(oDom, config)

//config example
{
   'XXX': 0.08,
   '胆固醇': 0.17,
   '饱和脂肪酸': 0.2,
   '不饱和脂肪酸': 0.1,
   'YYY脂肪酸': 0.05,
   '鞘脂类': 0.4
}
```
It will render as below:

<img src="./docs/intake-fiber-struct.png" width='500'>


### scoreLevel()
```
scoreLevel(oDom, config)

//config example
{
    'score': 46.7,
    'data':{
      '低聚果糖': 0.4,
      '低聚异麦芽糖': 0.6,
      '𝜷-葡聚糖': 0.3,
      '葡甘露聚糖': 0.2,
      '抗性麦芽糊精': 0.9,
      '氨糖': 0.5,
      '饱和脂肪酸': 0.3,
      '不饱和脂肪酸':0.8,
      '鞘脂类': 0.77,
      '胆汁酸':0.12,
      '胆红素': 0.34,
      '胆固醇':0.96,
      '淀粉': 0.43,
      '膳食纤维': 0.213
    }
}

```

It will render as below:

<img src="./docs/score-level.png" width='500'>


### intakeFatProportion()
```
intakeFatProportion(oDom, config)

//config example
{
  'sature': 42,
  'unsature': 58
}

```
It will render as below:

<img src="./docs/intake-fat-proportion.png" width='500'>


### intakeFatDeviation()
```
intakeFatDeviation(oDom, config)

//config example
{
  '标准值':0.5,
  'data':{
    '饱和脂肪酸': 0.8739,
    '不饱和脂肪酸': 0.1498,
    '鞘脂类': 0.3483,
    '胆固醇': 0.5705
  }
}

```
It will render as below:

<img src="./docs/intake-fat-deviation.png" width='500'>



### curveGraph()
```
curveGraph(oDom, config)

//config example
{
  'standard': {
       'min': -25,
       '过低': -20,
       '偏低': -10,
       '正常': 0,
       '偏高': 10,
       '过高': 20,
       'max': 25
   },
   'data': {
       '维生素A': 16,
       '维生素B1': 19,
       '维生素B2': -14,
       '维生素B3': -5,
       '维生素B5': -8,
       '维生素B6': -13,
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
}

```
It will render as below:

<img src="./docs/curve-graph.png" width='300'>


### linkGraph()
```
linkGraph(oDom, config)

//config example
{
  ...   
}

```
This config is a little long, explore at [here](https://pkgo.in/itg/data2graphics/blob/master/lib/energy2.json).

It will render as below:

<img src="./docs/link-graph.png" width='400'>


### estimateFiber()
```
estimateFiber(oDom, config)

//config example
{
   '维生素1': 1,
   '维生素2': 1,
   '维生素3': 3,
   '维生素4': 2,
   '维生素5': 1,
   '维生素6': 3,
   '维生素7': 1,
   '维生素8': 2,
   '维生素9': 2,
   '维生素10': 1,
   '维生素11': 1,
   '维生素12': 3,
   '维生素13': 3,
   '维生素14': 1,
   '维生素15': 2,
   '维生素16': 3
}

```
It will render as below:

<img src="./docs/estimate-fiber.png" width='500'>

### estimateAntibiotics.init()
```
estimateAntibiotics.init(oDom, config)

//config example
{

}

```
It will render as below:

<img src="./docs/estimate-antibiotics-init.png" width='500'>
### estimateAntibiotics.topLeft()
```
estimateAntibiotics.topLeft(oDom, config)

//config example
{

}

```
It will render as below:

<img src="./docs/estimate-antibiotics-top-left.png" width='500'>
### estimateAntibiotics.topRight()
```
estimateAntibiotics.topRight(oDom, config)

//config example
{

}

```
It will render as below:

<img src="./docs/estimate-antibiotics-top-right.png" width='500'>
### estimateAntibiotics.bottomRight()
```
estimateAntibiotics.bottomRight(oDom, config)

//config example
{

}

```
It will render as below:

<img src="./docs/estimate-antibiotics-bottom-right.png" width='500'>
### estimateAntibiotics.bottomLeft()
```
estimateAntibiotics.bottomLeft(oDom, config)

//config example
{

}

```
It will render as below:

<img src="./docs/estimate-antibiotics-bottom-left.png" width='500'>


## How to join development?
You'd better have experience in tools and knowledges as below:
* 2 versions packaged by rollup/webpack
* process monitored by webpack
* Coordinate System in Geometry
* Distributions in Math
* fitting and approching curve functions in Math and Statistics



### FAQ
#### 1. Q: how to configure font-family in canvas or svg?

   **A**: In canvas, fonts render in the thread of canvas on GPUs. As a result, it behaves totally different from odinary html or svg in the renderer thread. You'd better preload 3rd fonts at ahead.

   **Included or required by js bundler like webpack are not valid.**

   **When the canvas context resizes ,it also transfers to the default browser settings**
