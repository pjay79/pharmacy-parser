const CSVToJSON = require('csvtojson');
const fs = require('fs');
const axios = require('axios');
const {Client, Status} = require('@googlemaps/google-maps-services-js');
const client = new Client({});

const axiosRetry = require("axios-retry");

// we attach the retry to our axious instance
axiosRetry(axios, {
  // The number of retry attempts
  retries: 3,

  // The delay between retries attempts
  // receives a function to calculate the delay
  // axios provides a function exponentialDelay 
  // for exponential growth of delay
  retryDelay: axiosRetry.exponentialDelay,

  // Defines if the timeout should be reset between retrie
  // Unless shouldResetTimeout is set
  // the plugin interprets the request timeout as a global value,
  // so it is not used for each retry 
  // but for the whole request lifecycle.
  shouldResetTimeout: true,

  // Callback to further control if a request should be retried.
  // By default, it retries if it is a network or a 5xx error
  // on an idempotent request (GET, HEAD, OPTIONS, PUT or DELETE).
  // Use the axios error object to make desitions about the retry
  retryCondition: (axiosError) => {
    return true;
  },
});


(async () => {
    try {
        const data = await CSVToJSON().fromFile('./pharmacy-main-1.csv');

        let formattedList = [];
        let id = 0;

        for (let item of data) {
            let newItem = {}
            id++;
            newItem.id = id;
            newItem.name = item['Pharmacy Name'];
            newItem.address = `${item.Address}, ${item.City}, ${item.State} ${item['Post Code']}`;
            newItem.phone = item.Phone;
            newItem.homeDelivery = item['Home Delivery Service Available'] === 'Yes' ? true : false;

            client
                .geocode({
                    params: {
                        address: newItem.address,
                        key: 'AIzaSyAkH7ZamW7d02l-uUmx25pV_DdQ3uxBJys',
                    },
                    rate: 200,
                    timeout: 10000, // milliseconds
                })
                .then((response) => {
                    newItem.coordinates = { lat: response.data.results[0].geometry.location.lat, lng: response.data.results[0].geometry.location.lng };
                    console.log(newItem);
                    formattedList.push(newItem);
                    fs.writeFile('./pharmacy-main-1.js', JSON.stringify(formattedList, null, 4), (err) => {
                        if (err) {  console.error(err);  return; };
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    } catch (err) {
        console.log(err);
    }
})();