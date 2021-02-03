import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse";

export class PublicationBlockedSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            "message": "Publication successfully blocked"

        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 200;
    }

    description() {
        return "La publicación fue bloqueada.";
    }
}