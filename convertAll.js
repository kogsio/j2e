var fs = require('fs');
var parse = require('csv-parse');

const convert = (input,output) => {

    var parser = parse({delimiter: ','}, function(err, data){
        var rows    = data.length;
        var columns = data[0].length;
        var headers = data[0];    
        console.log('rows,columns,headers: ',rows,columns,headers);

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

        // write listings to file
        fs.writeFile(output, JSON.stringify(items), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    });

    fs.createReadStream(input).pipe(parser);    

}


convert('data/categories.csv', 'data/categories.js');
convert('data/customers.csv', 'data/customers.js');
convert('data/employee_territories.csv', 'data/employee_territories.js');
convert('data/employees.csv', 'data/employees.js');
convert('data/order_details.csv', 'data/order_details.js');
convert('data/orders.csv', 'data/orders.js');
convert('data/products.csv', 'data/products.js');
convert('data/regions.csv', 'data/regions.js');
convert('data/shippers.csv', 'data/shippers.js');
convert('data/suppliers.csv', 'data/suppliers.js');
convert('data/territories.csv', 'data/territories.js');