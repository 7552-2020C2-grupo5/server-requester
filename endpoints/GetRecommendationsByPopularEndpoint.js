import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {GetPublicationsSuccessful} from "../responses/publications/GetPublicationsSuccessful";
import {GetRecommendationWithNullSuccessful} from "../responses/publications/GetRecommendationWithNullSuccessful";

export class GetRecommendationsByPopularEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/recommendations/popular';
    }

    ownResponses() {
        return [GetRecommendationWithNullSuccessful, GetPublicationsSuccessful];
    }

    method() {
        return 'POST';
    }
}
