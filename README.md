  
# scaleit-load: Performance testing of wealth app services

## Traffic patterns
- Shared iterations among virtual users
```
export const options = {
  scenarios: {
    //This will execute 50 interation shared by 10 VUs with maximum duration 30s.
    my_test1: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 50,
      maxDuration: '30s',
    },
   }
  };

  export default function() {
    let response = http.get("[http://localhost/cart](http://localhost/cart)");
    sleep(0.5);
  }
```
- Iterations Per virtual user's
```
export const options = {
  scenarios: {
    //This will execute 20 interation to each vus and maximum duration 30s.
    my_test2: {
      executor:  'per-vu-iterations',
      vus:  5,
      iterations:  20,
      maxDuration:  '30s',
    },
   }
 };
  
  export default function() {
    let response = http.get("http://localhost/cart");
    sleep(0.5);
  }
```
- Constant virtual users irrespective of iterations for specified amount of time
```
export const options = {
  scenarios: {
    //This will run 10 vus for constantly 20s
    my_test3: {
      executor:  'constant-vus',
      vus:  10,
      duration:  '20s',
    },
   }
 };
  
 export default function() {
    let response = http.get("http://localhost/cart");
    sleep(0.5);
 }
```
- Ramping virtual users which executes as many iterations as possible for specified amount of time
```
export const options = {
  scenarios: {
    //This will run from 0 to 10 vus over 20s. Then it will down to 0 vus within 10s..
    my_test4: {
      executor:  'ramping-vus',
      startVUs:  0,
      stages: [
      { duration:  '20s', target:  10 },
      { duration:  '10s', target:  0 },
      ],
    },
  }
 };
  
 export default function() {
    let response = http.get("http://localhost/cart");
    sleep(0.5);
 }
```
- Constant rate of arrival of virtual users with fixed number of iterations
```
export const options = {
  scenarios: {
    // This will run 20 interations per 'timeunit' means 20 iterations per sec
    my_test5: {
        executor: 'constant-arrival-rate',
        duration: '30s',
        rate: 30,
        timeUnit: '1s',
        
        //preallocate 2 VUs before starting the test
        preAllocatedVUs: 2,
        //It will spin up to 40 max vus to maintain constant arrival rate
        maxVUs: 40,
    },
   }
 };
  
 export default function() {
    let response = http.get("http://localhost/cart");
    sleep(0.5);
 }
```
- Ramping rate of arrival with variable number of iterations
```
export const options = {
  scenarios: {
    //This will run startRate per timeunits means 300 iterations per minute.
    my_test6: {
        executor: 'ramping-arrival-rate',
        startRate: 300,
        timeUnit: '1m',

        //preallocate 2 VUs before starting the test
        preAllocatedVUs: 2,
        //It will spin up to 40 max vus to maintain constant arrival rate
        maxVUs: 40,
  
        //It should start 300 iterations per minute for 1st time then ramp-up to 600....
        stages: [
          { target: 300, duration: '1m' },  
          { target: 600, duration: '2m' },
          { target: 600, duration: '4m' },
          { target: 60, duration: '2m' },
        ],
     },
   }
 };
  
 export default function() {
    let response = http.get("http://localhost/cart");
    sleep(0.5);
 }
```