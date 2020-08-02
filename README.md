![npm](https://img.shields.io/npm/v/the-pharmacist-delivers)
![NPM](https://img.shields.io/npm/l/the-pharmacist-delivers)

# The Pharmacist Delivers

<img width="720" alt="the-pharmacist" src="https://user-images.githubusercontent.com/14052885/89088671-f5e65400-d3dc-11ea-8690-5f83d37da949.png">

This package was created to help convert data containing a list of pharmacies from a spreadsheet (.csv file) into an array of objects. This package will require a valid Google API key with unrestricted access to the Geocoding API. This is used to obtain the pharmacy coordinates (lat/lng).

Spreadsheet csv file should have the following columns:

- Pharmacy Name (string: eg The Pharmacist)
- Address (string: eg 1 LaTrobe Street)
- City (string: eg Melbourne)
- State (string: eg VIC)
- Post Code (number: eg 3000)
- Home Delivery Service Available (string: eg Yes or No)

# Installation

```npm install -g the-pharmacist-delivers```  

# Usage

```the-pharmacist-delivers```

Follow the prompts and enter the filename and Google API key.

An output.js file with will be generated with the transformed data.


