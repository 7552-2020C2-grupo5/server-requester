import {SuccessfulApiResponse} from "../responses/generalResponses/SuccessfulApiResponse.js";
import {TokenExpiredResponse} from "../responses/login/TokenExpiredResponse";
import {ServerErrorResponse} from "../responses/generalResponses/ServerErrorResponse";

export class Endpoint {
    constructor(token = undefined) {
        this._token = token;
    }

    url() {
        throw new Error("You have to implement the method");
   }

    token() {
        return this._token;
    }

    generalResponses() {
        return [ServerErrorResponse, SuccessfulApiResponse, TokenExpiredResponse];
    }

    ownResponses() {
        return [];
    }

    responses() {
        return this.ownResponses().concat(this.generalResponses());
    }

    contentType() {
        return 'application/json';
    }

    method() {
        throw new Error("You have to implement the method");
    }

    needsAuthorization() {
        return this._token !== undefined;
    }
}
