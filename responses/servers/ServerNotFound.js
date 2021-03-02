import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class ServerNotFound extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "Server not found"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 404;
    }

    description() {
        return "No existe el servidor indicado.";
    }
}