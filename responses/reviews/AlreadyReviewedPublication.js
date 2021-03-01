import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class AlreadyReviewedPublication extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "publication was already reviewed"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 409;
    }

    description() {
        return "Ya dejaste tu review de este lugar";
    }
}
