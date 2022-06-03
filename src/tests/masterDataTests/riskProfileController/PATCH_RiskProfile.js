import http from 'k6/http';
import { check, group } from 'k6';
import { handleSummary } from '../../../../helpers/report_generater.js';
import { options1 } from '../../userManagementTests/appUserController/POST_AppUser_generateOTP.js';
import { baseURI } from '../../../../environmentconfig.js';

export { handleSummary };
export { options1 }

export default () => {  
  const baseUrl = baseURI();
  group ('patch riskProfile' , function () {
      let response = http.patch(`${baseUrl}MasterData/RiskProfile/count`);
          check(response, {
          'is status code 200': (r) => r.status === 200,
        });
  });
}