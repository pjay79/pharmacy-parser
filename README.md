# Pharmacy Parser

This package was created to help convert data containing a list of pharmacies from a spreadsheet (.csv file) into an array of objects. This package will require a valid Google API key with unrestricted access to the Geocoding API. This is used to obtain the pharmacy coordinates (lat/lng).

Spreadsheet csv file should have the following columns:

- Pharmacy Name
- Address
- City
- State
- Post Code
- Home Delivery Service Available

# Installation

```npm install -g the-pharmacist-delivers```  

# Usage

```the-pharmacist-delivers```

Follow the prompts and enter the filename and Google API key.

An output.js file with will be generated with the transformed data.


