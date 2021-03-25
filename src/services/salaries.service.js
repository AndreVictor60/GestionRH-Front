import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/salaries';

class SalariesService {
  getAll() {
    return axios.get(API_URL + "/0/5", { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }

 /* findBySalarie() {
    return axios.get(API_URL, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }*/

  getUser(){
    return axios.get(API_URL +"/3", { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
}

export default new SalariesService();
