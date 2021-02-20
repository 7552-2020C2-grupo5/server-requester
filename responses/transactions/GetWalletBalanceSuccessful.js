import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class GetWalletBalanceSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
          "ETH": 0,
          "USD": 0,
          "EUR": 0
        }
    }
}
