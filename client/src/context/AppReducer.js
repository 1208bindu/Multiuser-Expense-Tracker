export default (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        isLoading: false,
        userDetails: action.payload,
      };

    case "CONFIRM_EMAIL":
      return {
        ...state,
        emailConfirmed: action.auth,
      };

    case "CONFIRM_EMAIL_ERROR":
      return {
        ...state,
        error: action.payload,
        emailConfirmed: action.auth,
      };

    case "CHANGE_PWD":
      return {
        ...state,
        changeSuccess: action.auth,
      };

    case "CHANGE_PWD_ERROR":
      return {
        ...state,
        error: action.payload,
        changeSuccess: action.auth,
      };

    case "USER_ERROR":
      return {
        ...state,
        error: action.payload,
        isauthenticated: action.auth,
      };

    case "FORGOT_PWD_ERROR":
      return {
        ...state,
        error: action.payload,
        findEmail: action.auth,
      };

    case "ADD_USER_ERROR":
      return {
        ...state,
        error: action.payload,
        registrationSuccess: action.auth,
      };
    case "VALID_TOKEN":
      return {
        ...state,
        currentUser: action.payload,
        // isauthenticated:action.auth
      };

    case "ADD_USER":
      return {
        ...state,
        userDetails: [...state.userDetails, action.payload],
        registrationSuccess: action.auth,
        error: "",
      };

    case "FORGOT_PWD":
      return {
        ...state,
        error: "",
        findEmail: action.auth,
      };

    case "USER_LOGIN":
      return {
        ...state,
        Token: action.tokenload,
        error: "",
        isauthenticated: action.auth,
      };

    case "USER_LOGOUT":
      return {
        ...state,
        curentUser: [],
        isauthenticated: action.auth,
      };
    default:
      return state;
  }
};
