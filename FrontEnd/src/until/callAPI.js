import axios from 'axios';
import * as Config from '../constants/config'

const callApi = (endpoint, method = 'GET', body) => {
    return axios({
        method: method,
        url: Config.API_URL + '/' + endpoint,
        data: body
    }).catch(err => {
        throw err;
    });
}

export default callApi;

