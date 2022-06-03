//default runtime options
export const options1 = {
       stages: [
        { duration: '10s', target: 50 }, // below normal load
        { duration: '1m', target: 50 },
        { duration: '10s', target: 500 }, // spike to 500 users
        { duration: '1m', target: 500 }, // stay to 500 users for 1 minute
        { duration: '10s', target: 50 }, // scale down. Recovery stage.
        { duration: '1m', target: 50 },
        { duration: '10s', target: 0 },
    ],

    thresholds: {
        'iteration_duration': ['p(90) < 500'],
        'http_req_duration' : ['max < 350'],
    },
};
export const options2 = {
    scenarios: {
      //This will execute 50 interation shared by 10 vus with maximum duration 30s.
      example_scenario: {
        // env: baseURI(),
        executor: 'shared-iterations',
        vus: 10,
        iterations: 50,
        maxDuration: '30s'
      }
    },
}
// Think times, to slow down execution 
export let thinktime = 1;
