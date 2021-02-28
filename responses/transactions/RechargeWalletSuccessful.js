import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class RechargeWalletSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return {}
    }

    description() {
        return "Se ha agregado el saldo exitosamente."
    }
}
