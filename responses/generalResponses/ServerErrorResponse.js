import {ErrorResponse} from "./ErrorResponse";

export class ServerErrorResponse extends ErrorResponse {
    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode >= 500;
    }

    description() {
        return "Ocurrió un error. Por favor intentalo de nuevo más tarde";
    }
}