import axios from 'axios';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

const defaultUser = {};

const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});

export const me = () => async dispatch => {
  try {
    const res = await axios.get('http://atlas-trips.herokuapp.com/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method, tripId) => async dispatch => {
  let res;
  try {
    res = await axios.post(`http://atlas-trips.herokuapp.com/auth/${method}`, {email, password, tripId});
  } catch (authError) {
    return dispatch(getUser({error: authError}));
  }

  try {
    dispatch(getUser(res.data));
  } catch (err) {
    console.error(rr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('http://atlas-trips.herokuapp.com/auth/logout');
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
