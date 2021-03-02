import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class ServerIsBlocked extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "Server is blocked"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 403;
    }

    description() {
        return "La API KEY del servidor se encuentra bloqueada.";
    }
}