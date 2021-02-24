import {Endpoint} from "./Endpoint.js";
import {RESERVATIONS_BASE_ENDPOINT} from "../requester";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {PostBookingSuccessful} from "../responses/bookings/PostBookingSuccessful";

export class PostBookingEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + 'bookbnb/bookings';
    }

    ownResponses() {
        return [PostBookingSuccessful];
    }

    method() {
        return 'POST';
    }
}
