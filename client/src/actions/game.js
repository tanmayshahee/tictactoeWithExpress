import types from "../ActionTypes";

export const toggleplayingFlag = (payload) => ({
  type: types.TOGGLE_PLAYING_FLAG,
  payload,
});

export const createRoom = (payload) => ({
  type: types.CREATE_ROOM,
  payload,
});

export const setPiece = (payload) => ({
  type: types.SET_PIECE,
  payload,
});

export const resetGame = (payload) => ({
  type: types.RESET_GAME,
  payload,
});

export const startNewRound = (payload) => ({
  type: types.START_NEW_ROUND,
  payload,
});

export const setScore = (payload) => ({
  type: types.SET_SCORE,
  payload,
});

export const publishMove = (payload) => ({
  type: types.PUBLISH_MOVE,
  payload,
});
export const toggleGameBoard = (payload) => ({
  type: types.TOGGLE_GAME_BOARD,
  payload,
});
