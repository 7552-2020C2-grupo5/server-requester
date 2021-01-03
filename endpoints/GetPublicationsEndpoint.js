import {Endpoint} from "./Endpoint.js";
import {PUBLICATIONS_BASE_ENDPOINT} from "../requester";
import {GetPublicationsSuccessful} from "../responses/publications/GetPublicationsSuccessful";

export class GetPublicationsEndpoint extends Endpoint {
    url() {
        return PUBLICATIONS_BASE_ENDPOINT + '/publications';
    }

    ownResponses() {
        return [GetPublicationsSuccessful];
    }

    method() {
        return 'GET';
    }
}