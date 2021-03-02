import {Endpoint} from "./Endpoint.js";
import {SERVERS_BASE_ENDPOINT} from "../requester";
import {ServerAlredyRegistered} from "../responses/servers/ServerAlredyRegistered";
import {CreateServerSuccessful} from "../responses/servers/CreateServerSuccessful";

export class NewServerEndpoint extends Endpoint {
    url() {
        return SERVERS_BASE_ENDPOINT + '/tokens'
    }

    ownResponses() {
        return [CreateServerSuccessful, ServerAlredyRegistered];
    }

    method() {
        return 'POST';
    }
}