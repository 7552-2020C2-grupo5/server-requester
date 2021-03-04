import {Endpoint} from "./Endpoint.js";
import {REVIEWS_BASE_ENDPOINT} from "../requester";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {AddPublicationReviewSuccessful} from "../responses/reviews/AddPublicationReviewSuccessful";
import {AlreadyReviewedPublication} from "../responses/reviews/AlreadyReviewedPublication";

export class AddPublicationReviewEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/publication_reviews/reviews'
    }

    ownResponses() {
        return [AddPublicationReviewSuccessful, AlreadyReviewedPublication];
    }

    method() {
        return 'POST';
    }
}
