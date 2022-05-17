var m = math.create(math.all);

var newImports = {};
var backend = {imported: false};

newImports['integrate'] = function(args, options, scope) {
    var dx = 10**-2;
    var x = args[1].value;
    var sum = 0;
    while (x < args[2].value) {
        sum += args[0].compile().evaluate({'x': x}) * dx;
        x += dx;
    }

    return sum;
}
newImports['integrate'].rawArgs = true;

newImports['tetrate'] = function(args, options, scope) {
    var v = args[0].value;
    for (let i = 0; i < args[1].value - 1; i++) {
        v = args[0].value**v;
    }
    return v;
}
newImports['tetrate'].rawArgs = true;

newImports['logx'] = function(args, options, scope) {
    return Math.log(args[0].value) / Math.log(args[1].value);
}
newImports['logx'].rawArgs = true;

newImports['summate'] = function(args, options, scope) {
    var iterations = Math.round(args[1].value);
    var n = args[2].value;
    var f = args[0].compile();
    var sum = 0;

    for (let i = n; i <= iterations; i++) {
        sum += f.evaluate({'n': i});
    }
    return sum;
}
newImports['summate'].rawArgs = true;

newImports['indef'] = function(args, options, scope) {
    var iterations = Math.round(args[1].value);
    var n = args[2].value;
    var f = args[0].compile();
    var sum = 1;

    for (let i = n; i <= iterations; i++) {
        sum *= f.evaluate({'n': i});
    }
    return sum;
}
newImports['indef'].rawArgs = true;

// Import the new functions
m.import(newImports);
Object.entries(newImports).map(f => {
    console.log('IMPORTED: ' + f[0]);
})
backend['imported'] = true;

// Under this comment is the code for the local api that will be used by the frontend (MIT App Inventor)
backend['evaluate'] = function (expression, scope = {}, id = '', callbackType = 'async') {
    var ret = {value: undefined, error: undefined, id: id, type: 'evaluate', callback: callbackType};
    try {
        ret.value = m.evaluate(expression, scope);
    } catch (e) {
        ret.error = e.toString();
    }
    return ret;
}

backend['runJS'] = function(args) {
    var ret;
    try {
        ret = eval(args);
    } catch(err) {
        if (err) ret = err;
    }
    return ret;
}
