import axios from "axios";

export const API_URL=`http://localhost:7777/api`

const $axios=axios.create({
    withCredentials:true,
    baseURL:API_URL,

})

export default $axios