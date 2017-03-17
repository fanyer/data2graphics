function SQL() {
  this.type='SQL'
}


SQL.prototype={
  constructor: SQL
}

export function sql(argument) {
  retrun new SQL()
}


var template = function(queryArr) {

    var count = 0;

    for (var i = 0; i < queryArr.length; i++) {

        var e = queryArr[i];

        if ($express) {
            count++;
        }
    }

    return count;
}


var createIntance = function(exp) {
    var fun = template.toString().replace("$express", exp).toString();
    return eval("0," + fun);
}




// usual basic function
var len = function(s) {
    return s.length;
}
var left = function(s, n) {
    return s.substr(0, n);
}
var right = function(s, n) {
    return s.substr(-n);
}
var index = function(s, find) {
    return s.indexOf(find) + 1;
}

// extend prototype
var _proto = Object.prototype;

// for fast quert
var _cache = {};

// extend operator
var _alias = [
    /@/g, "_e.",
    /AND/gi, "&&",
    /OR/gi, "||",
    /<>/g, "!=",
    /NOT/gi, "!",
    /([^=<>])=([^=]|$)/g, '$1==$2'
];

var _rQuote = /""/g;
var _rQuoteTemp = /!~/g;

// compile
var _complite = function(code) {
    return eval("0," + code);
}

// convert operator to standard js symbols
var _interpret = function(exp) {
    exp = exp.replace(_rQuote, "!~");
    var arr = exp.split('"');
    var i, n = arr.length;
    var k = _alias.length;

    for (var i = 0; i < n; i += 2) {
        var s = arr[i];
        for (var j = 0; j < k; j += 2) {
            if (index(s, _alias[j]) > -1) {
                s = s.replace(_alias[j], _alias[j + 1]);
            }
        }
        arr[i] = s;
    }

    for (var i = 1; i < n; i += 2) {
        arr[i] = arr[i].replace(_rQuoteTemp, '\\"');
    }
    return arr.join('"');
}

// define template function
var _templ = function(_list) {
    var _ret = [];
    var _i = -1;

    for (var _k in _list) {
        var _e = _list[_k];
        if (_e != _proto[_k]) {
            if ($C) {
                _ret[++_i] = _e;
            }
        }
    }
    return _ret;
}.toString();

// extend Query method
_proto.Query = function(exp) {
    if (!exp) {
        return [];
    }

    var fn = _cache[exp];

    try {
        if (!fn) {
            var code = _interpret(exp);
            code = _templ.replace("$C", code);
            fn = _cache[exp] = _complite(code);
        }
        return fn(this);
    } catch (e) {
        return [];
    }
}
