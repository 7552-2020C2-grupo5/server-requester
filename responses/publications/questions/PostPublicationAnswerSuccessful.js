import {SuccessfulApiResponse} from "../../generalResponses/SuccessfulApiResponse.js";

export class PostPublicationAnswerSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return { "reply": "string" }
    }
}
