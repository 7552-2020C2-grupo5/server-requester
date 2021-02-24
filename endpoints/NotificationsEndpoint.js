import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {PostNotificationSuccessful} from "../responses/notifications/PostNotificationSuccessful";

export class NotificationsEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/notifications';
    }

    ownResponses() {
        return [PostNotificationSuccessful];
    }

    method() {
        return 'POST';
    }
}
