import {ErrorResponse} from "../generalResponses/ErrorResponse";

export class RechargeWalletError extends ErrorResponse {
    static defaultResponse() {
        return {
            "message": "Error in blockchain"
        }
    }

    static understandThis(jsonResponse, httpStatusCode) {
        return httpStatusCode === 400;
    }

    description() {
        return "Hubo un error en la blockchain al realizar la operación.";
    }
}