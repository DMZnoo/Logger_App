const INIT_STATE = {
  logData: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case "CREATE_LOG":
      return {
        ...state,
        logData: [state.logData, ...action.payload],
      };
    case "READ_LOG":
      return {
        ...state,
      };

    case "EDIT_LOG":
      return {
        ...state,
        logData: state.logData.map((content, idx) =>
          content._id.toString() === action.payload._id.toString()
            ? [
                ...content.slice(0, idx),
                action.payload,
                ...content.slice(idx + 1),
              ]
            : content
        ),
      };
    case "DELETE_LOG":
      return {
        ...state,
        logData: state.logData.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
};
