import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class PublicationNotFound extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "Publication not found"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 404;
    }

    description() {
        return "No existe la publicación indicada.";
    }
}