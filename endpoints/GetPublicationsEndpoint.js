import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {GetPublicationsSuccessful} from "../responses/publications/GetPublicationsSuccessful";

export class GetPublicationsEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/publications/';
    }

    ownResponses() {
        return [GetPublicationsSuccessful];
    }

    method() {
        return 'GET';
    }
}
