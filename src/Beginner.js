import React, { useState, useEffect } from 'react';
import Quiz, { getQuestionsByLevel } from './Quiz';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Beginner = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const [warning, setWarning] = useState(false);
  const [questionsAttempted, setQuestionsAttempted] = useState(Array(10).fill(false)); // Track which questions are answered
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [answersCorrect, setAnswersCorrect] = useState(Array(10).fill(null)); // Track correctness: true/false/null for each question
  const [userAnswers, setUserAnswers] = useState({}); // Track user's answers
  const [score, setScore] = useState(0); // Score state for displaying results
  const [showScoreBanner, setShowScoreBanner] = useState(false); // To control the visibility of the score banner

  const handleStartQuiz = () => {
    setShowQuiz(true);
    toggleDrawer(); // Close drawer when starting quiz
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    let timer;
    if (showQuiz && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }

    // Warning 1 minute before time is up
    if (timeRemaining === 60) {
      setWarning(true);
    }

    // Auto-submit if time runs out
    if (timeRemaining === 0 && !quizSubmitted) {
      handleSubmitQuiz();
    }

    return () => clearInterval(timer);
  }, [showQuiz, timeRemaining]);

  // Function to mark a question as attempted
  const markQuestionAttempted = (index) => {
    setQuestionsAttempted((prev) => {
      const newAttempts = [...prev];
      newAttempts[index] = true;
      return newAttempts;
    });
  };

  // Handle quiz submission and result calculation
  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    const level = 'beginner';
    const quizQuestions = getQuestionsByLevel(level);

    const correctAnswers = quizQuestions.map((q, index) => userAnswers[index] === q.answer);
    setAnswersCorrect(correctAnswers);

    // Mark unattempted questions as false for scoring purposes
    const finalCorrectAnswers = correctAnswers.map((isCorrect) => isCorrect === null ? false : isCorrect);
    setAnswersCorrect(finalCorrectAnswers);

    const finalScore = finalCorrectAnswers.filter(isCorrect => isCorrect).length * 10;
    setScore(finalScore);
    setShowScoreBanner(true); // Show score banner

    // Stop the timer when quiz is submitted
    setTimeRemaining(0);
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: selectedOption,
    });
    markQuestionAttempted(questionIndex);
  };

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 p-8">
      {/* Score Banner */}
      {showScoreBanner && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-4 transition-transform transform -translate-y-full animate-slide-down">
          Your score is {score}/100
        </div>
      )}

      {!showQuiz && (
        <div className="flex flex-col md:flex-row">
          {/* Article Index (Side Menu) */}
          <aside
            className={`md:w-1/5 w-full md:block ${drawerOpen ? 'block' : 'hidden'} bg-opacity-50 bg-gray-100 backdrop-blur-md rounded-lg shadow-lg p-6 mb-4 md:mb-0`}
          >
            <h2 className="text-xl font-semibold mb-4">Article Index</h2>
            <ul className="space-y-3">
                <li>
                    <a href="#introduction" className="hover:text-blue-600 cursor-pointer transition">Introduction</a>
                </li>
                <li>
                    <a href="#rules" className="hover:text-blue-600 cursor-pointer transition">Rules of Table Tennis</a>
                </li>
                <li>
                    <a href="#techniques" className="hover:text-blue-600 cursor-pointer transition">Techniques in Table Tennis</a>
                </li>
                <li>
                    <a href="#conclusion" className="hover:text-blue-600 cursor-pointer transition">Conclusion</a>
                </li>
            </ul>
          </aside>

          {/* Article Content */}
          <article className="md:w-3/5 w-full mx-auto bg-white bg-opacity-60 backdrop-blur-lg rounded-xl shadow-xl p-8 transition-all">
              <section id="introduction">
                  <h2 className="text-3xl font-bold mb-4">Introduction to Table Tennis</h2>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Ping-Pong_2.jpg/640px-Ping-Pong_2.jpg" alt="Table Tennis" className="w-full h-auto mb-4" />
                  <p className="text-lg leading-relaxed">
                      Table Tennis, also known as ping-pong, is a fast-paced sport where players hit a lightweight ball back and forth across a table divided by a net.
                  </p>
              </section>
              <section id="rules">
                  <h2 className="text-3xl font-bold mb-4">Rules of Table Tennis</h2>
                  <p className="text-lg leading-relaxed">
                      The basic rules of Table Tennis include:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                      <li>The game is played to 11 points, and players must win by at least two points.</li>
                      <li>Each player serves two points in a row before switching serves.</li>
                      <li>The ball must bounce on the server's side before crossing the net and landing on the opponent's side.</li>
                      <li>If the ball hits the net but still goes over and lands in the correct area, the serve is considered valid.</li>
                  </ul>
              </section>

              <section id="techniques">
                  <h2 className="text-3xl font-bold mb-4">Techniques in Table Tennis</h2>
                  <p className="text-lg leading-relaxed">
                      Effective Table Tennis players utilize a variety of techniques to enhance their gameplay, including:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                      <li><strong>Forehand Drive:</strong> A powerful stroke used to hit the ball with topspin. The forehand drive should be used when your opponent gives you a deep/high ball. A forehand drive is the perfect way to stop your opponent from making an aggressive, attacking stroke. Ideally, you should try to have your ball land as close to your opponent’s baseline/sideline.</li>
                      <li><strong>Backhand Drive:</strong> Similar to the forehand drive but executed on the opposite side. A backhand drive should be used when your opponent gives you a deep/high ball. The backhand drive is the perfect way to stop your opponent from making an attacking stroke. As with the forehand drive, you should try to have your ball land as close to your opponent’s baseline/sideline.</li>
                      <li><strong>Forehand Push:</strong> This stroke is normally used for short balls, and its purpose is to stop your opponent from making an attacking shot. Forehand push makes it more difficult for your opponent to return the ball. A forehand push is also a good way to return a ball that has backspin on it.</li>
                      <li><strong>Backhand push:</strong> The stroke is normally used for short balls, and its purpose is to stop your opponent from making an attacking shot. Backhand push excels at receiving a serve or neutralizing your opponent's attack.</li>
                  </ul>
              </section>

              <section id="conclusion">
                  <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
                  <p className="text-lg leading-relaxed">
                      Table Tennis is a thrilling and challenging sport that combines skill, strategy, and quick reflexes. Whether played casually or competitively, it offers numerous benefits, including improved hand-eye coordination and agility.
                  </p>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Mondial_Ping_-_Mixed_Doubles_-_Final_-_49.jpg/640px-Mondial_Ping_-_Mixed_Doubles_-_Final_-_49.jpg" alt="Table Tennis Match" className="w-full h-auto mb-4" />
              </section>

              <button
                  onClick={handleStartQuiz}
                  className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
              >
                  Take the Quiz
              </button>
          </article>

        </div>
      )}

      {showQuiz && (
        <div className="flex flex-col items-center justify-center">
          {/* Circular Timer */}
          <div className="w-32 h-32 mb-6">
            <CircularProgressbar
              value={(timeRemaining / (15 * 60)) * 100}
              text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
              styles={buildStyles({
                textColor: '#000',
                pathColor: warning ? '#ffcc00' : '#3b82f6', // Yellow when warning
                trailColor: '#d1d5db',
              })}
            />
          </div>

          {/* Question Grid */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {questionsAttempted.map((attempted, index) => (
              <div
                key={index}
                className={`w-16 h-16 flex items-center justify-center border ${
                  quizSubmitted
                    ? answersCorrect[index] === true
                      ? 'bg-green-500'
                      : answersCorrect[index] === false
                      ? 'bg-red-500'
                      : 'bg-gray-300'
                    : attempted
                    ? 'bg-green-500 fade-in'
                    : 'bg-gray-300'
                } text-white rounded-lg shadow-lg relative`}
              >
                <span className="text-2xl font-bold">{index + 1}</span> {/* Numbers from 1 to 10 */}
                {quizSubmitted && (
                  <div className="absolute bottom-2 left-2">
                    {answersCorrect[index] === true ? (
                      <i className="fas fa-check text-white"></i> // Tick icon
                    ) : answersCorrect[index] === false ? (
                      <i className="fas fa-times text-white"></i> // Cross icon
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>


          {/* Render Quiz */}
          <Quiz level="beginner" onAnswerChange={handleAnswerChange} />

          {/* Submit Button */}
          {!quizSubmitted && (
            <button
              onClick={handleSubmitQuiz}
              className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md"
            >
              Submit Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Beginner;
