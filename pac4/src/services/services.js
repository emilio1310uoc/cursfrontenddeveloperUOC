import axios from 'axios'

const protocol = 'https://';
const host = 'pokeapi.co/api/v2/';

const pokeApi = axios.create({
    baseURL: protocol + host,
    wihtCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    async getPokemons() {
        try {
            let response = await pokeApi.get('pokemon?limit=100000&offset=0');
            return response;
        }
        catch (err) {
            console.log(err);
        }
    },
    async getSinglePokemon(name) {
        try {
            let response = await pokeApi.get(`pokemon/${name}`)
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
}

