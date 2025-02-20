// import React, { useState, useEffect } from "react";
// import { Button } from "../ui/button";
// import { useNavigate } from "react-router-dom";
// import AnimatedRoadmap from "./AnimatedRoadmap";
// import HeroScrollDemo from "./HeroScrollDemo";

// const questions = [
//   {
//     question: "How do you prepare for a role?",
//     options: [
//       { text: "I dive deep into research and live like my character." },
//       { text: "I rely on improvisation and spontaneity." },
//       { text: "I focus on physical transformation and stunts." },
//       { text: "I take a classical approach with rehearsed techniques." },
//     ],
//   },
//   {
//     question: "What kind of roles excite you the most?",
//     options: [
//       { text: "Serious, intense, and emotional roles." },
//       { text: "Funny, light-hearted, and comedic roles." },
//       { text: "Action-packed and thrilling roles." },
//       { text: "Diverse, transformative roles that challenge me." },
//     ],
//   },
//   {
//     question: "What is your ideal acting environment?",
//     options: [
//       { text: "A serious, dramatic set with deep emotions." },
//       { text: "A lively, fun atmosphere full of energy." },
//       { text: "An intense action-packed environment." },
//       { text: "A versatile and challenging stage or set." },
//     ],
//   },
//   {
//     question: "Which movie genre do you enjoy the most?",
//     options: [
//       { text: "Psychological thrillers and dramas." },
//       { text: "Comedies and light-hearted films." },
//       { text: "Action and adventure movies." },
//       { text: "Fantasy and historical dramas." },
//     ],
//   },
//   {
//     question: "How do you handle unexpected situations on set?",
//     options: [
//       { text: "I stay in character no matter what." },
//       { text: "I improvise and go with the flow." },
//       { text: "I adapt and keep the scene dynamic." },
//       { text: "I use my experience to adjust seamlessly." },
//     ],
//   },
// ];

// const PersonalityQuiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [quizComplete, setQuizComplete] = useState(false);
//   const [hideQuiz, setHideQuiz] = useState(false);
//   const navigate = useNavigate();

//   // Check if quiz has been completed before, to hide it
//   useEffect(() => {
//     const quizCompleted = localStorage.getItem("quizCompleted");
//     if (quizCompleted) {
//       setHideQuiz(true);
//     }
//   }, []);

//   const handleAnswer = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       setQuizComplete(true);
//       setTimeout(() => {
//         localStorage.setItem("quizCompleted", "true"); // Save that the quiz is completed
//         navigate("/JOBS"); // Navigate to the job page
//       }, 1500);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen transition-all bg-inherit">
//       {hideQuiz ? (
//         //<AnimatedRoadmap />
//         <HeroScrollDemo />
//       ) : (
//         <div className="max-w-3xl w-full p-6 md:p-8 bg-gray-950 shadow-lg rounded-2xl border border-white-700 text-white font-semibold relative transition-opacity duration-1000">
//           {!quizComplete ? (
//             <div>
//               <h2 className="text-2xl font-extrabold text-center mb-6">
//                 {questions[currentQuestion].question}
//               </h2>
//               <div className="space-y-4">
//                 {questions[currentQuestion].options.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={handleAnswer}
//                     className="block w-full px-5 py-3 bg-[#6A38C2] hover:bg-[#9365E5] text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-md border border-white-600"
//                   >
//                     {option.text}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="text-center">
//               <h2 className="text-3xl font-extrabold">Quiz Completed!</h2>
//               <p className="mt-3 text-lg text-gray-300">Thank you for completing the quiz.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PersonalityQuiz;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroScrollDemo from "./HeroScrollDemo";

const questions = [
  {
    question: "How do you prepare for a role?",
    options: [
      { text: "I dive deep into research and live like my character." },
      { text: "I rely on improvisation and spontaneity." },
      { text: "I focus on physical transformation and stunts." },
      { text: "I take a classical approach with rehearsed techniques." },
    ],
  },
  {
    question: "What kind of roles excite you the most?",
    options: [
      { text: "Serious, intense, and emotional roles." },
      { text: "Funny, light-hearted, and comedic roles." },
      { text: "Action-packed and thrilling roles." },
      { text: "Diverse, transformative roles that challenge me." },
    ],
  },
  {
    question: "What is your ideal acting environment?",
    options: [
      { text: "A serious, dramatic set with deep emotions." },
      { text: "A lively, fun atmosphere full of energy." },
      { text: "An intense action-packed environment." },
      { text: "A versatile and challenging stage or set." },
    ],
  },
  {
    question: "Which movie genre do you enjoy the most?",
    options: [
      { text: "Psychological thrillers and dramas." },
      { text: "Comedies and light-hearted films." },
      { text: "Action and adventure movies." },
      { text: "Fantasy and historical dramas." },
    ],
  },
  {
    question: "How do you handle unexpected situations on set?",
    options: [
      { text: "I stay in character no matter what." },
      { text: "I improvise and go with the flow." },
      { text: "I adapt and keep the scene dynamic." },
      { text: "I use my experience to adjust seamlessly." },
    ],
  },
];

const PersonalityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [hideQuiz, setHideQuiz] = useState(false);
  const navigate = useNavigate();

  // Check if quiz has been completed in localStorage for this actor
  useEffect(() => {
    const quizCompleted = localStorage.getItem("quizCompleted");
    if (quizCompleted === "true") {
      setHideQuiz(true); // If quiz completed, hide the quiz and show HeroScrollDemo
    }
  }, []);

  const handleAnswer = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
      setTimeout(() => {
        localStorage.setItem("quizCompleted", "true"); // Store quiz completion in localStorage
        setHideQuiz(true); // Hide the quiz after completion
        navigate("/JOBS"); // Navigate to jobs page
      }, 1500);
    }
  };

  // If the quiz has been completed, show HeroScrollDemo
  if (hideQuiz) {
    return <HeroScrollDemo />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen transition-all bg-inherit">
      <div className="max-w-3xl w-full p-6 md:p-8 bg-gray-950 shadow-lg rounded-2xl border border-white-700 text-white font-semibold relative transition-opacity duration-1000">
        {!quizComplete ? (
          <div>
            <h2 className="text-2xl font-extrabold text-center mb-6">
              {questions[currentQuestion].question}
            </h2>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={handleAnswer}
                  className="block w-full px-5 py-3 bg-[#6A38C2] hover:bg-[#9365E5] text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-md border border-white-600"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-extrabold">Quiz Completed!</h2>
            <p className="mt-3 text-lg text-gray-300">Thank you for completing the quiz.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalityQuiz;
