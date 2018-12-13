const initalState = {
  user: null,
  user_loaded: false,
  board: "home",
  designer: "",
  client: "",
  boards: {},
  lastSeenUpadted: true
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
    case "GOT_BOARDS":
      return {
        ...state,
        boards: action.boards
      };
    case "GOT_LAST_SEEN":
      return {
        ...state,
        lastSeen: action.lastSeen
      };

    default:
      return state;
  }
};

export { reducers };
