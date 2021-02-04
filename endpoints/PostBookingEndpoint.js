import {Endpoint} from "./Endpoint.js";
import {RESERVATIONS_BASE_ENDPOINT} from "../requester";
import {PostBookingSuccessful} from "../responses/bookings/PostBookingSuccessful";

export class PostBookingEndpoint extends Endpoint {
    url() {
        return RESERVATIONS_BASE_ENDPOINT + '/bookings';
    }

    ownResponses() {
        return [PostBookingSuccessful];
    }

    method() {
        return 'POST';
    }
}
