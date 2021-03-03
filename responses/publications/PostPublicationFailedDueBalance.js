import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class PostPublicationFailedDueBalance extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "gas required exceeds allowance (0)"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 400;
    }

    description() {
        return "No tenés suficientes fondos para realizar la publicación";
    }
}
