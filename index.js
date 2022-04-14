var m = math.create(math.all);

var newImports = {};

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

// Import the new functions
m.import(newImports);
Object.entries(newImports).map(f => {
    console.log('IMPORTED: ' + f[0]);
})

// Under this comment is the code for the local api that will be used by the frontent (MIT App Inventor)
var backend = {};

backend['evaluate'] = function (expression, scope = {}) {
    var ret = {value: undefined, error: undefined};
    try {
        ret.value = m.evaluate(expression, scope);
    } catch (e) {
        ret.error = e.toString();
    }
    return ret;
}