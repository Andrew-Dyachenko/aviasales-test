# Aviasales performed test

> Aviasales demo tickets list - inpired by real [app](https://www.aviasales.ru/)

[![https://andrew-dyachenko.github.io/aviasales-test/](https://img.shields.io/website-up-down-green-red/https/shields.io.svg?label=live+demo)](https://andrew-dyachenko.github.io/aviasales-test/)

![MIT License](https://img.shields.io/github/license/Andrew-Dyachenko/aviasales-test.svg)
[![Build Status](https://scrutinizer-ci.com/g/Andrew-Dyachenko/aviasales-test/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Andrew-Dyachenko/aviasales-test/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Andrew-Dyachenko/aviasales-test/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Andrew-Dyachenko/aviasales-test/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/Andrew-Dyachenko/aviasales-test/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Andrew-Dyachenko/aviasales-test/?branch=master)
![](https://img.shields.io/github/issues/Andrew-Dyachenko/aviasales-test.svg)
![](https://img.shields.io/github/stars/Andrew-Dyachenko/aviasales-test.svg)
![](https://img.shields.io/github/forks/Andrew-Dyachenko/aviasales-test.svg)
![](https://img.shields.io/github/repo-size/andrew-dyachenko/aviasales-test.svg?style=flat)

## Test task
Test task were taken from [here](https://github.com/Andrew-Dyachenko/test-tasks/tree/master/DEPRECATED_aviasales)

## Demo
[https://andrew-dyachenko.github.io/aviasales-test/](https://andrew-dyachenko.github.io/aviasales-test/)

![Preview of the application made according to the test task from the Aviasales company](https://github.com/Andrew-Dyachenko/aviasales-test/blob/gh-pages/aviasales-test-app-preview.gif?raw=true)

## Libraries
This is mainly bootstrapping and builded with next libraries
- [create-react-app](https://github.com/facebook/create-react-app)

## Changelog
- v1.1.6 Fix(fallback): "Mixed Content Security Policy" - Error due http/https mix while fetch fresh rates
- v1.1.5
  - Fix(start): Invalid property 'align' fixed
  - Fix(start): the "path" argument must be of type string
  - Fix(start): webpack is not a function
- v1.1.4
  - Updating outdated NPM packages to the latest minor / patch versions
  - After updating NPM packages, a bug in the tests was fixed
  - Fixes aimed at changes in the api.exchangeratesapi.io API. Now it's need to pass an unique key when requesting data. In the free version of the subscription plan, the request for a list of specific symbols and base symbol is no longer available. To walkaround that issue special static adapter were added.
- v1.1.3 Ticket action block sliding while page loading fix. Added homepage in the `package.json` to match dev and deploy paths.
- v1.1.2 Move hosting to gh-pages
- v1.1.1 Maximum call stack size exceeded - invokes on w.resize bugfix
- v1.1.0 Canvas plane plume animation
- v1.0.0 The main planned functionality

## License

MIT © [Andrew-Dyachenko](https://github.com/Andrew-Dyachenko)
