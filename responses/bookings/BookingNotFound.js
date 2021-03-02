import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class BookingNotFound extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "Booking not found"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 404;
    }

    description() {
        return "No se encontró la reserva buscada";
    }
}
