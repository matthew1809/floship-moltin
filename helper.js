var exports = module.exports = {};
var unirest = require('unirest');
var config     = require('./config.js');
const moltin = require('@moltin/sdk');
const Moltin = moltin.gateway({
  client_id: config.client_id,
  client_secret: config.client_secret,
});


exports.new_floship_order = function(floship_template) {
  
    unirest.post('https://sandbox.floship.com/api/v1/orders/')
      .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Token ' + config.floship_token})
      .send(floship_template)
      .end(function (response) {
    console.log(response.body);
  });
  
};


exports.get_order_items = function(order_id, floship_template, callback) {
  
  Moltin.Orders.Items(order_id)
  
    .then((items) => {
      
      var data = items.data;
      
      var order_lines = [];
      
      data.forEach((item) => {
        
        var inventory = [{moltin_id: "5965e714-02bd-43f0-bfde-806e2f991a90", id: "123", customs_value: {amount: 599.00, currency: "USD"}}, {moltin_id: "b5b9c7f1-2302-4ab8-a8a6-ddbd1fde5b56", id: "123", customs_value: {amount: 599.00, currency: "USD"}}];  
          
        moltin_product_id = item.product_id;  
        
        quantity = item.quantity;
        
        var getFloShipItem = function (arr, value, callback) {

            var result  = arr.filter(function(o){return o.moltin_id == value;} );

            callback(result? result[0] : null, order_lines); // or undefined
            
        }
        
        getFloShipItem(inventory, moltin_product_id, function(result, order_lines) {
          console.log(moltin_product_id)
          
            if (result != undefined) {
              
            order_lines.push({
              "item_id": result.id,
              "quantity": quantity,
              "customs_value": {
                "amount": result.customs_value.amount,
                "currency": result.customs_value.currency
              }
            });
            
            console.log(order_lines)
            }
          })
          
      })
    
    return (order_lines)
    
  })

    .then((order_lines) => {
      
      callback(order_lines)
    
    })

    .catch((e) => {
      console.log(e);
    });
    
    
};
