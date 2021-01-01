import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class UserNotFound extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "User not found"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 404;
    }

    description() {
        return "No existe el usuario indicado.";
    }
}