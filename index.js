let fs = require('fs');
let Q = require('q');
const chalk = require('chalk');

/**
 * Declare variables
 */
let instance = null;
let targetBreakpointIndex = undefined;
let breakpoints = undefined;
let generalMessages = undefined;
let specificMessages = undefined;

/**
 * Import modules
 */

let pollutantBreakpointFinder = require('./utils/PollutantBreakpointFinder');
let constants = require('./utils/Constants');


let calculateAQI = function(){

}


class AQICalculator {
  constructor() {
    // TODO: refactor reading file to asynchronous function
    breakpoints = JSON.parse(fs.readFileSync('./resources/aqi-breakpoint.json', 'utf8'));
    generalMessages = JSON.parse(fs.readFileSync('./resources/aqi-general-messages.json', 'utf8'));  
    specificMessages = JSON.parse(fs.readFileSync('./resources/aqi-specific-messages.json', 'utf8'));
  }

  getRegularAQIResult(pollutantCode, concentration) {
    /* Grab concentration object */
    return Q.Promise((resolve, reject) => {
      pollutantBreakpointFinder.getConcentrationRangeWithAvgConcentration(pollutantCode, concentration, breakpoints).then((breakpointIndex) => {
        targetBreakpointIndex = breakpointIndex;
        
      }, (err) => {
        reject(err);
      });
    });
  }

  getNowcastAQIResult(pollutantCode, concentrations) {

  }
}

const AQICalculatorInstance = new AQICalculator();

module.exports = {
  AQICalculator: AQICalculatorInstance,
  PollutantType: constants.POLLUTANT_TYPE
};