import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {PostUserSuccessful} from "../responses/users/PostUserSuccessful";
import {PostUserAlreadyRegistered} from "../responses/users/PostUserAlreadyRegistered";
import {InvalidEmail} from "../responses/users/InvalidEmail";

export class NewAdminEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/admins/'
    }

    ownResponses() {
        return [PostUserSuccessful, PostUserAlreadyRegistered, InvalidEmail];
    }

    method() {
        return 'POST';
    }
}