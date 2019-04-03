import { ADD_QUESTION, ANSWER_QUESTION, RECEIVE_USERS } from '../actions/users';

export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      };
    case ADD_QUESTION :
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          questions: state[action.userId].questions.concat([action.questionId])
        }
      };
    case ANSWER_QUESTION :
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          answers: {
            ...state[action.userId].answers,
            [action.questionId]: action.answer
          }
        }
      };
    default :
      return state;
  }
}