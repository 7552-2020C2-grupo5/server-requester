import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {PublicationIsBlocked} from "../responses/publications/PublicationIsBlocked";
import {PublicationBlockedSuccessful} from "../responses/publications/PublicationBlockedSuccessful";
import {PublicationNotFound} from "../responses/publications/PublicationNotFound";

export class BlockPublicationEndpoint extends Endpoint {
    constructor(token, userId) {
        super(token);
        this._userId = userId;
    }

    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/publications/' + this._userId;
    }

    ownResponses() {
        return [PublicationBlockedSuccessful, PublicationIsBlocked, PublicationNotFound];
    }

    method() {
        return 'DELETE';
    }
}
