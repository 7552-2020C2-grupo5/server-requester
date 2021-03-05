import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {LoginSuccessful} from "../responses/login/LoginSuccessful";
import {InvalidCredentials} from "../responses/login/InvalidCredentials";
import {UserIsBlocked} from "../responses/users/UserIsBlocked";

export class OAuthLoginEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/oauth/login';
    }

    ownResponses() {
        return [LoginSuccessful, InvalidCredentials, UserIsBlocked];
    }

    method() {
        return 'POST';
    }
}
