
const PUBLICATIONS_ENDPOINT = "https://bookbnb5-publications.herokuapp.com/v1/publication"

class Requester {
    async publications()  {
        let publications = await fetch(PUBLICATIONS_ENDPOINT)
            .then(response => {
                return response.json()
            }).catch( error => {
                return null
            })
        return publications
    }
}

export { Requester }
