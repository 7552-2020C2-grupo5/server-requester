import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class PublicationIsBlocked extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "Publication is blocked"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 403;
    }

    description() {
        return "La publicación se encuentra bloqueada.";
    }
}