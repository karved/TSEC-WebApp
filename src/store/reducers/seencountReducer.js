const initState = {
  noticePushError: null,
  noticePushData: null
};

const seencountReducer = (state = initState, action) => {
  switch (action.type) {
    case "SEEN_COUNT_UPDATE":
      //console.log("notice push success");
      return {
        ...state,
        noticePushError: null,
        noticePushData: action.data
      };

    case "SEEN_COUNT_ERROR":
     // console.log("notice push error");
      return {
        ...state,
        noticePushError: "error pushing notice",
        noticePushData: action.data
      };

    default:
      return state;
  }
};
export default seencountReducer;
