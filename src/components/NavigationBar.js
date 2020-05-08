import React, { Component } from "react";
import { connect } from "react-redux";
import { signout } from "../store/actions/authActions";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

class NavigationBar extends Component {
  render() {
    const { auth, profile, signout } = this.props;
    const links = auth.uid ? (
      <SignedInLinks profile={profile} signout={signout} />
    ) : (
      <SignedOutLinks />
    );

    return <>{links}</>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signout: () => {
      dispatch(signout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
