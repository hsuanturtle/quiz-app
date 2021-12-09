import React from "react";
import styled from "styled-components";
import Loading from "./Loading";
import Form from "./form";
import Modal from "./modal";
import { useGlobalContext } from "./context";

function App() {
  const {
    questions,
    index,
    waiting,
    loading,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (waiting) {
    return <Form />;
  }
  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  return (
    <Wrapper>
      <main>
        <Modal />
        <section className="quiz">
          <p className="correct-answers">
            correct answers : {correct}/{index}
          </p>
          <article className="container">
            <h2 dangerouslySetInnerHTML={{ __html: question }} />
            <div className="btn-container">
              {answers.map((answer, index) => {
                return (
                  <button
                    key={index}
                    className="answer-btn"
                    dangerouslySetInnerHTML={{ __html: answer }}
                    onClick={() => checkAnswer(correct_answer === answer)}
                  />
                );
              })}
            </div>
          </article>
          <button className="next-question" onClick={nextQuestion}>
            Next
          </button>
        </section>
      </main>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  main {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .quiz {
    width: 60vw;

    margin: 4rem auto;
    background: #edf2f3;
    border-radius: 10px;
    padding: 3rem;
  }
  .quiz-small {
    max-width: 500px;
  }
  .container h2 {
    margin-bottom: 2rem;
    text-align: center;
    line-height: 1.5;
    text-transform: none;
  }
  .answer-btn {
    display: block;
    width: 100%;
    margin: 0.75rem auto;
    background: #5289b5;
    border-radius: 10px;
    border-color: transparent;
    color: #111;
    letter-spacing: 5px;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem 0;
    transition: all 0.3s linear;
  }
  @media screen and (min-width: 576px) {
    .answer-btn {
      max-width: 60%;
    }
  }
  .answer-btn:hover {
    background: #edf2f3;
    color: #000;
  }
  .correct-answers {
    font-size: 1rem;
    margin-bottom: 2rem;
    text-align: right;
    text-transform: capitalize;
    letter-spacing: 3px;
    color: #000;
  }
  .next-question,
  .close-btn {
    border-radius: 10px;
    border-color: transparent;
    padding: 0.5rem 1rem;
    display: block;
    width: 35%;
    margin-left: auto;
    margin-top: 2rem;
    text-transform: capitalize;
    font-weight: 700;
    letter-spacing: 3px;
    font-size: 1.2rem;
    background: #ffb100;
    color: #000;
    transition: all 0.3s linear;
    cursor: pointer;
  }
  .next-question:hover {
    background: #805900;
    color: #ffb100;
  }
  @media only screen and (max-width: 600px) {
    .correct-answers {
      font-size: 0.5rem;
    }
    .container h2 {
      font-size: 1rem;
    }
    .answer-btn {
      font-size: 0.5rem;
      padding: 0.3rem 0.6rem;
    }
    .next-question {
      font-size: 0.6rem;
      width: 60%;
    }
  }
`;

export default App;
