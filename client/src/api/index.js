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
      console.log(`dentro de la llamada a la api ${JSON.stringify(data)}`)
      return axios.post('api/signin', data)
   },
   logout: () => {
      return axios.get('/api/logout')
    },
   register: data => {
      console.log(`data in api: ${JSON.stringify(data)}`)
      return axios.post('/register', data)
   } 
}

