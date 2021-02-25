import {Endpoint} from "./Endpoint.js";
import {UpdateUserDataSucessful} from "../responses/users/UpdateUserDataSuccessful"
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";


export class UpdateUserEndpoint extends Endpoint {
    constructor(token, userId, userData) {
        super(token);
        this._userId = userId;
        this._userData = userData;
    }

    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/users/' + this._userId;
    }

    ownResponses() {
        return [UpdateUserDataSucessful];
    }

    method() {
        return 'PUT';
    }
}
