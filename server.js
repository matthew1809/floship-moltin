var express    = require('express')
var https      = require("https");
var bodyParser = require('body-parser');
var helper     = require('./helper.js')

var app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/orders', function (req, res) {
  
  var floship_template = {
    "order_lines": [],
    "shipping_address": {
      "company": "",
      "addressee": "",
      "address_1": "",
      "city": "",
      "state": "",
      "postal_code": "",
      "country": ""
    },
    "courier_id": 0,
    "customer_reference": ""
  };
  
  pbody = JSON.parse(req.body.resources)
  
  let order_id = pbody.data.id;
  
  floship_template.shipping_address.addressee = pbody.data.shipping_address.first_name;
  floship_template.shipping_address.address_1 = pbody.data.shipping_address.line_1;
  floship_template.shipping_address.state = pbody.data.shipping_address.county;
  floship_template.shipping_address.postal_code = pbody.data.shipping_address.postcode;
  floship_template.shipping_address.country = pbody.data.shipping_address.country;

  //console.log('order id is: ' + order_id);
  
  return helper.get_order_items(order_id, floship_template);

});

app.listen(3000, function () {
  console.log('Floship app listening on port 3000!')
});