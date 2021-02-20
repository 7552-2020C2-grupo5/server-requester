import {Endpoint} from "./Endpoint.js";
import {PUBLICATIONS_BASE_ENDPOINT} from "../requester";
import {PublicationNotFound} from "../responses/publications/PublicationNotFound";
import {PublicationIsBlocked} from "../responses/publications/PublicationIsBlocked";
import {PostPublicationSuccessful} from "../responses/publications/PostPublicationSuccessful";

export class PostPublicationEndpoint extends Endpoint {
    url() {
        return PUBLICATIONS_BASE_ENDPOINT + '/publications';
    }

    ownResponses() {
        return [PostPublicationSuccessful];
    }

    method() {
        return 'POST';
    }
}
