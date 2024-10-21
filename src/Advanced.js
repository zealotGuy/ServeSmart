import React, { useState, useEffect } from 'react';
import Quiz, { getQuestionsByLevel } from './Quiz';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Advanced = () => {
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
    const level = 'advanced';
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
                    <a href="#intro" className="hover:text-blue-600 cursor-pointer transition">Introduction</a>
                </li>
                <li>
                    <a href="#back-loop" className="hover:text-blue-600 cursor-pointer transition">Backhand Loop</a>
                </li>
                <li>
                    <a href="#counter-loop" className="hover:text-blue-600 cursor-pointer transition">Counter Loops</a>
                </li>
                <li>
                    <a href="#chop" className="hover:text-blue-600 cursor-pointer transition">Chops</a>
                </li>
                <li>
                    <a href="#flick" className="hover:text-blue-600 cursor-pointer transition">Flicks</a>
                </li> 
                <li>
                    <a href="#conclusion-advanced" className="hover:text-blue-600 cursor-pointer transition">Conclusion</a>
                </li>
            </ul>
          </aside>

          {/* Article Content */}
          <article className="md:w-3/5 w-full mx-auto bg-white bg-opacity-60 backdrop-blur-lg rounded-xl shadow-xl p-8 transition-all">
              <section id="intro">
                  <h2 className="text-3xl font-bold mb-4">Introduction</h2>
                  <p className="text-lg leading-relaxed">
                        After refining the basics, the next thing to do is to refine the more advanced techniques- the most prominent ones will be provided here. These skills go beyond just hitting the ball—they’re about adding power, spin, and unpredictability to your game. Whether it’s perfecting aggressive loops, using defensive chops to throw off your opponent, or mastering deceptive serves to keep them guessing, these advanced techniques can elevate your game to a whole new level and help you outplay even the toughest competition.
                  </p>
              </section>
              <br></br>

              <section id="back-loop">
                  <h2 className="text-3xl font-bold mb-4">Backhand Loop</h2>
                  <p className="text-lg leading-relaxed">
                  A backhand loop in table tennis is a popular technique that's used to counter backspin or sidespin on serves, chops, and pushes. It's also a good stroke to start an attack or get the upper hand. Some situations that make good use of a backhand loop are:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                      <li><strong>Backspin:</strong> Use a backhand loop when receiving a long backspin ball from an opponent.</li>
                      <li><strong>In rallies:</strong> A backhand loop is a great stroke to use in rallies</li>
                      <li><strong>On long serves:</strong> A backhand loop can be effective for returning long serves.</li>
                  </ul>
              </section>

              <section id="counter-loop">
                  <h2 className="text-3xl font-bold mb-4">Counter Loops</h2>
                  <p className="text-lg leading-relaxed">
                      A counter loop is a technique used to counter an opponent’s loop with a loop of your own. It's an extremely risky play that allows players to maintain pressure and keep the rally aggressive, even when the opponent initiates an attacking shot. Below are some key points to the counter loop:  
                  </p>
                  <ul className="list-disc list-inside mb-4">
                      <li><strong>When:</strong> Best used against loopers and from transitioning from a defensive playstyle to an offensive one.</li>
                      <li><strong>Benefits:</strong> Counter loop is a great way to keep a rally going while applying pressure while controlling your opponents topspin.</li>
                      <li><strong>Improving:</strong> Make sure to focus on the amount of your opponents topspin, as well as returning shots to different areas of the table.</li>
                  </ul>
              </section>

              <section id="chop">
                  <h2 className="text-3xl font-bold mb-4">Chops</h2>
                  <p className="text-lg leading-relaxed">
                        A chop is a defensive shot that generates a great amount of backspin, causing your opponent to make a mistake. It is an effective way to slow down fast attackers and force errors, as well as being able to change the direction of the shots. An effective + common way to counter a chop is a backhand loop as it is able to generate more spin. 
                  </p>
              </section>
              <br></br>
              <section id="flick">
                  <h2 className="text-3xl font-bold mb-4">Flicks</h2>
                  <p className="text-lg leading-relaxed">
                      The flick is an alternative to the push in taking short balls. The flick adds spin to the ball, which helps you to catch the opponent off guard. There are two types of flicks:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                      <li><strong>Forehand Flick:</strong> Most common way of using a flick</li>
                      <li><strong>Backhand Flick:</strong> Less common way that people use the flick, even though its not necesarily a bad way to hit.</li>
                  </ul>
              </section>

              <section id="conclusion-advanced">
                  <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
                  <p className="text-lg leading-relaxed">
                      Advancing in Table Tennis requires dedication to technique, mental fortitude, and tactical adaptability. Regular practice and strategic play will help you excel at the highest levels of the sport.
                  </p>
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
          <Quiz level="advanced" onAnswerChange={handleAnswerChange} />

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

export default Advanced;
