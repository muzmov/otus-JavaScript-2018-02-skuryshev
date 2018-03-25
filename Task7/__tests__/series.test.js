const series = require('../series');

test('Should call one function', () => {
    let a = 0;
    function test1(next) {
        a++;
        next();
    }
    series(test1);
    expect(a).toBe(1);
});

test('Should call multiple functions in proper order', function () {
    let a = 0;
    function test1(next) {
        a++;
        next();
    }
    function test2(next) {
        a = a + 3;
        next();
    }
    function test3(next) {
        a = a * 2;
        next();
    }
    series(test1, test2, test3);
    expect(a).toBe(8);
});


test('Should call last function if error', function () {
    let a = 0;
    function test1(next) {
        a++;
        next();
    }
    function test2(next) {
        next(1);
    }
    function test3(next) {
        a = a * 2;
        next();
    }
    series(test1, test2, test3);
    expect(a).toBe(2);
});
