import { htmlReport } from "../dist/bundle.js";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export function handleSummary(data) {
    return {
      '../test-results/reports/result.html': htmlReport(data, { debug: false }),
      stdout: textSummary(data, { indent: ' ', enableColors: true }),
    }
}
