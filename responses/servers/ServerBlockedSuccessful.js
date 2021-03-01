import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse";

export class ServerBlockedSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            "message": "Server successfully blocked"

        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 200;
    }

    description() {
        return "La API KEY del servidor fue bloqueada.";
    }
}