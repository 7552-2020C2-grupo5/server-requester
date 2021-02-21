import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {PostUserSuccessful} from "../responses/users/PostUserSuccessful";
import {PostUserAlreadyRegistered} from "../responses/users/PostUserAlreadyRegistered";

export class NewAdminEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/admins/'
    }

    ownResponses() {
        return [PostUserSuccessful, PostUserAlreadyRegistered];
    }

    method() {
        return 'POST';
    }
}