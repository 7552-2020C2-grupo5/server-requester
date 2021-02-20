import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class PostBookingSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return [{
            "id": 0,
            "tenant_id": 0,
            "publication_id": 0,
            "total_price": 0,
            "initial_date": "2021-02-04",
            "final_date": "2021-02-04",
            "booking_date": "2021-02-04T00:10:06.797Z"
        }]
    }
}
