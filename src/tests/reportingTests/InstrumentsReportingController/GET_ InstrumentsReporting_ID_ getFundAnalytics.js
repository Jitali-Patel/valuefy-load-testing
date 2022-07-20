import http from "k6/http";
import * as utils from "../../../../utils/utils.js";
import * as scenario_templates from "../../../../utils/scenarioTemplates.js";
import { check } from "k6";
import * as threshold from "../../../../utils/creatingThresholds.js"
import { Rate, Trend, Gauge } from "k6/metrics";
import { handleSummary } from '../../../../helpers/report_generater.js';

utils.get_default_parameter();
let api_thresholds = __ENV.api_thresholds;
let environment = __ENV.environment;
let stage = JSON.parse(__ENV.stages);
let vus = __ENV.vus;
let maxVUs = __ENV.maxVUs;

//Custom metrics
let latency_trend_apis_get_instrumentsReporting_id_getFundAnalytics = new Trend('latency_trend_apis_get_instrumentsReporting_id_getFundAnalytics');
let latency_guage_apis_get_instrumentsReporting_id_getFundAnalytics = new Gauge('latency_guage_apis_get_instrumentsReporting_id_getFundAnalytics');
let error_rates = new Rate('errors');

let environment_data = utils.getSharedTestDataReference(`../../../../environmentData/${environment}.json`, 'cluster data')[0];
let base_endpoint = environment_data.base_endpoint;
let reporting_service_name = environment_data.reporting_service_name;


//Scenario section
let updated_stages = utils.update_load_rpms(stage, 0.5)
scenario_templates.addScenario_RampingArrivalRate({
    scenarioname: 'apis_get_instrumentsReporting_id_getFundAnalytics',
    rampingStages: updated_stages, preAllocatedVUs: vus, maxVUs: maxVUs, rampingscale: 's', jsFunction: "GET_instrumentsReporting_id_getFundAnalytics"
});

//Threshold section
threshold.define_and_add_threshold('http_req_duration', api_thresholds);

//Options
export let options = utils.options;

// Export handleSummary to generate HTML report
export { handleSummary };

export function GET_instrumentsReporting_id_getFundAnalytics() {
    let url = `${utils.HTTP_PROTOCOL}${base_endpoint}/API/${reporting_service_name}/InstrumentsReporting/{{id}}/getFundAnalytics`;
    let headers = utils.get_default_headers();
    let request_params = {
        headers: headers,
    }
    let response = http.get(url, request_params);
    console.log(JSON.stringify(response));
    latency_trend_apis_get_instrumentsReporting_id_getFundAnalytics.add(response.timings.duration);
    latency_guage_apis_get_instrumentsReporting_id_getFundAnalytics.add(response.body.length);
    let assertion = check(response, {
        '[GET] /API/Reporting/InstrumentsReporting/{{id}}/getFundAnalytics - 200 OK': (res) => res.status === 200
    });
    if (!assertion) {
        error_rates.add(true);
        console.log(`[GET] /API/Reporting/InstrumentsReporting/{{id}}/getFundAnalytics , Status - ${response.status} and Response Body - ${response.body}`);
    }
}
