const Parser = require('./')

let result;
let antibiotics1 = [
    ["β-内酰胺/β-内酰胺酶抑制剂", "0", "0.07846749", "0.12", "β-lactam/β-lactamase inhibitors"],
    ["青霉素类", "56.90392", "128.4729", "22.77", "penicillins"],
    ["头孢菌素类", "56.90392", "117.4241", "27.59", "cephalosporins"],
    ["碳青霉烯类", "0", "0", "0.12", "carbapenems"],
    ["氨基糖苷类", "26.4687", "41.11123", "28.55", "aminoglycosides"],
    ["四环素类", "299.4279", "362.2699", "29.28", "tetracyclines"],
    ["氯霉素类", "0.217232", "3.805371", "5.06", "chloramphenicols"],
    ["大环内酯类", "316.0028", "359.5278", "41.45", "macrolides"],
    ["林可酰胺类", "399.4152", "383.8253", "52.65", "lincosamides"],
    ["利福霉素类", "0", "0", "0.12", "rifampins"],
    ["糖肽类", "1.857108", "1.63446", "52.53", "glycopeptides"],
    ["多粘菌素类", "5.450041", "4.545008", "53.73", "polymyxins"],
    ["磷霉素类", "0", "0.3075992", "0.12", "fosfomycins"],
    ["喹诺酮类", "0", "0", "0.12", "quinolones"],
    ["磺胺类", "31.66375", "34.33797", "47.11", "sulfonamides"]
];


result=Parser.parse(antibiotics1);

if(result.gap!===[]){
  throw Error('parser failed!\n');
}