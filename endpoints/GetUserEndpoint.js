import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {GetUserSuccessful} from "../responses/users/GetUserSuccessful";
import {UserIsBlocked} from "../responses/users/UserIsBlocked";
import {UserNotFound} from "../responses/users/UserNotFound";

export class GetUserEndpoint extends Endpoint {
    constructor(token, userId) {
        super(token);
        this._userId = userId;
    }

    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/users/' + this._userId;
    }

    ownResponses() {
        return [GetUserSuccessful, UserIsBlocked, UserNotFound];
    }

    method() {
        return 'GET';
    }
}
