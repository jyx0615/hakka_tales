import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Riple } from 'react-loading-indicators';

import { getAnswerById } from '../utils/client';
import useStories from '../hooks/useStories';
import './Quiz.css';

function Quiz() {
  const { bookIndex } = useParams();
  const { currentQuiz, fetchCurrentQuiz } = useStories();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]); // Store user answers
  const [showResults, setShowResults] = useState(false); // Toggle between quiz and results
  const [loading, setLoading] = useState(true);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Fetch quizzes on load
  useEffect(() => {
    const fetchQuizData = async () => {
      await fetchCurrentQuiz(bookIndex);
      setLoading(false);
    };
    fetchQuizData();
  }, []);

  // display the loading icon when data is not loaded
  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center w-100 h-100">
        <Riple color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  // display no quizzes available message
  if (!currentQuiz || currentQuiz.length === 0) {
    return (
      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
        <div className=" custom-text fs-1">目前的故事沒有測驗</div>
      </div>
    );
  }

  const currentQuestion = currentQuiz[currentQuestionIndex];

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setIsCorrect(null);
    setUserAnswers([]);
    setShowResults(false);
  };

  // Submit answer
  const handelSubmit = () => {
    setHasAnswered(true);
    var isAnswerCorrect;

    const data = {
      type: currentQuestion.type - 1,
      answers: selectedAnswer,
    };
    const res = getAnswerById(bookIndex, currentQuestionIndex, data);
    console.log(res.data.data);

    // multiple choice
    if (currentQuestion.type == 1) {
      isAnswerCorrect = selectedAnswer === currentQuestion.correctAnswer;
    }
    // fill in blank
    else {
      const userAns = selectedAnswer?.trim().toLowerCase();
      const rightAns = currentQuestion.correctAnswer?.trim().toLowerCase();
      isAnswerCorrect = userAns === rightAns;
    }

    setIsCorrect(isAnswerCorrect);
    // Save user answer
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: currentQuestion.prompt_text,
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: isAnswerCorrect,
      },
    ]);
  };

  // go to next question
  const handleNextQuestion = () => {
    setHasAnswered(false);
    setSelectedAnswer('');
    setIsCorrect(null);

    if (currentQuestionIndex < currentQuiz.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResults(true); // Show results after the last question
    }
  };

  // multiple choice question: handle choice click(not yet submit)
  const handleChoiceClick = (choice) => {
    // prevent answer again
    if (hasAnswered) return;
    setSelectedAnswer(choice.choice_text);
  };

  // fill in blank question: handle input change(not yet submit)
  const handleInputChange = (e) => {
    // prevent answer again
    if (hasAnswered) return;
    setSelectedAnswer(e.target.value);
  };

  if (showResults) {
    // Results view
    const correctCount = userAnswers.filter(
      (answer) => answer.isCorrect
    ).length;
    return (
      <div className="w-100 h-100 d-flex align-items-center justify-content-center blue-text">
        {/* <div className="quiz-card results-container"> */}
        <div className="d-flex flex-column align-items-center justify-content-center w-50 h-75 bg-white p-4 rounded-4">
          <h1 className="fw-bolder">測驗結果</h1>
          <p className="my-1">
            您在 {userAnswers.length} 題中答對 {correctCount} 題
          </p>

          <div className="results-scroll">
            <ul className="list-unstyled text-start my-0">
              {userAnswers.map((answer, index) => (
                <li key={index} className="results-item">
                  <p>
                    <strong>題目：</strong> {answer.question}
                  </p>
                  <p>
                    <strong>您的答案：</strong>
                    <span
                      className={answer.isCorrect ? 'correct' : 'incorrect'}
                    >
                      {answer.userAnswer}
                    </span>
                  </p>
                  {!answer.isCorrect && (
                    <p>
                      <strong>正確答案：</strong> {answer.correctAnswer}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <button className="btn btn-primary" onClick={handleRestartQuiz}>
            重新測驗
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="quiz-card blue-text">
        {/* question title */}
        <p className="fw-bolder fs-3 text-start mt-3">
          {currentQuestion.prompt_text}
        </p>

        {/* choice or input */}
        {currentQuestion.type == 1
          ? MultipleChoise(
              currentQuestion,
              handleChoiceClick,
              selectedAnswer,
              hasAnswered
            )
          : FillInBlank(currentQuestion, handleInputChange, selectedAnswer)}

        {/* result */}
        <p
          className={`quiz-feedback fs-3 ${hasAnswered ? 'visible' : 'invisible'} ${isCorrect ? 'correct' : 'incorrect'}`}
        >
          {isCorrect ? '正確' : '錯誤'}
        </p>

        {/* submit/next button */}
        {hasAnswered ? (
          <button
            className="btn btn-primary"
            onClick={() => handleNextQuestion()}
          >
            下一題
          </button>
        ) : (
          <button
            className="btn btn-outline-primary"
            onClick={() => handelSubmit()}
            disabled={!selectedAnswer}
          >
            提交
          </button>
        )}
      </div>
    </div>
  );
}

const MultipleChoise = (
  question,
  handleChoiceClick,
  selectedAnswer,
  hasAnswered
) => {
  return (
    <ul
      className={`${hasAnswered ? 'answered' : 'notAnswered'} list-unstyled p-0 my-3 quiz-choices`}
    >
      {question.choices.map((choice, index) => {
        const acitve = selectedAnswer === choice.choice_text ? 'active' : '';
        return (
          <li
            key={index}
            className={`quiz-choice ${acitve}`}
            onClick={() => handleChoiceClick(choice)}
          >
            {choice.choice_text}
          </li>
        );
      })}
    </ul>
  );
};

const FillInBlank = (question, handleInputChange, selectedAnswer) => {
  return (
    <div>
      <input
        type="text"
        className="quiz-input"
        placeholder="請作答"
        value={selectedAnswer}
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
};

export default Quiz;
