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

#### intakeSugarDisrribution
after import this function , call it as below:
```
intakeDisrribution(oDom,{config1,config2})

//oDom is an dom object

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
