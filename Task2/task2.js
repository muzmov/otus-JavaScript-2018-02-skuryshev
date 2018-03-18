function getPath(elem) {
    var selector = "";
    while (elem.parentElement !== document.body) {
        var elemParent = elem.parentElement;
        for (var i = 0; i < elemParent.children.length; i++) {
            if (elemParent.children[i] === elem) {
                selector = ":nth-child(" + (i + 1) + ") " + selector;
            }
        }
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
    return Promise.all(promises).then(values => {
        var result = initial;
        values.forEach(v => result = reduce(result, v));
        return result;
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