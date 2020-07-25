# DC Central Kitchen SMS delivery alerts

This was developed for DC Central Kitchen's Healthy Corners initiative. Users who opt in for product delivery alerts are notified via SMS once a day when any of their 'favorite' stores receive new product deliveries.

## Local development

To run this project on your computer you will
 need to download and install [Node.js](http://nodejs.org/), which should also install
[npm](https://www.npmjs.com/).

1. Open `.env.example` at the root of the project and update it with
   values from your
   [Twilio account](https://www.twilio.com/console), Airtable, and local configuration. Save the file as `.env`.  You'll need to set:
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_NUMBER`
   - `REACT_APP_AIRTABLE_API_KEY`

    Run `source .env` to export the environment variables.

2. Navigate to the project directory in your terminal and run:

  ```bash
  $ npm install
  ```
    This should install all of our project dependencies from npm into a local
    `node_modules` folder.

3.  To trigger a delivery alert, you can use `node sendAlert.js` in the project's root directory.

### Related Projects
- <https://github.com/calblueprint/dccentralkitchen>
- <https://github.com/calblueprint/dccentralkitchen-node>
- <https://github.com/calblueprint/dccentralkitchen-clerks>


---
*Adapted from [this tutorial](https://www.twilio.com/docs/tutorials/walkthrough/server-notifications/node/express) by Twilio Developer Education.*
