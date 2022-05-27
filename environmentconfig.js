export function userConfig(filename) {
    let envConfig = {
      BASE_URL: "http://todo-app-barkend.herokuapp.com/todos/",
      ENV: "DEVELOPMENT",
    };
    return Object.assign({}, envConfig, filename);
  }
  