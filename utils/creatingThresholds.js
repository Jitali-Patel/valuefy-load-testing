import { options } from "./utils.js";

/**
 * Create and add thresholds to the options objects.
 * @param {String} metric_name 
 * @param {String} threshold_expression 
 * @param {Boolean} abort_on_fail - By Default it is 'false'.
 * @example 
 * define_and_add_threshold('Latencies - /prod/offer', 'p(99)<1500,p(95)<500,p(90)<400');
 */
export function define_and_add_threshold(metric_name, threshold_expression, abort_on_fail=false){
    options.thresholds[metric_name] = [{
        threshold: threshold_expression,
        abortOnFail: abort_on_fail,
        delayAbortEval: '10s'
    }];
}