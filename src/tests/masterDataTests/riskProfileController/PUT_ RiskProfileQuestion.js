import http from 'k6/http';
import { check, group } from 'k6';
import { handleSummary } from '../../../../helpers/report_generater.js';
import { options1 } from '../../userManagementTests/appUserController/POST_AppUser_generateOTP.js';
import { baseURI } from '../../../../environmentconfig.js';

export { handleSummary };
export { options1 }

export default () => {  
  const baseUrl = baseURI();
  const payload = {
     "isActive": true,
     "createdDate": "2022-05-16T11:29:11.356Z",
     "lastModifiedDate": "2022-05-16T11:29:11.356Z",
     "question": "string",
     "type": 0,
     "bosCode": "string",
     "additionalProp1": {}
  }

  const pram = {
      "id" : 1,
  }

  group ('put riskProfileQuestion' , function () {
      let response = http.put(`${baseUrl}MasterData/RiskProfileQuestion`,JSON.stringify(payload),pram);
          check(response, {
          'is status code 200': (r) => r.status === 200,
        });
  });
}
















{
  
    "isActive": true,
    "createdDate": "2022-05-16T11:29:11.356Z",
    "lastModifiedDate": "2022-05-16T11:29:11.356Z",
    "question": "string",
    "type": 0,
    "bosCode": "string",
    "additionalProp1": {}
  }