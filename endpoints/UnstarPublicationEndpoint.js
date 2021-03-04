import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {PublicationIsBlocked} from "../responses/publications/PublicationIsBlocked";
import {PublicationNotFound} from "../responses/publications/PublicationNotFound";
import {UnstarPublicationSuccessful} from "../responses/publications/stars/UnstarPublicationSuccessful";

export class UnstarPublicationEndpoint extends Endpoint {
    constructor(token, publicationId) {
        super(token)
        this._publicationId = publicationId;
    }

    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/publications/' + this._publicationId + '/star'
    }

    ownResponses() {
        return [PublicationIsBlocked, PublicationNotFound, UnstarPublicationSuccessful];
    }

    method() {
        return 'DELETE';
    }
}
