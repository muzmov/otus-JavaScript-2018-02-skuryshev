const fs = require('fs');
const path = require('path');

function read(dir, done) {
    var results = {
        files: [],
        dirs: []
    };
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    results.dirs.push(file);
                    read(file, function (err, res) {
                        results.files = results.files.concat(res.files);
                        results.dirs = results.dirs.concat(res.dirs);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.files.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

const dir = process.argv[2] || 'node_modules';

read(dir, (err, res) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("files:");
    res.files.forEach(f => console.log(f));
    console.log("dirs:");
    res.dirs.forEach(d => console.log(d));
});