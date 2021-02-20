import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {ResetPasswordSuccessful} from "../responses/users/ResetPasswordSuccessful";
import {UserIsBlocked} from "../responses/users/UserIsBlocked";
import {UserNotFound} from "../responses/users/UserNotFound";

export class RecoverPasswordEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/users/reset_password'
    }

    ownResponses() {
        return [ResetPasswordSuccessful, UserIsBlocked, UserNotFound];
    }

    method() {
        return 'POST';
    }
}
