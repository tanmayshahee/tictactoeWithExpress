import types from "../ActionTypes";

const initialState = {
  isUserLoggedIn: false,
  userInfo: {},
};

export default (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case types.SET_USER_INFO: {
      let newState = { ...state };
      newState.userInfo = { ...state.userInfo };
      newState.userInfo = payload.userInfo;
      return newState;
    }
    case types.TOGGLE_LOGIN_STATE: {
      let newState = { ...state };
      newState.isUserLoggedIn = payload.isUserLoggedIn;
      return newState;
    }
    default:
      return state;
  }
};
