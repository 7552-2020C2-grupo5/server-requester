import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {RejectBookingSuccessful} from "../responses/bookings/RejectBookingSuccessful";
import {PaymentFailed} from "../responses/bookings/PaymentFailed";

export class RejectBookingEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/bookings/reject_booking';
    }

    ownResponses() {
        return [RejectBookingSuccessful, PaymentFailed];
    }

    method() {
        return 'POST';
    }
}
