import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export default function FinalScore({ score, total }) {
  const [showConfetti, setShowConfetti] = useState(true);

  // Stop confetti after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="score-screen">
      {showConfetti && <Confetti />}
      <h2>🎉 Congratulations! 🎉</h2>
      <p>
        You scored <strong>{score}</strong> out of <strong>{total}</strong>!
      </p>
    </div>
  );
}
