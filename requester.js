
const USERS_BASE_ENDPOINT = "https://bookbnb5-users-microservice.herokuapp.com/v1"
const PUBLICATIONS_ENDPOINT = "https://bookbnb5-publications.herokuapp.com/v1/publications"
const RESERVATIONS_ENDPOINT = "https://bookbnb5-bookings.herokuapp.com/v1/bookings"


// TODO: esto habría que refactorizarlo
class Requester {

    async register(user) {
        let response  = await fetch(USERS_BASE_ENDPOINT + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: user.name,
                last_name: user.lastName,
                email: user.email,
                password: user.password
            })
        }).then(response =>
            response.json().then(jsonResponse => {
                if(!response.ok){
                    throw new Error(jsonResponse.message)
                }
                return jsonResponse
            })
        )
        return response
    }

    async login(userCredentials) {
        let response = fetch(USERS_BASE_ENDPOINT + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userCredentials.username,
                password: userCredentials.password,
            })
        }).then(response =>
            response.json().then(jsonResponse => {
                if(!response.ok){
                    throw new Error(jsonResponse.message)
                }
                // no devuelve el ID asi que lo agregamos nosotros
                if (!jsonResponse.id) {
                jsonResponse.id = 1
                }
                return jsonResponse
            })
        )
        return response
    }

    async publications()  {
        let publications = await fetch(PUBLICATIONS_ENDPOINT)
            .then(response => {
                return response.json()
            }).catch( error => {
                return null
            })
        return publications
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
}

export { Requester }
