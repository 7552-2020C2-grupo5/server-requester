import {Endpoint} from "./Endpoint.js";
import {SERVERS_BASE_ENDPOINT} from "../requester";
import {GetServersSuccessful} from "../responses/servers/GetServersSuccessful";

export class GetServersEndpoint extends Endpoint {
    url() {
        return SERVERS_BASE_ENDPOINT + '/tokens';
    }

    ownResponses() {
        return [GetServersSuccessful];
    }

    method() {
        return 'GET';
    }
}
