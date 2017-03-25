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



// for fast query
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
        if (_e != SQL.prototype[_k]) {
            if ($C) {
                _ret[++_i] = _e;
            }
        }
    }
    return _ret;
}.toString();

// extend Query method
var Query = function(exp) {
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
        return fn(this.data);
    } catch (e) {
        return [];
    }
}



function SQL(data) {
    this.type = 'SQL';
    this.data = data;
}

export function sql(data) {
    return new SQL(data)
}


SQL.prototype = {
    constructor: SQL,
    Query: Query
}
