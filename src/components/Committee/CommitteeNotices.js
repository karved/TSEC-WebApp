import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import NavigationBar from "../../components/NavigationBar";
import CommitteeUnverifiedNotice from "./CommitteeUnverifiedNotice";

class CommitteeNotices extends Component {
  render() {
    const { unverifiedNotices } = this.props;

    return (
      <div>
        <NavigationBar />
        <div className="container">
          <h5>Unverified Notices</h5>
          <CommitteeUnverifiedNotice unverifiedNotices={unverifiedNotices} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let uid = state.firebase.auth.uid;
  let committees = state.firebase.data.committees;
  let notices = committees && committees[uid] ? committees[uid].notices : null;
  return {
    uid: uid ? uid : null,
    unverifiedNotices: notices ? notices.unverified : null
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(ownprops => {
    return [{ path: `/committees/${ownprops.uid}/notices/unverified` }];
  })
)(CommitteeNotices);
