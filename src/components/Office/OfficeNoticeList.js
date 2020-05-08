import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import NavigationBar from "../NavigationBar";
import OfficeUnverifiedNotice from "./OfficeUnverifiedNotice";

class CommitteeNotices extends Component {
  render() {
    const { unverifiedNotices } = this.props;

    return (
      <div>
        <NavigationBar />
        <div className="container">
          <h5>Unverified Notices</h5>
          <OfficeUnverifiedNotice unverifiedNotices={unverifiedNotices} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let uid = state.firebase.auth.uid;
  let office = state.firebase.data.office;
  let notices = office && office[uid] ? office[uid].notices : null;
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
    return [{ path: `/office/${ownprops.uid}/notices/unverified` }];
  })
)(CommitteeNotices);
