import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {GetUserReviewSuccessful} from "../responses/reviews/GetUserReviewSuccessful";

export class GetUserReviewsEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/user_reviews/reviews'
    }

    ownResponses() {
        return [GetUserReviewSuccessful];
    }

    method() {
        return 'GET';
    }
}
