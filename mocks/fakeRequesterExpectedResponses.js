import {GetUsersEndpoint} from "../endpoints/GetUsersEndpoint";
import {GetProfileSuccessful} from "../responses/profiles/GetProfileSuccessful";
import {LoginEndpoint} from "../endpoints/LoginEndpoint";
import {LoginSuccessful} from "../responses/login/LoginSuccessful";
import {InvalidCredentials} from "../responses/login/InvalidCredentials";


const fakeRequesterExpectedResponses = () => {
    return {
        [GetUsersEndpoint.name]: GetProfileSuccessful,
        [LoginEndpoint.name]: LoginSuccessful,
    }
};

export default fakeRequesterExpectedResponses;