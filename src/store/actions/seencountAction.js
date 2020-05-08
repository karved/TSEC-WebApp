export const addseenlist = (
  branch,
  year,
  classs,
  teacherID,
  msgId,
  uid,
  name,
  photo
) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const baseUri = `/test/groups/${branch}/${year}/${classs}/${teacherID}`;
    return firebase
      .set(`${baseUri}/messages/${msgId}/seenDetailsList/${uid}`, {
        uid: uid,
        name: name,
        imageUrl: photo
      })
      .then(() => {
        dispatch({ type: "SEEN_COUNT_UPDATED", data: seencount });
      })
      .catch(err => {
        dispatch({ type: "SEEN_COUNT_ERROR", data: seencount });
      });
  };
};

export const seencount = (
  seencount,
  branch,
  year,
  classs,
  teacherID,
  msgId
) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const baseUri = `/test/groups/${branch}/${year}/${classs}/${teacherID}`;
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
