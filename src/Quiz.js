import React, { useState } from 'react';

const questions = {
  beginner: [
    { question: "How many points are required to win a game?", options: ["11", "15", "21", "10"], answer: "11" },
    { question: "What is the forehand drive best used for?", options: ["Smashing a ball", "Returning a deep/high ball", "Spinning the ball", "Returning a defensive stroke"], answer: "Returning a deep/high ball" },
    { question: "What is the backhand drive best used for?", options: ["Returning a ball that is hit towards the forehand side", "Spinning the ball", "Returning a deep/high ball", "Rallying"], answer: "Returning a deep/high ball" },
    { question: "What does forehand push make more difficult?", options: ["For an opponent to return the ball", "For an opponent to neutralize your ball", "Serving your ball", "Using backhand drive"], answer: "For an opponent to return the ball" },
    { question: "What does backhand push extremely useful for?", options: ["Stops opponent from making an attacking shot", "Neutralizes opponent's attack", "Stops opponent from using forehand drive", "Neither"], answer: "Neutralizes the opponent's attack" },
    { question: "Which stroke is the best to return a ball with backspin?", options: ["Forehand Drive", "Backhand Drive", "Forehand Push", "Backhand Push"], answer: "Backhand Push" },
    { question: "Forehand stroke and Backhand stroke are the best ways to counter a(n)…", options: ["Backspin", "Defending Stroke", "Attacking stroke", "Push"], answer: "Attacking stroke" },
    { question: "Forehand push and Backhand push are mainly used for…", options: ["Smashes", "Short balls", "Serves", "Long balls"], answer: "Long balls" },
    { question: "How many times can the ball bounce on your side before you must return it?", options: ["Once", "Twice", "Three times", "Any number"], answer: "Once" },
    { question: "What happens when the score reaches 10-10?", options: ["Regular play continues", "Players switch serves", "Players switch sides", "Game ends"], answer: "Players switch serves" },
  ],
  intermediate: [
    { question: "What is the primary goal of smashing the ball?", options: ["Finish rally + win point", "Spin the ball", "Rallying technique", "Neither"], answer: "Finish rally + win point" },
    { question: "A loop is an offensize stroke that generates a lot of _______ on the ball.", options: ["Sidespin", "Underspin", "Topspin", "Backspin"], answer: "Topspin" },
    { question: "What effect does sidespin have on the trajectory of a table tennis ball?", options: ["Sends the ball the opposite way it is hit(left or right)", "Sends the ball upwards(to the left or right)", "It speeds down directly on the center of the table", "Nothing much"], answer: "Backspin" },
    { question: "What is the best way to counter sidespin?", options: ["Balanced stance", "Apply topspin", "Stand far back", "Stand close"], answer: "Balanced stance" },
    { question: "", options: ["Too much spin", "Not enough spin", "Not following through", "Hitting too softly"], answer: "Not following through" },
    { question: "Which type of rubber is used for fast attacking players?", options: ["Anti-spin", "Pips-out", "Inverted", "Long pips"], answer: "Inverted" },
    { question: "How do you effectively counter a topspin shot?", options: ["Hit it hard", "Use backspin", "Lift the ball", "Chop down"], answer: "Chop down" },
    { question: "What is the name of the official governing body of table tennis?", options: ["ITTF", "USTA", "WTT", "NCTTA"], answer: "ITTF" },
    { question: "What is a common tactic used in doubles play?", options: ["Cross-court shots", "Playing solo", "Hitting hard", "Defensive play"], answer: "Cross-court shots" },
    { question: "What is the significance of footwork in table tennis?", options: ["None", "It's important", "Only for beginners", "Only for advanced"], answer: "It's important" },
  ],
  advanced: [
    { question: "What is the key factor in executing a successful loop?", options: ["Speed", "Spin", "Placement", "Power"], answer: "Spin" },
    { question: "What is the best way to practice serving?", options: ["Solo drills", "Game play", "Partner drills", "Watching videos"], answer: "Partner drills" },
    { question: "What does it mean to 'reset' in table tennis?", options: ["Change strategies", "Serve again", "Return to neutral position", "Switch players"], answer: "Return to neutral position" },
    { question: "What is the term for hitting the ball without a full swing?", options: ["Chop", "Flick", "Push", "Drive"], answer: "Flick" },
    { question: "How does the ball's spin affect its trajectory?", options: ["No effect", "Alters speed", "Makes it bounce higher", "Makes it dip"], answer: "Makes it dip" },
    { question: "What is a common advanced tactic during rallies?", options: ["Hitting hard", "Deception", "Playing safe", "Consistent spin"], answer: "Deception" },
    { question: "What kind of grip do most advanced players use?", options: ["Penhold", "Shakehand", "Seemiller", "Combination"], answer: "Shakehand" },
    { question: "What is the primary purpose of footwork drills?", options: ["Improve speed", "Enhance stamina", "Focus on technique", "Develop strategy"], answer: "Improve speed" },
    { question: "How important is mental preparation in competitive play?", options: ["Not important", "Somewhat important", "Very important", "Only for beginners"], answer: "Very important" },
    { question: "What is the advantage of serving with spin?", options: ["Confuses opponent", "Slows down the game", "Makes it easier to return", "None"], answer: "Confuses opponent" },
  ]
};

// Function to get questions based on level
export const getQuestionsByLevel = (level) => {
  return questions[level] || [];
};

const Quiz = ({ level, onAnswerChange }) => {
  const [userAnswers, setUserAnswers] = useState({});

  const handleChange = (questionIndex, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: selectedOption,
    });
    onAnswerChange(questionIndex, selectedOption);  // Pass answer to parent (Beginner.js)
  };

  return (
    <div className="mt-8 p-4 bg-white shadow-lg rounded">
      <h3 className="text-xl font-bold mb-4">{level.charAt(0).toUpperCase() + level.slice(1)} Quiz</h3>
      {questions[level].map((q, index) => (
        <div key={index} className="mb-4">
          <p>{q.question}</p>
          <div className="flex space-x-2">
            {q.options.map((option, i) => (
              <button
                key={i}
                className={`p-2 rounded ${userAnswers[index] === option ? 'bg-green-300' : 'bg-gray-300'}`}
                onClick={() => handleChange(index, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
