import http from 'k6/http';
import { check, group } from 'k6';
import { handleSummary } from '../../../../helpers/report_generater.js';
import { baseURI } from '../../../../environmentconfig.js';
import { options1 } from '../../masterDataTests/riskProfileController/GET_RiskProfile_count.js';

export { handleSummary };
export { options1 }

export default () => {  
    const baseUrl = baseURI()
    const body = {
        "contactNumber": "7622032573",
        "countryCode": "+91",
        "deviceUniqueId": "deviceUniqueId",
        "otp": "123456"
  }
       
    group ('post appUser verifyOTP' , function () {
          console.log(`${baseUrl}`);
          // let response = http.post(`${baseUrl}UserManagement/AppUser/verifyOTP`, JSON.stringify(body));
          let response = http.post("https://delta-dev.finzipp.com/API/UserManagement/AppUser/verifyOTP",JSON.stringify(body));
          console.log(response.status);
          console.log(JSON.stringify(response));
          check(response, {
              'is status code 200': (r) => r.status === 200,
          });
    });
}

