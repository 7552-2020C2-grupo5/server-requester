import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {UserIsBlocked} from "../responses/users/UserIsBlocked";
import {UserBlockedSuccessful} from "../responses/users/UserBlockedSuccessful";

export class BlockUserEndpoint extends Endpoint {
    constructor(token, userId) {
        super(token);
        this._userId = userId;
    }

    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/users/' + this._userId;
    }

    ownResponses() {
        return [UserBlockedSuccessful, UserIsBlocked];
    }

    method() {
        return 'DELETE';
    }
}
