import {Endpoint} from "./Endpoint.js";
import {REVIEWS_BASE_ENDPOINT} from "../requester";
import {AddPublicationReviewSuccessful} from "../responses/reviews/AddPublicationReviewSuccessful";

export class AddPublicationReviewEndpoint extends Endpoint {
    url() {
        return REVIEWS_BASE_ENDPOINT + '/publication_reviews/reviews'
    }

    ownResponses() {
        return [AddPublicationReviewSuccessful];
    }

    method() {
        return 'POST';
    }
}
