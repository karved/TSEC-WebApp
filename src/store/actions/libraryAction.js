export const addId = ({ id, uid }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const baseUri = `/test/users/${uid}`;
    return firebase
      .update(`${baseUri}`, {
        library_id: id
      })
      .then(() => {
        dispatch({ type: "LIBRARY_ID_ADDED", data: id });
      })
      .catch(err => {
        dispatch({ type: "LIBRARY_ID_ERROR", data: id });
      });
  };
};
