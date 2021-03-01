import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

const translationsForBookingStatus = {
    "ACCEPTED": "Aceptado",
    "PENDING": "Pendiente",
    "REJECTED": "Rechazada"
}

export class GetBookingsSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return [{
            "id": 0,
            "tenant_id": 0,
            "publication_id": 0,
            "total_price": 0,
            "initial_date": "2021-02-04",
            "final_date": "2021-02-04",
            "booking_date": "2021-02-04T00:10:06.797Z",
            "booking_status": "ACCEPTED"
        }]
    }

    bookings() {
        return this.content().map(
            (booking) => {
                return {
                    tenantId: booking.tenant_id,
                    publicationId: booking.publication_id,
                    totalPrice: booking.total_price,
                    initialDate: booking.initial_date,
                    finalDate: booking.final_date,
                    bookingDate: booking.booking_date,
                    bookingStatus: this._translateStatus(booking.booking_status)
                }
            }
        );
    }

    _translateStatus(status) {
        return translationsForBookingStatus[status];
    }
}
