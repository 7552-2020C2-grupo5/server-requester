import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT, SERVERS_BASE_ENDPOINT} from "../requester";
import {ServerIsBlocked} from "../responses/servers/ServerIsBlocked";
import {ServerNotFound} from "../responses/servers/ServerNotFound";
import {ServerBlockedSuccessful} from "../responses/servers/ServerBlockedSuccessful";

export class BlockServerEndpoint extends Endpoint {
    constructor(token, serverId) {
        super(token);
        this._serverId = serverId;
    }

    url() {
        return SERVERS_BASE_ENDPOINT + '/tokens/' + this._serverId;
    }

    ownResponses() {
        return [ServerBlockedSuccessful, ServerIsBlocked, ServerNotFound];
    }

    method() {
        return 'DELETE';
    }
}
