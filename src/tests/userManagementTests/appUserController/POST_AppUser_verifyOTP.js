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
     
    const body = {
        "otp": "123456",
        "contactNumber": "1234512345",
        "deviceUniqueId": "deviceUniqueId",
        "countryCode": "+91",
      }
       
    group ('post appUser verifyOTP ' , function () {
          let response = http.post(`${__ENV.BASE_URL}/AppUser/verifyOTP`,JSON.stringify(body));
              console.log(response.status);
              check(response, {
              'is status code 200': (r) => r.status === 200,
            });
      });
    }