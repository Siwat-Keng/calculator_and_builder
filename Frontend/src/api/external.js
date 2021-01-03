import axios from 'axios';

const API_URL = 'https://genshinlist.com/api/';

class ExternalService {

    getCharacters() {
        return axios.get(API_URL + "characters");
    }

    async getWeapon(character) {
        var characters = await axios.get(API_URL + "characters");
        var weapons = await axios.get(API_URL + "weapons");
        const weapon = characters.data.filter(x => x.name === character)[0].weapon;
        return weapons.data.filter(x => x.type === weapon);
    }

}

export default new ExternalService();