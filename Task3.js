const { Readable, Writable } = require('stream');

const readStream = new Readable({
    read(size){
        if (this.currentCharCode > 90){
            this.push(null);
            return;
        }
        this.push(String.fromCharCode(this.currentCharCode++));
    }
})
const writeStream = new Writable({
    write(chunk, encoding, callback) {
        console.log(`Writing: ${chunk.toString()}`);
        setTimeout(() => {
            callback();
        },1000);
    }
})
readStream.currentCharCode = 65;
readStream.pipe(writeStream);
