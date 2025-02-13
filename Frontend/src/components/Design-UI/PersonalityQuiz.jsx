import React, { useState } from "react";
import { Button } from "../ui/button";

const questions = [
  {
    question: "How do you prepare for a role?",
    options: [
      { text: "I dive deep into research and live like my character.", type: "Method Actor" },
      { text: "I rely on improvisation and spontaneity.", type: "Comedic Actor" },
      { text: "I focus on physical transformation and stunts.", type: "Action Star" },
      { text: "I take a classical approach with rehearsed techniques.", type: "Character Actor" },
    ],
  },
  {
    question: "What kind of roles excite you the most?",
    options: [
      { text: "Serious, intense, and emotional roles.", type: "Method Actor" },
      { text: "Funny, light-hearted, and comedic roles.", type: "Comedic Actor" },
      { text: "Action-packed and thrilling roles.", type: "Action Star" },
      { text: "Diverse, transformative roles that challenge me.", type: "Character Actor" },
    ],
  },
  {
    question: "What is your ideal acting environment?",
    options: [
      { text: "A serious, dramatic set with deep emotions.", type: "Method Actor" },
      { text: "A lively, fun atmosphere full of energy.", type: "Comedic Actor" },
      { text: "An intense action-packed environment.", type: "Action Star" },
      { text: "A versatile and challenging stage or set.", type: "Character Actor" },
    ],
  },
  {
    question: "Which movie genre do you enjoy the most?",
    options: [
      { text: "Psychological thrillers and dramas.", type: "Method Actor" },
      { text: "Comedies and light-hearted films.", type: "Comedic Actor" },
      { text: "Action and adventure movies.", type: "Action Star" },
      { text: "Fantasy and historical dramas.", type: "Character Actor" },
    ],
  },
  {
    question: "How do you handle unexpected situations on set?",
    options: [
      { text: "I stay in character no matter what.", type: "Method Actor" },
      { text: "I improvise and go with the flow.", type: "Comedic Actor" },
      { text: "I adapt and keep the scene dynamic.", type: "Action Star" },
      { text: "I use my experience to adjust seamlessly.", type: "Character Actor" },
    ],
  },
];

const PersonalityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedType, setSelectedType] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [hideQuiz, setHideQuiz] = useState(false);
  const [actorType, setActorType] = useState("");

  const handleAnswer = (type) => {
    setSelectedType((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = Object.entries(selectedType).sort((a, b) => b[1] - a[1])[0]?.[0] || type;
      setActorType(result);
      setQuizComplete(true);
      setTimeout(() => setHideQuiz(true), 1500);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen transition-all bg-inherit">
      {!hideQuiz ? (
        <div className="max-w-3xl w-full p-6 md:p-8  bg-gray-950 shadow-lg rounded-2xl border border-white-700 text-white font-semibold relative transition-opacity duration-1000">
          {!quizComplete ? (
            <div>
              <h2 className="text-2xl font-extrabold text-center mb-6">{questions[currentQuestion].question}</h2>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.type)}
                    className="block w-full px-5 py-3 bg-[#6A38C2] hover:bg-[#9365E5] text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-md border border-white-600"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-extrabold">You are a <span className="text-Blue">{actorType}!</span></h2>
              <p className="mt-3 text-lg text-gray-300">This means you excel in <span className="text-Blue">{actorType}</span> roles.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-3xl w-full p-8 bg-gray-900 text-white rounded-2xl shadow-lg text-center transition-opacity duration-1000 animate-fade-in">
          <h2 className="text-3xl font-bold">You're a <span className="text-Blue">{actorType}</span>!</h2>
          <p className="mt-3 text-lg text-gray-300">
            "Great actors don't just act, they become." – Learn how to enhance your {actorType} skills with our expert resources!
          </p>
          {/* <button mt-6 px-6 py-3 bg-blue-600  text-white text-lg font-semibold rounded-lg transition-all duration-300">
            
          </button> */}
          <Button className=" hover:bg-gray-400">Explore {actorType} Roles</Button>
        </div>
      )}
    </div>
  );
};

export default PersonalityQuiz;



// change bg , on every que bg should change

