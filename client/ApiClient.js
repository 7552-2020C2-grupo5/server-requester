import {GetUsersEndpoint} from "../endpoints/GetUsersEndpoint.js";
import {UserLoginEndpoint} from "../endpoints/UserLoginEndpoint";
import {UserLogoutEndpoint} from "../endpoints/UserLogoutEndpoint";
import {ServerErrorResponse} from "../responses/generalResponses/ServerErrorResponse";
import {GetUserEndpoint} from "../endpoints/GetUserEndpoint";
import {GetPublicationsEndpoint} from "../endpoints/GetPublicationsEndpoint";
import {GetPublicationEndpoint} from "../endpoints/GetPublicationEndpoint";
import {BlockPublicationEndpoint} from "../endpoints/BlockPublicationEndpoint";
import {GetAdminsEndpoint} from "../endpoints/GetAdminsEndpoint";
import {GetAdminEndpoint} from "../endpoints/GetAdminEndpoint";
import {BlockUserEndpoint} from "../endpoints/BlockUserEndpoint";
import {LoginAdminEndpoint} from "../endpoints/LoginAdminEndpoint";
import {UpdateUserEndpoint} from "../endpoints/UpdateUserEndpoint";
import {UpdatePublicationEndpoint} from "../endpoints/UpdatePublicationEndpoint";
import {PostPublicationEndpoint} from "../endpoints/PostPublicationEndpoint";
import {GetBookingsEndpoint} from "../endpoints/GetBookingsEndpoint";
import {PostBookingEndpoint} from "../endpoints/PostBookingEndpoint";
import {PostPublicationQuestionEndpoint} from "../endpoints/PostPublicationQuestionEndpoint";
import {PostPublicationAnswerEndpoint} from "../endpoints/PostPublicationAnswerEndpoint";
import {StarPublicationEndpoint} from "../endpoints/StarPublicationEndpoint";
import {UnstarPublicationEndpoint} from "../endpoints/UnstarPublicationEndpoint";
import {GetPublicationStarsEndpoint} from "../endpoints/GetPublicationStarsEndpoint";
import {PostUserEndpoint} from "../endpoints/PostUserEndpoint";
import {GetUserReviewsEndpoint} from "../endpoints/GetUserReviewsEndpoint";
import {GetPublicationReviewsEndpoint} from "../endpoints/GetPublicationReviewsEndpoint";
import {AddUserReviewEndpoint} from "../endpoints/AddUserReviewEndpoint";
import {AddPublicationReviewEndpoint} from "../endpoints/AddPublicationReviewEndpoint";
import {RecoverPasswordEndpoint} from "../endpoints/RecoverPasswordEndpoint";
import {GetWalletBalanceEndpoint} from "../endpoints/GetWalletBalanceEndpoint";
import {RejectBookingEndpoint} from "../endpoints/RejectBookingEndpoint";
import {AcceptBookingEndpoint} from "../endpoints/AcceptBookingEndpoint";
import {IntentBookingEndpoint} from "../endpoints/IntentBookingEndpoint";
import {NotificationsEndpoint} from "../endpoints/NotificationsEndpoint";
import {NewAdminEndpoint} from "../endpoints/NewAdminEndpoint";
import {TokenExpiredResponse} from "../responses/login/TokenExpiredResponse";
import {OAuthLoginEndpoint} from "../endpoints/OAuthLoginEndpoint";
import {AdminLogoutEndpoint} from "../endpoints/AdminLogoutEndpoint";
import {RechargeWalletEndpoint} from "../endpoints/RechargeWalletEndpoint";
import {GetBookingEndpoint} from "../endpoints/GetBookingEndpoint";
import {GetServersEndpoint} from "../endpoints/GetServersEndpoint";
import {GetServerOptionsEndpoint} from "../endpoints/GetServerOptionsEndpoint";
import {BlockServerEndpoint} from "../endpoints/BlockServerEndpoint";
import {NewServerEndpoint} from "../endpoints/NewServerEndpoint";
import {GetLocationFromCoordinatesEndpoint} from "../endpoints/GetLocationFromCoordinatesEndpoint";
import {GetMetricsEndpoint} from "../endpoints/GetMetricsEndpoint";
import {GetRecommendationsByPopularEndpoint} from "../endpoints/GetRecommendationsByPopularEndpoint";
import {GetRecommendationsByReviewsEndpoint} from "../endpoints/GetRecommendationsByReviewsEndpoint";
import {MiddlewareNotUpErrorResponse} from "../responses/generalResponses/MiddlewareNotUpErrorResponse";


