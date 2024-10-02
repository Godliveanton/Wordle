import React, { useState, useCallback, useEffect, useRef } from "react";
import "./Home.scss";
import Grid from "../component/Grid";
import axios from "axios";
import Message from "../component/Message";
import { useDispatch, useSelector } from "react-redux";
import { addSolution } from "../features/wordleSlice";

const Home = () => {
  const solutionVal = useSelector((state) => state.wordle.solution);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

  const fetchData = async (url, params = {}) => {
    try {
      const response = await axios.get(url, { params });
      return response.data.message;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const [solution, setSolution] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [index, setIndex] = useState(1);
  const [userText, setUserText] = useState("");
  const [texts, setTexts] = useState(Array(6).fill(""));
  const [colorChanges, setColorChanges] = useState(
    Array(6).fill(Array(5).fill("None"))
  );

  const checkWord = async () => {
    let newArr,
      leftout = [],
      indeces = Array(5).fill(0);
    let data = await fetchData(
      "https://wordle-api-3z3z.onrender.com/wordle/guess",
      {
        word: userText.toLowerCase(),
      }
    );

    if (data === userText.toLowerCase()) {
      if (userText.toLowerCase() === solution) {
        newArr = Array(5).fill("G");
        setIsSuccess(true);
        setShowMessage(true);
      } else {
        newArr = [...colorChanges[index - 1]];
        for (let i = 0; i < 5; i++) {
          if (userText.charAt(i).toLowerCase() === solution.charAt(i)) {
            newArr[i] = "G";
          } else {
            leftout.push(i);
          }
        }
        for (let i of leftout) {
          for (let j of leftout) {
            if (
              userText.charAt(i).toLowerCase() === solution.charAt(j) &&
              !indeces[j]
            ) {
              indeces[j] = 1;
              newArr[i] = "Y";
            }
          }
        }
        if (index === 6) {
          setShowMessage(true);
        }
      }
      updateState(newArr);
    } else {
      alert("Not a word");
    }
  };

  const updateState = (newArr) => {
    setTexts((prevTexts) => {
      const newTexts = [...prevTexts];
      newTexts[index - 1] = userText;
      return newTexts;
    });
    setColorChanges((prevColorChanges) => {
      const newColorChanges = [...prevColorChanges];
      newColorChanges[index - 1] = newArr;
      return newColorChanges;
    });
    setUserText("");
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handleUserKeyPress = useCallback(
    (event) => {
      const { key, keyCode } = event;
      if (keyCode === 8) {
        setUserText((prevUserText) => prevUserText.slice(0, -1));
      } else if (
        keyCode === 32 ||
        (keyCode >= 65 && keyCode <= 90 && userText.length < 5)
      ) {
        setUserText((prevUserText) => `${prevUserText}${key}`);
      } else if (keyCode === 13 && userText.length === 5) {
        checkWord();
      } else if (keyCode === 13) {
        alert("Not Enough Letters");
      }
    },
    [userText, checkWord]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  useEffect(() => {
    const fetchSolution = async () => {
      if (solutionVal) {
        setSolution(solutionVal);
      } else {
        const data = await fetchData(
          "https://wordle-api-3z3z.onrender.com/wordle/solution"
        );
        dispatch(addSolution(data));
        setSolution(data);
      }
    };
    fetchSolution();
  }, [solutionVal, dispatch]);

  useEffect(() => {
    if (isMobileDevice && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobileDevice]);

  return (
    <div className="container-fluid bg-dark homeComponent">
      <div className="row text-light text-center title">
        <div className="col-12">WORDLE</div>
      </div>
      {isMobileDevice && (
        <input
          ref={inputRef}
          type="text"
          style={{
            position: "absolute",
            opacity: 0,
            height: 0,
            width: 0,
            zIndex: -1,
          }}
          autoFocus
        />
      )}
      <div className="gridComponent">
        {texts.map((text, idx) => (
          <Grid
            key={idx}
            userText={index === idx + 1 ? userText : text}
            colorChange={colorChanges[idx]}
          />
        ))}
      </div>
      <Message
        show={showMessage}
        close={() => setShowMessage(false)}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default Home;
