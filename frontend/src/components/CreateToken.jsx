import { useState } from 'react'
import api from '../api/axiosConfig'
const CreateToken = () => {

    const [token, setToken] = useState("")

    const generate = () => {
        api.post("http://localhost:8080/generate",{"numberList":[2,3,4]})
        .then(response=>{
            setToken(response.data)
        })
    }
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand mx-auto font-weight-bolder" href="#">
                    Generate and validate your tokens at one stop!
                </a>
            </div>
        </nav>
        <div className="container d-flex justify-content-center align-items-center vh-100">
                <button type="button" className="btn btn-primary" onClick={generate}>Generate Token</button>
        </div>
        </>
    )
}

export default CreateToken