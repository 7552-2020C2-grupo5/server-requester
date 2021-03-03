import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {GetPublicationsSuccessful} from "../responses/publications/GetPublicationsSuccessful";

export class GetRecommendationsByReviewsEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/recommendations/reviews';
    }

    ownResponses() {
        return [GetPublicationsSuccessful];
    }

    method() {
        return 'POST';
    }
}
