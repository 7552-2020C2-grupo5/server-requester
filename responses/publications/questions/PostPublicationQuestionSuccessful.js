import {SuccessfulApiResponse} from "../../generalResponses/SuccessfulApiResponse.js";

export class PostPublicationQuestionSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            "question": "string",
            "user_id": 0,
            "id": 0,
            "reply": "string",
            "created_at": "2021-02-04T02:51:46.061Z",
            "replied_at": "2021-02-04T02:51:46.062Z"
        }
    }
}
