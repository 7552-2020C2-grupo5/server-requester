import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse";

export class PostPublicationFailedDueBalance extends SuccessfulApiResponse {
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
