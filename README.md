# Recruitment task for Albacross

An interactive data visualisation frontend application using REACT and [Binance public API](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md). 

Binance endpoints used:
```
GET api/v3/exchangeInfo
```
Gets list of cryptocurrency pairs (eg. ETHBTC, BTCUSDT).

```
GET /api/v3/klines
```
Gets last 500 prices of a cryptocurrency pair.

The application lists all cryptocurrency pairs (dynamically loaded) traded on Binance market and draws the price chart for a selected time interval of:

* 1m - 1 minute
* 5m - 5 minutes
* 15m - 15 minutes
* 1h - 1 hour
* 1d - 1 day

Prices are fetched on the fly from Binance API every time the selected currency pair or time interval changes. Additionaly a color picker is used for changing the chart color to demonstrate interaction with data on screen.

A few automated tests are included. All API calls in tests are mocked.

Webpack configuration is also included.

## Tech stack used
* `Node.js`
* `React`
* `TypeScript` with `Babel` compiler
* `Webpack`
* `ESLint` for static code analysis and code styling
* `Jest` for automated testing

Node.js + React + TypeScript make a perfect full-stack for building a modern, scalable, and high-quality web applications. Webpack helps to deploy large scale projects. It has been used in this project mainly for demostration. ESLint performs static code analysis to spot errors at an early stage and watches code style guidelines. Finally Jest runs automatic tests making sure the app won't break after a new feature is implemented.


Pros:
* a mix of modern, well regarded technologies
* full frontend end backend development environment
* TypeScript client and server side
* deployment script with dev and prod configuration
* well structured project
* testing environment ready
* code linting script
* code styling script

Cons:
* setup seems well over a small project requirements
* maintenance of project's configuration may be a headache with so many config files 

Future improvements:
* more automated tests
* new features, use more Binance API endpoints
* database for caching Binance data

## Installation, building and testing
Get the code from Github repo and install required modules
```
$ npm install
```
Run automatic tests
```
$ npm run test
```
Run code linter
```
$ npm run lint
```

## Running the app
Run the app on a local dev server
```
$ npm start
```
or build the webpack bundle
```
$ npm run build
```
and copy files from the build folder to your web server.
