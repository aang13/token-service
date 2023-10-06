import { useState } from 'react'
import api from '../api/axiosConfig'
const CreateToken = () => {

    const [token, setToken] = useState("")
    const [selectedDigits, setSelectedDigits] = useState([])

    const handleDigitClick = (digit) => {
        if (selectedDigits.includes(digit)) {
            setSelectedDigits(selectedDigits.filter((d) => d !== digit));
        } else {
            setSelectedDigits([...selectedDigits, digit]);
        }
    }

    const generate = () => {
        api.post("http://localhost:8080/generate",{"numberList":selectedDigits})
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
        <div className="container d-flex justify-content-center mt-5">
                <button type="button" className="btn btn-primary" onClick={generate}>Generate Token</button>
        </div>
        </>
    )
}

export default CreateToken