import http from 'k6/http';
import { check, group } from 'k6';
import { handleSummary } from '../../../../helpers/report_generater.js';
import { userManegementConfig } from '../../../../environmentconfig.js';

console.log(handleSummary());
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
        "id" : 7
    }
    const payload = {        
            "id": 7,
            "isActive": true,
            "createdDate": "2022-05-30T08:42:24.521Z",
            "lastModifiedDate": "2022-05-30T08:42:24.521Z",
            "accountName": "string",
            "accountNumber": "string",
            "bosCode": "string",
            "isDefault": true,
            "isChequeUploaded": true,
            "isPennydropVerified": true,
            "bankAccountStatus": 0,
            "accountId": 0,
            "bankBranchId": 0,
            "bankAccountTypeId": 0,
            "holdingTypeId": 0,
            "investorTypeId": 0,
            "chequeImageFileId": 0,
            "additionalProp1": {}
             };
  group ('post bankAccount ID' , function () {
      let response = http.post(`${__ENV.BASE_URL}/BankAccount`,JSON.stringify(payload),param);
          check(response, {
          'is status code 200': (r) => r.status === 200,
        });
  });
}