import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class PostUserAlreadyRegistered extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "User not found"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode >= 409;
    }

    description() {
        return "El nombre de usuario ya se encuentra registrado.";
    }
}
