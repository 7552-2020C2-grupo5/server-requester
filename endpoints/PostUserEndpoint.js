import {Endpoint} from "./Endpoint.js";
import {USERS_BASE_ENDPOINT} from "../requester";
import {PostUserSuccessful} from "../responses/users/PostUserSuccessful";

export class PostUserEndpoint extends Endpoint {
    url() {
        return USERS_BASE_ENDPOINT + '/users'
    }

    ownResponses() {
        return [PostUserSuccessful];
    }

    method() {
        return 'POST';
    }
}
