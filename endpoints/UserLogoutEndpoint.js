import {Endpoint} from "./Endpoint.js";
import {USERS_BASE_ENDPOINT} from "../requester";
import {LogoutSuccessful} from "../responses/logout/LogoutSuccessful";

export class UserLogoutEndpoint extends Endpoint {
    url() {
        return USERS_BASE_ENDPOINT + '/users/logout';
    }

    ownResponses() {
        return [LogoutSuccessful];
    }

    method() {
        return 'POST';
    }
}
