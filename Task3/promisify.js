const fs = require('fs');

function promisify(orig) {
    var slice = Function.call.bind(Array.prototype.slice);
    var concat = Function.call.bind(Array.prototype.concat);
    return function() {
        var args = slice(arguments);
        var self = this;
        return new Promise(function (resolve, reject) {
            orig.apply(self, concat(args, function (err) {
                var values = arguments.length > 1 ? slice(arguments, 1) : [];
                if (err) reject(err);
                else resolve(values[0]);
            }));
        });
    };
}

fs.readFile('event.js', (err, data) => console.log(data));
promisify(fs.readFile)('event.js').then(data => console.log(data));

