import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class IntentPreconditionFailed extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "Precondition failed"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 412;
    }

    description() {
        return "Hay errores en la reserva, verificalos";
    }
}
