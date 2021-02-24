import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class RejectBookingSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return [{ }]
    }
}
