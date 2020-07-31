# CSV Pharmacy Location Parser

This package was created to help convert data from a spreadsheet into an array of objects.This data is used specifically for data containing pharmacy names. This package will require a valid Google API key with unrestricted access to the Geocoding API. This is used to obtaint the pharmacy coordinates (lat/lng).

Spreadsheet csv file should have the following columns:

- Pharmacy Name
- Address
- City
- State
- Post Code
- Home Delivery Service Available

# Installation

```npm install -g generate-pharmacy-list```  

# Useage

```generate-pharmacy-list --filename data.csv --apiKey qwefwer891230923```


