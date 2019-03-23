import { showLoading, hideLoading } from 'react-redux-loading'
import {receiveUsers} from "./users";
import { getInitialData } from '../utils/api'
import {receiveQuestions} from "./questions";
import {setAuthedUser} from "./authedUser";

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(setAuthedUser(users['tylermcginnis']));
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading())
      })
  }
}