import http from 'k6/http';
import { check, group } from 'k6';
import { handleSummary } from '../../../../helpers/report_generater.js';
import { masterDataConfig } from '../../../../environmentconfig.js';

export const options = {
   scenarios: {
     // This will execute 50 interation shared by 10 vus with maximum duration 30s.
     example_scenario: {
       env: masterDataConfig(),
       executor: 'shared-iterations',
       vus: 10,
       iterations: 50,
       maxDuration: '30s'
     }
   }
 };
//https://delta-dev.finzipp.com/API/MasterData/RiskProfile
export default () => {  
  group ('get riskProfile ' , function () {
      let response = http.get(`${__ENV.BASE_URL}/RiskProfile`);
          check(response, {
          'is status code 200': (r) => r.status === 200,
        });
  });
}