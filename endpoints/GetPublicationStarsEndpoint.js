import {Endpoint} from "./Endpoint.js";
import {PUBLICATIONS_BASE_ENDPOINT} from "../requester";
import {PublicationIsBlocked} from "../responses/publications/PublicationIsBlocked";
import {PublicationNotFound} from "../responses/publications/PublicationNotFound";
import {GetPublicationStarsSuccessful} from "../responses/publications/stars/GetPublicationStarsSuccessful";

export class GetPublicationStarsEndpoint extends Endpoint {
    constructor(token, publicationId) {
        super(token);
        this._publicationId = publicationId;
    }

    url() {
        return PUBLICATIONS_BASE_ENDPOINT + '/publications/' + this._publicationId + '/star'
    }

    ownResponses() {
        return [GetPublicationStarsSuccessful, PublicationIsBlocked, PublicationNotFound];
    }

    method() {
        return 'GET';
    }
}
