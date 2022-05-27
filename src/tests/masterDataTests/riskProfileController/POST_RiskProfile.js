import http from 'k6/http';
import { check, group } from 'k6';

// const http = require('k6/http')
// const { check, group } = require('k6');

import report from '../../../../helpers/report_generater'

// const report = require("./../../../../helpers/report_generater");
report.summary();

// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// export function handleSummary(data) {
//     return {
//       '../../../../test-results/reports/result.html': htmlReport(data, { debug: false }),
//       stdout: textSummary(data, { indent: ' ', enableColors: true }),
//     }
// }


export const options = {
   stages: [
      { duration: '1s', target: 0},
      { duration: '1s', target: 50}
   ],

   thresholds:{
    'iteration_duration': ['p(90) < 400'],
    'http_req_duration' : ['max< 300'],
   }
}

export default () => {
  
  group ('patch riskProfile' , function () {
      let response = http.get("https://delta-dev.finzipp.com/API/MasterData/RiskProfile");
          check(response, {
          'is status code 200': (r) => r.status === 200,
        });
  });
}