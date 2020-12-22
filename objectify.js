// ------------------------------------
//   Create object from data
//      - first row is column headers
//      - returns data
// ------------------------------------

var fs = require('fs');
var parse = require('csv-parse');

module.exports = (data) => {

    var rows    = data.length;
    var columns = data[0].length;
    var headers = data[0];    

    // create array of listing objects
    var items = [];
    var item;
    for(var i=1; i<rows; i++){
        item = {};
        for(var j=0; j<columns; j++){
            item[headers[j]] = data[i][j];
        }
        items.push(item);
    }
    return items;
}