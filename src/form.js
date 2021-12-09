import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context";

const Form = () => {
  const { handleSubmit, handleChange, error, quiz } = useGlobalContext();
  return (
    <Wrapper>
      <>
        <h1>Quizzz</h1>
        <section className="quiz quiz-small">
          <form className="setup-form">
            <h2>setup quiz</h2>
            {/* number */}
            <div className="form-control">
              <label htmlFor="amount">Number of questions</label>
              <input
                type="number"
                name="amount"
                className="form-input"
                value={quiz.amount}
                onChange={handleChange}
              />
            </div>

            {/* category */}
            <div className="form-control">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                className="form-input"
                value={quiz.category}
                onChange={handleChange}
              >
                <option value="geography">geography</option>
                <option value="music">music</option>
                <option value="sports">sports</option>
                <option value="animals">animals</option>
              </select>
            </div>

            {/* difficulty */}
            <div className="form-control">
              <label htmlFor="difficulty">Difficulty</label>

              <select
                name="difficulty"
                id="difficulty"
                className="form-input"
                value={quiz.difficulty}
                onChange={handleChange}
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>
            {error && (
              <p className="error">
                can't generate questions, please try different options
              </p>
            )}
            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              Start
            </button>
          </form>
        </section>
      </>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h1 {
    margin-top: 3rem;
    font-size: 5rem;
    color: #1f3541;
  }
  .quiz {
    width: 60vw;
    height: 70vh;
    margin: 4rem auto;
    background-color: #edf2f3;
    border-radius: 10px;
    padding: 3rem;
  }
  .setup-form h2 {
    margin-bottom: 4rem;
    color: #1f3541;
  }
  .form-control {
    margin-bottom: 2rem;
  }
  .form-control label {
    display: block;
    text-transform: capitalize;
    font-weight: 500;
    font-size: 1.5rem;
    color: #1f3541;
    margin-bottom: 0.5rem;
  }
  .form-input {
    border: none;
    background: #edf2f3;
    font-size: 1.3rem;
    padding: 0.5rem 1rem;
    width: 50%;
    border-radius: 10px;
  }
  .error {
    color: hsl(360, 67%, 44%);
    text-transform: capitalize;
  }
  .submit-btn {
    width: 50%;
    margin-top: 3rem;
    padding: 1rem 3rem;
    background-color: #5289b5;
    border: none;
    color: #edf2f3;
    font-size: 2rem;
    border-radius: 10px;
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    .submit-btn {
      font-size: 1.2rem;
      text-align: center;
      width: 100%;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    .form-control label {
      font-size: 1.2rem;
    }
    .quiz {
      padding: 1rem;
    }
    .form-input {
      font-size: 1rem;
    }
  }
`;
export default Form;
