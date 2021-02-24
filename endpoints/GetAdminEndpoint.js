import {Endpoint} from "./Endpoint.js";
import {USERS_BASE_ENDPOINT} from "../requester";
import {GetUserSuccessful} from "../responses/users/GetUserSuccessful";
import {UserIsBlocked} from "../responses/users/UserIsBlocked";
import {UserNotFound} from "../responses/users/UserNotFound";

export class GetAdminEndpoint extends Endpoint {
    constructor(_adminId) {
        super();
        this._adminId = _adminId;
    }

    url() {
        return USERS_BASE_ENDPOINT + '/admins/' + this._adminId;
    }

    ownResponses() {
        return [GetUserSuccessful, UserIsBlocked, UserNotFound];
    }

    method() {
        return 'GET';
    }
}