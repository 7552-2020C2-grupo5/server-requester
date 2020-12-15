
const USERS_BASE_ENDPOINT = "https://bookbnb5-users-microservice.herokuapp.com/v1"
const PUBLICATIONS_ENDPOINT = "https://bookbnb5-publications.herokuapp.com/v1/publications"
const RESERVATIONS_ENDPOINT = "https://bookbnb5-bookings.herokuapp.com/v1/bookings"


class ServerAPI {

    async post(endpoint, body) {
        let response  = await fetch(endpoint, {
            method: 'POST',
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

    async get(endpoint, params={}) {
        var encodedParams = [];
        Object.entries(params).map(([k, v]) => {
            encodedParams.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        })
        var response = await fetch(endpoint + `?${encodedParams.join('&')}`).then(response =>
            response.json().then(jsonResponse => {
                if(!response.ok){
                    throw new Error(jsonResponse.message)
                }
                return jsonResponse
            })
        )
        return response
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


}


// TODO: esto habría que refactorizarlo
class Requester {

    constructor() {
        this.serverAPI = new ServerAPI()
    }

    async register(userData) {
        return this.serverAPI.post(USERS_BASE_ENDPOINT + '/users', {
            first_name: userData.name,
            last_name: userData.lastName,
            email: userData.email,
            password: userData.password
        })
    }

    async login(userCredentials) {
        var response = await this.serverAPI.post(USERS_BASE_ENDPOINT + '/login', {
            email: userCredentials.username,
            password: userCredentials.password,
        })
        if (!response.id) {
            response.id = 1
        }
        return response
    }

    async publications()  {
        var publications = await this.serverAPI.get(PUBLICATIONS_ENDPOINT)
        return publications
    }

    async publish(publicationDetails) {
        return this.serverAPI.post(PUBLICATIONS_ENDPOINT, {
            user_id: 1,
            title: publicationDetails.title,
            description: publicationDetails.description,
            rooms: publicationDetails.rooms,
            beds: publicationDetails.beds,
            bathrooms: publicationDetails.bathrooms,
            price_per_night: publicationDetails.price_per_night,
            loc: {
              latitude: publicationDetails.coordinates[0],
              longitude: publicationDetails.coordinates[1]
            }
        });
    }

    reservations() {
        let reservations = []
        for (let i = 0; i < 10; i++) {
            var fake_reservation = {
                title: 'Reserva',
                subtitle: 'Paseo Colón',
                initial_date: new Date("2020-11-21T03:17:52.882Z").toLocaleDateString(),
                end_date: new Date("2020-12-24T03:17:52.882Z").toLocaleDateString(),
                publication_id: 5
            }
            reservations.push(fake_reservation)
        }
        return reservations
    }

    async profileData(userData) {
        return this.serverAPI.get(USERS_BASE_ENDPOINT + '/users/' + userData.id)
    }

    async updateProfileData(userID, newUserData) {
        return this.serverAPI.put(USERS_BASE_ENDPOINT + '/users/' + userID, newUserData)
    }
}

export { Requester }
