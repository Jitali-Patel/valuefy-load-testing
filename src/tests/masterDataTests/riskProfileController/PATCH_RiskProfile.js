import http from 'k6/http';
import { check, group } from 'k6';
import { masterDataConfig } from '../../../../environmentconfig.js';

// export const options = {
//    env: masterDataConfig(),
//    stages: [
//       { duration: '1s', target: 1},
//       // { duration: '1s', target: 50}
//    ],

//    thresholds:{
//     'iteration_duration': ['p(90) < 500'],
//     'http_req_duration' : ['max< 350'],
//    },
// }
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

export default () => {

  group ('patch riskProfile' , function () {
      let response = http.patch(`${__ENV.BASE_URL}/RiskProfile`);
          check(response, {
          'is status code 200': (r) => r.status === 200,
        });
  });
}