var exports = module.exports = {};
var unirest = require('unirest');

try {
var config  = require('./config.js');
}
catch (e) {
 console.log('no config')
};

const moltin = require('@moltin/sdk');
const Moltin = moltin.gateway({
  client_id: process.env.client_id || config.client_id,
  client_secret: process.env.client_secret || config.client_secret
});

// takes the floship object that has been filled with the correct data from a moltin order and sends it to floship using the unirest http client library
exports.new_floship_order = function(floship_template) {
  
    unirest.post('https://sandbox.floship.com/api/v1/orders/')
      .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Token ' + config.floship_token})
      .send(floship_template)
      .end(function (response) {

    if(response.code === 201) {
      console.log("floship order has been created")
    } else {
      console.log("floship request failed with a " + response.code)
      console.log(response.body)
    }
  });
  
};

// take moltin order items, matches each item with it's floship counterpart, and adds the correct floship data to an order_lines array so that it can be added to the floship_template later
exports.get_order_items = function(order_id, floship_template, callback) {
  
  console.log("get_order_items is running")
  
  Moltin.Orders.Items(order_id)
  
    .then((items) => {
      
      var data = items.data;
      var order_lines = [];
      
      data.forEach((item) => {
        var inventory = [{moltin_id: "e2eac233-d094-4338-aa7e-d4282dcb27b5", id: "9662", customs_value: {amount: 599.00, currency: "USD"}}, {moltin_id: "fa80e272-14f8-44ac-aa04-573a59611921", id: "9662", customs_value: {amount: 799.00, currency: "USD"}}];    
        moltin_product_id = item.product_id;  
        quantity = item.quantity;
        
        var getFloShipItem = function (arr, value, callback) {
            var result  = arr.filter(function(o){return o.moltin_id == value;} );
            callback(result? result[0] : null, order_lines); // or undefined  
        };
        
        getFloShipItem(inventory, moltin_product_id, function(result, order_lines) {  
            if (result != undefined) {
              order_lines.push({
                "item_id": result.id,
                "quantity": quantity,
                "customs_value": {
                  "amount": result.customs_value.amount,
                  "currency": result.customs_value.currency
                }
                
              });
          };
          });      
      })
      return order_lines
    })

    .then((order_lines) => { 
      callback(order_lines)
    })

    .catch((e) => {
      console.log(e);
    });
};
