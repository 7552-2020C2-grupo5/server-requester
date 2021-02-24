import {Endpoint} from "./Endpoint.js";
import {GetUsersSuccessful} from "../responses/users/GetUsersSuccessful";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";

export class GetUsersEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/users/';
    }

    ownResponses() {
        return [GetUsersSuccessful];
    }

    method() {
        return 'GET';
    }
}
