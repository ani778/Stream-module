const fs = require('fs');
const path = require('path');
const inputFilePath = path.join(__dirname, 'file.txt');
const outputFilePath = path.join(__dirname, 'file.txt');

const readableStream = fs.createReadStream(inputFilePath, {
    encoding: 'utf-8',
    // highWaterMark: 10
});

const writeableStream = fs.createWriteStream(outputFilePath);

// With events
readableStream.on('data', (chunk) => {
    console.log(chunk);
    writeableStream.write(chunk)
});

readableStream.on('end', () => {
    writeableStream.end();
});

// With pipe()
readableStream.pipe(writeableStream)