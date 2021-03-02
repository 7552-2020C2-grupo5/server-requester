import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class ServerAlredyRegistered extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "\t\n" +
                "Server already registered"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 400;
    }

    description() {
        return "El servidor elegido ya tiene una API KEY activa";
    }
}