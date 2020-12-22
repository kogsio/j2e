// ------------------------------------
//   Parse data and create object
//      - input is path to csv file
//      - returns data object
// ------------------------------------

var parse = require('./parse.js');
var objectify = require('./objectify.js');

module.exports = async (input) => {
    const data = await parse(input);
    const obj  = await objectify(data);
    return obj;
};