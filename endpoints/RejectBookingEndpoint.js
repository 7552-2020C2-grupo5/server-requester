import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {RejectBookingSuccessful} from "../responses/bookings/RejectBookingSuccessful";

export class RejectBookingEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + 'bookings/reject_booking';
    }

    ownResponses() {
        return [RejectBookingSuccessful];
    }

    method() {
        return 'POST';
    }
}
