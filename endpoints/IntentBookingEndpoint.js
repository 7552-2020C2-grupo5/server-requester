import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {IntentBookingSuccessful} from "../responses/bookings/IntentBookingSuccessful";

export class IntentBookingEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/bookings/intent_book';
    }

    ownResponses() {
        return [IntentBookingSuccessful];
    }

    method() {
        return 'POST';
    }
}
