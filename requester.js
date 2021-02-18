export const USERS_BASE_ENDPOINT = "https://bookbnb5-users-microservice.herokuapp.com/v1"
export const PUBLICATIONS_BASE_ENDPOINT = "https://bookbnb5-publications.herokuapp.com/v1"
export const RESERVATIONS_BASE_ENDPOINT = "https://bookbnb5-bookings.herokuapp.com/v1"
export const REVIEWS_BASE_ENDPOINT = "https://bookbnb5-reviews.herokuapp.com/v1"
export const MIDDLEWARE_BASE_ENDPOINT = "https://bookbnb5-middleware.herokuapp.com/bookbnb"


class ServerAPI {

    async post(endpoint, body, headers={}) {
        console.log("POST %s with %s", endpoint, body)
        let response  = await fetch(endpoint, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(response =>
            response.json().then(jsonResponse => {
                if(!response.ok){
                    throw new Error(jsonResponse.message);
                }
                return jsonResponse;
            })
        )
        return response;
    }

    async get(endpoint, params={}) {
        console.log("GET %s with %s", endpoint, params)
        let encodedParams = [];
        Object.entries(params).map(([key, value]) => {
            if (value != "") {
                encodedParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        })
        let response = await fetch(endpoint + `?${encodedParams.join('&')}`).then(response =>
            response.json().then(jsonResponse => {
                if(!response.ok){
                    throw new Error(jsonResponse.message);
                }
                return jsonResponse;
            })
        );
        return response;
    }

    async put(endpoint, body) {
        let response  = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            response.json().then(jsonResponse => {
                if(!response.ok){
                    throw new Error(jsonResponse.message)
                }
                return jsonResponse
            })
        })
        return response
    }

    async patch(endpoint, body) {
        let response  = await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            response.json().then(jsonResponse => {
                if(!response.ok){
                    throw new Error(jsonResponse.message)
                }
                return jsonResponse
            })
        })
        return response
    }

    async delete(endpoint, body) {
        let response  = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            response.json().then(jsonResponse => {
                if(!response.ok){
                    throw new Error(jsonResponse.message)
                }
                return jsonResponse
            })
        })
        return response
    }

}


// TODO: esto habría que refactorizarlo. Deberian llamarse al revés, el requester es el que hace los pedidos
// y la api el que maneja a que endpoint le pega, con que data, etc.
export class Requester {

    constructor() {
        throw new Error("[DEPRECATION] Unable to instantiate this class")
    }

    async register(userData) {
        var response = await this.serverAPI.post(USERS_BASE_ENDPOINT + '/users', {
            first_name: userData.name,
            last_name: userData.lastName,
            email: userData.email,
            password: userData.password,
            profile_picture: ''
        });
        return response
    }

    async login(userCredentials) {
        let response = await this.serverAPI.post(USERS_BASE_ENDPOINT + '/users/login', {
            email: userCredentials.username,
            password: userCredentials.password,
        });
        return response;
    }

    async publications(filters={})  {
        let publications = await this.serverAPI.get(PUBLICATIONS_BASE_ENDPOINT + '/publications', filters);
        return publications;
    }

    async getPublication(publicationId) {
        return this.serverAPI.get(PUBLICATIONS_BASE_ENDPOINT + '/publications/' + publicationId)
    }

    async publish(publicationDetails) {
        return this.serverAPI.post(PUBLICATIONS_BASE_ENDPOINT + '/publications', {
            user_id: publicationDetails.user_id,
            title: publicationDetails.title,
            description: publicationDetails.description,
            rooms: publicationDetails.rooms,
            beds: publicationDetails.beds,
            bathrooms: publicationDetails.bathrooms,
            images: [{
                url: publicationDetails.photoURL[0]
            }],
            price_per_night: publicationDetails.price_per_night,
            loc: {
              latitude: publicationDetails.coordinates[0],
              longitude: publicationDetails.coordinates[1]
            }
       });
    }

