## Reports' Graphics API Referrence

this library outputs graphics with interfaces as below
* intakeSugarDisrribution
* intakeFiberStruct
* scoreLevel
* intakeFatProportion
* intakeFatDeviation
* guideGoodness
* estimateFiber
* estimateSugar

****

#### Notifications
This library aims at making it purely free to transfer between data and graphics . The most common json struct is `config`, whose keys and values can be mostly customed.
****

#### intakeSugarDistribution
after import this function , you can call it as below:
```
intakeDistribution(oDom, config1, config2)

//oDom is a dom object

//config1 example
{
  "type": "检测值",
  "data": {
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
   "type": "标准值",
   "data": {
       '膳食纤维': 3.5,
       '低聚果糖': 2.2,
       '低聚异麦芽糖': 3.2,
       'ß-葡萄糖': 6.2,
       '葡甘露聚糖': 2.7,
       '抗性麦芽糊精': 5.2
   }
 }

```


#### intakeFiberStruct
```
intakeSugarDistribution(config)

//config example
{

}
```


### scoreLevel
```
scoreLevel(config)

//config example
{
    'score': 46.7,
    'data':{
      "低聚果糖": 0.4,
      "低聚异麦芽糖": 0.6,
      "𝜷-葡聚糖": 0.3,
      "葡甘露聚糖": 0.2,
      "抗性麦芽糊精": 0.9,
      "氨糖": 0.5,
      "饱和脂肪酸": 0.3,
      "不饱和脂肪酸":0.8,
      "鞘脂类": 0.77,
      "胆汁酸":0.12,
      "胆红素": 0.34,
      "胆固醇":0.96,
      "淀粉": 0.43,
      "膳食纤维": 0.213
    }
}

```

### intakeFatProportion
```
intakeFatProportion(config)

//config example


```
