import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {GetWalletBalanceSuccessful} from  "../responses/transactions/GetWalletBalanceSuccessful";

export class GetWalletBalanceEndpoint extends Endpoint {
    constructor(token = undefined, wallet_address) {
        super(token);
        this._wallet_address = wallet_address;
    }

    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/transactions/' + `${this._wallet_address}`
   }

    ownResponses() {
        return [GetWalletBalanceSuccessful];
    }

    method() {
        return 'GET';
    }
}
