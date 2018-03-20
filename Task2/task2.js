function getPath(elem) {
    var selector = "";
    while (elem.parentElement !== document.body) {
        var elemParent = elem.parentElement;
        selector = ":nth-child(" + ( [].indexOf.call(elemParent.children, elem) + 1) + ") " + selector;
        elem = elemParent;
    }
    selector = "body " + selector;
    return selector;
}

var requred = document.querySelector("#required");
var selector = getPath(requred);
console.log(selector);
var found = document.querySelector(selector);
console.log(requred === found);

function promiseReduce(promises, reduce, initial) {
    return new Promise((resolve, reject) => {
        var result = initial;
        var unprocessed = promises.length;
        if (unprocessed === 0) resolve(result);
        promises.forEach(p => p.then(res => {
                result = reduce(result, res);
                done();
            })
        );

        function done() {
            if (--unprocessed === 0) resolve(result);
        }
    });
}

var promise0 = Promise.resolve(0),
    promise1 = Promise.resolve(1),
    promise2 = Promise.resolve(2);

promiseReduce(
    [promise0, promise1, promise2],
    (a, b) => a + b,
    0
)
    .then(res => console.log(res))