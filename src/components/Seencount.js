import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import IncementSeencount from "./IncementSeencount";
class Seencount extends Component {
  render() {
    const { auth, profile, messages, type, teacherId } = this.props;
    return (
      <div>
        {Array.isArray(messages) &&
          messages.map(message => (
            <IncementSeencount
              data={message.value}
              teacherId={teacherId}
              type={type}
              key={message.key}
              profile={profile}
              auth={auth}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notices: state.firebase.ordered.notification || [],
    profile: state.firebase.profile,
    auth: state.firebase
  };
};
export default compose(
  connect(mapStateToProps),
  firebaseConnect(ownprops => {
    const { type, messages, profile, teacherId } = ownprops;
    if (type && !messages) {
      const fetchUri = `/test/groups/${profile.branch}/${profile.year}/${profile.class}/${teacherId}`;
      return [
        { path: `${fetchUri}/messages`, orderBy: ["sendTimestamp", "desc"] }
      ];
    }
  })
)(Seencount);
