import {Endpoint} from "./Endpoint.js";
import {SERVERS_BASE_ENDPOINT} from "../requester";
import {GetServerOptionsSuccessful} from "../responses/servers/GetServerOptionsSuccessful";

export class GetServerOptionsEndpoint extends Endpoint {
    url() {
        return SERVERS_BASE_ENDPOINT + '/services';
    }

    ownResponses() {
        return [GetServerOptionsSuccessful];
    }

    method() {
        return 'GET';
    }
}