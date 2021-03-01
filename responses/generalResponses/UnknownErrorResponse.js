import {ErrorResponse} from "./ErrorResponse";

export class UnknownErrorResponse extends ErrorResponse {
    constructor() {
        super(null, null)
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return true;
    }

    description() {
        return "Respuesta inentendible del servidor";
    }
}
