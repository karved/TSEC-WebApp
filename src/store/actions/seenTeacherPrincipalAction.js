export const addseenlistteacher = (msgId, uid, name, photo) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const baseUri = `/test/principal/Teachers`;
    return firebase
      .set(`${baseUri}/messages/${msgId}/seenDetailsList/${uid}`, {
        uid: uid,
        name: name,
        imageURL: photo
      })
      .then(() => {
        dispatch({ type: "SEEN_COUNT_UPDATED", data: uid });
      })
      .catch(err => {
        dispatch({ type: "SEEN_COUNT_ERROR", data: uid });
      });
  };
};

export const seencountteacher = (seencount, msgId) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const baseUri = `/test/principal/Teachers`;
    return firebase
      .update(`${baseUri}/messages/${msgId}`, {
        seenCount: seencount
      })
      .then(() => {
        dispatch({ type: "SEEN_COUNT_UPDATED", data: seencount });
      })
      .catch(err => {
        dispatch({ type: "SEEN_COUNT_ERROR", data: seencount });
      });
  };
};
