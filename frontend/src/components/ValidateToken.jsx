import { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import 'bootstrap-icons/font/bootstrap-icons.css'; 

const ValidateToken = (props) => {
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
        setIsLoading(true)
        api.get("http://localhost:8002/validator",{params:{token: token}},
        {validateStatus: () => true})
        .then(response=>{
            setIsValid(response.data.isValid)
        }).catch(error=>{
            alert(error.response.data.detail)
        }).finally(()=>{
            setIsLoading(false)
            setIsApiResponse(true)
        })
    }

    return (
        <>
            <hr></hr>
            <div className="container mt-4">
                <p className="text-center">Generated Token</p>
                <div className="d-flex justify-content-center">
                    <input type="text" name="token" value={token} className="form-control" style={{ width: '200px' }} onChange={(e)=>handleChange(e)}/>
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