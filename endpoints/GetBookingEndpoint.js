import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {GetBookingsSuccessful} from "../responses/bookings/GetBookingsSuccessful";
import {BookingNotFound} from "../responses/bookings/BookingNotFound";

export class GetBookingEndpoint extends Endpoint {
    constructor(token, bid) {
        super(token);
        this._bid = bid;
    }

    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/bookings/' + this._bid;
    }

    ownResponses() {
        return [GetBookingsSuccessful, BookingNotFound];
    }

    method() {
        return 'GET';
    }
}
