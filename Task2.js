const { Transform } = require('stream');
const path = require('path');
const fs = require("fs");

const inputFilePath = path.join(__dirname, 'data.json');
const outputFilePath = path.join(__dirname,'output.json');

const myTransform = new Transform({
    // readableObjectMode: true,
    // writableObjectMode: true,
    transform(chunk, encoding, callback) {
        try{
            const jsonArray = JSON.parse(chunk.toString());

            const modifiedArray = jsonArray.map(jsonObj => {
                jsonObj.timestamp = new Date().toISOString()
                return jsonObj
            })

            this.push(JSON.stringify(modifiedArray, null, 2))
            callback();
        } catch {
            console.log('ERROR!')
        }
    }
})
const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });
const writeStream = fs.createWriteStream(outputFilePath, { encoding: 'utf8' });

readStream.on('error', (err) => console.error('Read stream error:', err));
writeStream.on('error', (err) => console.error('Write stream error:', err));

readStream.pipe(myTransform).pipe(writeStream)
