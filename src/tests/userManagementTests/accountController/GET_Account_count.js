import http from 'k6/http';
import { check, group } from 'k6';
import { handleSummary } from '../../../../helpers/report_generater.js';

// const abc = require("../../../../helpers/report_generater");
// console.log(abc.test);
import { userManegementConfig } from '../../../../environmentconfig.js';

export const options = {
   scenarios: {
     // This will execute 50 interation shared by 10 vus with maximum duration 30s.
     example_scenario: {
       env: userManegementConfig(),
       executor: 'shared-iterations',
       vus: 10,
       iterations: 50,
       maxDuration: '30s'
     }
   }
 };
export default () => {
    group ('get account count ' , function () {
      let response = http.get(`${__ENV.BASE_URL}/Account/count`)
          check(response, {
          'is status code 200': (r) => r.status === 200,
        });
  });
}

