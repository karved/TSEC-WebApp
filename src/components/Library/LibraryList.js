import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import BookSummary from "./BookSummary";
class LibraryList extends Component {
  render() {
    const { books } = this.props;

    return (
      <span>
        {books &&
          books.map(item => {
            return <BookSummary item={item} key={item.title_id} />;
          })}
          {books== null && (
          <div className="card-small center">
            <span><h6><b>You have not issued any Books recently.</b></h6></span>
          </div>
        )}
      </span>
    );
  }
}
const mapStateToProps = state => {
  const { profile, auth } = state.firebase;

  let books = null;
  if (state.firebase.ordered.test)
    if (state.firebase.ordered.test.library)
      books = state.firebase.ordered.test.library;
  return {
    auth: auth,
    profile: auth ? profile : null,
    books:
      books && auth.uid ? state.firebase.ordered.test.library[auth.uid] : null
  };
};

export default compose(
  connect(mapStateToProps),
  firebaseConnect(state => {
    const auth = state.auth;
    return [{ path: `/test/library/${auth.uid}` }];
  })
)(LibraryList);
