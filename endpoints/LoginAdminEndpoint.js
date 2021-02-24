import {Endpoint} from "./Endpoint.js";
import {USERS_BASE_ENDPOINT} from "../requester";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {LoginSuccessful} from "../responses/login/LoginSuccessful";
import {InvalidCredentials} from "../responses/login/InvalidCredentials";

export class LoginAdminEndpoint extends Endpoint {
    url() {
        return USERS_BASE_ENDPOINT + '/admins/login';
    }

    ownResponses() {
        return [LoginSuccessful, InvalidCredentials];
    }

    method() {
        return 'POST';
    }
}