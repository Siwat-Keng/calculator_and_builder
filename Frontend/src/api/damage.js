import axios from 'axios';

const API_URL = 'https://genshin-api-keng.herokuapp.com/calculate/';

class DamageService {

  averageDamage(payload) {
    return axios.post(API_URL + "avg_dmg", payload);
  }

  scaleReactionDamage(payload) {
    return axios.post(API_URL + "scale_reaction_dmg", payload);
  }

  reactionDamage(payload) {
    return axios.post(API_URL + "reaction_dmg", payload);
  }
}

export default new DamageService();