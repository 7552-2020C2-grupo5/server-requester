import {Endpoint} from "./Endpoint.js";
import {REVIEWS_BASE_ENDPOINT} from "../requester";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {AddUserReviewSuccessful} from "../responses/reviews/AddUserReviewSuccessful";
import {AlreadyReviewedUser} from "../responses/reviews/AlreadyReviewedUser";

export class AddUserReviewEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/user_reviews/reviews'
    }

    ownResponses() {
        return [AddUserReviewEndpoint, AlreadyReviewedUser];
    }

    method() {
        return 'POST';
    }
}
