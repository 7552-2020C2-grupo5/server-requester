import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {RechargeWalletSuccessful} from "../responses/transactions/RechargeWalletSuccessful";
import {RechargeWalletError} from "../responses/transactions/RechargeWalletError";

export class RechargeWalletEndpoint extends Endpoint {
    constructor(token, wallet_address) {
        super(token);
        this._walletAddress = wallet_address;
    }

    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/transactions/' + `${this._walletAddress}`
    }

    ownResponses() {
        return [RechargeWalletSuccessful, RechargeWalletError];
    }

    method() {
        return 'POST';
    }
}