import {Endpoint} from "./Endpoint.js";
import {RESERVATIONS_BASE_ENDPOINT} from "../requester";
import {GetBookingsSuccessful} from "../responses/bookings/GetBookingsSuccessful";

export class GetBookingsEndpoint extends Endpoint {
    url() {
        return RESERVATIONS_BASE_ENDPOINT + '/bookings';
    }

    ownResponses() {
        return [GetBookingsSuccessful];
    }

    method() {
        return 'GET';
    }
}
