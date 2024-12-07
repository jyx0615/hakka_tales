import React, { useState, useEffect } from 'react';
import useStories from '../hooks/useStories';
import './Quiz.css';

function Quiz() {
  const { quizzes, fetchQuizzes } = useStories();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // Store user answers
  const [showResults, setShowResults] = useState(false); // Toggle between quiz and results
  const [loading, setLoading] = useState(true);

  // Fetch quizzes on load
  useEffect(() => {
    const fetchQuizData = async () => {
      await fetchQuizzes();
      setLoading(false);
    };
    fetchQuizData();
  }, [fetchQuizzes]);

  if (loading) {
    return <div className="quiz-wrapper">Loading quizzes...</div>;
  }

  if (!quizzes || quizzes.length === 0) {
    return <div className="quiz-wrapper">No quizzes available.</div>;
  }

  const currentQuestion = quizzes[currentQuestionIndex];

  const handleChoiceClick = (choice) => {
    setSelectedAnswer(choice);
    const isAnswerCorrect = choice === currentQuestion.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowCorrectAnswer(!isAnswerCorrect);

    // Save user answer
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: currentQuestion.question,
        userAnswer: choice,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: isAnswerCorrect,
      },
    ]);
  };

  const handleInputSubmit = () => {
    const isAnswerCorrect =
      selectedAnswer.trim().toLowerCase() ===
      currentQuestion.correctAnswer.trim().toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setShowCorrectAnswer(!isAnswerCorrect);

    // Save user answer
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: currentQuestion.question,
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: isAnswerCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer('');
    setIsCorrect(null);
    setShowCorrectAnswer(false);

    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResults(true); // Show results after the last question
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setIsCorrect(null);
    setShowCorrectAnswer(false);
    setUserAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    // Results view
    const correctCount = userAnswers.filter(
      (answer) => answer.isCorrect
    ).length;
    return (
      <div className="quiz-wrapper">
        <div className="quiz-card results-container">
          <h1>測驗結果</h1>
          <p>
            您在 {userAnswers.length} 題中答對 {correctCount} 題
          </p>

          <div className="results-scroll">
            <ul className="results-list">
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

          <button className="quiz-button" onClick={handleRestartQuiz}>
            重新測驗
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-wrapper">
      <div className="quiz-card">
        <p className="quiz-question">{currentQuestion.question}</p>

        {currentQuestion.type === 'multiple-choice' ? (
          <ul className="quiz-choices">
            {currentQuestion.choices.map((choice, index) => (
              <li
                key={index}
                className={`quiz-choice ${
                  isCorrect !== null
                    ? choice === currentQuestion.correctAnswer
                      ? 'correct'
                      : selectedAnswer === choice
                        ? 'incorrect'
                        : ''
                    : ''
                }`}
                onClick={() => handleChoiceClick(choice)}
              >
                {choice}
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <input
              type="text"
              className="quiz-input"
              placeholder="請作答"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
            <button
              className="quiz-button"
              onClick={handleInputSubmit}
              disabled={isCorrect !== null}
            >
              提交
            </button>
            {showCorrectAnswer && (
              <p className="quiz-correct-answer">
                正確答案： {currentQuestion.correctAnswer}
              </p>
            )}
          </div>
        )}

        {isCorrect !== null && (
          <p className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '正確' : '錯誤'}
          </p>
        )}

        {isCorrect !== null && (
          <button className="quiz-button" onClick={handleNextQuestion}>
            下一題
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
