import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {PublicationNotFound} from "../responses/publications/PublicationNotFound";
import {PublicationIsBlocked} from "../responses/publications/PublicationIsBlocked";
import {PostPublicationSuccessful} from "../responses/publications/PostPublicationSuccessful";
import {PostPublicationFailedDueBalance} from "../responses/publications/PostPublicationFailedDueBalance";

export class PostPublicationEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/publications/';
    }

    ownResponses() {
        return [PostPublicationSuccessful, PostPublicationFailedDueBalance];
    }

    method() {
        return 'POST';
    }
}
