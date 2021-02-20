import {SuccessfulApiResponse} from "../../generalResponses/SuccessfulApiResponse.js";

export class GetPublicationStarsSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return [{
            "user_id": 0,
            "created_at": "2021-02-04T19:34:21.526Z",
            "publication_id": 0
        }]
    }
}
