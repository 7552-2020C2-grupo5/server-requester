import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class InvalidCredentials extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "Missing password"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 401;
    }

    description() {
        return "Credenciales inválidas";
    }
}