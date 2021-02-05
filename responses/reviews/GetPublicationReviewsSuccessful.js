import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class GetPublicationReviewsSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return [{
            "id": 0,
            "reviewer_id": 0,
            "publication_id": 0,
            "booking_id": 0,
            "score": 0,
            "comment": "string",
            "timestamp": "2021-02-04T21:50:43.916Z"
        }]
    }
}
