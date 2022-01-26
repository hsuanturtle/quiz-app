import React from "react";
import { useGlobalContext } from "./context";
import styled from "styled-components";
const Modal = () => {
  const { isModalOpen, correct, questions, closeModal } = useGlobalContext();
  return (
    <Wrapper>
      <div
        className={`${
          isModalOpen ? "modal-container isOpen" : "modal-container"
        }`}
      >
        <div className="modal-content">
          <h2>Congrats!</h2>
          <p>
            You answered {((correct / questions.length) * 100).toFixed(0)}% of
            questions correctly
          </p>
          <button className="close-btn" onClick={closeModal}>
            Ok
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s linear;
    z-index: -1;
  }
  .isOpen {
    opacity: 1;
    z-index: 999;
  }

  .modal-content {
    background: #fff;
    width: 60vw;
    padding: 3rem;
    border-radius: 20px;
    text-align: center;
    position: relative;
  }
  .modal-content p {
    font-size: 1.5rem;
    text-transform: none;
  }
  .close-btn {
    margin-right: auto;
  }
  @media only screen and (max-width: 600px) {
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.8rem;
    }
    .close-btn {
      width: 90%;
      font-size: 1rem;
    }
  } ;
`;

export default Modal;
