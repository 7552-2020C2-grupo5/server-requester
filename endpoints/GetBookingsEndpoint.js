import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {GetBookingsSuccessful} from "../responses/bookings/GetBookingsSuccessful";

export class GetBookingsEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/bookings';
    }

    ownResponses() {
        return [GetBookingsSuccessful];
    }

    method() {
        return 'GET';
    }
}
