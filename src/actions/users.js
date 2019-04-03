export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_QUESTION = 'ADD_QUESTION_TO_USER';
export const ANSWER_QUESTION = 'ADD_ANSWER_TO_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addQuestionToUser(userId, questionId) {
  return {
    type: ADD_QUESTION,
    userId,
    questionId
  };
}

export function addAnswerToUser(userId, questionId, answer) {
  return {
    type: ANSWER_QUESTION,
    userId,
    questionId,
    answer
  };
}