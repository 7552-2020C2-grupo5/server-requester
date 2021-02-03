import {GetUsersEndpoint} from "../endpoints/GetUsersEndpoint";
import {LoginEndpoint} from "../endpoints/LoginEndpoint";
import {LoginSuccessful} from "../responses/login/LoginSuccessful";
import {GetUsersSuccessful} from "../responses/users/GetUsersSuccessful";
import {GetUserSuccessful} from "../responses/users/GetUserSuccessful";
import {GetUserEndpoint} from "../endpoints/GetUserEndpoint";


const fakeRequesterExpectedResponses = () => {
    return {
        [GetUsersEndpoint.name]: GetUsersSuccessful,
        [GetUserEndpoint.name]: GetUserSuccessful,
        [LoginEndpoint.name]: LoginSuccessful,
    }
};

export default fakeRequesterExpectedResponses;