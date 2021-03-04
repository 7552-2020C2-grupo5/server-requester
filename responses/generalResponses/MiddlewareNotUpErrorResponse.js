import {ErrorResponse} from "./ErrorResponse";

export class MiddlewareNotUpErrorResponse extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "Missing password"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 401;
    }

    description() {
        return "Se debe dar de alta el servidor Middleware para poder utilizar el Backoffice";
    }
}