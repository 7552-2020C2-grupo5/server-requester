import {Endpoint} from "./Endpoint.js";
import {UpdateUserDataSucessful} from "../responses/users/UpdateUserDataSuccessful"
import {USERS_BASE_ENDPOINT} from "../requester";


export class UpdateUserEndpoint extends Endpoint {
    constructor(userId, userData) {
        super();
        this._userId = userId;
        this._userData = userData;
    }

    url() {
        return USERS_BASE_ENDPOINT + '/users/' + this._userId;
    }

    ownResponses() {
        return [UpdateUserDataSucessful];
    }

    method() {
        return 'PUT';
    }
}
