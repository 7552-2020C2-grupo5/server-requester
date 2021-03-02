import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class GetLocationFormCoordinatesError extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "Error"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode >= 400;
    }

    description() {
        return "No se pudo obtener la dirección";
    }
}
