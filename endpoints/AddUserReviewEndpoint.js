import {Endpoint} from "./Endpoint.js";
import {REVIEWS_BASE_ENDPOINT} from "../requester";
import {AddUserReviewSuccessful} from "../responses/reviews/AddUserReviewSuccessful";

export class AddUserReviewEndpoint extends Endpoint {
    url() {
        return REVIEWS_BASE_ENDPOINT + '/user_reviews/reviews'
    }

    ownResponses() {
        return [AddUserReviewEndpoint];
    }

    method() {
        return 'POST';
    }
}
