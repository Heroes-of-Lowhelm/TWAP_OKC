require('dotenv').config({path: __dirname + '/.env'})

const axios = require('axios');


const now = Date.now();
// Before 1 hr ahead: 3600 000 mil sec
const before = new Date(now - 3600000).toISOString();
const apiKey = process.env.COIN_API_KEY;

let config = {
  method: 'get',
  url: `https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=1MIN&time_start=${before}`,
  headers: { 
    'X-CoinAPI-Key': `${apiKey}`
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


const MAX_RETRIES = process.env.MAX_RETRIES || 5
const SLEEP_INTERVAL = process.env.SLEEP_INTERVAL || 30
const privateKey = process.env.OWNER_WALLET_PRIVATEKEY;

(async () => {
    setInterval(async () => {
        try {
            await processRequest();
        } catch (e) {
            console.log("err while processing Queue=====>", e);
        }
    }, SLEEP_INTERVAL * 60 * 1000)
})()
