import React, { useState, useEffect } from 'react';
import Quiz, { getQuestionsByLevel } from './Quiz';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Intermediate = () => {
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
    const level = 'intermediate';
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
                    <a href="#introduction" className="hover:text-blue-600 cursor-pointer transition">Introduction to Techniques</a>
                </li>
                <li>
                    <a href="#Smashes" className="hover:text-blue-600 cursor-pointer transition">Smashes</a>
                </li>
                <li>
                    <a href="#Loops" className="hover:text-blue-600 cursor-pointer transition">Looping</a>
                </li>
                <li>
                    <a href="#Sidepin" className="hover:text-blue-600 cursor-pointer transition">Sidespin</a>
                </li>
                <li>
                    <a href="#Serves" className="hover:text-blue-600 cursor-pointer transition">Serving the ball</a>
                </li>
                <li>
                    <a href="#conclusion" className="hover:text-blue-600 cursor-pointer transition">Conclusion</a>
                </li>
            </ul>
          </aside>

          {/* Article Content */}
          <article className="md:w-3/5 w-full mx-auto bg-white bg-opacity-60 backdrop-blur-lg rounded-xl shadow-xl p-8 transition-all">
              <section id="introduction">
                  <h2 className="text-3xl font-bold mb-4">Introduction to Techniques</h2>  
                  <p className="text-lg leading-relaxed">
                      In Table Tennis, mastering various techniques is crucial for players looking to enhance their performance. This article covers some fundamental techniques and strategies that intermediate players should focus on.
                  </p>
              </section>
              <br></br>
              <section id="Smashes">
                  <h2 className="text-3xl font-bold mb-4">Smashes</h2>
                  <p className="text-lg leading-relaxed">
                  The forehand smash is a critical stroke in table tennis and should be part of every table tennis player’s arsenal. The stroke is usually used to counter a lob (when the ball bounces high above the net). The main aim of the smash is to strike hard and fast to force the opponent further away from the table while trying to finish the rally and win the point. The forehead smash relies on timing, technique and precision to ensure that your ball does not miss the entire table. Your initial forehand smash may also be returned by your opponent using another lob, so you may have to play several smashes in succession.
                  </p>
              </section>
              <br></br>
              <section id="Loops">
                  <h2 className="text-3xl font-bold mb-4">Looping</h2>
                  <p className="text-lg leading-relaxed">
                  The forehand loop is a key technique in table tennis that can help you win games and dominate rallies. The forehand loop is an offensive stroke that generates a lot of topspin on the ball. This spin helps you control the ball and the table. It is a strong, fast, and aggressive technique. It's one of the most common attacking moves in table tennis. The best place for a loop is when you are farther away from the table, or the ball is below net height.
                  </p>
              </section>
              <br></br>
              <section id="Sidespin">
                  <h2 className="text-3xl font-bold mb-4">Sidespin</h2>
                  <p className="text-lg leading-relaxed">
                  In table tennis, sidespin occurs when the ball is rotating at an angle to its direction of movement. When the ball is rotating at 90 degrees to its direction of motion, it has pure sidespin. When the ball is rotating in the same direction it is moving, it has either topspin or backspin only. Sidespin will make the ball curve to the left or right in the air. If the left side of the ball is moving in the opposite direction to the motion of the ball, the ball will curve to the left, and vice versa. In order to counter sidespin, first identify which way the ball could move, and then apply topspin to override the spin on the ball.
                  </p>
              </section>
              <br></br>
              <section id="Serves">
                  <h2 className="text-3xl font-bold mb-4">Serving the ball</h2>
                  <p className="text-lg leading-relaxed">
                  Learning a more advanced serve in table tennis is crucial because it gives players a significant edge over their opponents. Instead of using a simple forehand or backhand stroke as a serve, players can add variations in spin, speed, and placement, making the serve harder to return, turning it into a powerful offensive tool. Here are some examples of more advanced serves:  

                  </p>
                  <ul className="list-disc list-inside mb-4">
                      <li><strong>Backspin serve:</strong> Causes the ball to spin backward, making it harder for opponents to attack.</li>
                      <li><strong>Sidespin serve:</strong> Adds a sideways spin that forces opponents to adjust their returns.</li>
                      <li><strong>Fast serve:</strong> A low, speedy serve aimed deep into the opponent's side, reducing reaction time.</li>
                  </ul>
              </section>
              <br></br>
              <section id="conclusion">
                  <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
                  <p className="text-lg leading-relaxed">
                      By focusing on these intermediate techniques and strategies, players can enhance their Table Tennis skills and become more competitive. Remember, practice and consistency are key to improvement.
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
          <Quiz level="intermediate" onAnswerChange={handleAnswerChange} />

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

export default Intermediate;
