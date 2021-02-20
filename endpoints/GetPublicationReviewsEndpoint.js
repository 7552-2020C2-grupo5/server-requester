import {Endpoint} from "./Endpoint.js";
import {REVIEWS_BASE_ENDPOINT} from "../requester";
import {GetPublicationReviewsSuccessful} from "../responses/reviews/GetPublicationReviewsSuccessful";

export class GetPublicationReviewsEndpoint extends Endpoint {
    url() {
        return REVIEWS_BASE_ENDPOINT + '/publication_reviews/reviews'
    }

    ownResponses() {
        return [GetPublicationReviewsSuccessful];
    }

    method() {
        return 'GET';
    }
}
