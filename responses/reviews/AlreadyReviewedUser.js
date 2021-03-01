import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class AlreadyReviewedUser extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "user was already reviewed"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 409;
    }

    description() {
        return "Ya dejaste tu review de este usuario";
    }
}
