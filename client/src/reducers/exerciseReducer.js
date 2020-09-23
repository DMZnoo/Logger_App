const INIT_STATE = {
  exerciseData: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case "CREATE_EXERCISE":
      return {
        ...state,
        exerciseData: [state.exerciseData, ...action.payload],
      };
    case "READ_EXERCISE":
      return {
        ...state,
      };

    case "EDIT_EXERCISE":
      return {
        ...state,
        exerciseData: state.exerciseData.map((content, idx) =>
          content._id.toString() === action.payload._id.toString()
            ? [
                ...content.slice(0, idx),
                action.payload,
                ...content.slice(idx + 1),
              ]
            : content
        ),
      };
    case "DELETE_EXERCISE":
      return {
        ...state,
        exerciseData: state.exerciseData.filter(
          (item) => item._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
