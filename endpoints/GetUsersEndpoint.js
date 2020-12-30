import {Endpoint} from "./Endpoint.js";
import {GetProfileSuccessful} from "../responses/profiles/GetProfileSuccessful.js";
import {GetUsersSuccessful} from "../responses/users/GetUsersSuccessful";

export class GetUsersEndpoint extends Endpoint {
    url() {
        return '/users'
    }

    ownResponses() {
        return [GetUsersSuccessful];
    }

    method() {
        return 'GET'
    }

    needsAuthorization() {
        return false;
    }
}