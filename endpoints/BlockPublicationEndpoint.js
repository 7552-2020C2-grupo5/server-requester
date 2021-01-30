import {Endpoint} from "./Endpoint.js";
import {PUBLICATIONS_BASE_ENDPOINT} from "../requester";
import {PublicationIsBlocked} from "../responses/publications/PublicationIsBlocked";
import {PublicationBlockedSuccessful} from "../responses/publications/PublicationBlockedSuccessful";

export class BlockPublicationEndpoint extends Endpoint {
    constructor(userId) {
        super();
        this._userId = userId;
    }

    url() {
        return PUBLICATIONS_BASE_ENDPOINT + '/publications/' + this._userId;
    }

    ownResponses() {
        return [PublicationBlockedSuccessful, PublicationIsBlocked];
    }

    method() {
        return 'DELETE';
    }
}