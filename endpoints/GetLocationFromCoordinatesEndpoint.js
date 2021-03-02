import {Endpoint} from "./Endpoint.js";
import {GetLocationFromCoordinatesSuccessful} from "../responses/location/GetLocationFromCoordinatesSuccessful";
import {GetLocationFormCoordinatesError} from "../responses/location/GetLocationFormCoordinatesError";

export class GetLocationFromCoordinatesEndpoint extends Endpoint {
    url() {
        return 'https://us1.locationiq.com/v1/reverse.php';
    }

    ownResponses() {
        return [GetLocationFromCoordinatesSuccessful, GetLocationFormCoordinatesError];
    }

    method() {
        return 'GET';
    }

    needsAuthorization() {
        return false;
    }
}