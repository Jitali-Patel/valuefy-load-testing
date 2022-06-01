import http from 'k6/http';
import { check, group } from 'k6';
import { handleSummary } from '../../../../helpers/report_generater.js';
import { userManegementConfig } from '../../../../environmentconfig.js';

// console.log(handleSummary());
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

const param = {  
   "authcode" : {},
   "success" : true,
   "errorCode" : 0,
   "errorMessage" : "",
}
   
group ('post appUser handleId ' , function () {
      let response = http.post(`${__ENV.BASE_URL}/AppUser/handleIdcomCallback`,param);
          check(response, {
          'is status code 200': (r) => r.status === 200,
        });
  });
}