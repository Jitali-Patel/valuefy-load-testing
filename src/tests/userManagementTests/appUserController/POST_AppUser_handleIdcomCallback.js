import http from 'k6/http';
import { check, group } from 'k6';
import { baseURI } from '../../../../environmentconfig.js';
import { handleSummary } from '../../../../helpers/report_generater.js';
import { options1 } from './POST_AppUser_generateOTP.js';

export { handleSummary };
export { options1 }

export default () => {  
     const baseUrl = baseURI();
     const param = {  
        "authcode" : {},
        "success" : true, 
        "errorCode" : 0,
        "errorMessage" : "",
    }
   
    group ('post appUser handleId ' , function () {
          let response = http.post(`${baseUrl}/AppUser/handleIdcomCallback`,param);
          check(response, {
          'is status code 200': (r) => r.status === 200,
        });
  });
}

