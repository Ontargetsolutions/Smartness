import axios from 'axios';

// export default 
//   login: data => {
//     return axios.post ('/api/login', data);
  
// }

// export default 
// axios.create({
//    baseURL: 'http://reactify.theironnetwork.org/data/',
//    timeout: 2000
// });

export default {
   
   login: data => {
      return axios.post('/api/login', data)
   },
   logout: () => {
      return axios.get('/api/logout')
    },
   register: data =>{
      return axios.post('api/register', data)
   } 
}

