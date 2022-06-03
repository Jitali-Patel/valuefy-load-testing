const env = "dev"
export function baseURI(){
    if(env == 'dev'){
      return "https://delta-dev.finzipp.com/API/";
    }
    else if(env == 'test'){
      return "https://delta-dev.finzipp.com/API/";
    }
}
