import React, { Component } from "react";
import NotificationList1 from "./NotificationList1";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import Button from "react-materialize/lib/Button";
import M from "materialize-css";
import SeenStudentPrincipal from "./Seencount/SeenStudentPrincipal";
import NavigationBar from "./NavigationBar";
import {
  createTextNotice1,
  createMediaNotice1,
  clearNoticeData,
  createRichNotice
} from "../store/actions/noticeActions";

class Student extends Component {
  render() {
    const { auth, messages } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;


    return (
      <div>
        {/* <SeenStudentPrincipal
          messages={messages}
          teacherId="f9UP3JfEhWQpNhFWc0UtKcv1sUo1"
        /> */}
        {/*<h5 className="container section">Messages</h5>*/}
        <NotificationList1
          type="private"
          messages={messages}
          //teacherId="YtaxSEFON7PrHP10uGen47RAMrj1"
        />
        {messages== null && (
          <div className="card-small center">
            <span><h6><b>These are common notifications sent to all students by the Principal.</b></h6></span>
          </div>
        )}
        
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  let principal = null;
  if (state.firebase.ordered.test)
    if (state.firebase.ordered.test.principal)
      principal = state.firebase.ordered.test.principal;

  // let { principal } = state.firebase.ordered.test; //i meant it was looking really bad before you just corrected it

  let messages = null;
  if (principal)
    if (principal.Students)
      if (principal.Students.messages) {
        messages = principal.Students.messages;
      }
  return {
    auth: state.firebase.auth,
    messages: messages,
    profile: state.firebase.profile
  };
};
export default compose(
  connect(mapStateToProps),
  firebaseConnect(ownprops => {
    const fetchUri = `/test/principal/Students/messages`;

    return {
      path: fetchUri
    };
  })
)(Student);
