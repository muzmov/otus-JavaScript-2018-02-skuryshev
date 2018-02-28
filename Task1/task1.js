function sum(a) {
    return sum0.bind(null, a);
}

function sum0(s, a) {
    if (a) return sum0.bind(null, s + a);
    return s;
}

function create(proto) {
    function Result() {}
    Result.prototype = proto;
    return new Result;
}

Object.create = create;
