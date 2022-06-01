import http from 'k6/http';
import { check, group } from 'k6';
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
  const param = {
      "filter" : {        
            "offset": 0,
            "limit": 100,
            "skip": 0,
            "order": "string",
            "where": {
              "additionalProp1": {}
            },
            "fields": {
              "id": true,
              "isActive": true,
              "createdDate": true,
              "lastModifiedDate": true,
              "accountName": true,
              "accountNumber": true,
              "bosCode": true,
              "isDefault": true,
              "isChequeUploaded": true,
              "isPennydropVerified": true,
              "bankAccountStatus": true,
              "accountId": true,
              "bankBranchId": true,
              "bankAccountTypeId": true,
              "holdingTypeId": true,
              "investorTypeId": true,
              "chequeImageFileId": true
            },
            "include": [
              {
                "relation": "string",
                "scope": {
                  "offset": 0,
                  "limit": 1,
                  "skip": 0,
                  "order": "string",
                  "where": {
                    "additionalProp1": {}
                  },
                  "fields": {},
                  "include": [
                    {
                      "additionalProp1": {}
                    }
                  ]
                }
              },
              "string"
            ]
          
  }
}
  group ('get bankaccount', function (){
  let response = http.get(`${__ENV.BASE_URL}/BankAccount`,param);
  check(response, {'is status code 200': (r) => r.status === 200, 
   });   
});
}
