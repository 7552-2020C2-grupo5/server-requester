import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {GetPublicationsSuccessful} from "../responses/publications/GetPublicationsSuccessful";

export class GetRecommendationsByPopularEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/recommendations/popular';
    }

    ownResponses() {
        return [GetPublicationsSuccessful];
    }

    method() {
        return 'POST';
    }
}
