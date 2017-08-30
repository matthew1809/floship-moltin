import http from "k6/http";

export default function() {
  
  var url = "http://743e70ab.ngrok.io/orders";
  
  var payload = 
    {
      body: 
       { id: '805a50b3-2862-43c1-89c7-0f2a7e9dfcbd',
         triggered_by: 'order.created',
         attempt: 1,
         integration: 
          { id: '01d5be8b-5847-4737-868d-795052e8f0ee',
            integration_type: 'webhook',
            name: 'mailchimp' },
         resources: '{"data":{"type":"order","id":"346ece30-9188-4cfb-93d4-3022d21440e4","status":"incomplete","payment":"unpaid","shipping":"not_shipped","customer":{"name":"matt","email":"matt@moltin.com"},"shipping_address":{"first_name":"Matt Foyle","last_name":"","company_name":"Moltin","line_1":"Carliol Square","line_2":"none","city":"","postcode":"DH12HD","county":"Newcastle","country":"UK","instructions":"none"},"billing_address":{"first_name":"Matt Foyle","last_name":"","company_name":"Moltin","line_1":"Carliol Square","line_2":"none","city":"","postcode":"DH12HD","county":"Newcastle","country":"UK"},"links":{},"meta":{"display_price":{"with_tax":{"amount":80000,"currency":"","formatted":"80000"},"without_tax":{"amount":80000,"currency":"","formatted":"80000"}},"timestamps":{"created_at":"2017-08-30T10:06:57.533Z","updated_at":"2017-08-30T10:06:57.533Z"}},"relationships":{"items":{"data":[{"type":"item","id":"dd4fe7f7-5079-4ad2-b23c-cf5c65b4c60d"}]}}}}' },
  };
  
  var params =  { headers: { "Content-Type": "application/json" } };
  
  http.post(url, payload, params);
};


