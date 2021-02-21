import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class InvalidEmail extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "The email address is not valid. It must have exactly one @-sign."
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 400;
    }

    description() {
        return "El email ingresado es inválido. Debe tener un @.";
    }
}