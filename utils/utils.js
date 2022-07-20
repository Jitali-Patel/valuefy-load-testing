import { SharedArray } from "k6/data";


export let options = {
  scenarios: {},
  thresholds: {},
  ext: {},
  teardownTimeout: '120s'
};

export let HTTP_PROTOCOL = "https://";

//TODO: Will genralise this more, when this become complex.
/**
 *
 * @param {String} filepath 
 * @param {String} description (Default=description)
 * @returns testDataRef - The SharedArray Object Reference
 * @example
 * getSharedTestDataReference('./TestData/offerskus.csv', 'shell offers skus');
 */
export function getSharedTestDataReference(filepath, description = 'description') {
  let testDataRef;
  if (filepath.includes('csv')) {
    testDataRef = new SharedArray(description, function () {
      return papaparse.parse(open(filepath), { header: true }).data;
    });
  }
  else if (filepath.includes('json')) {
    testDataRef = new SharedArray(description, function () { return JSON.parse(open(filepath)); }
    );
  }
  return testDataRef;
}

/**
 * 
 * @returns headers - Default headers
 */
export function get_default_headers(auth_token) {
  let headers = {
    Authorization: auth_token,
    "Content-Type": 'application/json',
  }
  return headers;
}

/**
 * 
 * @param {String} stages 
 * @param {*} factor 
 * @returns stages
 */
export function update_load_rpms(stages, factor) {

  for (let stage of stages) {
    stage['target'] = Math.round(stage['target'] * factor);
  }
  return stages;
}

/**
 * 
 * @param {int} length 
 * @returns Random string
 */
export function randomString(length) {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

/**
 * Utils function : Default parameter while we pass nothing throught CLI 
 */
export function get_default_parameter() {
  if (__ENV.api_thresholds == undefined || __ENV.api_thresholds == '') {
    __ENV.api_thresholds = 'p(99)<1500';
  }

  if (__ENV.stages == undefined || __ENV.stages == '') {
    __ENV.stages = '[{"target":1,"duration": "5s"}]';
    // __ENV.stages = '[{ "target": 5, "duration": "30s" },{ "target": 10, "duration": "1m" },{"target": 10, "duration": "1m"},{ "target": 0, "duration": "30s" }]';
  }

  if (__ENV.environment == undefined || __ENV.environment == '') {
    __ENV.environment = "test";
  }

  if (__ENV.vus == undefined || __ENV.vus == '') {
    __ENV.vus = 5;
  }

  if (__ENV.maxVUs == undefined || __ENV.maxVUs == '') {
    __ENV.maxVUs = 5;
  }
}