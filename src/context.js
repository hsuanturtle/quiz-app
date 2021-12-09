import React, { useState, useContext } from "react";
import axios from "axios";
const API_ENDPOINT = "https://opentdb.com/api.php?";

const table = {
  geography: 22,
  music: 12,
  sports: 21,
  animals: 27,
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "geography",
    difficulty: "easy",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const res = await axios(url).catch((err) => console.log(err));
    if (res) {
      const data = res.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}`;
    fetchQuestions(url);
    console.log(url);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        fetchQuestions,
        questions,
        index,
        handleSubmit,
        waiting,
        loading,
        correct,
        error,
        nextQuestion,
        checkAnswer,
        handleChange,
        isModalOpen,
        closeModal,
        quiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
