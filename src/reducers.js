const initalState = {
  user: null,
  user_loaded: false,
  board: "home"
};

const reducers = (state = initalState, action) => {
  switch (action.type) {
    case "CHANGED_BOARD":
      return {
        ...state,
        board: action.board
      };
    case "USER_SIGN_IN":
      return {
        ...state,
        user: action.user
      };
    case "USER_SIGN_OUT":
      return {
        ...state,
        user: null
      };
    case "USER_AUTH_LOADED":
      return {
        ...state,
        user_loaded: true
      };
    case "GOT_PARAMS":
      return {
        ...state,
        designer: action.designer,
        client: action.client
      };

    default:
      return state;
  }
};

export { reducers };
