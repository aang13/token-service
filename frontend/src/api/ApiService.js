import axios from "axios";

const generateBaseUrl = 'http://localhost:8001'
const validateBaseUrl = 'http://localhost:8002'

const  createApiInstance = (baseURL) => {
    return axios.create({
        baseURL,
        timeout: 10000
    });
}

const ApiService = {
    getToken: (selectedDigits) => createApiInstance(generateBaseUrl)
        .post('/generator',{"numberList":selectedDigits},
        {validateStatus: () => true}),
    validateToken:(token) => createApiInstance(validateBaseUrl)
        .get("/validator", {params:{token: token}},
        {validateStatus: () => true})
}

export default ApiService