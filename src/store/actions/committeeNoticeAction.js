export const createCommitteeNotice = ({ title, uid, content, profile }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const baseUri = `/test/committees/${uid}`;
    let currDate = new Date();
    let sendTimestamp =
      currDate.getMonth() +
      1 +
      "/" +
      currDate.getDate() +
      "/" +
      currDate.getFullYear();
    const postkey = firebase
      .database()
      .ref(`${baseUri}/notices`)
      .push().key;
    return firebase
      .set(`${baseUri}/notices/unverified/${postkey}`, {
        noticeId: postkey,
        title: title,
        content: content,
        uid: uid,
        receiveTimestamp: new Date().getTime(),
        sendTimestamp: sendTimestamp
      })
      .then(() => {
        dispatch({ type: "CREATE_COMMITTEENOTICE", data: { title, content } });
       // console.log(uid, profile.name);
        firebase.set(`${baseUri}/CommitteeId`, uid);
        firebase.set(`${baseUri}/CommitteeName`, profile.name);
      })
      .catch(err => {
        dispatch({
          type: "CREATE_COMMITTEENOTICE_ERROR",
          data: { title, content }
        });
      });
  };
};
