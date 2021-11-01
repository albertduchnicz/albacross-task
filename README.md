# Recruitment task for Albacross

An interactive data visualisation frontend application using REACT and [Binance public API](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md). 

Endpoints used:
```
GET api/v3/exchangeInfo
```
Get list of cryptocurrency pair (eg. ETHBTC).

```
GET /api/v3/klines
```
Get last 500 prices of a cryptocurrency pair.

The application lists all cryptocurrency pairs (dynamically loaded) traded on Binance market and draws the price chart for a selected time interval of:

* 1m - 1 minute
* 5m - 5 minutes
* 15m - 15 minutes
* 1h - 1 hour
* 1d - 1 day

Prices are fetched on the fly from Binance API every time a currency pair or time interval updates. Additionaly a color picker is used for changing the chart color to demonstrate interaction with data on screen.

A few automated tests are included and API calls are mocked.

Webpack configuration is also included.

## Tech stack used

* `Node.js`
* `React`
* `TypeScript`
* `WebPack`
* `ESLint` for static code analysis
* Jest for automated testing

## Installation, building and testing

Get the code from Github repo and install required modules
```
$ npm install
```

To build the webpack bundle run
```
$ npm run build
```
Copy files from the build folder to your web server.

Running automatic tests
```
$ npm run test
```
