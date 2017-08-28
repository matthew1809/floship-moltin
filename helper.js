var exports = module.exports = {};
var config     = require('./config.js');
const moltin = require('@moltin/sdk');
const Moltin = moltin.gateway({
  client_id: config.client_id,
  client_secret: config.client_secret,
});


var new_floship_order = function(order_lines, floship_template) {
  
  floship_template.order_lines = order_lines;
  
  console.log(floship_template);
};


exports.get_order_items = function(order_id, floship_template) {
  
  var order_lines = [];
  
  Moltin.Orders.Items(order_id, floship_template)
    .then((items) => {
      
      var data = items.data;
      
      data.forEach((item) => {
        
      moltin_product_id = item.product_id;  
      
      var inventory = [{moltin_id: "5965e714-02bd-43f0-bfde-806e2f991a90", id: "123", customs_value: {amount: 599.00, currency: "USD"}}];

      function getFloShipItem(arr, value) {

          var result  = arr.filter(function(o){return o.moltin_id == value;} );

          return result? result[0] : null; // or undefined

      }
      
      getFloShipItem(inventory, moltin_product_id)
        
      // order_lines.push({
      //   "item_id": id,
      //   "quantity": item.quantity,
      //   "customs_value": {
      //     "amount": 0,
      //     "currency": ""
      //   }
      // });
      
      })
    })
    
    .then(() => {
      return new_floship_order(order_lines, floship_template)
    })

    .catch((e) => {
      console.log(e);
    });
};
