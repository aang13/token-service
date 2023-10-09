import { useEffect, useState } from 'react'
import api from '../api/ApiService'
import 'bootstrap-icons/font/bootstrap-icons.css'; 

const ValidateToken = (props) => {
    const regex = /^\d{16}$/
    const [token, setToken]= useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [isApiResponse, setIsApiResponse] = useState(false)

    useEffect(() =>{
        setToken(props.data.token)
        setIsApiResponse(false)
    },[props.data.token])

    const handleChange = (e) =>{
        setToken(e.target.value)
    }

    const validate =() => {
        let sanitizedToken = token.replace(/-/g,'')
        if (!regex.test(sanitizedToken)) {
            alert("Token is not valid. Enter a valid token.")
            return
        } 
        setIsLoading(true)
        api.validateToken(token)
            .then(response=>{
                setIsLoading(false)
                setIsValid(response.data.isValid)
            }).catch(error=>{
                setIsLoading(false)
                alert(error.response.data.detail)
            }).finally(()=>{
                setIsApiResponse(true)
        })
    }

    return (
        <>
            <hr></hr>
            <div className="container mt-4">
                <p className="text-center">Generated Token</p>
                <div className="d-flex justify-content-center">
                    <input type="text" name="token" value={token} className="form-control" style={{ width: '220px' }} onChange={(e)=>handleChange(e)}/>
                </div>
                
                <div className="d-flex justify-content-center">
                    {isApiResponse &&
                        (isValid ? <i className="bi bi-check text-success">Valid</i>
                        :
                        <i className="bi bi-x text-danger">Invalid</i>
                    )}
                </div>
                <div className="container d-flex justify-content-center mt-5">
                {isLoading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <button className="btn btn-info" onClick={validate}>
                        {isLoading ? 'Validating Token...' : 'Validate Token'}
                    </button>
                )}
                </div>
            </div>
        </>
    )
}

export default ValidateToken