    async updatePublication(publicationDetails) {
        return this.serverAPI.put(PUBLICATIONS_BASE_ENDPOINT + `/publications/${publicationDetails.id}`, {
            title: publicationDetails.title,
            description: publicationDetails.description,
            rooms: publicationDetails.rooms,
            beds: publicationDetails.beds,
            bathrooms: publicationDetails.bathrooms,
            images: [{
                url: publicationDetails.photoURL[0]
            }],
            price_per_night: publicationDetails.price_per_night,
            loc: {
              latitude: publicationDetails.coordinates[0],
              longitude: publicationDetails.coordinates[1]
            }
        });
    }


    async reservations(params={}) {
        return this.serverAPI.get(RESERVATIONS_BASE_ENDPOINT + '/bookings', params)
    }

    async addReservation(reservationDetails) {
        return this.serverAPI.post(RESERVATIONS_BASE_ENDPOINT + '/bookings', reservationDetails)
    }

    async users() {
        return this.serverAPI.get(USERS_BASE_ENDPOINT + '/users');
    }

    async profileData(userData) {
        return this.serverAPI.get(USERS_BASE_ENDPOINT + '/users/' + userData.id)
    }

    async updateProfileData(userID, newUserData) {
        return this.serverAPI.put(USERS_BASE_ENDPOINT + '/users/' + userID, newUserData)
    }

    //Deberia ir directo en el publications no? Es el mismo pedido
    async searchPublications(params={}) {
        var response =  await this.serverAPI.get(PUBLICATIONS_BASE_ENDPOINT + '/publications', params)
        return response
    }

    async addQuestion(questionContext) {
        let resourceEndpoint = `/publications/${questionContext.publicationID}/questions`

        return this.serverAPI.post(PUBLICATIONS_BASE_ENDPOINT + resourceEndpoint, {
            question: questionContext.question,
            user_id: questionContext.userID
        })
    }

    async addAnswer(answerContext) {
        let resourceEndpoint = `/publications/${answerContext.publicationID}/questions/${answerContext.questionID}`

        return this.serverAPI.patch(PUBLICATIONS_BASE_ENDPOINT + resourceEndpoint , {
            reply: answerContext.answer
        })
    }

    async logout(token) {
        let response = await this.serverAPI.post(
            USERS_BASE_ENDPOINT + '/users/logout',
            {},
            {Authorization: token}
        );
        return response;
    }

    async userReviews(userData) {
        return await this.serverAPI.get(REVIEWS_BASE_ENDPOINT + '/user_reviews/reviews',  {
            reviewee_id: userData.id
        })
    }

    async addUserReview(reviewDetails) {
        return await this.serverAPI.post(REVIEWS_BASE_ENDPOINT + '/user_reviews/reviews', {
            score: reviewDetails.score,
            comment: reviewDetails.comment,
            reviewer_id: reviewDetails.reviewer_id,
            reviewee_id: reviewDetails.reviewee_id,
            booking_id: reviewDetails.booking_id,
        })
    }

    async publicationReviews(publicationData) {
        return await this.serverAPI.get(REVIEWS_BASE_ENDPOINT + '/publication_reviews/reviews',  {
            publication_id: publicationData.id
        })
    }

    async addPublicationReview(reviewDetails) {
        return await this.serverAPI.post(REVIEWS_BASE_ENDPOINT + '/publication_reviews/reviews', {
            score: reviewDetails.score,
            comment: reviewDetails.comment,
            reviewer_id: reviewDetails.reviewer_id,
            publication_id: reviewDetails.publication_id,
            booking_id: reviewDetails.booking_id,
        })
    }

    async getStarPublication(userID, publicationID) {
        return this.serverAPI.get(PUBLICATIONS_BASE_ENDPOINT + `/publications/${publicationID}/star`, {
            user_id: userID
        })
    }

    async starPublication(userID, publicationID) {
        return this.serverAPI.post(PUBLICATIONS_BASE_ENDPOINT + `/publications/${publicationID}/star`, {
            user_id: userID
        })
    }

    async unstarPublication(userID, publicationID) {
        return this.serverAPI.delete(PUBLICATIONS_BASE_ENDPOINT + `/publications/${publicationID}/star`, {
            user_id: userID
        })
    }
}
