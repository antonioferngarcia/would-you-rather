import { showLoading, hideLoading } from 'react-redux-loading'
import {receiveUsers} from "./users";
import { getInitialData } from '../utils/api'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ users, questions }) => {
        console.log(users, questions)
        dispatch(receiveUsers(users));
        //dispatch(receiveQuestions(questions));
        //dispatch(setAuthedUser(AUTHED_ID));
        dispatch(hideLoading())
      })
  }
}