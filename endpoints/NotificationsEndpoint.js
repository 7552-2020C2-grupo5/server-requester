import {Endpoint} from "./Endpoint.js";
import {MIDDLEWARE_BASE_ENDPOINT} from "../requester";
import {PostNotificationSuccessful} from "../responses/notifications/PostNotificationSuccessful";
import {PostNotificationError} from "../responses/notifications/PostNotificationError";

export class NotificationsEndpoint extends Endpoint {
    url() {
        return MIDDLEWARE_BASE_ENDPOINT + '/notifications';
    }

    ownResponses() {
        return [PostNotificationSuccessful, PostNotificationError];
    }

    method() {
        return 'POST';
    }
}
