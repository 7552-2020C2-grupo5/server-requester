import {Endpoint} from "./Endpoint.js";
import {GetUsersSuccessful} from "../responses/users/GetUsersSuccessful";
import {USERS_BASE_ENDPOINT} from "../requester";

export class GetAdminsEndpoint extends Endpoint {
    url() {
        return USERS_BASE_ENDPOINT + '/admins';
    }

    ownResponses() {
        return [GetUsersSuccessful];
    }

    method() {
        return 'GET';
    }
}