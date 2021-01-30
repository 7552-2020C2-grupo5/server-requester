import {Endpoint} from "./Endpoint.js";
import {PUBLICATIONS_BASE_ENDPOINT} from "../requester";
import {GetPublicationsSuccessful} from "../responses/publications/GetPublicationsSuccessful";
import {PublicationIsBlocked} from "../responses/publications/PublicationIsBlocked";
import {PublicationNotFound} from "../responses/publications/PublicationNotFound";
import {GetPublicationSuccessful} from "../responses/publications/GetPublicationSuccessful";

export class GetPublicationEndpoint extends Endpoint {
    constructor(publicationId) {
        super();
        this._publicationId = publicationId;
    }

    url() {
        return PUBLICATIONS_BASE_ENDPOINT + '/publications/' + this._publicationId;
    }

    ownResponses() {
        return [GetPublicationSuccessful, PublicationIsBlocked, PublicationNotFound];
    }

    method() {
        return 'GET';
    }
}