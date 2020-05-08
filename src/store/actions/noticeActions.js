export const createTextNotice = ({ group, uid, text, profile, msgType }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    let currDate = new Date();
    let month = currDate.getMonth() + 1;
    let sendTimestamp =
      currDate.getDate() +
      "-" +
      month +
      "-" +
      currDate.getFullYear() +
      "," +
      " " +
      currDate.getHours() +
      ":" +
      currDate.getMinutes();
    const baseUri = `/test/groups/${group.branch}/${group.year}/${group.div}/${uid}`;
    const postkey = firebase
      .database()
      .ref(`${baseUri}/messages`)
      .push().key;
    return firebase
      .set(`${baseUri}/messages/${postkey}`, {
        msgId: postkey,
        msg: text,
        msgType: msgType,

        seenCount: "0",
        receiveTimestamp: new Date().getTime(),
        sendTimestamp: sendTimestamp
      })
      .then(() => {
        dispatch({ type: "NOTICE_PUSH_SUCCESS", data: text });
        firebase.set(`${baseUri}/TeacherId`, uid);
        firebase.set(`${baseUri}/TeacherName`, profile.name);
        firebase.set(`${baseUri}/image`, profile.photo);
      })
      .catch(err => {
        dispatch({ type: "NOTICE_PUSH_ERROR", data: text });
      });
  };
};

export const createTextNotice1 = ({ uid, text, profile, msgType }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const baseUri = `/test/principal/Students`;
    let currDate = new Date();
    let sendTimestamp =
      currDate.getDate() +
      "-" +
      currDate.getMonth() +
      1 +
      "-" +
      currDate.getFullYear() +
      "," +
      " " +
      currDate.getHours() +
      ":" +
      currDate.getMinutes();
    const postkey = firebase
      .database()
      .ref(`${baseUri}/messages`)
      .push().key;
    return firebase
      .set(`${baseUri}/messages/${postkey}`, {
        msgId: postkey,
        msg: text,
        msgType: msgType,
        seenCount: "0",
        receiveTimestamp: new Date().getTime(),
        sendTimestamp: sendTimestamp
      })
      .then(() => {
        dispatch({ type: "NOTICE_PUSH_SUCCESS", data: text });
      })
      .catch(err => {
        dispatch({ type: "NOTICE_PUSH_ERROR", data: text });
      });
  };
};
export const createTextNotice2 = ({ uid, text, profile, msgType }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const baseUri = `/test/principal/Teachers`;
    let currDate = new Date();
    let sendTimestamp =
      currDate.getDate() +
      "-" +
      currDate.getMonth() +
      1 +
      "-" +
      currDate.getFullYear() +
      "," +
      " " +
      currDate.getHours() +
      ":" +
      currDate.getMinutes();
    const postkey = firebase
      .database()
      .ref(`${baseUri}/messages`)
      .push().key;
    return firebase
      .set(`${baseUri}/messages/${postkey}`, {
        msgId: postkey,
        msg: text,
        msgType: msgType,
        seenCount: "0",
        receiveTimestamp: new Date().getTime(),
        sendTimestamp: sendTimestamp
      })
      .then(() => {
        dispatch({ type: "NOTICE_PUSH_SUCCESS", data: text });
      })
      .catch(err => {
        dispatch({ type: "NOTICE_PUSH_ERROR", data: text });
      });
  };
};

export const createMediaNotice = ({ group, uid, file, profile, msgType }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const baseUriForStorage = `/test/chat/${profile.name}/${group.year}-${group.branch}-${group.div}/${file.name}`; //base uri for storage

    return firebase
      .storage()
      .ref(baseUriForStorage)
      .put(file)
      .then(snap => {
        //file uploaded now create text notice for the same
        //console.log("file uploaded heading to text");
        return dispatch(
          createTextNotice({ group, uid, text: file.name, profile, msgType })
        );
      })
      .catch(err => {
        dispatch({ type: "NOTICE_PUSH_ERROR", data: file.name });
      });
  };
};
export const createMediaNotice1 = ({ uid, file, profile, msgType }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const baseUriForStorage = `/test/chat/${profile.name}/Students/${file.name}`; //base uri for storage

    return firebase
      .storage()
      .ref(baseUriForStorage)
      .put(file)
      .then(snap => {
        //file uploaded now create text notice for the same
        //console.log("file uploaded heading to text");
        return dispatch(
          createTextNotice1({ uid, text: file.name, profile, msgType })
        );
      })
      .catch(err => {
        dispatch({ type: "NOTICE_PUSH_ERROR", data: file.name });
      });
  };
};
export const createMediaNotice2 = ({ uid, file, profile, msgType }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const baseUriForStorage = `/test/chat/${profile.name}/Teachers/${file.name}`; //base uri for storage

    return firebase
      .storage()
      .ref(baseUriForStorage)
      .put(file)
      .then(snap => {
        //file uploaded now create text notice for the same
        console.log("file uploaded heading to text");
        return dispatch(
          createTextNotice2({ uid, text: file.name, profile, msgType })
        );
      })
      .catch(err => {
        dispatch({ type: "NOTICE_PUSH_ERROR", data: file.name });
      });
  };
};
//working fine

export const createRichNotice = ({
  group,
  uid,
  jsonString,
  profile,
  msgType
}) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const baseUri = `/groups/${group.branch}/${group.year}/${group.div}/${uid}`;
    const postkey = firebase
      .database()
      .ref(`${baseUri}/messages`)
      .push().key;
    return firebase
      .set(`${baseUri}/messages/${postkey}`, {
        msgId: postkey,
        msg: jsonString,
        msgType: msgType,
        seencount: "0",
        receiveTimestamp: new Date().getTime(),
        sendTimestamp: new Date().toLocaleDateString()
      })
      .then(() => {
        dispatch({ type: "NOTICE_PUSH_SUCCESS", data: "type: Rich Text" });
        firebase.set(`${baseUri}/TeacherId`, uid);
        firebase.set(`${baseUri}/TeacherName`, profile.name);
        firebase.set(`${baseUri}/image`, profile.photo);
      })
      .catch(err => {
        dispatch({ type: "NOTICE_PUSH_ERROR", data: "type: Rich Text" });
      });
  };
};

export const clearNoticeData = () => {
  return dispatch => {
    dispatch({ type: "CLEAR_NOTICE_DATA" });
  };
};
