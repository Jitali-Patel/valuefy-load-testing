import { options } from "./utils.js"

/**
 * Description: Each VU executes an exact number of iterations. 
 * The total number of completed iterations will be vus * iterations
 * @param {Object} scenario_inputs - {
 * Properties:
 * 1. scenarioname: (String)
 * 2. vus: (Integer) the num of vus to be used.
 * 3. iterations: (Integer)
 * 4. duration: (String) The duration of load test like '30m'
 * 5. jsFunction: (String) The JS function to call at runtime in load test script.
 *                         By default its value is 'default' 
 * }
 * @example 
 * addScenario_PerVUIterations({scenarioname: 'scenario1', vus: 10, iterations: 20,
 * duration: '5m', jsFunction: 'add_transaction'});
 */
export function addScenario_PerVUIterations(scenario_inputs) {
    let jsFunction = scenario_inputs.jsFunction === undefined ? 'default' : scenario_inputs.jsFunction;
    let scenario = {
        executor: 'per-vu-iterations',
        vus: scenario_inputs.vus,
        iterations: scenario_inputs.iterations,
        maxDuration: scenario_inputs.duration,
        exec: `${jsFunction}`
    }
    options.scenarios[scenario_inputs.scenarioname] = scenario
}

/**
 * Description : This executor is suitable when you want a specific amount of VUs to complete a fixed number of total iterations, 
 * and the amount of iterations per VU is not important
 * 
 * @param {Object} scenario_inputs - {
 * Properties:
 * 1. scenarioname: (String) Name of the scenario.
 * 2. vus: (Integer) The virtual users
 * 3. iterations: (Integer) The num of iterations
 * 4. duration: (String) the duration of load test
 * 5. jsFunction (String) by default this will call 'default' in load test.
 * }
 * @example
 * addScenario_SharedIterations({scenarioname: 'scenario1', vus: 10, iterations: 20,
 * duration: '5m', jsFunction: 'add_transaction'});
 */
export function addScenario_SharedIterations(scenario_inputs) {
    let jsFunction = scenario_inputs.jsFunction === undefined ? 'default' : scenario_inputs.jsFunction;
    let scenario = {
        executor: 'shared-iterations',
        vus: scenario_inputs.vus,
        iterations: scenario_inputs.iterations,
        maxDuration: scenario_inputs.duration,
        exec: `${jsFunction}`
    }
    options.scenarios[scenario_inputs.scenarioname] = scenario
}

/**
*Description : Use this executor if you need a specific amount of VUs to run for a 
*certain amount of time
* @param {Object} scenario_inputs - {
    Properties:
    1. scenarioname (String) (required)
    2. vus (Integer) (required) number of VUs to hold
    3. duration (String) (required) duration to hold specified vus
    4. jsFunction (String) by default this will call 'default' in load test.
}
* @example 
addScenario_ConstantVUs({scenarioname: 'secnario1', vus: 10, duration: '30m',
jsFunction: 'add_transactions'});
 */
export function addScenario_ConstantVUs(scenario_inputs) {
    let jsFunction = scenario_inputs.jsFunction === undefined ? 'default' : scenario_inputs.jsFunction;
    let scenariodetails = {
        executor: "constant-vus",
        vus: scenario_inputs.vus,
        duration: scenario_inputs.duration,
        exec: `${jsFunction}`
    }
    options.scenarios[scenario_inputs.scenarioname] = scenariodetails
}

/**
 * Description : This executor is a good fit if you need VUs to ramp up or down 
during specific periods of time
 * @param {Object} scenario_inputs - 
*  {
*    Properties :
 *     1. scenarioname (String)(required) - name of the scenario.
 *     2. startVUs (Integer) - number of VUs to start with, by default it is '1'.
 *     3. rampingStages (Array) (required) - stages of load pattern
 *     4. gracefulRampDown (String) Time to wait for an already started iteration to finish before stopping it during a ramp down.
 *        By default it is '30s'.
 *     5. jsFunction (String) - js function to call. By default it is calling 'default'.
 *  }
 * @example 
 *  addScenario_RampingVUs({scenarioname: 'scenario1', startVUs: 5, rampingStages: [
 *      {target: 10, duration: '1m'},
 *      {target: 10, duration: '15m'},
 *      {target: 0, duration: '1m'}],
 *      gracefulRampDown: '1m', jsFunction: 'add_transactions'});

 */
export function addScenario_RampingVUs(scenario_inputs) {
    let gracefulRampDown = scenario_inputs.gracefulRampDown === undefined ? '30s' : scenario_inputs.gracefulRampDown;
    let startVUs = scenario_inputs.startVUs === undefined ? 1 : scenario_inputs.startVUs;
    let jsFunction = scenario_inputs.jsFunction === undefined ? 'default' : scenario_inputs.jsFunction;
    let scenariodetails = {
        executor: 'ramping-vus',
        startVUs: `${startVUs}`,
        stages: scenario_inputs.rampingStages,
        gracefulRampDown: `${gracefulRampDown}`,
        exec: `${jsFunction}`
    }
    options.scenarios[scenario_inputs.scenarioname] = scenariodetails
}

/**
 *  This executor is good if we would like to ramp the number of iterations up or 
 *  down during specific periods of time.
 * @param {Object} scenario_inputs - { 
 * Properties : 
 * 1. scenarioname - (String) (required) The name of the scenario.
 * 2. rampingStages - (Array) (required) The stages of ramping up & down with duration.
 * 3. preAllocatedVUs - (Integer) required
 * 4. maxVUs - (Integer) required
 * 5. jsFunction - (String) by default value = 'default'
 * 6. rampingscale - 'm'/'s' by default it is 's'
 * 7. startingRPS - (Integer) by default it is 0
 * 8. startTimeInSec - (Integer) by default it is 0
 * }
 * @example
 * scenario_templates.addScenario_RampingArrivalRate({scenarioname: 'shell_flow', rampingStages:[
    { target: 5, duration: '30s'},
    { target: 5, duration: '5m'},
    {target: 0,duration:'30s'}
    ],preAllocatedVUs:10, maxVUs:20, rampingscale:'m', jsFunction:'loadtestFlow'});
*/
export function addScenario_RampingArrivalRate(scenario_inputs) {
    let rampingscale = (scenario_inputs.rampingscale === undefined) ? 's' : scenario_inputs.rampingscale;
    let startingRPS = (scenario_inputs.startingRPS === undefined) ? 0 : scenario_inputs.startingRPS;
    let startTimeInSec = (scenario_inputs.startTimeInSec === undefined) ? 0 : scenario_inputs.startTimeInSec;
    let jsFunction = (scenario_inputs.jsFunction === undefined) ? 'default' : scenario_inputs.jsFunction;

    let scenariodetails = {
        executor: 'ramping-arrival-rate',
        startTime: `${startTimeInSec}` + 's',
        startRate: `${startingRPS}`,
        timeUnit: '1' + `${rampingscale}`,
        stages: scenario_inputs.rampingStages,
        preAllocatedVUs: scenario_inputs.preAllocatedVUs,
        maxVUs: scenario_inputs.maxVUs,
        exec: `${jsFunction}`
    }

    options.scenarios[scenario_inputs.scenarioname] = scenariodetails
}