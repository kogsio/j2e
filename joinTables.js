var convert = require('./convert.js');

(async () => {

    // the big table for all data
    var items = [];

    // convert tables
    const order_details = await convert('data/order_details.csv');
    const products      = await convert('data/products.csv');
    const suppliers     = await convert('data/suppliers.csv');
    const orders        = await convert('data/orders.csv');    
    const customers     = await convert('data/customers.csv');        
    const shippers      = await convert('data/shippers.csv');    
    const employees     = await convert('data/employees.csv');  
    const categories    = await convert('data/categories.csv');  
    const employee_territories = await convert('data/employee_territories.csv'); 
    const territories   = await convert('data/territories.csv'); 
    const regions       = await convert('data/regions.csv'); 

    // console.log(products);
    // var result = products.find(item => item.productID === '10');
    // if (result) console.log(result);

    // join all the northwind data into one table
    // -----------------------------------------------
    order_details.forEach(order =>{
        var result = products.find(item => item.productID === order.productID);
        if (result) {
            order.productsProductName  = result.productName;
            order.productsSupplierID   = result.supplierID;    
            order.productsCategoryID   = result.categoryID;    
            order.productsQuantityPerUnit = result.quantityPerUnit;  
            order.productsUnitPrice    = result.unitPrice;      
            order.productsUnitsInStock = result.unitsInStock;        
            order.productsUnitsOnOrder = result.unitsOnOrder;        
            order.productsReorderLevel = result.reorderLevel;        
            order.productsDiscontinued = result.discontinued;
        }

        var result = suppliers.find(item => item.supplierID === order.productsSupplierID);
        if (result) {
            order.suppliersCompanyName  = result.companyName; 
            order.suppliersContactName  = result.contactName; 
            order.suppliersContactTitle = result.contactTitle;    
            order.suppliersAddress      = result.address; 
            order.suppliersCity         = result.city;    
            order.suppliersRegion       = result.region;  
            order.suppliersPostalCode   = result.postalCode;  
            order.suppliersCountry      = result.country; 
            order.suppliersPhone        = result.phone;   
            order.suppliersFax          = result.fax; 
            order.suppliersHomePage     = result.homePage;
        }

        var result = categories.find(item => item.categoryID === order.productsCategoryID);
        if (result) {
            order.categoriesCategoryID   = result.categoryID;  
            order.categoriesCategoryName = result.categoryName;    
            order.categoriesDescription  = result.description; 
            order.categoriesPicture      = result.picture;
        }

        var result = orders.find(item => item.orderID === order.orderID);
        if (result) {
            order.ordersCustomerID   = result.customerID;  
            order.ordersEmployeeID   = result.employeeID;  
            order.ordersOrderDate    = result.orderDate;   
            order.ordersRequiredDate = result.requiredDate;    
            order.ordersShippedDate  = result.shippedDate; 
            order.ordersShipVia      = result.shipVia; 
            order.ordersFreight      = result.freight; 
            order.ordersShipName     = result.shipName;    
            order.ordersShipAddress  = result.shipAddress; 
            order.ordersShipCity     = result.shipCity;    
            order.ordersShipRegion   = result.shipRegion;  
            order.ordersShipPostalCode = result.shipPostalCode;  
            order.ordersShipCountry  = result.shipCountry;
        }

        var result = customers.find(item => item.customerID === order.ordersCustomerID);
        if (result) {
            order.customersCompanyName  = result.companyName; 
            order.customersContactName  = result.contactName; 
            order.customersContactTitle = result.contactTitle;    
            order.customersAddress      = result.address; 
            order.customersCity         = result.city;    
            order.customersRegion       = result.region;  
            order.customersPostalCode   = result.postalCode;  
            order.customersCountry      = result.country; 
            order.customersPhone        = result.phone;   
            order.customersFax          = result.fax;
        }        

        var result = shippers.find(item => item.shipperID === order.ordersShipVia);
        if (result) {
            order.shippersShipperID   = result.shipperID;
            order.shippersCompanyName = result.companyName;
            order.shippersPhone       = result.phone;
        }        

        var result = employees.find(item => item.employeeID === order.ordersEmployeeID);
        if (result) {
            order.employeesLastName        = result.lastName;    
            order.employeesFirstName       = result.firstName;   
            order.employeesTitle           = result.title;   
            order.employeesTitleOfCourtesy = result.titleOfCourtesy; 
            order.employeesBirthDate       = result.birthDate;   
            order.employeesHireDate        = result.hireDate;    
            order.employeesAddress         = result.address;   
            order.employeesCity            = result.city;
            order.employeesRegion          = result.region;  
            order.employeesPostalCode      = result.postalCode;  
            order.employeesCountry         = result.country; 
            order.employeesHomePhone       = result.homePhone;   
            order.employeesExtension       = result.extension;   
            order.employeesPhoto           = result.photo;   
            order.employeesNotes           = result.notes;   
            order.employeesReportsTo       = result.reportsTo;   
            order.employeesPhotoPath       = result.photoPath;
        }        

        var result = employee_territories.find(item => item.employeeID === order.ordersEmployeeID);
        if (result) {
            order.employee_territoriesTerritoryID = result.territoryID;
        }        

        var result = territories.find(item => item.territoryID === order.employee_territoriesTerritoryID);
        if (result) {
            order.territoriesTerritoryDescription = result.territoryDescription;
            order.territoriesRegionID = result.regionID;
        }       

        var result = regions.find(item => item.regionID === order.territoriesRegionID);
        if (result) {
            order.regionsRegionDescription = result.regionDescription;
        }       

        // add to the big table
        items.push(order);
    })


    // create CSV data format
    // ------------------------

    // Use first element to choose the keys and the order
    var keys = Object.keys(items[0]);

    // Build header
    var result = keys.join(",") + "\n";

    // Add the rows
    items.forEach(function(obj){
        result += keys.map(k => obj[k]).join(",") + "\n";
    });
    console.log(result);
    // console.log(items);

    // write CSV to file
    // -------------------
    var fs = require('fs');
    fs.writeFile("data/bigtable.csv", result, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 

})();

