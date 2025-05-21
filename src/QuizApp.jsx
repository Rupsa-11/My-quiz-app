import { useEffect, useState } from 'react';
import useQuiz from './useQuiz';
import questions from './questions';
import ProgressBar from './ProgressBar';
import Confetti from 'react-confetti';

export default function QuizApp() {
  const [state, dispatch] = useQuiz(questions.length);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentQ = questions[state.currentQuestion];

  useEffect(() => {
    if (state.showScore) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state.showScore]);

  const handleAnswer = (option) => {
    if (state.answered) return;
    const correct = option === currentQ.answer;
    playClickSound(correct);
    dispatch({ type: 'ANSWER', correct });
    setTimeout(() => {
      dispatch({ type: 'NEXT', total: questions.length });
    }, 1000);
  };

  const handleRestart = () => {
    dispatch({ type: 'RESTART' });
  };

  const playClickSound = (correct) => {
    const audio = new Audio(correct ? '/correct.mp3' : '/wrong.mp3');
    audio.volume = 0.3;
    audio.play();
  };

  if (state.showScore) {
    return (
      <div className="score-screen animate">
        {showConfetti && <Confetti />}
        <h2>🎉 Your Score: {state.score} / {questions.length}</h2>
        <button className="restart-btn" onClick={handleRestart}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="quiz animate">
      <ProgressBar current={state.currentQuestion} total={questions.length} />
      <h2>{currentQ.question}</h2>
      <div className="options">
        {currentQ.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            className={state.answered ? (opt === currentQ.answer ? 'correct' : 'wrong') : ''}
            disabled={state.answered}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
