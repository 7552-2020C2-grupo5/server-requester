
const USERS_BASE_ENDPOINT = "https://bookbnb5-users-microservice.herokuapp.com/v1"
const PUBLICATIONS_BASE_ENDPOINT = "https://bookbnb5-publications.herokuapp.com/v1"
const RESERVATIONS_ENDPOINT = "https://bookbnb5-bookings.herokuapp.com/v1/bookings"


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
//        this.serverAPI = new API()
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
        var publications = await this.serverAPI.get(PUBLICATIONS_BASE_ENDPOINT + '/publications')
        return publications
    }

    async publish(publicationDetails) {
        return this.serverAPI.post(PUBLICATIONS_BASE_ENDPOINT + '/publications', {
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

    async searchPublications(searchParams={}) {
        var params = {
            bathrooms: 0,
            rooms: 0,
            beds: 0,
            ...searchParams
        }
        console.log('Searching by params')
        console.log(params)
        var response =  await this.serverAPI.get(PUBLICATIONS_BASE_ENDPOINT + '/publications', params)
        console.log(response)
        return response
    }
}

export { Requester }
