import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class GetUserReviewSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return [{
            "id": 0,
            "reviewer_id": 0,
            "reviewee_id": 0,
            "booking_id": 0,
            "score": 0,
            "comment": "string",
            "timestamp": "2021-02-04T22:24:49.497Z"
        }]
    }
}
