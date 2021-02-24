import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {PublicationNotFound} from "../responses/publications/PublicationNotFound";
import {PublicationIsBlocked} from "../responses/publications/PublicationIsBlocked";
import {UpdatePublicationSuccessful} from "../responses/publications/UpdatePublicationSuccessful";


export class UpdatePublicationEndpoint extends Endpoint {
    constructor(token, publicationId) {
        super(token)
        this._publicationId = publicationId
   }

    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/publications/' + this._publicationId;
    }

   ownResponses() {
        return [UpdatePublicationSuccessful, PublicationIsBlocked, PublicationNotFound];
    }

    method() {
        return 'PUT';
    }
}
