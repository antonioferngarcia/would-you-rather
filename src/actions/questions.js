import { getQuestions, saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
import { addAnswerToUser, addQuestionToUser } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function sendAnswer(questionId, answer) {
  return async(dispatch, getState) => {
    dispatch(showLoading());
    const authedUser = getState().authedUser;
    await saveQuestionAnswer({ authedUser: authedUser.id, qid: questionId, answer })
      .then(async() => {
        dispatch(receiveQuestions(await getQuestions()));
        dispatch(addAnswerToUser(authedUser.id, questionId, answer));
      });
    dispatch(hideLoading());
  };
}

export function sendQuestion(question) {
  return async(dispatch, getState) => {
    dispatch(showLoading());
    await saveQuestion(question)
      .then(savedQuestion => {
        dispatch(addQuestion(savedQuestion));
        const authedUser = getState().authedUser.id;
        dispatch(addQuestionToUser(authedUser, savedQuestion.id));
      });
    dispatch(hideLoading());
  };
}