import {Endpoint} from "./Endpoint.js";
import {LoginSuccessful} from "../responses/login/LoginSuccessful";
import {InvalidCredentials} from "../responses/login/InvalidCredentials";
import {UserNotFound} from "../responses/users/UserNotFound";
import {USERS_BASE_ENDPOINT} from "../requester";

export class UserLoginEndpoint extends Endpoint {
    url() {
        return USERS_BASE_ENDPOINT + '/users/login';
    }

    ownResponses() {
        //TODO: El servidor está respondiendo 404 cuando se intenta
        //      logear con credenciales inválidas
        return [LoginSuccessful, InvalidCredentials, UserNotFound];
    }

    method() {
        return 'POST';
    }
}
