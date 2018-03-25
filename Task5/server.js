const stream = require('stream');

class RandomNumbersStream extends stream.Readable {
    constructor(num, opt) {
        super(opt);
        this.num = num || 10;
        this.count = 0;
    }

    fill() {
        setInterval(() => {
            let isFull = false;
            while (!isFull) {
                let number = Math.random();
                console.log(`Generating ${number}`);
                const buf = Buffer.from(String(number), 'ascii');
                isFull = !this.push(buf);
            }
        }, 5000);
    }

    _read() {
        console.log('_read called');
    }
}

class ConsoleStream extends stream.Writable {
    constructor(opts) {
        super(opts);
    }

    _write(chunk, encoding, done) {
        console.log(chunk.toString());
        done();
    }
}

class TransformerStream extends stream.Transform {
    constructor(opt) {
        super(opt);
    }

    _transform(chunk, encoding, done) {
        let transformedChunk = parseFloat(chunk) + Math.random();
        console.log(`Transforming ${chunk.toString()} to ${transformedChunk}`);
        this.push(transformedChunk.toString());
        done();
    }

}

const readable = new RandomNumbersStream(10, {highWaterMark: 100});
const writable = new ConsoleStream();
const transformable = new TransformerStream();

readable.pipe(transformable).pipe(writable);
readable.fill();