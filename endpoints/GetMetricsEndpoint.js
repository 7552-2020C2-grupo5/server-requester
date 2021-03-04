import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {GetMetricsSuccessful} from "../responses/metrics/GetMetricsSuccessful";
import {GetMetricsError} from "../responses/metrics/GetMetricsError";

export class GetMetricsEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/metrics';
    }

    ownResponses() {
        return [GetMetricsSuccessful, GetMetricsError];
    }

    method() {
        return 'GET';
    }
}