import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class PostNotificationError extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "post notification failed"
        }
    }

   static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 400;
    }

    description() {
        return "Fallo al enviar la notificación";
    }
}
