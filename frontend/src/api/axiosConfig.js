import axios from "axios";

export default axios.create({
    generateURL: "http://localhost:8080/",
    validateURL: "http://localhost:8080/"
});