import http from 'k6/http';
import { check, group } from 'k6';
// import { test } from '../../../../helpers/report_generater';

// const abc = require("../../../../helpers/report_generater");
// console.log(abc.test);

export const options = {
   stages: [
      { duration: '1s', target: 0},
      { duration: '1s', target: 50}
   ],

   thresholds:{
    'iteration_duration': ['p(90) < 500'],
    'http_req_duration' : ['max< 350'],
   },
}

export default () => {
  
  group ('get account count ' , function () {
      let response = http.get("https://delta-dev.finzipp.com/API/UserManagement/Account/count");
      console.log(response.status);
          check(response, {
          'is status code 200': (r) => r.status === 200,
        });
  });
}
