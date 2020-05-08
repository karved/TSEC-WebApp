import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import IncementStudentPrincipal from "./IncrementStudentPrincipal";
class SeenStudentPrincipal extends Component {
  render() {
    const { auth, profile, messages, type, teacherId } = this.props;
    return (
      <div>
        {Array.isArray(messages) &&
          messages.map(message => (
            <IncementStudentPrincipal
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
    profile: state.firebase.profile,
    auth: state.firebase
  };
};
export default compose(
  connect(mapStateToProps),
  firebaseConnect(ownprops => {
    const { type, messages, profile, teacherId } = ownprops;
    if (type && !messages) {
      const fetchUri = `/test/principal/Students`;
      return [
        { path: `${fetchUri}/messages`, orderBy: ["sendTimestamp", "desc"] }
      ];
    }
  })
)(SeenStudentPrincipal);
