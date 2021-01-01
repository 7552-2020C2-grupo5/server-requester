import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class UserIsBlocked extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "User is blocked"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 403;
    }

    description() {
        return "El usuario se encuentra bloqueado.";
    }
}