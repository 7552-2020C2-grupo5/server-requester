import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {IntentBookingSuccessful} from "../responses/bookings/IntentBookingSuccessful";
import {PaymentFailed} from "../responses/bookings/PaymentFailed";
import {IntentPreconditionFailed} from "../responses/bookings/IntentPreconditionFailed";

export class IntentBookingEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/bookings/intent_book';
    }

    ownResponses() {
        return [IntentBookingSuccessful, PaymentFailed, IntentPreconditionFailed];
    }

    method() {
        return 'POST';
    }
}
