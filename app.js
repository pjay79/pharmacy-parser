#!/usr/bin/env node

require('dotenv').config();
const CSVToJSON = require('csvtojson');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const axios = require('axios');
const axiosRetry = require("axios-retry");
const { Client, Status } = require('@googlemaps/google-maps-services-js');

const client = new Client({});

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  shouldResetTimeout: true,
  retryCondition: (axiosError) => {
    return true;
  },
});

(async function() {
    clear();

    console.log(chalk.yellow(
        figlet.textSync('The Pharmacist', { horizontalLayout: 'full' })
    ));

    console.log(chalk.cyan('Processing...'));                    
    console.log('--------------------------------------------------------------');

    try {
        const args = process.argv.slice(2);
        const filename = args[0];
        const apiKey = args[1];
        const data = await CSVToJSON().fromFile(filename);

        const currentPath = process.cwd();

        const d = new Date();
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

        const currentDate = `${da}-${mo}-${ye}`;

        let formattedList = [];
        let id = 0;

        for (let item of data) {
            let newItem = {};

            id++;

            newItem.id = id;

            newItem.name = item['Pharmacy Name'];

            newItem.address = `${item.Address}, ${item.City}, ${item.State} ${item['Post Code']}`;

            newItem.suburb = item.City;

            newItem.state = item.State;

            newItem.postcode = parseInt(item['Post Code']);

            newItem.phone = item.Phone;

            newItem.homeDelivery = item['Home Delivery Service Available'] === 'Yes' ? true : false;

            setTimeout(() => client
                .geocode({
                    params: {
                        address: newItem.address,
                        key: apiKey,
                    },
                    rate: 50,
                    timeout: 2000,
                })
                .then((response) => {
                    newItem.coords = {
                        lat: response.data.results[0].geometry.location.lat, lng: response.data.results[0].geometry.location.lng,
                    };
                    console.log(newItem);
                    console.log('--------------------------------------------------------------');

                    formattedList.push(newItem);
                    formattedList.sort((a,b) => a.id - b.id);

                    fs.writeFile(
                        `${currentPath}/output-${currentDate}.js`,
                        JSON.stringify(formattedList, null, 4).replace(/"([^"]+)":/g, '$1:'),
                        (err) => {
                        if (err) {  
                            console.log(err)
                        }  
                        return;
                    });
                })
                .catch((error) => {
                    console.log(error);
                }), 1000 * id);
        }   
    } catch (err) {
        console.log(chalk.red('Error'));
        console.log(err);
    }
})();