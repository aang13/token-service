import { useState } from 'react'
import api from '../api/axiosConfig'
import ValidateToken from './ValidateToken'
const CreateToken = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState("")
    const [selectedDigits, setSelectedDigits] = useState([])

    const handleDigitClick = (digit) => {
        if (selectedDigits.includes(digit)) {
            setSelectedDigits(selectedDigits.filter((d) => d !== digit))
        } else {
            setSelectedDigits([...selectedDigits, digit])
        }
    }

    const generate = () => {
        if (selectedDigits.length === 0) {
            alert('Please select atleast 1 digit!')
            return
        }
        setIsLoading(true)
        api.post("http://localhost:8001/generate",{"numberList":selectedDigits})
        .then(response=>{
            setToken(response.data)
        }).catch(error=>{
            alert("Error creating token!")
        }).finally(()=>{
            setIsLoading(false)
            setSelectedDigits([])
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
            <div className="container mt-4">
                <p className="text-center">Please select the digits you want to create the token with:</p>
                <div className="d-flex justify-content-center">
                    {Array.from({ length: 10 }, (_, digit) => (
                        <button
                            key={digit}
                            className={`btn btn-outline-primary mx-2 ${selectedDigits.includes(digit) && 'btn-primary'}`}
                            onClick={() => handleDigitClick(digit)}
                        >
                            {digit}
                        </button>
                    ))}
                </div>
            </div>
            <div className="container d-flex justify-content-center mt-5 mb-20">
                {isLoading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <button className="btn btn-primary" onClick={generate}>
                        {isLoading ? 'Generating Token...' : 'Generate Token'}
                    </button>
                )}
            </div>
            {token !== '' && <ValidateToken data={token}></ValidateToken>}
        </>
    )
}

export default CreateToken