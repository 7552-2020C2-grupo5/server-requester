import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class GetLocationFromCoordinatesSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return [
            {
                "id": 1,
                "server_name": "bookings",
                "blocked": true,
                "created_at": "2021-03-01T00:54:14.592Z",
                "blocked_at": "2021-03-01T00:54:14.592Z"
            }
        ];
    }

    address() {
        return this.content().display_name;
    }
}