import { combineReducers } from "redux";
import authReducer from "./authReducer";
import noticeReducer from "./noticeReducer";
import { firebaseReducer } from "react-redux-firebase";
import groupReducer from "./groupReducer";
import committeeReducer from "./committeeReducer";
import seencountReducer from "./seencountReducer";
import storageReducer from "./storageReducer";
import officeReducer from "./officeReducer";
import libraryReducer from "./libraryReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  notice: noticeReducer,
  firebase: firebaseReducer,
  storage: storageReducer,
  group: groupReducer,
  committee: committeeReducer,
  library: libraryReducer,
  seencountReducer: seencountReducer,
  office: officeReducer
});

export default rootReducer;
