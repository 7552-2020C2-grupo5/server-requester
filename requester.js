const USERS_BASE_ENDPOINT = "https://bookbnb5-users-microservice.herokuapp.com/v1"
const PUBLICATIONS_BASE_ENDPOINT = "https://bookbnb5-publications.herokuapp.com/v1"
const RESERVATIONS_BASE_ENDPOINT = "https://bookbnb5-bookings.herokuapp.com/v1"
const REVIEWS_BASE_ENDPOINT = "https://bookbnb5-reviews.herokuapp.com/v1"


class API {
    async post(endpoint, body){
        return new Promise((resolve, refuse) => {
            setTimeout(() => {
                console.log('Making POST with ')
                console.log(endpoint)
                console.log(body)
                resolve()
            }, 1000)
        })
    }

    async get(endpoint, params={}) {
        return new Promise((resolve, refuse) => {
            setTimeout(() => {
                console.log('Making GET with ')
                console.log(endpoint)
                console.log(params)
                resolve()
            }, 1000)
        })
    }

    async put(endpoint, body) {
        return new Promise((resolve, refuse) => {
            setTimeout(() => {
                console.log('Making PUT with ')
                console.log(endpoint)
                console.log(body)
                resolve()
            }, 1000)
        })
    }
}



/*  La mayoría de los métodos hacen lo mismo (un fetch) podríamos hacer un refactor
 *  que una todos o algunos al menos para no repetir tanto código.
 */
class ServerAPI {

    async post(endpoint, body, headers={}) {
        console.log("POST with")
        console.log(body)
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


}


// TODO: esto habría que refactorizarlo. Deberian llamarse al revés, el requester es el que hace los pedidos
// y la api el que maneja a que endpoint le pega, con que data, etc.
class Requester {

    constructor() {
        this.serverAPI = new ServerAPI()
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
    async searchPublications(searchParams={}) {
        var params = {
            bathrooms: 0,
            rooms: 0,
            beds: 0,
            ...searchParams
        }
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
            booking_id: 2,
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
            booking_id: 2,
        })
    }
}

export { Requester }
