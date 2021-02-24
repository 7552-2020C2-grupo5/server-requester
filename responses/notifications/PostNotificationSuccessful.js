import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class PostNotificationSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return [{}];
    }
}
