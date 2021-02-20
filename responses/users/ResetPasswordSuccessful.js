import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class ResetPasswordSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return [
            { }
        ];
    }
}
