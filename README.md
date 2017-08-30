# Floship <> moltin

This project acts as a lightweight middleware between Floship and moltin. It listens for moltin orders, parses the correct information, creates a Floship order objects and sends it off to Floship.

It is set up to run on Heroku, so it looks for certain variables to exist in process.env i.e. client_id, client_secret.

In order to test, you will need to create a moltin integration with a type of webhook, that observes order.created, and is configured to hit the URL this app is deployed on + /orders