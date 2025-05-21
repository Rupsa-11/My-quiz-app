import { useReducer } from 'react';

const initialState = {
  currentQuestion: 0,
  score: 0,
  showScore: false,
  answered: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ANSWER':
      return {
        ...state,
        score: action.correct ? state.score + 1 : state.score,
        answered: true,
      };
    case 'NEXT':
      const nextQuestion = state.currentQuestion + 1;
      return {
        ...state,
        currentQuestion: nextQuestion,
        showScore: nextQuestion >= action.total,
        answered: false,
      };
    default:
      return state;
  }
}

export default function useQuiz(total) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
