import types from "../ActionTypes";

export const setUserInfo = (payload) => ({
  type: types.SET_USER_INFO,
  payload,
});
export const toggleLoginState = (payload) => ({
  type: types.TOGGLE_LOGIN_STATE,
  payload,
});
