import types from "../ActionTypes";

const initialState = {
  piece: "",
  isPlaying: false,
  isRoomCreator: false,
  isDisabled: false,
  myTurn: false,
  squares: Array(9).fill(""),
  xScore: 0,
  oScore: 0,
  whosTurn: false,
  showGameBoard: false,
};

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case types.TOGGLE_PLAYING_FLAG: {
      return {
        ...state,
        ...payload,
      };
    }
    case types.CREATE_ROOM: {
      let newState = { ...state };
      newState.piece = "X";
      newState.isRoomCreator = true;
      newState.isDisabled = true;
      newState.myTurn = true;
      newState.whosTurn = true;
      return newState;
    }
    case types.SET_PIECE: {
      return {
        ...state,
        ...payload,
      };
    }
    case types.RESET_GAME: {
      let newState = { ...state };
      newState.piece = "";
      newState.isPlaying = false;
      newState.isRoomCreator = false;
      newState.isDisabled = false;
      newState.myTurn = false;
      newState.whosTurn = false;
      return newState;
    }
    case types.START_NEW_ROUND: {
      let newState = { ...state };
      newState.squares = [...state.squares];
      newState.squares = Array(9).fill("");
      newState.whosTurn = payload.whosTurn;
      return newState;
    }
    case types.SET_SCORE: {
      let newState = { ...state };
      newState.xScore = payload.xScore;
      newState.oScore = payload.oScore;
      return newState;
    }
    case types.PUBLISH_MOVE: {
      let newState = { ...state };
      newState.squares = [...state.squares];
      newState.squares = payload.squares;
      newState.whosTurn = payload.whosTurn;
      return newState;
    }
    case types.TOGGLE_GAME_BOARD: {
      let newState = { ...state };
      newState.showGameBoard = payload.showGameBoard;
      return newState;
    }
    default:
      return state;
  }
};
