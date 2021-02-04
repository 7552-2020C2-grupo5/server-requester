import {Endpoint} from "./Endpoint.js";
import {PUBLICATIONS_BASE_ENDPOINT} from "../requester";
import {PublicationIsBlocked} from "../responses/publications/PublicationIsBlocked";
import {PublicationNotFound} from "../responses/publications/PublicationNotFound";
import {StarPublicationSuccessful} from "../responses/publications/stars/StarPublicationSuccessful";

export class StarPublicationEndpoint extends Endpoint {
    constructor(token, publicationId) {
        super(token);
        this._publicationId = publicationId;
    }

    url() {
        return PUBLICATIONS_BASE_ENDPOINT + '/publications/' + this._publicationId + '/star'
    }

    ownResponses() {
        return [PublicationIsBlocked, PublicationNotFound, StarPublicationSuccessful];
    }

    method() {
        return 'POST';
    }
}
