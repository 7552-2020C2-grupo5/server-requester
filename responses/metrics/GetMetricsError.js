import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class GetMetricsError extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "Error"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 400;
    }

    description() {
        return "No se pudo obtener las métricas. Por favor, vuelva a intentarlo más tarde";
    }
}
