import React, { Component } from "react";
import NotificationList2 from "./NotificationList2";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import Button from "react-materialize/lib/Button";
import M from "materialize-css";
import NavigationBar from "./NavigationBar";
import {
  createTextNotice1,
  createMediaNotice1,
  clearNoticeData,
  createRichNotice
} from "../store/actions/noticeActions";

import SeenTeacherPrincipal from "../components/Seencount/SeenTeacherPrincipal";

class Teacher extends Component {
  render() {
    const { auth, messages } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div>
        {/* <SeenTeacherPrincipal
          messages={messages}
          teacherId="f9UP3JfEhWQpNhFWc0UtKcv1sUo1"
        /> */}
        {/*<h5 className="container section">Messages</h5>*/}
        <NotificationList2
          type="private"
          messages={messages}
          /* teacherId="YtaxSEFON7PrHP10uGen47RAMrj1" */
        />{messages== null && (
          <div className="card-small center">
            <span><h6><b>These are common notifications sent to all teachers by the Principal.</b></h6></span>
          </div>
        )}
        }
      </div>
    );
  }
}
const mapStateToProps = (state, ownprops, props) => {
 
  //try it once //chalra hai na! meko nahi samjha agar kuch galat hua to/ek bar bas atachment bhejke dekhte hai
  let principal = null;

  if (state.firebase.ordered.test)
    if (state.firebase.ordered.test.principal)
      principal = state.firebase.ordered.test.principal;
  // let { principal } = state.firebase.ordered.test;

  let messages = null;
  if (principal)
    if (principal.Teachers)
      if (principal.Teachers.messages) {
        messages = principal.Teachers.messages;
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
    const fetchUri = `/test/principal/Teachers/messages`;

    return {
      path: fetchUri
    };
  })
)(Teacher);
