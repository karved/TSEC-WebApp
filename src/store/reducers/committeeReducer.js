const initState = {
  noticePushError: null,
  noticePushData: null
};

const committeeReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_COMMITTEENOTICE":
      //console.log("notice push success");
      return {
        ...state,
        noticePushError: null,
        noticePushData: action.data
      };

    case "CREATE_COMMITTEENOTICE_ERROR":
      //console.log("notice push error");
      return {
        ...state,
        noticePushError: "error pushing notice",
        noticePushData: action.data
      };

    default:
      return state;
  }
};

export default committeeReducer;
