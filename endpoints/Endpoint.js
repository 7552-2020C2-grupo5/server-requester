import {SuccessfulApiResponse} from "../responses/generalResponses/SuccessfulApiResponse.js";
import {ServerErrorResponse} from "../responses/generalResponses/ServerErrorResponse";

export class Endpoint {
    url() {
        throw new Error("You have to implement the method");
    }

    generalResponses() {
        return [ServerErrorResponse, SuccessfulApiResponse];
    }

    ownResponses() {
        return [];
    }

    responses() {
        return this.ownResponses().concat(this.generalResponses);
    }

    contentType() {
        return 'application/json';
    }

    method() {
        throw new Error("You have to implement the method");
    }

    needsAuthorization() {
        throw new Error("You have to implement the method");
    }
}
