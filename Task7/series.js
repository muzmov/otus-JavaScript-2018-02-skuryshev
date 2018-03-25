module.exports = function series() {
    let functions = arguments;
    if (functions.length === 0) return;
    let currentIndex = 0;
    functions[currentIndex](next);

    function next(err) {
        if (currentIndex === functions.length - 1) return;
        if (err) currentIndex = functions.length - 2;
        functions[++currentIndex](next);
    }
};