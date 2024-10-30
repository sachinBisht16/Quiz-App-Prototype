import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import quizCompletedImage from '../assets/quiz-complete.png';
import ProgressBar from "./QuizTImer";
import QuizTimer from "./QuizTImer";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(prevAnswer => [...prevAnswer, selectedAnswer]);
    }, []);
    
    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer]);

    const quizCompleted = activeQuestionIndex === QUESTIONS.length;  

    if (quizCompleted){
        return (
            <div id="summary">
                <img src={quizCompletedImage} alt="Quiz Completed" />
                <h2>Quiz Completed</h2>
            </div>
        )
    }

    const shuffledAnswers = QUESTIONS[activeQuestionIndex].answers;
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <QuizTimer
                key={activeQuestionIndex} 
                timeout={5000} onTimeout={handleSkipAnswer} 
            />
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => 
                    <li key={answer} className="answer">
                        <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                    </li>)}
                </ul>
            </div>
        </div>
    )
}