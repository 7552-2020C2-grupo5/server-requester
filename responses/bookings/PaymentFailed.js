import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class PaymentFailed extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "Payment failed"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 400;
    }

    description() {
        return "No tenés suficientes ethers para realizar esta acción";
    }
}
