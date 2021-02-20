import {Endpoint} from "./Endpoint.js";
import {LoginSuccessful} from "../responses/login/LoginSuccessful";
import {InvalidCredentials} from "../responses/login/InvalidCredentials";

export class LoginAdminEndpoint extends Endpoint {
    url() {
        return 'admins/login';
    }

    ownResponses() {
        return [LoginSuccessful, InvalidCredentials];
    }

    method() {
        return 'POST';
    }
}