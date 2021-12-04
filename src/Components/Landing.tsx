import { useHistory } from "react-router-dom"
import "../style/landing.css"

const Landing = () => {
    let history = useHistory()

    return (
        <div className="land-container">
            <div className="start">
                <h1>
                Typeracer
                </h1>
                <button onClick={() => history.push("/playground")}>Start</button>
            </div>
        </div>
    )
}

export default Landing
