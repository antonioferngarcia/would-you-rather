import { showLoading, hideLoading } from 'react-redux-loading';
import { receiveUsers } from './users';
import { getInitialData } from '../utils/api';
import { receiveQuestions } from './questions';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ users, questions }) => {
        // TODO: remove next line
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      });
  };
}