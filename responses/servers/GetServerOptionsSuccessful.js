import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class GetServerOptionsSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            "services": [
                "bookings",
                "middleware",
                "notifications",
                "publications",
                "reviews",
                "users",
                "recommendations"
            ]
        };
    }

    serverOptions() {
        return this.content().services.map(
            (service) => {
                return {
                    text: service,
                    value: service.toUpperCase()
                }
            }
        );
    }
}