// ------------------------------------
//   Parse csv file, return data
//      - input is path to csv file
//      - returns data
// ------------------------------------

const fs = require('fs');
const parse = require('csv-parse');

module.exports = (input) => {

    return new Promise((resolve,reject) => {

        data = [];
        const stream = fs.createReadStream(input);
        const parser   = stream.pipe(parse({delimiter: ','}));

        parser.on('data', (row) => data.push(row));
        parser.on('end', () => resolve(data));
    });

};