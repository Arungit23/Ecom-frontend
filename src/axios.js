import axios from "axios";


// export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const instance = axios.create({

    // baseURL: "https://shy-cyan-elephant-tux.cyclic.cloud",



     baseURL: "https://long-ruby-chiton-cape.cyclic.cloud",
    //  baseURL: "http://localhost:5050",
   

});

export default instance;