import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {GetMetricsSuccessful} from "../responses/metrics/GetMetricsSuccessful";

export class GetMetricsEndpoint extends Endpoint {
    url() {
        //TODO: Modificar de acuerdo al endpoint
        return MIDDLEWARE_BASE_ENDPOINT + '/metrics/';
    }

    ownResponses() {
        //TODO: Agregar respuestas faltantes
        return [GetMetricsSuccessful];
    }

    method() {
        return 'GET';
    }
}