import { htmlReport } from "../dist/bundle";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// const { htmlReport } = require("../dist/bundle");
// const { textSummary } = require('https://jslib.k6.io/k6-summary/0.0.1/index.js');

export function handleSummary(data) {
    return {
      '../../../../test-results/reports/result.html': htmlReport(data, { debug: false }),
      stdout: textSummary(data, { indent: ' ', enableColors: true }),
    }
}

// class handleSummary{

//     summary(data) {
//         return {
//           '../../../../test-results/reports/result.html': htmlReport(data, { debug: false }),
//           stdout: textSummary(data, { indent: ' ', enableColors: true }),
//         }
//     }
// }

// module.exports = new handleSummary()
// https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js
// https://jslib.k6.io/k6-summary/0.0.1/index.js'