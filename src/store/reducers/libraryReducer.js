const initState = {
  noticePushError: null,
  noticePushData: null
};

const libraryReducer = (state = initState, action) => {
  switch (action.type) {
    case "LIBRARY_ID_ADDED":
      //console.log("library add success");
      return {
        ...state,
        noticePushError: null,
        noticePushData: action.data
      };

    case "LIBRARY_ID_ERROR":
      //console.log("library add error");
      return {
        ...state,
        noticePushError: "error adding id",
        noticePushData: action.data
      };

    default:
      return state;
  }
};

export default libraryReducer;
