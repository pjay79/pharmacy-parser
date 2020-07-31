# CSV Pharmacy Location Parser

This package was created to help convert data from a spreadsheet into an array of objects. 

This data is used specifically for data containing pharmacy names. 

This package will require a valid Google API key with unrestricted access to the Geocoding API. This is used to obtaint the pharmacy coordinates (lat/lng).

Spreadsheet csv file should have the following columns:

- Pharmacy Name
- Address
- City
- State
- Post Code
- Home Delivery Service Available

To convert file run the following command:

```node app.js './src/files/pharmacy-list.csv'```

Make sure you have a .env file in the root with your GOOGLE_API_KEY.
