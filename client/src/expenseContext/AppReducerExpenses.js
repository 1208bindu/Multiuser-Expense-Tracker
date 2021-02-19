/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTION":
      return {
        ...state,
        isLoading: false,
        transaction: action.payload,
        length: action.len,
        fullList: action.list,
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_RECORD":
      return {
        ...state,
        transaction: state.transaction.filter(
          (trans) => trans._id !== action.payload
        ),
      };
    case "ADD_RECORD":
      return {
        ...state,
        transaction: [...state.transaction, action.payload],
      };
    default:
      return state;
  }
};
