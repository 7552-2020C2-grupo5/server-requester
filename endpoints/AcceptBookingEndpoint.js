import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {AcceptBookingSuccessful} from "../responses/bookings/AcceptBookingSuccessful";
import {PaymentFailed} from "../responses/bookings/PaymentFailed";

export class AcceptBookingEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/bookings/accept_booking';
    }

   ownResponses() {
        return [AcceptBookingSuccessful, PaymentFailed];
    }

    method() {
        return 'POST';
    }
}
