 export function userManegementConfig(filename) {
    let envConfig = {
      BASE_URL: "https://delta-dev.finzipp.com/API/UserManagement",
    };
    return Object.assign({}, envConfig, filename);
  }

  export function masterDataConfig(filename) {
    let envConfig = {
      BASE_URL: "https://delta-dev.finzipp.com/API/MasterData",
    };
    return Object.assign({}, envConfig, filename);
  }

  export function transactionConfig(filename) {
    let envConfig = {
      BASE_URL: "https://delta-dev.finzipp.com/API/Transaction",
    };
    return Object.assign({}, envConfig, filename);
  }

  export function reportingConfig(filename) {
    let envConfig = {
      BASE_URL: "https://delta-dev.finzipp.com/API/Reporting",
    };
    return Object.assign({}, envConfig, filename);
  }

  export function orderExecutionConfig(filename) {
    let envConfig = {
      BASE_URL: "https://delta-dev.finzipp.com/API/OrderExecution",
    };
    return Object.assign({}, envConfig, filename);
  }

  export function loggingConfig(filename) {
    let envConfig = {
      BASE_URL: "https://delta-dev.finzipp.com/API/Logging",
    };
    return Object.assign({}, envConfig, filename);
  }
  
  
  

