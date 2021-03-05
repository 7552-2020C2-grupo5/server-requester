import {Endpoint} from "./Endpoint.js";
import {USERS_BASE_ENDPOINT} from "../requester";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {LoginSuccessful} from "../responses/login/LoginSuccessful";
import {InvalidCredentials} from "../responses/login/InvalidCredentials";
import {UserIsBlocked} from "../responses/users/UserIsBlocked";
import {UserNotFound} from "../responses/users/UserNotFound";

export class LoginEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/login';
    }

    ownResponses() {
        return [LoginSuccessful, InvalidCredentials, UserIsBlocked];
    }

    method() {
        return 'POST';
    }
}
