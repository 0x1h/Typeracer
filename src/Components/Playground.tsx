import { useState, useEffect, FC, useRef } from "react";
import { useHistory } from "react-router-dom";
import "../style/playground.css";

interface quotesProps {
  text: string;
  author: string;
}

const Letter: FC<{ letter: string }> = ({ letter }) => {
  return <span className="typeracer-letter">{letter}</span>;
};

const Playground = () => {
  const typeRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState<number>(3);
  const [timer, setTimer] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [countWrong, setCountWrong] = useState<number>(0);
  const [sentence, setSentence] = useState<quotesProps>({
    text: "",
    author: "",
  });
  let history = useHistory();


  useEffect(() => {
    if (
      currentIndex === sentence.text.length - 1 &&
      !typeRef!.current?.children[currentIndex].classList.contains("wrong")
    ) {
      localStorage.setItem("timer", (timer - 3).toString());
      localStorage.setItem("sentence-info", JSON.stringify(sentence));
      localStorage.setItem("count-wrong", countWrong.toString());
      history.push("/results");
    }
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const keyBind = (e: any) => {
    //if keyBind is correct and last letter isnt typed wrong, go to next step
    if(e.keyCode === 16) return
    else if (
      e.key === sentence.text[currentIndex] &&
      !typeRef!.current?.children[currentIndex].classList.contains("wrong")
    ) {
      setCurrentIndex(currentIndex + 1);
      typeRef!.current?.children[currentIndex].classList.add("correct");

      //if the typed is wrong and also that's not a backspace then make it red
    } else if (
      e.key !== sentence.text[currentIndex] &&
      e.key !== "Backspace" &&
      !typeRef!.current?.children[currentIndex].classList.contains("wrong")
    ) {

      typeRef!.current?.children[currentIndex].classList.add("wrong");
      setCountWrong(countWrong + 1);
  
    } else if (e.key === "Backspace" && currentIndex >= 0) {
      //if user clicks on backspace and index is bigger or equals 0 remove "wrong"
      typeRef!.current?.children[currentIndex].classList.remove("wrong");
    }
  };

  useEffect(() => {
    //if starting timer isn't up don't run bottom function
    if (start !== 0) return;

    window.addEventListener("keyup", keyBind);
    return () => window.removeEventListener("keyup", keyBind);
  });

  const getQuotes = async () => {
    await fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((quote) => {
        const randomQuote: number = Math.floor(Math.random() * quote.length);
        const filterResponse: quotesProps = quote[randomQuote];

        setSentence(filterResponse);
      });
  };

  useEffect(() => {
    getQuotes();
  }, []);

  useEffect(() => {
    let startTimer: number;

    startTimer = window.setTimeout(() => {
      setStart(start - 1);
    }, 1000);

    if (start === 0) clearTimeout(startTimer);
  });

  return (
    <div className="pg-container">
      <div className="letter-container" ref={typeRef}>
        {start === 0
          ? sentence.text.split("").map((letter: string, i: number) => {
              return <Letter letter={letter} key={i} />;
            })
          : null}
      </div>
      {start !== 0 ? <h1>{start}</h1> : null}
    </div>
  );
};

export default Playground;
