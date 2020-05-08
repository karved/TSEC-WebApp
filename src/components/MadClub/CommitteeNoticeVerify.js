import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

class CommitteeNoticeVerify extends Component {
  render() {
    const { committees } = this.props;

    return (
      <h3>Notices</h3>
      // <CommLis committees={committees}/>
    );
  }
}
const mapStateToProps = state => {
  return {
    committees: state.firebase.ordered.committees
  };
};

export default compose(
  connect(mapStateToProps),
  firebaseConnect(state => {
    const fetchUri = `/committees`;

    return [{ path: fetchUri }];
  })
)(CommitteeNoticeVerify);
