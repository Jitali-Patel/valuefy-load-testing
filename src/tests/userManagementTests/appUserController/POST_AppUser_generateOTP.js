import http from 'k6/http';
import { check, group } from 'k6';
import { baseURI } from '../../../../environmentconfig.js';
import { handleSummary } from '../../../../helpers/report_generater.js';
import { options1 } from '../../../../helpers/common.js';

export { handleSummary };
export { options1 };

export default () => {  
const baseUrl = baseURI();
const payload = {
  "contactNumber": "7622032573",
  "countryCode": "+91"
}
   
group ('post appUser generateOTP ' , function () {
      let response = http.post(`${baseUrl}UserManagement/AppUser/generateOTP`, JSON.stringify(payload));
      console.log(response.status);
          console.log(JSON.stringify(response));
          check(response, {
          'is status code 200': (r) => r.status === 200,
        });
  });
}

