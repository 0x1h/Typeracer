import { parse } from "path"
import { useEffect, useState } from "react"
import '../style/results.css'

const defaultState = {
    timer: 0,
    sentence: {
        author: "",
        text: ""
    }, 
    mistakes: 0
}


const Results = () => {
    const [results, setResults] = useState(defaultState)

    useEffect(() => {
        const timer = JSON.parse(localStorage.getItem("timer")!)
        const sentence = JSON.parse(localStorage.getItem("sentence-info")!)
        const mistakes = JSON.parse(localStorage.getItem("count-wrong")!)
        
        setResults({
            timer: timer,
            sentence: sentence,
            mistakes: mistakes
        })
    }, [])


    return (
        <div className="results-container">
            <main>
                <p className="wpm">WPM: {Math.floor((results.sentence.text.length / 5) / (results.timer) * 60)}</p> 
                <p className="mistakes" style={{color: "#ff4c4c"}}>Mistakes were made: {results.mistakes}</p>
                <br />
                <p className="quote">You typed {results.sentence.author}'s quote</p>
                <p style={{fontSize: "1.2rem"}}>{results.sentence.text}</p>
            </main>
        </div>
    )
}

export default Results