class ApiClient {
    constructor(requester, onServerErrorDo = undefined, token = undefined,
                onTokenExpired = undefined) {
        this._requester = requester;
        this._token = token;
        this._handleServerError = onServerErrorDo;
        this._onTokenExpired = onTokenExpired;
        this._handleResponse = this._handleResponse.bind(this);
        this._serverModeOn = false;
    }

    setServerModeOn() {
        this._serverModeOn = true;
    }

    setToken(token) {
        this._token = token;
    }

    hasToken() {
        return this._token !== undefined;
    }

    _handleResponse(response, onResponse) {
        if (response instanceof ServerErrorResponse) {
            console.log("Server error: ", response);
            if (this._handleServerError !== undefined) {
                return this._handleServerError(response);
            }
        }
        if (response instanceof TokenExpiredResponse) {
            console.log("Token expired: ", response);
            if (this._serverModeOn) {
                response = new MiddlewareNotUpErrorResponse(response.content(), response.httpStatusCode());
            }
            else if (this._onTokenExpired !== undefined) {
                return this._onTokenExpired(response);
            }
        }
        return onResponse(response);
   }

    register(userDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostUserEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: userDetails
        });
    }

    userLogin(data, onResponse) {
        return this._requester.call({
            endpoint: new UserLoginEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    oauthLogin(data, onResponse) {
        return this._requester.call({
            endpoint: new OAuthLoginEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    userLogout(token, onResponse) {
        return this._requester.call({
            endpoint: new UserLogoutEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    adminLogout(onResponse) {
        return this._requester.call({
            endpoint: new AdminLogoutEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    getUsers(onResponse, filters={}) {
        return this._requester.call({
            endpoint: new GetUsersEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
       });
    }

    getAllUsers(onResponse, filters={}) {
        const filtersToApply = {...filters, filter_blocked: 'false'};
        return this._requester.call({
            endpoint: new GetUsersEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filtersToApply
        });
    }

    profileData(userId, onResponse) {
        return this._requester.call({
            endpoint: new GetUserEndpoint(this._token, userId),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    updateProfileData(userId, userData, onResponse) {
        return this._requester.call({
            endpoint: new UpdateUserEndpoint(this._token, userId, userData),
            data: userData,
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    blockUser(userId, onResponse)  {
        return this._requester.call({
            endpoint: new BlockUserEndpoint(this._token, userId),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    getAdmins(onResponse, filters={}) {
        return this._requester.call({
            endpoint: new GetAdminsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    getAdminProfile(adminId, onResponse) {
        return this._requester.call({
            endpoint: new GetAdminEndpoint(this._token, adminId),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }

    publications(onResponse, filters={})  {
        return this._requester.call({
            endpoint: new GetPublicationsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    getAllPublications(onResponse, filters={})  {
        const filtersToApply = {...filters, filter_blocked: 'false'}
        return this._requester.call({
            endpoint: new GetPublicationsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filtersToApply
        });
    }

    getPublication(publicationId, onResponse)  {
        return this._requester.call({
            endpoint: new GetPublicationEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    updatePublication(publicationId, publicationDetails, onResponse) {
        return this._requester.call({
            endpoint: new UpdatePublicationEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: publicationDetails
        });
    }

    postPublication(publicationDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostPublicationEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: publicationDetails
        });
    }

    blockPublication(publicationId, onResponse)  {
        return this._requester.call({
            endpoint: new BlockPublicationEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    loginAdmin(data, onResponse) {
        return this._requester.call({
            endpoint: new LoginAdminEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    newAdmin(data, onResponse) {
        return this._requester.call({
            endpoint: new NewAdminEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    booking(bookingId, onResponse) {
        return this._requester.call({
            endpoint: new GetBookingEndpoint(this._token, bookingId),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    bookings(filters = {}, onResponse) {
        return this._requester.call({
            endpoint: new GetBookingsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    makeReservation(reservationDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostBookingEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: reservationDetails
        });
    }

    addQuestion(publicationId, questionDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostPublicationQuestionEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: questionDetails
        });
    }

    addAnswer(publicationId, questionId, answerDetails, onResponse) {
        return this._requester.call({
            endpoint: new PostPublicationAnswerEndpoint(this._token, publicationId, questionId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: answerDetails
        });
    }

    starPublication(publicationId, userId, onResponse) {
        return this._requester.call({
            endpoint: new StarPublicationEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {user_id: userId}
        });
    }

    unstarPublication(publicationId, userId, onResponse) {
       return this._requester.call({
            endpoint: new UnstarPublicationEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {user_id: userId}
        });
    }

    getPublicationStars(publicationId, userId, onResponse) {
        return this._requester.call({
            endpoint: new GetPublicationStarsEndpoint(this._token, publicationId),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {user_id: userId}
        });
    }

    publicationReviews(filters={}, onResponse) {
        return this._requester.call({
            endpoint: new GetPublicationReviewsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    userReviews(filters={}, onResponse) {
        return this._requester.call({
            endpoint: new GetUserReviewsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: filters
        });
    }

    addPublicationReview(reviewDetails, onResponse) {
        return this._requester.call({
            endpoint: new AddPublicationReviewEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: reviewDetails
        });
    }

    addUserReview(reviewDetails, onResponse) {
        return this._requester.call({
            endpoint: new AddUserReviewEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: reviewDetails
        });
    }

    resetPassword(recoverEmail, onResponse) {
        return this._requester.call({
            endpoint: new RecoverPasswordEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {email: recoverEmail}
        });
    }

    walletBalance(walletAddress, onResponse) {
        return this._requester.call({
            endpoint: new GetWalletBalanceEndpoint(this._token, walletAddress),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    intentBooking(data, onResponse) {
        return this._requester.call({
            endpoint: new IntentBookingEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    rejectBooking(data, onResponse) {
        return this._requester.call({
            endpoint: new RejectBookingEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    acceptBooking(data, onResponse) {
        return this._requester.call({
            endpoint: new AcceptBookingEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    ackNewMessage(data, onResponse) {
        return this._requester.call({
            endpoint: new NotificationsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    getMetrics(initialDate, lastDate, onResponse) {
        const data = {
            start_date: initialDate,
            end_date: lastDate,
        }
        return this._requester.call({
            endpoint: new GetMetricsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    rechargeWallet(userAddress, accountMnemonic, amount, onResponse) {
        const data = {
            mnemonic: accountMnemonic,
            value: amount
        }
        return this._requester.call({
            endpoint: new RechargeWalletEndpoint(this._token, userAddress),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    getServers(onResponse) {
        return this._requester.call({
            endpoint: new GetServersEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    getOptionsForServer(onResponse) {
        return this._requester.call({
            endpoint: new GetServerOptionsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    blockServer(serverId, onResponse)  {
        return this._requester.call({
            endpoint: new BlockServerEndpoint(this._token, serverId),
            onResponse: (response) => this._handleResponse(response, onResponse),
        });
    }

    newServer(serverName, onResponse)  {
        return this._requester.call({
            endpoint: new NewServerEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {
                server_name: serverName
            }
        });
    }

    getLocationFromCoordinates(latitude, longitude, onResponse) {
        return this._requester.call({
            endpoint: new GetLocationFromCoordinatesEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: {
                key: process.env.REACT_APP_ACCESS_TOKEN_LOCATION_API,
                format: "json",
                lat: latitude,
                lon: longitude
            }
        });
    }

    getRecommendationsByPopular(data, onResponse) {
        console.log(this._token)
        return this._requester.call({
            endpoint: new GetRecommendationsByPopularEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    getRecommendationsByReviews(data, onResponse) {
        return this._requester.call({
            endpoint: new GetRecommendationsByReviewsEndpoint(this._token),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }
}

export default ApiClient;
